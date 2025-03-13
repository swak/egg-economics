import React from 'react';

const EggMarketInsights: React.FC = () => {
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
      <div className="trends-list">
        {seasonalTrends.map((trend, index) => (
          <div key={index} className="trend-item">
            {trend.month}: ${trend.avgPrice.toFixed(2)} (USD/dozen)
          </div>
        ))}
      </div>
      <h3>Factors Affecting Egg Prices</h3>
      <div className="factors-list">
        <p>
          <strong>Production Costs:</strong> Feed prices for hens have risen 15% in 2025, driving egg prices up, especially in Q1.
        </p>
        <p>
          <strong>Weather Impacts:</strong> Extreme weather events, like the Midwest floods in early 2025, disrupted supply chains, reducing egg production and increasing prices.
        </p>
        <p>
          <strong>Avian Flu Outbreaks:</strong> An avian flu outbreak in late 2024 culled millions of hens, leading to a 10% drop in egg supply and higher prices in early 2025.
        </p>
        <p>
          <strong>Consumer Demand:</strong> Increased demand during holiday seasons (e.g., Easter and Christmas) often pushes prices up due to higher consumption.
        </p>
      </div>
    </div>
  );
};

export default EggMarketInsights;