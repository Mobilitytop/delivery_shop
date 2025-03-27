import axios, { AxiosInstance } from 'axios';
import { LoginRequest, LoginResponse, OrderEvaluateRequest, OrderEvaluateResponse } from './types';

const BASE_URL = 'https://my.courierist.com/api/v1';

export class CourieristClient {
  private axiosInstance: AxiosInstance;
  private token: string | undefined;

  constructor(initialToken?: string) {
    this.token = initialToken;
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        ...(initialToken && { Authorization: `Bearer ${initialToken}` }),
      },
    });
  }

  // Метод авторизации, обновляющий токен в клиенте
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.axiosInstance.post<LoginResponse>('/access/login', credentials);
    this.token = response.data.access_token;
    this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${this.token}`;
    return response.data;
  }

  // Метод оценки стоимости заказа
  async evaluateOrder(order: OrderEvaluateRequest): Promise<OrderEvaluateResponse> {
    if (!this.token) {
      throw new Error('Not authenticated. Please log in first.');
    }
    const response = await this.axiosInstance.post<OrderEvaluateResponse>('/order/evaluate', order);
    return response.data;
  }
}