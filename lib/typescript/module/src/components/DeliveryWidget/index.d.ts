import React from 'react';
import { DeliveryMethodId } from './types';
import { PostTariffRequest } from '../../api/post/models';
import { ApiRequest } from '../../api/cdek/types/api';
type DeliveryWidgetProps = {
    colors?: Colors;
    address: string;
    index: string;
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
    customOptions?: DeliveryOption[];
};
type DeliveryOption = {
    id: DeliveryMethodId | string;
    title: string;
    cost: number;
    duration: string;
};
type Colors = {
    text?: string;
    background?: string;
    border?: string;
    primary?: string;
};
declare const DeliveryWidget: React.FC<DeliveryWidgetProps>;
export default DeliveryWidget;
//# sourceMappingURL=index.d.ts.map