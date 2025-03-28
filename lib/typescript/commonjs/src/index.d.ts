declare const _default: {
    Delivery: import("react").FC<{
        postConfig: {
            accessToken: string;
            basicToken: string;
            request: import("./api/post/models").PostTariffRequest;
        };
        CDEKConfig: {
            account: string;
            password: string;
            url_base: "https://api.edu.cdek.ru/v2" | "https://api.cdek.ru/v2";
            request: Omit<import("./api/cdek/types/api/request").CalculatorByTariff, "tariff_code" | "to_location"> & Partial<Pick<import("./api/cdek/types/api/request").CalculatorByTariff, "tariff_code" | "to_location">>;
        };
        deliveryMethods?: import("./components/DeliveryWidget/types").DeliveryMethodId[];
        styles?: {
            container?: import("react-native").ViewStyle;
            title?: import("react-native").TextStyle;
            deliveryMethod?: import("./components/DeliveryWidget/types").DeliveryMethodStyle;
            deliveryForms?: import("./components/DeliveryForms/types").DeliveryFormsStyles;
            currentDeliveryMethod?: import("./components/CurrentDeliveryMethod/types").CurrentDeliveryMethodStyle;
        };
        onChange?: (data: import("./components/DeliveryForms/types").DeliveryFormData & {
            rate: number;
        } & {
            activeDeliveryMethod: import("./components/DeliveryWidget/types").DeliveryMethodId;
        }) => void;
        getData?: (data: import("./components/DeliveryForms/types").DeliveryFormData & {
            rate: number;
        } & {
            activeDeliveryMethod: import("./components/DeliveryWidget/types").DeliveryMethodId;
        }) => void;
    }>;
    DeliveryWidget: import("react").FC<{
        colors?: {
            text?: string;
            background?: string;
            border?: string;
            primary?: string;
        };
        address: string;
        index: string;
        postConfig: {
            accessToken: string;
            basicToken: string;
            request: import("./api/post/models").PostTariffRequest;
        };
        CDEKConfig: {
            account: string;
            password: string;
            url_base: "https://api.edu.cdek.ru/v2" | "https://api.cdek.ru/v2";
            request: Omit<import("./api/cdek/types/api/request").CalculatorByTariff, "tariff_code" | "to_location"> & Partial<Pick<import("./api/cdek/types/api/request").CalculatorByTariff, "tariff_code" | "to_location">>;
        };
        customOptions?: {
            id: import("./components/DeliveryWidget/types").DeliveryMethodId | string;
            title: string;
            cost: number;
            duration: string;
        }[];
    }>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map