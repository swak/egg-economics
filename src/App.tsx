import React from 'react';
import './App.css';
import EggPriceChart from './components/EggPriceChart';
import PricePredictionGame from './components/PricePredictionGame';
import EggMarketInsights from './components/EggMarketInsights';

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>Egg-onomics</h1>
        <EggPriceChart />
        <PricePredictionGame />
        <EggMarketInsights />
      </div>
    </div>
  );
}

export default App;