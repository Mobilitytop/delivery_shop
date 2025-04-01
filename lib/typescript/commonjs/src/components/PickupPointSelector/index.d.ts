import React from 'react';
import { DeliveryMethodId } from './types';
type PickupPoint = {
    code: string;
    name: string;
    address: string;
    workTime: string;
};
type PickupPointSelectorProps = {
    deliveryMethod: DeliveryMethodId;
    cdekConfig?: {
        account: string;
        password: string;
        url_base: 'https://api.edu.cdek.ru/v2' | 'https://api.cdek.ru/v2';
    };
    toAddress: string;
    toIndex: string | number;
    colors?: Colors;
    onSelect?: (pickupPoint: PickupPoint) => void;
    onError?: (error: Error) => void;
};
type Colors = {
    text?: string;
    background?: string;
    border?: string;
    primary?: string;
    radioBorder?: string;
    radioFill?: string;
};
declare const PickupPointSelector: React.FC<PickupPointSelectorProps>;
export default PickupPointSelector;
//# sourceMappingURL=index.d.ts.map