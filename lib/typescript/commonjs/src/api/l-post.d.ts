export declare class LPost {
    private baseUrl;
    private token;
    private secret;
    constructor({ secret }: {
        secret: string;
    });
    authenticate(): Promise<void>;
    private ensureAuthenticated;
    getServicesCalc({ fromWarehouseId, toPickupPointId, latitude, longitude, weight, volume, sumPayment, value, options, address }: {
        fromWarehouseId: number;
        toPickupPointId?: number;
        latitude?: number;
        longitude?: number;
        weight: number;
        volume?: number;
        sumPayment: number;
        value: number;
        options?: {
            fitting?: boolean;
            returnDocuments?: boolean;
        };
        address?: string;
    }): Promise<{
        sumCost: number;
        deliveryCost: number;
        servicesCost: number;
        optionsCost: number;
        dayLogistic: number;
        dateClose: string;
        possibleDelivDates?: {
            dateDelive: string;
            intervals: {
                timeFrom: string;
                timeTo: string;
            }[];
        }[];
    }>;
}
//# sourceMappingURL=l-post.d.ts.map