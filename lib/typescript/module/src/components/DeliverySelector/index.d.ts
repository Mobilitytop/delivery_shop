import React from 'react';
import { PostTariffRequest } from '../../api/post/models';
import { ApiRequest } from '../../api/cdek/types/api';
export declare enum DeliveryMethodId {
    POST = "post",
    CDEK_DOOR = "cdek_door",
    CDEK_POINT = "cdek_point",
    CUSTOM = "custom",
    COURIERIST = "courierist",
    LPOST_COURIER = "lpost_courier",// Курьерская доставка
    LPOST_POINT = "lpost_point"
}
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
    unit?: number;
    typeId?: number;
}
type PostAddress = {
    fromIndex: string;
    toIndex: string;
};
type CdekAddress = {
    fromAddress: string;
    toAddress: string;
    fromCoordinates?: {
        longitude: number;
        latitude: number;
    };
    toCoordinates?: {
        longitude: number;
        latitude: number;
    };
};
type CustomAddress = {
    customField: string;
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
    method: DeliveryMethodId.CUSTOM;
    data: CustomAddress;
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
type DeliverySelectorProps = {
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
    onSelect?: (option: DeliveryOption) => void;
    onLoadComplete?: (options: DeliveryOption[]) => void;
    onError?: (error: Error) => void;
    initialSelectedId?: string;
};
type Colors = {
    text?: string;
    background?: string;
    border?: string;
    primary?: string;
    radioBorder?: string;
    radioFill?: string;
};
declare const DeliverySelector: React.FC<DeliverySelectorProps>;
export default DeliverySelector;
//# sourceMappingURL=index.d.ts.map