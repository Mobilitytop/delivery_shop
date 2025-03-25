"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deliveriesData = void 0;
var _types = require("./types.js");
const deliveriesData = exports.deliveriesData = [{
  id: _types.DeliveryMethodId.COURIER,
  title: 'Доставка курьером по Москве внутри МКАД?',
  description: '2 500 руб.'
}, {
  id: _types.DeliveryMethodId.PICKUP,
  title: 'Самовывоз',
  description: 'Бесплатно'
}, {
  id: _types.DeliveryMethodId.CDEK_DOOR,
  title: 'СДЭК-экспресс (Экспресс до двери)'
}, {
  id: _types.DeliveryMethodId.CDEK_POINT,
  title: 'СДЭК-экспресс (Экспресс до пункта выдачи)'
}, {
  id: _types.DeliveryMethodId.POST,
  title: 'Почта России (Доставка в отделение)',
  description: 'Самовывоз из отделения Почты России'
}];
//# sourceMappingURL=data.js.map