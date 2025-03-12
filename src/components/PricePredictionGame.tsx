import React, { useState, useEffect } from 'react';
import { APIService, EggPrice } from '../services/APIService';

interface VoteRecord {
  higher: number;
  lower: number;
  price: number;
}

const PricePredictionGame: React.FC = () => {
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [nextDayVotes, setNextDayVotes] = useState<VoteRecord>({ higher: 0, lower: 0, price: 0 });
  const [voteHistory, setVoteHistory] = useState<VoteRecord[]>([]);
  const [simulatedDate, setSimulatedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Load initial price and votes
    APIService.getEggPrices().then((data) => {
      const initialPrice = data[data.length - 1].price;
      setCurrentPrice(initialPrice);
      setNextDayVotes({ higher: 0, lower: 0, price: initialPrice });
    });
    loadVoteHistory();
  }, []);

  // Load vote history from local storage
  const loadVoteHistory = () => {
    const history = JSON.parse(localStorage.getItem('voteHistory') || '[]');
    setVoteHistory(history);
  };

  // Save a vote to local storage
  const saveVote = (vote: 'higher' | 'lower') => {
    const votes = { ...nextDayVotes, [vote]: (nextDayVotes[vote] || 0) + 1 };
    setNextDayVotes(votes);
    // Update local storage for the current simulated date
    const currentDayVotes = { ...votes, price: currentPrice };
    localStorage.setItem(simulatedDate, JSON.stringify(currentDayVotes));
  };

  // Simulate next day's price and store votes
  const simulateNextDay = () => {
    if (!currentPrice) return;

    // Store current day's votes and price in history
    const currentDayVotes = { ...nextDayVotes, price: currentPrice };
    const updatedHistory = [...voteHistory, currentDayVotes];
    setVoteHistory(updatedHistory);
    localStorage.setItem('voteHistory', JSON.stringify(updatedHistory));

    // Simulate next day
    const variation = (Math.random() - 0.5) * 0.2 * currentPrice;
    const newPrice = currentPrice + variation;
    setCurrentPrice(newPrice);

    // Increment simulated date
    const nextDate = new Date(new Date(simulatedDate).getTime() + 86400000);
    setSimulatedDate(nextDate.toISOString().split('T')[0]);

    // Reset votes for new day
    setNextDayVotes({ higher: 0, lower: 0, price: newPrice });
    localStorage.removeItem(simulatedDate); // Clear old day's votes
  };

  return (
    <div className="price-prediction-game">
      <h2>Price Prediction Game</h2>
      <p>Current Price: ${currentPrice.toFixed(2)}</p>
      <div>
        <button onClick={() => saveVote('higher')}>Higher</button>
        <button onClick={() => saveVote('lower')}>Lower</button>
      </div>
      <p>Today’s Votes: Higher: {nextDayVotes.higher}, Lower: {nextDayVotes.lower}</p>
      {voteHistory.length > 0 && (
        <div>
          <h3>Vote History</h3>
          {voteHistory.map((record, index) => {
            const totalVotes = (record.higher || 0) + (record.lower || 0);
            const higherPercent = totalVotes ? ((record.higher / totalVotes) * 100).toFixed(0) : 0;
            const lowerPercent = totalVotes ? ((record.lower / totalVotes) * 100).toFixed(0) : 0;
            return (
              <div key={index} className="vote-record">
                <p>Day {index + 1} Price: ${record.price.toFixed(2)}</p>
                <p>Votes - Higher: {record.higher}, Lower: {record.lower}</p>
                <div className="vote-bar">
                  <div
                    className="higher-bar"
                    style={{ width: `${higherPercent}%` }}
                  >
                    {higherPercent}% Higher
                  </div>
                  <div
                    className="lower-bar"
                    style={{ width: `${lowerPercent}%` }}
                  >
                    {lowerPercent}% Lower
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <button onClick={simulateNextDay}>Simulate Next Day</button>
    </div>
  );
};

export default PricePredictionGame;