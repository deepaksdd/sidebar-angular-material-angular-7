
export interface ProjectDetailModel {
    ProjectId?: number;
    ProjectCode?: string;
    ProjectName?: string;
    StartData?: any;
    EndDate?: any;
    ProjectPhaseDetailsId?: number;
    IsProposalComplate?: boolean;
    ProjectDescription?: string;
    IsWin?: boolean;
    IsApproved?: boolean;
    TotalDaysinHours?: string;
    ProjectPhase?: string;
}
export interface ProjectChatModel {
    ProjectId?: any;
    ProjectDescription: string;
    FilePath?: string;
    FileName?: string;
    UserRole?: string;
    CreatedByName?: string;
    CreatedDate?: string;
    room?: string;
}
export interface SectorModel {
    SectorId?: number;
    SectorName?: string;
    SectorCode?: string;
}
export interface ProgramModel {
    ProgramId?: number;
    ProgramName?: string;
    ProgramCode?: string;
}
export interface AreaModel {
    AreaId?: number;
    AreaName?: string;
    AreaCode?: string;
}
export interface ProjectProgramModel {
    ProjectProgramId?: number;
    ProjectId?: number;
    ProgramId?: number;
}
export interface ProjectAreaModel {
    ProjectAreaId?: number;
    ProjectId?: number;
    AreaId?: number;
}
export interface ProjectSectorModel {
    ProjectSectorId?: number;
    ProjectId?: number;
    SectorId?: number;
}
export interface ProvinceModel {
    ProvinceId?: number;
    ProvinceName?: string;

}
export interface ProjectProvinceModel {
    value: number;
    label: string;
}

export interface ProjectOtherDetailModel {
    ProjectOtherDetailId?: number;
    opportunityNo?: string;
    opportunity?: string;
    opportunitydescription?: string;
    ProjectId?: number;
    ProvinceId?: string;
    DistrictID?: number;
    OfficeId?: any;
    StartDate?: any;
    EndDate?: any;
    CurrencyId?: any;
    budget?: string;
    beneficiaryMale?: string;
    beneficiaryFemale?: string;
    projectGoal?: string;
    projectObjective?: string;
    mainActivities?: string;
    DonorId?: any;
    SubmissionDate?: any;
    REOIReceiveDate?: any;
    StrengthConsiderationId?: number;
    GenderConsiderationId?: number;
    GenderRemarks?: string;
    SecurityId?: number;
    SecurityConsiderationId?: string;
    SecurityRemarks?: string;

    ProvinceIdList?: number[];


}
export interface SectorModel {
    SectorId?: number;
    SectorName?: string;
    SectorCode?: string;
}
export interface ProgramModel {
    ProgramId?: number;
    ProgramName?: string;
    ProgramCode?: string;
}
export interface AreaModel {
    AreaId?: number;
    AreaName?: string;
    AreaCode?: string;
}
export interface ProjectProgramModel {
    ProjectProgramId?: number;
    ProjectId?: number;
    ProgramId?: number;
}
export interface ProjectAreaModel {
    ProjectAreaId?: number;
    ProjectId?: number;
    AreaId?: number;
}
export interface ProjectSectorModel {
    ProjectSectorId?: number;
    ProjectId?: number;
    SectorId?: number;
}
export interface ApproveProjectDetailModel {
    ProjectId?: number;
    CommentText: string;
    FileName: string;
    FilePath: string;
    IsApproved: boolean;
}
export interface WinApprovalDetailModel {
    ProjectId?: number;
    CommentText: string;
    FileName: string;
    FilePath: string;
    IsWin: boolean;
}
export interface OfficeModel {
    OfficeId?: number;
    OfficeName?: string;
}
export interface SecurityModel {
    SecurityId?: number;
    SecurityName?: string;
}
export interface strengthModel {
    StrengthConsiderationId?: number;
    StrengthConsiderationName?: string;
}
export interface GenderConsiderationvalueModel {
    GenderConsiderationId?: number;
    GenderConsiderationName?: string;
}
export interface DonorModel {
    DonorId?: number;
    Name?: string;
}
export interface CurrencyModel {
    CurrencyId?: number;
    CurrencyCode?: string;
}
export interface OfficeModel {
    OfficeId?: number;
    OfficeName?: string;
}
export interface SecurityModel {
    SecurityId?: number;
    SecurityName?: string;
}
export interface strengthModel {
    StrengthConsiderationId?: number;
    StrengthConsiderationName?: string;
}
export interface GenderConsiderationvalueModel {
    GenderConsiderationId?: number;
    GenderConsiderationName?: string;
}
export interface DonorModel {
    DonorId?: number;
    Name?: string;
}
export interface CurrencyModel {
    CurrencyId?: number;
    CurrencyCode?: string;
}
export interface ProposalDocModel {
    ProjectId?: number;
     UserId?:number;
  ProposalStartDate?:any;
  ProposalBudget?:any;
  ProposalDueDate?:any;
  ProjectAssignTo?:number;
  IsProposalAccept?:boolean;
  CurrencyId?:any;
}
export interface UserListModel {
    UserID?: number;
    Username?: string;
}


