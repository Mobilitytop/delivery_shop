import { DeliveryMethodId } from './components/DeliverySelector';
declare const _default: {
    DeliverySelector: import("react").FC<{
        colors?: {
            text?: string;
            background?: string;
            border?: string;
            primary?: string;
            radioBorder?: string;
            radioFill?: string;
        };
        deliveryMethods: ({
            method: DeliveryMethodId.POST;
            data: {
                fromIndex: string;
                toIndex: string;
            };
        } | {
            method: DeliveryMethodId.CDEK_DOOR | DeliveryMethodId.CDEK_POINT;
            data: {
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
        } | {
            method: DeliveryMethodId.CUSTOM;
            data: {
                customField: string;
            };
        } | {
            method: DeliveryMethodId.COURIERIST;
            data: {
                fromAddress: string;
                toAddress: string;
            };
        } | {
            method: DeliveryMethodId.LPOST_COURIER;
            data: {
                fromWarehouseId: number;
                toPickupPointId?: number;
                latitude?: number;
                longitude?: number;
            };
        } | {
            method: DeliveryMethodId.LPOST_POINT;
            data: {
                fromWarehouseId: number;
                toPickupPointId?: number;
                latitude?: number;
                longitude?: number;
            };
        })[];
        packages: import("./components/DeliverySelector").UniversalPackage[];
        postConfig?: {
            accessToken: string;
            basicToken: string;
            request: import("./api/post/models").PostTariffRequest;
        };
        cdekConfig?: {
            account: string;
            password: string;
            url_base: "https://api.edu.cdek.ru/v2" | "https://api.cdek.ru/v2";
            request: Omit<import("./api/cdek/types/api/request").CalculatorByTariff, "tariff_code" | "to_location" | "from_location"> & Partial<Pick<import("./api/cdek/types/api/request").CalculatorByTariff, "tariff_code" | "to_location" | "from_location">>;
        };
        courieristConfig?: {
            login: string;
            password: string;
        };
        lpostConfig?: {
            secret: string;
        };
        customOptions?: {
            id: DeliveryMethodId | string;
            title: string;
            cost: number;
            duration: string;
        }[];
        onSelect?: (option: {
            id: DeliveryMethodId | string;
            title: string;
            cost: number;
            duration: string;
        }) => void;
        onLoadComplete?: (options: {
            id: DeliveryMethodId | string;
            title: string;
            cost: number;
            duration: string;
        }[]) => void;
        onError?: (error: Error) => void;
        initialSelectedId?: string;
    }>;
    DeliveryWidget: import("react").FC<{
        colors?: {
            text?: string;
            background?: string;
            border?: string;
            primary?: string;
        };
        deliveryMethods: ({
            method: import("./components/DeliveryWidget/types").DeliveryMethodId.POST;
            data: {
                fromIndex: string;
                toIndex: string;
            };
        } | {
            method: import("./components/DeliveryWidget/types").DeliveryMethodId.CDEK_DOOR | import("./components/DeliveryWidget/types").DeliveryMethodId.CDEK_POINT;
            data: {
                fromAddress: string;
                toAddress: string;
            };
        } | {
            method: import("./components/DeliveryWidget/types").DeliveryMethodId.COURIERIST;
            data: {
                fromAddress: string;
                toAddress: string;
            };
        } | {
            method: import("./components/DeliveryWidget/types").DeliveryMethodId.LPOST_COURIER;
            data: {
                fromWarehouseId: number;
                toPickupPointId?: number;
                latitude?: number;
                longitude?: number;
            };
        } | {
            method: import("./components/DeliveryWidget/types").DeliveryMethodId.LPOST_POINT;
            data: {
                fromWarehouseId: number;
                toPickupPointId?: number;
                latitude?: number;
                longitude?: number;
            };
        })[];
        packages: import("./components/DeliveryWidget").UniversalPackage[];
        postConfig?: {
            accessToken: string;
            basicToken: string;
            request: import("./api/post/models").PostTariffRequest;
        };
        cdekConfig?: {
            account: string;
            password: string;
            url_base: "https://api.edu.cdek.ru/v2" | "https://api.cdek.ru/v2";
            request: Omit<import("./api/cdek/types/api/request").CalculatorByTariff, "tariff_code" | "to_location" | "from_location"> & Partial<Pick<import("./api/cdek/types/api/request").CalculatorByTariff, "tariff_code" | "to_location" | "from_location">>;
        };
        courieristConfig?: {
            login: string;
            password: string;
        };
        lpostConfig?: {
            secret: string;
        };
        customOptions?: {
            id: import("./components/DeliveryWidget/types").DeliveryMethodId | string;
            title: string;
            cost: number;
            duration: string;
        }[];
    }>;
    DeliveryMethodId: typeof DeliveryMethodId;
};
export default _default;
//# sourceMappingURL=index.d.ts.map