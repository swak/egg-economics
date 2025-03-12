// Mock data simulating monthly egg prices (USD/dozen)
const mockEggPrices = [
    { date: '2025-01-01', price: 5.51 },
    { date: '2025-02-01', price: 6.20 },
    { date: '2025-03-01', price: 8.17 }, // Peak price
    { date: '2025-04-01', price: 6.68 }, // Current trend
  ];
  
  // Simple type for egg price data
  export interface EggPrice {
    date: string;
    price: number;
  }
  
  export class APIService {
    // Mock data fetch (simulates an API call)
    static async getEggPrices(): Promise<EggPrice[]> {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockEggPrices), 500); // Fake delay
      });
    }
  
    // Placeholder for real API integration
    static async getEggPricesFromAPI(apiKey: string): Promise<EggPrice[]> {
      // TODO: Integrate Trading Economics API
      // Example: fetch(`https://api.tradingeconomics.com/markets/commodities?symbols=eggs&c=${apiKey}`)
      console.log('API Key:', apiKey, 'Using mock data until real API is implemented');
      return this.getEggPrices(); // Fallback to mock data
    }
  }