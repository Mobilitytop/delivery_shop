export declare class Courierist {
    private baseUrl;
    private accessToken;
    private login;
    private password;
    constructor({ login, password }: {
        login: string;
        password: string;
    });
    authenticate(): Promise<void>;
    private ensureAuthenticated;
    evaluateOrder(locations: {
        fromAddress: string;
        toAddress: string;
    }, packages: {
        weight: number;
        length?: number;
        width?: number;
        height?: number;
    }[]): Promise<{
        price: number;
        estimate_at: string;
        delivery_intervals?: any[];
    }>;
}
//# sourceMappingURL=courierist.d.ts.map