// Типы для авторизации
export interface LoginRequest {
    login: string;
    password: string;
  }
  
  export interface LoginResponse {
    access_token: string;
  }
  
  // Типы для оценки стоимости заказа
  export interface Location {
    address: string;
    latitude?: number;
    longitude?: number;
    delivery_date?: string; // 'YYYY-MM-DD'
    delivery_from?: string; // 'HH:MM'
    delivery_to?: string; // 'HH:MM'
    assignments?: Assignment[];
  }
  
  export interface Shipment {
    price: number;
    weight: number;
    length: number;
    value: number;
    unit?: number;
    type_id?: number;
  }
  
  export interface Assignment {
    price: number;
    type?: number; // 1 - наложенный платеж, 2 - расход
  }
  
  export interface OrderEvaluateRequest {
    locations: [Location, Location]; // Массив из двух адресов: забор и доставка
    shipment: Shipment[];
  }
  
  export interface DeliveryInterval {
    deliveryDate: string;
    timeFrom: string;
    timeTo: string;
  }
  
  export interface OrderEvaluateResponse {
    order: {
      price: number;
      estimate_at: string; // 'YYYY-MM-DD'
      delivery_intervals?: DeliveryInterval[];
    };
  }