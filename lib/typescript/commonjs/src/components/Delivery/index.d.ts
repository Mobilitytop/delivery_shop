import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { DeliveryMethodId, DeliveryMethodStyle } from '../DeliveryMethod/types';
import { DeliveryFormData, DeliveryFormsStyles } from '../DeliveryForms/types';
import { PostTariffRequest } from '../../api/post/models';
import { CurrentDeliveryMethodStyle } from '../CurrentDeliveryMethod/types';
import { ApiRequest } from '../../api/cdek/types/api';
type DeliveryConfig = {
    postConfig: {
        accessToken: string;
        basicToken: string;
        request: PostTariffRequest;
    };
    CDEKConfig: {
        account: string;
        password: string;
        url_base: 'https://api.edu.cdek.ru/v2' | 'https://api.cdek.ru/v2';
        request: Omit<ApiRequest.CalculatorByTariff, 'tariff_code' | 'to_location'> & Partial<Pick<ApiRequest.CalculatorByTariff, 'tariff_code' | 'to_location'>>;
    };
    deliveryMethods?: DeliveryMethodId[];
    styles?: {
        container?: ViewStyle;
        title?: TextStyle;
        deliveryMethod?: DeliveryMethodStyle;
        deliveryForms?: DeliveryFormsStyles;
        currentDeliveryMethod?: CurrentDeliveryMethodStyle;
    };
    onChange?: (data: DeliveryFormData & {
        rate: number;
    } & {
        activeDeliveryMethod: DeliveryMethodId;
    }) => void;
    getData?: (data: DeliveryFormData & {
        rate: number;
    } & {
        activeDeliveryMethod: DeliveryMethodId;
    }) => void;
};
declare const Delivery: React.FC<DeliveryConfig>;
export default Delivery;
//# sourceMappingURL=index.d.ts.map