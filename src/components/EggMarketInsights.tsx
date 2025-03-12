import React from 'react';

const EggMarketInsights: React.FC = () => {
  // Mock seasonal trend data (average price per month across years)
  const seasonalTrends = [
    { month: 'Jan', avgPrice: 5.80 },
    { month: 'Feb', avgPrice: 5.90 },
    { month: 'Mar', avgPrice: 6.50 },
    { month: 'Apr', avgPrice: 6.20 },
    { month: 'May', avgPrice: 5.70 },
    { month: 'Jun', avgPrice: 5.50 },
    { month: 'Jul', avgPrice: 5.60 },
    { month: 'Aug', avgPrice: 5.80 },
    { month: 'Sep', avgPrice: 6.00 },
    { month: 'Oct', avgPrice: 6.30 },
    { month: 'Nov', avgPrice: 6.70 },
    { month: 'Dec', avgPrice: 6.90 },
  ];

  return (
    <div className="market-insights">
      <h2>Egg Market Insights</h2>
      <h3>Seasonal Price Trends</h3>
      <ul>
        {seasonalTrends.map((trend, index) => (
          <li key={index}>
            {trend.month}: ${trend.avgPrice.toFixed(2)} (USD/dozen)
          </li>
        ))}
      </ul>
      <h3>Factors Affecting Egg Prices</h3>
      <p>
        <strong>Production Costs:</strong> Feed prices for hens have risen 15% in 2025, driving egg prices up, especially in Q1.
      </p>
    </div>
  );
};

export default EggMarketInsights;