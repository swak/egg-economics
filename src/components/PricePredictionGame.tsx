import React, { useState, useEffect } from 'react';
import { APIService, EggPrice } from '../services/APIService';

const PricePredictionGame: React.FC = () => {
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [virtualMoney, setVirtualMoney] = useState<number>(100); // Start with $100
  const [history, setHistory] = useState<string[]>([]); // Track predictions and outcomes
  const [nextPrice, setNextPrice] = useState<number | null>(null); // Simulate next price

  useEffect(() => {
    // Set initial price from mock data (last value: $6.68)
    APIService.getEggPrices().then((data) => {
      setCurrentPrice(data[data.length - 1].price);
    });
  }, []);

  const predictPrice = (direction: 'up' | 'down' | 'same') => {
    if (!currentPrice) return;

    // Simulate next price (random variation ±10% with a chance to stay same)
    const variation = (Math.random() - 0.5) * 0.2 * currentPrice; // ±10% variation
    const newPrice = currentPrice + variation;
    const actualDirection = 
      Math.abs(variation) < 0.05 * currentPrice ? 'same' : 
      variation > 0 ? 'up' : 'down';
    setNextPrice(newPrice);

    // Update current price for next round
    setCurrentPrice(newPrice);

    // Check prediction and update money
    let moneyChange = 0;
    if (direction === actualDirection) {
      moneyChange = 10; // Gain $10 for correct prediction
      setHistory([...history, `${direction} (Correct) - +$10`]);
    } else {
      moneyChange = -5; // Lose $5 for wrong prediction
      setHistory([...history, `${direction} (Wrong) - -$5`]);
    }
    setVirtualMoney(Math.max(0, virtualMoney + moneyChange)); // Don’t go below $0
  };

  return (
    <div>
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