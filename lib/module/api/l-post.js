"use strict";

export class LPost {
  baseUrl = 'https://api.l-post.ru/';
  token = false;
  constructor({
    secret
  }) {
    this.secret = secret;
  }

  // Авторизация
  async authenticate() {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `method=Auth&secret=${encodeURIComponent(this.secret)}`
    });
    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.errorMessage) {
      throw new Error(data.errorMessage);
    }
    this.token = data.token;
  }

  // Проверка авторизации
  ensureAuthenticated() {
    if (!this.token) {
      throw new Error('Not authenticated. Please call authenticate() first.');
    }
  }

  // Расчет стоимости и срока доставки
  async getServicesCalc({
    fromWarehouseId,
    toPickupPointId,
    latitude,
    longitude,
    weight,
    volume,
    sumPayment,
    value,
    options = {},
    address
  }) {
    this.ensureAuthenticated();
    const requestBody = {
      ID_Sklad: fromWarehouseId,
      ...(toPickupPointId ? {
        ID_PickupPoint: toPickupPointId
      } : {}),
      ...(latitude && longitude ? {
        Latitude: latitude,
        Longitude: longitude
      } : {}),
      Weight: weight,
      // в граммах
      ...(volume ? {
        Volume: volume
      } : {}),
      // в куб. см
      SumPayment: sumPayment,
      Value: value,
      ...(address ? {
        Address: address
      } : {}),
      Options: {
        ...(options.fitting ? {
          Fitting: options.fitting ? 1 : 0
        } : {}),
        ...(options.returnDocuments ? {
          ReturnDocuments: options.returnDocuments ? 1 : 0
        } : {})
      }
    };
    console.log(requestBody);
    const url = `${this.baseUrl}?method=GetServicesCalc&token=${encodeURIComponent(this.token)}&ver=1&json=${encodeURIComponent(JSON.stringify(requestBody))}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Cache-Control': 'no-cache'
      }
    });
    if (!response.ok) {
      throw new Error(`Service calculation failed: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    if (data.Message) {
      throw new Error(data.Message);
    }
    const result = JSON.parse(data.JSON_TXT)?.JSON_TXT[0];
    console.log(result);
    return {
      sumCost: result?.SumCost,
      deliveryCost: result?.DeliveryCost,
      servicesCost: result?.ServicesCost,
      optionsCost: result?.OptionsCost,
      dayLogistic: result?.DayLogistic,
      dateClose: result?.DateClose,
      ...(result?.PossibleDelivDates ? {
        possibleDelivDates: result?.PossibleDelivDates
      } : {})
    };
  }
}
//# sourceMappingURL=l-post.js.map