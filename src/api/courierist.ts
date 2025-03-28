// src/api/courierist.ts

export class Courierist {
    private baseUrl: string = 'https://my.courierist.com/api/v1';
    private accessToken: string | null = null;
    private login: string;
    private password: string;
  
    constructor({ login, password }: { login: string; password: string }) {
      this.login = login;
      this.password = password;
    }
  
    // Авторизация
    async authenticate(): Promise<void> {
      const response = await fetch(`${this.baseUrl}/access/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: this.login,
          password: this.password,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`);
      }
  
      const data = await response.json();
      this.accessToken = data.access_token;
    }
  
    // Проверка авторизации
    private ensureAuthenticated(): void {
      if (!this.accessToken) {
        throw new Error('Not authenticated. Please call authenticate() first.');
      }
    }
  
    // Расчет стоимости доставки
    async evaluateOrder(
      locations: { fromAddress: string; toAddress: string },
      packages: { weight: number; length?: number; width?: number; height?: number }[]
    ): Promise<{ price: number; estimate_at: string; delivery_intervals?: any[] }> {
      this.ensureAuthenticated();
  
      const requestBody = {
        locations: [
          { address: locations.fromAddress },
          { address: locations.toAddress },
        ],
        shipment: packages.map((pkg) => ({
          weight: pkg.weight / 1000, // Переводим граммы в кг
          length: (pkg.length || 0) + (pkg.width || 0) + (pkg.height || 0), // Суммарные габариты
          unit: 1, // Одна единица груза
        })),
      };
  
      const response = await fetch(`${this.baseUrl}/order/evaluate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`Order evaluation failed: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.order; // Возвращаем объект { price, estimate_at, delivery_intervals }
    }
  }