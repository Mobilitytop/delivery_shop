import React from 'react';
import { DeliveryMethodId } from './types';
import { PostTariffRequest } from '../../api/post/models';
import { ApiRequest } from '../../api/cdek/types/api';
type DeliveryOption = {
    id: DeliveryMethodId | string;
    title: string;
    cost: number;
    duration: string;
};
export interface UniversalPackage {
    weight: number;
    length?: number;
    width?: number;
    height?: number;
    declaredValue?: number;
    dimensionType?: 'S' | 'M' | 'L' | 'XL' | 'OVERSIZED';
}
type PostAddress = {
    fromIndex: string;
    toIndex: string;
};
type CdekAddress = {
    fromAddress: string;
    toAddress: string;
};
type CourieristAddress = {
    fromAddress: string;
    toAddress: string;
};
type LPostAddress = {
    fromWarehouseId: number;
    toPickupPointId?: number;
    latitude?: number;
    longitude?: number;
};
type DeliveryAddress = {
    method: DeliveryMethodId.POST;
    data: PostAddress;
} | {
    method: DeliveryMethodId.CDEK_DOOR | DeliveryMethodId.CDEK_POINT;
    data: CdekAddress;
} | {
    method: DeliveryMethodId.COURIERIST;
    data: CourieristAddress;
} | {
    method: DeliveryMethodId.LPOST_COURIER;
    data: LPostAddress;
} | {
    method: DeliveryMethodId.LPOST_POINT;
    data: LPostAddress;
};
type DeliveryWidgetProps = {
    colors?: Colors;
    deliveryMethods: DeliveryAddress[];
    packages: UniversalPackage[];
    postConfig?: {
        accessToken: string;
        basicToken: string;
        request: PostTariffRequest;
    };
    cdekConfig?: {
        account: string;
        password: string;
        url_base: 'https://api.edu.cdek.ru/v2' | 'https://api.cdek.ru/v2';
        request: Omit<ApiRequest.CalculatorByTariff, 'tariff_code' | 'to_location' | 'from_location'> & Partial<Pick<ApiRequest.CalculatorByTariff, 'tariff_code' | 'to_location' | 'from_location'>>;
    };
    courieristConfig?: {
        login: string;
        password: string;
    };
    lpostConfig?: {
        secret: string;
    };
    customOptions?: DeliveryOption[];
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