export interface MarketingJobDetailModel {
    JobId?: number;
    JobName?: string;
    JobCode?: string;
    JobDescription?: string;
    Units?: number;
    UnitRate?: number;
    UnitPrice?: number;
    FinalRate?: number;
    FinalPrice?: number;
    TotalPrice?: number;
    Discount?: number;
    DiscountPercent?: any;
    IsInvoiceApproved?: boolean;
    IsApproved?: boolean;
    IsActive?: boolean;
    StartDate?: Date;
    EndDate?: Date;
    JobPhaseId?: number;
    ContractId?: number;
}

export interface PhaseDetailsModel {
JobPhaseId?: number;
JobPhaseName?: string;
}

export interface ContractDetailsModel {
    ContractId?: number;
    ClientName?: string;
    }
