import React from 'react';
import './App.css';
import EggPriceChart from './components/EggPriceChart';
import PricePredictionGame from './components/PricePredictionGame';
import EggMarketInsights from './components/EggMarketInsights';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Egg-onomics v.1</h1>
        <p>Track Egg Prices & Predict Trends</p>
      </header>
      <div className="container">
        <div className="content-wrapper">
          <div className="main-content">
            <div className="card">
              <EggPriceChart />
            </div>
            <div className="card">
              <PricePredictionGame />
            </div>
          </div>
          <div className="sidebar">
            <div className="card">
              <EggMarketInsights />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;