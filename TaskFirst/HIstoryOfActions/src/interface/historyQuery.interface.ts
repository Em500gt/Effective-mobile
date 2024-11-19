export interface HistoryQueryParams {
    shopId?: string;
    plu?: string;
    action?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
}

export interface HistoryQuery {
    shopId: string, 
    plu: string, 
    action_date: string, 
    action: string, 
    details: object
}