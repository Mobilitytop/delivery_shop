export type PostPaymentMethod = 'CASHLESS' | 'STAMP' | 'FRANKING' | 'TO_FRANKING' | 'ONLINE_PAYMENT_MARK';
export type PostTariffRequest = {
    'completeness-checking'?: boolean;
    'contents-checking'?: boolean;
    'courier'?: boolean;
    'declared-value'?: number;
    'delivery-point-index'?: string;
    'dimension'?: {
        height?: number;
        length?: number;
        width?: number;
    };
    'dimension-type'?: 'S' | 'M' | 'L' | 'XL' | 'OVERSIZED';
    'entries-type'?: // Категория вложения(Для международных отправлений)
    'GIFT' | 'DOCUMENT' | 'SALE_OF_GOODS' | 'COMMERCIAL_SAMPLE' | 'OTHER';
    'fragile'?: boolean;
    'index-from'?: string;
    'index-to'?: string;
    'inventory'?: boolean;
    'mail-category': 'SIMPLE' | 'ORDERED' | 'ORDINARY' | 'WITH_DECLARED_VALUE' | 'WITH_DECLARED_VALUE_AND_CASH_ON_DELIVERY' | 'WITH_DECLARED_VALUE_AND_COMPULSORY_PAYMENT' | 'WITH_COMPULSORY_PAYMENT' | 'COMBINED_ORDINARY' | 'COMBINED_WITH_DECLARED_VALUE' | 'COMBINED_WITH_DECLARED_VALUE_AND_CASH_ON_DELIVERY';
    'mail-direct'?: number;
    'mail-type': 'POSTAL_PARCEL' | 'ONLINE_PARCEL' | 'ONLINE_COURIER' | 'EMS' | 'EMS_OPTIMAL' | 'EMS_RT' | 'EMS_TENDER' | 'LETTER' | 'LETTER_CLASS_1' | 'BANDEROL' | 'BUSINESS_COURIER' | 'BUSINESS_COURIER_ES' | 'PARCEL_CLASS_1' | 'BANDEROL_CLASS_1' | 'VGPO_CLASS_1' | 'SMALL_PACKET' | 'EASY_RETURN' | 'VSD' | 'ECOM' | 'ECOM_MARKETPLACE' | 'HYPER_CARGO' | 'COMBINED';
    'mass': number;
    'notice-payment-method'?: PostPaymentMethod;
    'payment-method'?: PostPaymentMethod;
    'sms-notice-recipient'?: number;
    'transport-type'?: 'SURFACE' | 'AVIA' | 'COMBINED' | 'EXPRESS' | 'STANDARD';
    'vsd'?: boolean;
    'with-electronic-notice'?: boolean;
    'with-order-of-notice'?: boolean;
    'with-simple-notice'?: boolean;
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
//# sourceMappingURL=models.d.ts.map