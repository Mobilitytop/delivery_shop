"use strict";

import { EventEmitter } from "./core/eventemitter.js";
import { RestClient } from "./core/restclient.js";
export class Cdek extends EventEmitter {
  constructor(options) {
    super();
    this.rest = new RestClient(options);
  }
  getRegions(params) {
    return this.rest.get({
      url: '/location/regions',
      query: params
    });
  }
  addWebhook(params) {
    return this.rest.post({
      url: '/webhooks',
      payload: params
    });
  }
  getWebhookByUUID(uuid) {
    return this.rest.get({
      url: `/webhooks/${uuid}`
    });
  }
  getWebhooks() {
    return this.rest.get({
      url: '/webhooks'
    });
  }
  deleteWebhookByUUID(uuid) {
    return this.rest.delete({
      url: `/webhooks/${uuid}`
    });
  }
  addOrder(params) {
    return this.rest.post({
      url: '/orders',
      payload: params
    });
  }
  getOrderByUUID(uuid) {
    return this.rest.get({
      url: `/orders/${uuid}`
    });
  }
  getOrderByCdekNumber(cdek_number) {
    return this.rest.get({
      url: '/orders',
      query: {
        cdek_number: cdek_number
      }
    });
  }
  getOrderByImNumber(im_number) {
    return this.rest.get({
      url: '/orders',
      query: {
        im_number: im_number
      }
    });
  }
  updateOrder(params) {
    return this.rest.patch({
      url: '/orders',
      payload: params
    });
  }
  deleteOrderByUUID(uuid) {
    return this.rest.delete({
      url: `/orders/${uuid}`
    });
  }
  addRefusal(order_uuid) {
    return this.rest.post({
      url: `/orders/${order_uuid}/refusal`
    });
  }
  addCourier(params) {
    return this.rest.post({
      url: '/intakes',
      payload: params
    });
  }
  getCourierDetails(uuid) {
    return this.rest.get({
      url: `/intakes/${uuid}`
    });
  }
  deleteCourier(uuid) {
    return this.rest.delete({
      url: `/intakes/${uuid}`
    });
  }
  createOrderReceipt(params) {
    return this.rest.post({
      url: '/print/orders',
      payload: params
    });
  }
  getOrderReceipt(uuid) {
    return this.rest.get({
      url: `/print/orders/${uuid}`
    });
  }
  createBarcodeCP(params) {
    return this.rest.post({
      url: '/print/barcodes',
      payload: params
    });
  }
  getBarcodeCP(uuid) {
    return this.rest.get({
      url: `/print/barcodes/${uuid}`
    });
  }
  addDeliveryAppointment(params) {
    return this.rest.post({
      url: '/delivery',
      payload: params
    });
  }
  getDeliveryAppointment(uuid) {
    return this.rest.get({
      url: `/delivery/${uuid}`
    });
  }
  addPrealert(params) {
    return this.rest.post({
      url: '/prealert',
      payload: params
    });
  }
  getPrealert(uuid) {
    return this.rest.get({
      url: `/delivery/${uuid}`
    });
  }
  getPassportData(params) {
    return this.rest.get({
      url: '/passport',
      query: params
    });
  }
  getCashboxCheck(params) {
    return this.rest.get({
      url: '/check',
      query: params
    });
  }
  getCashOnDeliveryRegistry(params) {
    return this.rest.get({
      url: '/registries',
      query: params
    });
  }
  getCashOnDeliveryTransfer(params) {
    return this.rest.get({
      url: '/payment',
      query: params
    });
  }
  getPickupPoints(params) {
    return this.rest.get({
      url: '/deliverypoints',
      query: params
    });
  }
  getCities(params) {
    return this.rest.get({
      url: '/location/cities',
      query: params
    });
  }
  getSuggestCities(params) {
    return this.rest.get({
      url: '/location/suggest/cities',
      query: params
    });
  }
  calculatorByTariff(params) {
    return this.rest.post({
      url: '/calculator/tariff',
      payload: params
    });
  }
  calculatorByAvaibleTariffs(params) {
    return this.rest.post({
      url: '/calculator/tarifflist',
      payload: params
    });
  }

  /** @deprecated The method seems removed by CDEK without any changelog */
  calculatorCustoms(params) {
    return this.rest.post({
      url: '/ddp',
      payload: params
    });
  }
  getFinishedOrders(params) {
    return this.rest.post({
      url: '/photoDocument',
      payload: params
    });
  }
  createClientReturn(params) {
    return this.rest.post({
      url: `orders/${params.order_uuid}/clientReturn`,
      payload: {
        tariff_code: params.tariff_code
      }
    });
  }

  // force to refresh token
  refreshToken() {
    return this.rest.auth();
  }
}
//# sourceMappingURL=index.js.map