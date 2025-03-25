import { EventEmitter } from './core/eventemitter';
import type { ApiRequest, ApiResponse, ApiWebhook } from './types/api';
import type { InitOptions } from './types/lib';
export declare class Cdek extends EventEmitter<ApiWebhook.EventMap> {
    private rest;
    constructor(options: InitOptions);
    getRegions(params?: ApiRequest.GetRegions): Promise<ApiResponse.GetRegions[]>;
    addWebhook(params?: ApiRequest.AddWebhook): Promise<ApiResponse.AddWebhook>;
    getWebhookByUUID(uuid: string): Promise<ApiResponse.GetWebhook>;
    getWebhooks(): Promise<ApiResponse.GetWebhooks>;
    deleteWebhookByUUID(uuid: string): Promise<ApiResponse.DeleteWebhook>;
    addOrder(params: ApiRequest.AddOrder): Promise<ApiResponse.AddOrder>;
    getOrderByUUID(uuid: string): Promise<ApiResponse.GetOrder>;
    getOrderByCdekNumber(cdek_number: number): Promise<ApiResponse.GetOrder>;
    getOrderByImNumber(im_number: number): Promise<ApiResponse.GetOrder>;
    updateOrder(params: ApiRequest.UpdateOrder): Promise<ApiResponse.UpdateOrder>;
    deleteOrderByUUID(uuid: string): Promise<ApiResponse.DeleteOrder>;
    addRefusal(order_uuid: string): Promise<ApiResponse.AddRefusal>;
    addCourier(params: ApiRequest.AddCourier): Promise<ApiResponse.AddCourier>;
    getCourierDetails(uuid: string): Promise<ApiResponse.GetCourierDetails>;
    deleteCourier(uuid: string): Promise<ApiResponse.DeleteCourier>;
    createOrderReceipt(params: ApiRequest.CreateOrderReceipt): Promise<ApiResponse.CreateOrderReceipt>;
    getOrderReceipt(uuid: string): Promise<ApiResponse.GetOrderReceipt>;
    createBarcodeCP(params: ApiRequest.CreateBarcodeCP): Promise<ApiResponse.CreateBarcodeCP>;
    getBarcodeCP(uuid: string): Promise<ApiResponse.GetBarcodeCP>;
    addDeliveryAppointment(params: ApiRequest.AddDeliveryAppointment): Promise<ApiResponse.AddDeliveryAppointment>;
    getDeliveryAppointment(uuid: string): Promise<ApiResponse.GetDeliveryAppointment>;
    addPrealert(params: ApiRequest.AddPrealert): Promise<ApiResponse.AddPrealert>;
    getPrealert(uuid: string): Promise<ApiResponse.GetPrealert>;
    getPassportData(params: ApiRequest.GetPassportData): Promise<ApiResponse.GetPassportData>;
    getCashboxCheck(params: ApiRequest.GetCashboxCheck): Promise<ApiResponse.GetCashboxCheck>;
    getCashOnDeliveryRegistry(params: ApiRequest.GetCashOnDeliveryRegistry): Promise<ApiResponse.GetCashOnDeliveryRegistry>;
    getCashOnDeliveryTransfer(params: ApiRequest.GetCashOnDeliveryTransfer): Promise<ApiResponse.GetCashOnDeliveryTransfer>;
    getPickupPoints(params?: ApiRequest.GetPickupPoints): Promise<ApiResponse.GetPickupPoints[]>;
    getCities(params?: ApiRequest.GetCities): Promise<ApiResponse.GetCities[]>;
    getSuggestCities(params?: ApiRequest.GetSuggestCities): Promise<ApiResponse.GetSuggestCities[]>;
    calculatorByTariff(params: ApiRequest.CalculatorByTariff): Promise<ApiResponse.CalculatorByTariff>;
    calculatorByAvaibleTariffs(params: ApiRequest.CalculatorByAvaibleTariffs): Promise<ApiResponse.CalculatorByAvaibleTariffs>;
    /** @deprecated The method seems removed by CDEK without any changelog */
    calculatorCustoms(params: ApiRequest.CalculatorCustoms): Promise<ApiResponse.CalculatorCustoms>;
    getFinishedOrders(params: ApiRequest.GetFinishedOrders): Promise<ApiResponse.GetFinishedOrders>;
    createClientReturn(params: ApiRequest.CreateClientReturn): Promise<ApiResponse.CreateClientReturn>;
    refreshToken(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map