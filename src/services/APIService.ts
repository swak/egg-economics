// Dummy data emulating Trading Economics egg price trends (USD/dozen)
const dummyEggPrices = [
  { date: '2024-05-01', price: 3.50 },  // Low starting point
  { date: '2024-06-01', price: 3.80 },
  { date: '2024-07-01', price: 4.20 },
  { date: '2024-08-01', price: 4.50 },
  { date: '2024-09-01', price: 4.80 },
  { date: '2024-10-01', price: 5.10 },
  { date: '2024-11-01', price: 5.40 },
  { date: '2024-12-01', price: 5.70 },
  { date: '2025-01-01', price: 6.20 },  // Gradual rise
  { date: '2025-02-01', price: 7.50 },
  { date: '2025-03-01', price: 8.17 },  // Peak
  { date: '2025-04-01', price: 5.51 },  // Current price as of March 11, 2025
];

export interface EggPrice {
  date: string;
  price: number;
}

export class APIService {
  static async getEggPrices(): Promise<EggPrice[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(dummyEggPrices), 500); // Fake delay
    });
  }

  static async getEggPricesFromAPI(apiKey: string): Promise<EggPrice[]> {
    console.log('API Key:', apiKey, 'Using dummy data until real API is implemented');
    return this.getEggPrices(); // Fallback to dummy data
  }
}