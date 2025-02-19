export type PostPaymentMethod =
  | 'CASHLESS'
  | 'STAMP'
  | 'FRANKING'
  | 'TO_FRANKING'
  | 'ONLINE_PAYMENT_MARK';

export type PostTariffRequest = {
  'completeness-checking'?: boolean; // Признак услуги проверки комплектности
  'contents-checking'?: boolean; // Признак услуги проверки вложения
  'courier'?: boolean; // Отметка "Курьер"
  'declared-value'?: number; // Объявленная ценность
  'delivery-point-index'?: string; // Идентификатор пункта выдачи заказов
  'dimension'?: {
    // Линейные размеры
    height?: number; // Линейная высота (сантиметры)
    length?: number; // Линейная длина (сантиметры)
    width?: number; // Линейная ширина (сантиметры)
  };
  'dimension-type'?: 'S' | 'M' | 'L' | 'XL' | 'OVERSIZED'; // Типоразмер
  'entries-type'?: // Категория вложения(Для международных отправлений)
  'GIFT' | 'DOCUMENT' | 'SALE_OF_GOODS' | 'COMMERCIAL_SAMPLE' | 'OTHER';
  'fragile'?: boolean; // Отметка "Осторожно/Хрупко"
  'index-from'?: string; // Почтовый индекс объекта почтовой связи места приема
  'index-to'?: string; // Почтовый индекс объекта почтовой связи места назначения
  'inventory'?: boolean; // Опись вложения
  'mail-category': // Категория РПО
  | 'SIMPLE'
    | 'ORDERED'
    | 'ORDINARY'
    | 'WITH_DECLARED_VALUE'
    | 'WITH_DECLARED_VALUE_AND_CASH_ON_DELIVERY'
    | 'WITH_DECLARED_VALUE_AND_COMPULSORY_PAYMENT'
    | 'WITH_COMPULSORY_PAYMENT'
    | 'COMBINED_ORDINARY'
    | 'COMBINED_WITH_DECLARED_VALUE'
    | 'COMBINED_WITH_DECLARED_VALUE_AND_CASH_ON_DELIVERY';
  'mail-direct'?: number; // Код страны назначения
  'mail-type': // Вид РПО
  | 'POSTAL_PARCEL'
    | 'ONLINE_PARCEL'
    | 'ONLINE_COURIER'
    | 'EMS'
    | 'EMS_OPTIMAL'
    | 'EMS_RT'
    | 'EMS_TENDER'
    | 'LETTER'
    | 'LETTER_CLASS_1'
    | 'BANDEROL'
    | 'BUSINESS_COURIER'
    | 'BUSINESS_COURIER_ES'
    | 'PARCEL_CLASS_1'
    | 'BANDEROL_CLASS_1'
    | 'VGPO_CLASS_1'
    | 'SMALL_PACKET'
    | 'EASY_RETURN'
    | 'VSD'
    | 'ECOM'
    | 'ECOM_MARKETPLACE'
    | 'HYPER_CARGO'
    | 'COMBINED';
  'mass': number; // Масса отправления в граммах
  'notice-payment-method'?: // Способ оплаты уведомления
  PostPaymentMethod;
  'payment-method'?: // Способ оплаты
  PostPaymentMethod;
  'sms-notice-recipient'?: number; // Признак услуги SMS уведомления
  'transport-type'?: 'SURFACE' | 'AVIA' | 'COMBINED' | 'EXPRESS' | 'STANDARD'; // Вид транспортировки
  'vsd'?: boolean;
  'with-electronic-notice'?: boolean; // Отметка 'С электронным уведомлением'
  'with-order-of-notice'?: boolean; // Отметка 'С заказным уведомлением'
  'with-simple-notice'?: boolean; // Отметка 'С простым уведомлением'
};

export type PostTariffResponse = {
  'avia-rate': {
    rate: number;
    vat: number;
  };
  'completeness-checking-rate': {
    rate: number;
    vat: number;
  };
  'delivery-time': {
    'max-days': number;
    'min-days': number;
  };
  'fragile-rate': {
    rate: number;
    vat: number;
  };
  'ground-rate': {
    rate: number;
    vat: number;
  };
  'insurance-rate': {
    rate: number;
    vat: number;
  };
  'notice-payment-method': PostPaymentMethod;
  'notice-rate': {
    rate: number;
    vat: number;
  };
  'oversize-rate': {
    rate: number;
    vat: number;
  };
  'payment-method': PostPaymentMethod;
  'sms-notice-recipient-rate': {
    rate: number;
    vat: number;
  };
  'total-rate': 0;
  'total-vat': 0;
};
