import React, { useState, useEffect } from 'react';
import { APIService, EggPrice } from '../services/APIService';

const PricePredictionGame: React.FC = () => {
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [virtualMoney, setVirtualMoney] = useState<number>(100);
  const [history, setHistory] = useState<string[]>([]);
  const [nextPrice, setNextPrice] = useState<number | null>(null);

  useEffect(() => {
    APIService.getEggPrices().then((data) => {
      setCurrentPrice(data[data.length - 1].price);
    });
  }, []);

  const predictPrice = (direction: 'up' | 'down' | 'same') => {
    if (!currentPrice) return;

    const variation = (Math.random() - 0.5) * 0.2 * currentPrice;
    const newPrice = currentPrice + variation;
    const actualDirection = 
      Math.abs(variation) < 0.05 * currentPrice ? 'same' : 
      variation > 0 ? 'up' : 'down';
    setNextPrice(newPrice);
    setCurrentPrice(newPrice);

    let moneyChange = 0;
    if (direction === actualDirection) {
      moneyChange = 10;
      setHistory([...history, `${direction} (Correct) - +$${moneyChange}`]);
    } else {
      moneyChange = -5;
      setHistory([...history, `${direction} (Wrong) - -$${Math.abs(moneyChange)}`]);
    }
    setVirtualMoney(Math.max(0, virtualMoney + moneyChange));
  };

  return (
    <div className="price-prediction-game">
      <h2>Price Prediction Game</h2>
      <p>Current Price: ${currentPrice.toFixed(2)}</p>
      <p>Virtual Money: ${virtualMoney.toFixed(2)}</p>
      <div>
        <button onClick={() => predictPrice('up')}>Up</button>
        <button onClick={() => predictPrice('down')}>Down</button>
        <button onClick={() => predictPrice('same')}>Same</button>
      </div>
      <h3>History</h3>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default PricePredictionGame;