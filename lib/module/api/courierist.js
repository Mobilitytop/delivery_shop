"use strict";

// src/api/courierist.ts

export class Courierist {
  baseUrl = 'https://my.courierist.com/api/v1';
  accessToken = null;
  constructor({
    login,
    password
  }) {
    this.login = login;
    this.password = password;
  }

  // Авторизация
  async authenticate() {
    const response = await fetch(`${this.baseUrl}/access/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: this.login,
        password: this.password
      })
    });
    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.statusText}`);
    }
    const data = await response.json();
    this.accessToken = data.access_token;
  }

  // Проверка авторизации
  ensureAuthenticated() {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Please call authenticate() first.');
    }
  }

  // Расчет стоимости доставки
  async evaluateOrder(locations, packages) {
    this.ensureAuthenticated();
    const requestBody = {
      locations: [{
        address: locations.fromAddress
      }, {
        address: locations.toAddress
      }],
      shipment: packages.map(pkg => ({
        weight: pkg.weight / 1000,
        // Переводим граммы в кг
        length: (pkg.length || 0) + (pkg.width || 0) + (pkg.height || 0),
        // Суммарные габариты
        unit: 1 // Одна единица груза
      }))
    };
    const response = await fetch(`${this.baseUrl}/order/evaluate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    if (!response.ok) {
      throw new Error(`Order evaluation failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data.order; // Возвращаем объект { price, estimate_at, delivery_intervals }
  }
}
//# sourceMappingURL=courierist.js.map