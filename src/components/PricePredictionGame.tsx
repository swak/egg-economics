import React, { useState, useEffect } from 'react';
import { APIService, EggPrice } from '../services/APIService';

interface VoteRecord {
  higher: number;
  lower: number;
  price: number;
  winner?: string;
}

const PricePredictionGame: React.FC = () => {
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [nextDayVotes, setNextDayVotes] = useState<VoteRecord>({ higher: 0, lower: 0, price: 0 });
  const [voteHistory, setVoteHistory] = useState<VoteRecord[]>([]);
  const [simulatedDate, setSimulatedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    APIService.getEggPrices().then((data) => {
      const initialPrice = data[data.length - 1].price;
      setCurrentPrice(initialPrice);
      setNextDayVotes({ higher: 0, lower: 0, price: initialPrice });
    });
    loadVoteHistory();
  }, []);

  const loadVoteHistory = () => {
    const history = JSON.parse(localStorage.getItem('voteHistory') || '[]');
    setVoteHistory(history);
  };

  const saveVote = (vote: 'higher' | 'lower') => {
    const votes = { ...nextDayVotes, [vote]: (nextDayVotes[vote] || 0) + 1 };
    setNextDayVotes(votes);
    const currentDayVotes = { ...votes, price: currentPrice };
    localStorage.setItem(simulatedDate, JSON.stringify(currentDayVotes));
  };

  const simulateNextDay = () => {
    if (!currentPrice) return;

    const currentDayVotes = { ...nextDayVotes, price: currentPrice };
    const updatedHistory = [...voteHistory, currentDayVotes];
    
    if (updatedHistory.length > 1) {
      const prevDay = updatedHistory[updatedHistory.length - 2];
      const currentDay = updatedHistory[updatedHistory.length - 1];
      const priceIncreased = currentDay.price > prevDay.price;
      const winner = priceIncreased ? 'higher' : 'lower';
      updatedHistory[updatedHistory.length - 2] = { ...prevDay, winner };
    }

    setVoteHistory(updatedHistory);
    localStorage.setItem('voteHistory', JSON.stringify(updatedHistory));

    const variation = (Math.random() - 0.5) * 0.2 * currentPrice;
    const newPrice = currentPrice + variation;
    setCurrentPrice(newPrice);

    const nextDate = new Date(new Date(simulatedDate).getTime() + 86400000).toISOString().split('T')[0];
    setSimulatedDate(nextDate);

    setNextDayVotes({ higher: 0, lower: 0, price: newPrice });
    localStorage.removeItem(simulatedDate);
  };

  return (
    <div className="price-prediction-game">
      <h2>Price Prediction Game</h2>
      <p>Current Price: ${currentPrice.toFixed(2)}</p>
      <div className="vote-buttons">
        <button onClick={() => saveVote('higher')}>Higher</button>
        <button onClick={() => saveVote('lower')}>Lower</button>
      </div>
      <p>Today’s Votes: Higher: {nextDayVotes.higher}, Lower: {nextDayVotes.lower}</p>
      {voteHistory.length > 0 && (
        <div>
          <h3>Vote History</h3>
          {[...voteHistory].reverse().map((record, index) => {
            const totalVotes = (record.higher || 0) + (record.lower || 0);
            const higherPercent = totalVotes ? ((record.higher / totalVotes) * 100).toFixed(0) : 0;
            const lowerPercent = totalVotes ? ((record.lower / totalVotes) * 100).toFixed(0) : 0;
            const dayNumber = voteHistory.length - index; // Reverse day numbering
            return (
              <div key={index} className="vote-record">
                <p>Day {dayNumber} Price: ${record.price.toFixed(2)}</p>
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
                {record.winner && (
                  <div className="winner-wrapper">
                    <div
                      className={`winner ${record.winner}-winner`}
                      style={{
                        width: record.winner === 'higher' ? `${higherPercent}%` : `${lowerPercent}%`,
                        marginLeft: record.winner === 'higher' ? '0' : `${higherPercent}%`,
                      }}
                    >
                      Winner: {record.winner === 'higher' ? 'Higher' : 'Lower'} voters
                    </div>
                  </div>
                )}
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