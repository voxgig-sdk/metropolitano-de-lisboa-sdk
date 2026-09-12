export interface Network {
    history?: Record<string, any>;
    lines?: any[];
    name?: string;
    schedules?: Record<string, any>;
    stations?: any[];
    statistics?: Record<string, any>;
    totalLines?: number;
    totalStations?: number;
}
export interface NetworkLoadMatch {
    historical?: boolean;
    include?: string;
    line?: string;
}