//Critera evaluation form

export interface DonorCEModel {
    ProjectId?: number;
    DonorCEId?: number;
    MethodOfFunding?: any;
    PastFundingExperience?: any;
    ProposalAccepted?: any;
    ProposalExperience?: any;
    Professional?: any;
    FundsOnTime?: any;
    EffectiveCommunication?: any;
    Dispute?: any;
    OtherDeliverable?: any;
    OtherDeliverableType?: any;
    PastWorkingExperience?: any;
    CriticismPerformance?: any;
    TimeManagement?: any;
    MoneyAllocation?: any;
    Accountability?: any;
    DeliverableQuality?: any;
    DonorFinancingHistory?: any;
    ReligiousStanding?: any;
    PoliticalStanding?: any;

}

export interface ProductAndServiceCEModel {
    ProjectId?: number;
    ProductServiceId?: number;
    Women?: any;
    Children?: any;
    Awareness?: any;
    Education?: any;
    DrugAbuses?: any;
    Right?: any;
    Culture?: any;
    Music?: any;
    Documentaries?: any;
    InvestigativeJournalism?: any;
    HealthAndNutrition?: any;
    News?: any;
    SocioPolitiacalDebate?: any;
    Studies?: any;
    Reports?: any;

    CommunityDevelopment?: any;
    Aggriculture?: any;
    DRR?: any;
    ServiceEducation?: any;
    ServiceHealthAndNutrition?: any;

    RadioProduction?: any;
    TVProgram?: any;
    PrintedMedia?: any;
    RoundTable?: any;
    Others?: any;
    OtherActivity?: any;

    TargetBenificaiaryWomen?: any;
    TargetBenificiaryMen?: any;
    TargetBenificiaryAgeGroup?: any;
    TargetBenificiaryaOccupation?: any;
}
export interface EligibilityCEModel {
    EligibilityId?: number;
    ProjectId?: number;
    DonorCriteriaMet?: any;
    EligibilityDealine?: any;
    CoPartnership?: any;

}
export interface FeasibilityCEModel {
    FeasibilityId?: number;
    ProjectId: number;
    CapacityAvailableForProject?: number;
    TrainedStaff?: any;
    ByEquipment?: any;
    ExpandScope?: any;
    GeoGraphicalPresence?: any;

    ThirdPartyContract?: any;
    CostOfCompensationMonth?: any;
    CostOfCompensationMoney?: any;

    AnyInKindComponent?: any;
    UseableByOrganisation?: any;
    FeasibleExpertDeploy?: any;
    FeasibilityExpert?: any;

    EnoughTimeForProject?: any;
    ProjectAllowedBylaw?: any;
    ProjectByLeadership?: any;
    IsProjectPractical?: any;
    PresenceCoverageInProject?: any;
    ProjectInLineWithOrgFocus?: any;
    EnoughTimeToPrepareProposal?: any;

    ProjectRealCost?: any
    IsCostGreaterthenBudget?: any;
    PerCostGreaterthenBudget?: any;
    IsFinancialContribution?: any;
    IsSecurity?: any;
    IsGeographical?: any;
    IsSeasonal?: any;

}

export interface PriorityCEmodel {
    PriorityCriteriaDetailId?: number;
    ProjectId?: number;
    IncreaseEligibility?: any;
    IncreaseReputation?: any;
    ImproveDonorRelationship?: any;
    GoodCause?: any;
    ImprovePerformancecapacity?: any;
    SkillImprove?: any;
    FillingFundingGap?: any;
    NewSoftware?: any;
    NewEquipment?: any;
    CoverageAreaExpansion?: any;
    NewTraining?: any;
    Others?: any;
    ExpansionGoal?: any;
}

export interface FinancialProfitabilityModel {

    FinancialCriteriaDetailId?: number;
    ProjectId?: number;
    ProjectActivities?: any;
    Operational?: any;
    Overhead_Admin?: any;
    Lump_Sum?: any;
    Total?: any;

}
export interface RiskSecurityModel {
    RiskCriteriaDetailId?: number;
    ProjectId?: number;
    Security?: any;
    Staff?: any;
    ProjectAssets?: any;
    Suppliers?: any;
    Beneficiaries?: any;
    OverallOrganization?: any;
    DeliveryFaiLure?: any;
    PrematureSeizure?: any;
    GovernmentConfiscation?: any;
    DesctructionByTerroristActivity?: any;
    Reputation?: any;
    Religious?: any;
    Sectarian?: any;
    Ethinc?: any;
    Social?: any;
    Traditional?: any;
    FocusDivertingrisk?: any;
    Financiallosses?: any;
    Opportunityloss?: any;
    ProjectSelection?: any;
    Probablydelaysinfunding?: any;
    OtherOrganizationalHarms?: any;
    OrganizationalDescription?: any;
}

