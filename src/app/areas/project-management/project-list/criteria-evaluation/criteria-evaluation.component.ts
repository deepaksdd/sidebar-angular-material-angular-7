import { Component, OnInit, Inject, Input } from '@angular/core';
import { criteriaEvaluationScores } from '../../../../shared/enum';
import { DonorCEModel, EligibilityCEModel, FeasibilityCEModel, PriorityCEmodel, FinancialProfitabilityModel, RiskSecurityModel, ProductAndServiceCEModel } from '../project-details/models/project-details.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';
import { debug } from 'util';
import { CriteriaEvaluationService } from '../service/criteria-evaluation.service';
import { GLOBAL } from 'src/app/shared/global';
import { AppUrlService } from 'src/app/shared/services/app-url.service';

@Component({
  selector: 'app-criteria-evaluation',
  templateUrl: './criteria-evaluation.component.html',
  styleUrls: ['./criteria-evaluation.component.scss']
})


export class CriteriaEvaluationComponent implements OnInit {

  //#region "Variables"
  methodOfFundingList = [
    { Id: 1, Name: "Sole" },
    { Id: 2, Name: "Source/Co-finance" }
  ];

  financialHistory = [
    { Id: 1, Name: "Good" },
    { Id: 2, Name: "Neutral" },
    { Id: 3, Name: "Bad" }
  ];

  sectorAndThemes = [
    {
      Id: 1, Name: "Products"
    },
    { Id: 2, Name: "Services" }

  ]
  isDisabledCriticism: boolean;
  isDisabledEligibilityCriteria = false;
  isDisabledCompensation = false;
  isDisabledAnyInKindComponent = true;
  isDisabledTotal = true;
  isDisabledRisk = true;
  isDisabledReputation = true;
  isDisabledDelivery = true;

  donorCEForm: DonorCEModel;
  eligibilityForm: EligibilityCEModel;
  feasibilityForm: FeasibilityCEModel;
  priorityForm: PriorityCEmodel;
  financialForm: FinancialProfitabilityModel;
  riskForm: RiskSecurityModel;
  productAndServiceForm: ProductAndServiceCEModel;

  ProjectId: any;


  //#region  Initilize model

  initDonorCEModel() {
    this.donorCEForm = {
      ProjectId: null,
      DonorCEId: null,
      MethodOfFunding: null,
      PastFundingExperience: null,
      ProposalAccepted: null,
      ProposalExperience: null,
      Professional: null,
      FundsOnTime: null,
      EffectiveCommunication: null,
      Dispute: null,
      OtherDeliverable: null,
      OtherDeliverableType: null,
      PastWorkingExperience: null,
      CriticismPerformance: null,
      TimeManagement: null,
      MoneyAllocation: null,
      Accountability: null,
      DeliverableQuality: null,
      DonorFinancingHistory: null,
      ReligiousStanding: null,
      PoliticalStanding: null,

    }
  }


  initProductAndServiceModel() {
    this.productAndServiceForm = {
      ProjectId: null,
      ProductServiceId: null,
      Women: null,
      Children: null,
      Awareness: null,
      Education: null,
      DrugAbuses: null,
      Right: null,
      Culture: null,
      Music: null,
      Documentaries: null,
      InvestigativeJournalism: null,
      HealthAndNutrition: null,
      News: null,
      SocioPolitiacalDebate: null,
      Studies: null,
      Reports: null,
      CommunityDevelopment: null,
      Aggriculture: null,
      DRR: null,
      ServiceEducation: null,
      ServiceHealthAndNutrition: null,
      RadioProduction: null,
      TVProgram: null,
      PrintedMedia: null,
      RoundTable: null,
      Others: null,
      OtherActivity: null,
      TargetBenificaiaryWomen: null,
      TargetBenificiaryMen: null,
      TargetBenificiaryAgeGroup: null,
      TargetBenificiaryaOccupation: null,
    }

  }

  initEligibilityModel() {
    this.eligibilityForm = {
      EligibilityId: 0,
      ProjectId: null,
      DonorCriteriaMet: null,
      EligibilityDealine: null,
      CoPartnership: null,
    }
  }

  initFeasibilityModel() {
    this.feasibilityForm = {
      FeasibilityId: 0,
      ProjectId: null,
      CapacityAvailableForProject: null,
      TrainedStaff: null,
      ByEquipment: null,
      ExpandScope: null,
      GeoGraphicalPresence: null,

      ThirdPartyContract: null,
      CostOfCompensationMonth: null,
      CostOfCompensationMoney: null,

      AnyInKindComponent: null,
      UseableByOrganisation: null,
      FeasibleExpertDeploy: null,
      FeasibilityExpert: null,

      EnoughTimeForProject: null,
      ProjectAllowedBylaw: null,
      ProjectByLeadership: null,
      IsProjectPractical: null,
      PresenceCoverageInProject: null,
      ProjectInLineWithOrgFocus: null,
      EnoughTimeToPrepareProposal: null,
    }
  }

  initPriorityModel() {
    this.priorityForm = {
      PriorityCriteriaDetailId: null,
      ProjectId: null,
      IncreaseEligibility: null,
      IncreaseReputation: null,
      ImproveDonorRelationship: null,
      GoodCause: null,
      ImprovePerformancecapacity: null,
      SkillImprove: null,
      FillingFundingGap: null,
      NewSoftware: null,
      NewEquipment: null,
      CoverageAreaExpansion: null,
      NewTraining: null,
      ExpansionGoal: null,
    }

  }

  initFinancialProfitabilityModel() {
    this.financialForm = {
      FinancialCriteriaDetailId: null,
      ProjectId: null,
      ProjectActivities: null,
      Operational: null,
      Overhead_Admin: null,
      Lump_Sum: null,
      Total: null,
    }

  }

  initRiskModel() {
    this.riskForm = {
      RiskCriteriaDetailId: null,
      ProjectId: null,
      Security: null,
      Staff: null,
      ProjectAssets: null,
      Suppliers: null,
      Beneficiaries: null,
      OverallOrganization: null,
      DeliveryFaiLure: null,
      PrematureSeizure: null,
      GovernmentConfiscation: null,
      DesctructionByTerroristActivity: null,
      Reputation: null,
      Religious: null,
      Sectarian: null,
      Ethinc: null,
      Social: null,
      Traditional: null,
      FocusDivertingrisk: null,
      Financiallosses: null,
      Opportunityloss: null,
      ProjectSelection: null,
      Probablydelaysinfunding: null,
      OtherOrganizationalHarms: null,
      OrganizationalDescription: null,
    }
  }

  //#endregion

  //#region //Count values
  criteriaEvaluationTotal = 0;
  methodOfFunding = 0;
  pastFundingExperience = 0;
  proposaAccept = 0;
  proposalExperiemce = "";
  professional = 0;
  fundsOnTime = 0;
  effectiveCommunication = 0;
  disputes = 0;
  otherDeliverables = 0;
  pastWorkExperience = 0;
  criticismPerformance = 0;
  criticismTimeManagement = 0;
  criticismMoneyAllocation = 0;
  criticismAccountability = 0;
  criticismDeliverableQuality = 0;

  donorFinancialHistory = 0;
  donorReligiousStanding = 0;
  donorPoliticalStanding = 0;

  prodSelectWomen = 0;
  prodSelectChildren = 0;
  prodAwareness = 0;
  prodProdAwareness = 0;
  prodProdEducation = 0;
  prodDrugAbuse = 0;
  prodRights = 0;
  prodCulture = 0;
  prodMusic = 0;
  prodDocumentaries = 0;
  prodJournalism = 0;
  prodProdHealthNutrition = 0;
  prodProdNews = 0;
  prodSocioPolitical = 0;
  prodStudies = 0;
  prodReports = 0;

  // service
  serviCommunity = 0;
  serviAggriculture = 0;
  serviDRR = 0;
  serviEducation = 0;
  servihealthNutrition = 0;
  //#endregion

  //#region  activity variable
  activityRadio = 0;
  activityTVprogram = 0;
  activityPrintedMedia = 0;
  activityRoundTable = 0;
  activityOtherChangee = 0;
  //#endregion

  //#region  Donor eligibility creteia variables
  onDonorELegibilityCrteria = 0;
  donorEligibilityDeadline = 0;
  donorEligibilityPartnership = 0;
  //#endregion

  //#region  feasibilty variable
  capacityAvailabilityProject = 0;
  compensationTrainStaff = 0;
  compensationByEquipment = 0;
  compensationExpandScope = 0;
  compensationGeographical = 0;
  allowedthirdParty = 0;
  //#endregion

  //#region  any in kind component
  anyInKindComponent = 0;
  useableByOrganisation = 0;
  fesibilityExpertDeployed = 0;
  fesibilityExpert = 0;
  //#endregion

  //#region  feasibility right div
  enoughTimeQuality = 0;
  projectallowedByLaw = 0;
  projectAllowedByOrganisation = 0;
  isProjectPractical = 0;
  presenceCoverageinProject = 0;
  projectInLineOrganisational = 0;
  eNoughTimetoPrepare = 0;
  //#endregion

  //#region fessibility Cost efficiency
  costGreaterThanBudget = 0;
  financialContribution = 0;
  disablingSecurity = 0;
  disablingGeographicalCondition = 0;
  disablingSeasonalCondition = 0;

  //#endregion

  //#region Priority added value variables
  priorityIncresedEligibility = 0;
  priorityIncresedReputation = 0;
  priorityIncresedDonorRelation = 0;
  priorityGoodCause = 0;
  priorityImprovedPerformance = 0;
  priorityImprovedSkill = 0;
  priorityFillingFundingGap = 0;
  priorityNewSoftware = 0;
  priorityNewEquipment = 0;
  priorityCoverageAreaExp = 0;
  priorityNewTraining = 0;
  priorityOthers = 0;
  projectExpensionGoal = 0;


  //#endregion

  //#region financial Profitability form

  //#region Risk Security form
  riskSecurity = 0;

  riskReputation = 0;
  focusDivertingRisk = 0;
  deliveryFailure = 0;
  financialLoses = 0;
  opportunityLoses = 0;
  opportunityDelay = 0;


  //#endregion

  //#endregion

  //#region Flag

  //flags variables Feasibility
  capacityAvailableProject: boolean;
  isDisabled: boolean;
  projectactivity = 0;
  operational = 0;
  admin = 0;
  lump = 0;
  totalScore: any;
  //#endregion

  //#region Input/Output
  @Input() projectId: number
  //#endregion

  constructor(
    private appurl: AppUrlService,
    public criteriaEvalService: CriteriaEvaluationService) { }

  ngOnInit() {
    this.initDonorCEModel();
    this.ProjectId = this.projectId;
    this.initEligibilityModel();
    this.initFeasibilityModel();
    this.initPriorityModel();
    this.initFinancialProfitabilityModel();
    this.initRiskModel();
    this.initProductAndServiceModel();
    this.GetCriteraiEvaluationDetailById(this.ProjectId);

  }

  //#region DonorForm section
  onMethofOfFundingChange(value) {
    debugger;
    console.log(value);
    if (value == 1) {
      this.methodOfFunding = criteriaEvaluationScores.methodOfFunding_Sole
    } else {
      this.methodOfFunding = criteriaEvaluationScores.methodOfFunding_Source

    }
    let donorCEForm: DonorCEModel = {
      ProjectId: this.ProjectId,
      DonorCEId: this.donorCEForm.DonorCEId
    }
    this.donorCEForm.MethodOfFunding = value;
    this.AddEditDonorCEForm(this.donorCEForm);
  }

  //  DonorForm section
  onPastFundingExperienceChange(value) {
    debugger;
    console.log(value);
    if (value.checked === true) {
      this.isDisabled = false;
      this.pastFundingExperience = criteriaEvaluationScores.pastFundingExperience_Yes
    } else {
      this.isDisabled = true;
      this.pastFundingExperience = criteriaEvaluationScores.pastFundingExperience_No
      this.donorCEForm.ProposalAccepted = false;
      this.donorCEForm.ProposalExperience = false;
      this.donorCEForm.Professional = false;
      this.donorCEForm.FundsOnTime = false;
      this.donorCEForm.EffectiveCommunication = false;
      this.donorCEForm.Dispute = false;
      this.donorCEForm.OtherDeliverable = false;
      this.donorCEForm.OtherDeliverableType = false;
      this.donorCEForm.ProjectId = this.ProjectId;
      this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
      this.proposaAccept = 0;
      this.professional = 0;
      this.fundsOnTime = 0;
      this.effectiveCommunication = 0;
      this.disputes = 0;
      this.otherDeliverables = 0;
    }
    this.donorCEForm.PastFundingExperience = value.checked;
    this.AddEditDonorCEForm(this.donorCEForm);
  }

  onProposalAcceptChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.proposaAccept = criteriaEvaluationScores.proposalExp_Disputes_Yes
    } else {
      this.proposaAccept = criteriaEvaluationScores.proposalExp_Disputes_No
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.ProposalAccepted = value.checked;
    this.AddEditDonorCEForm(this.donorCEForm);
  }
  onProposalExperiemceChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.proposalExperiemce = criteriaEvaluationScores.pre_ProposalExperience
    } else {
      this.proposalExperiemce = criteriaEvaluationScores.post_ProposalExperience
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.ProposalExperience = value.checked;
    this.AddEditDonorCEForm(this.donorCEForm);
  }

  onProfessionalChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.professional = criteriaEvaluationScores.proposalExp_Professional_Yes
    } else {
      this.professional = criteriaEvaluationScores.proposalExp_Professional_No
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.Professional = value.checked;
    this.AddEditDonorCEForm(this.donorCEForm);
  }

  onFundsOnTimeChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.fundsOnTime = criteriaEvaluationScores.proposalExp_FundsOnTime_Yes
    } else {
      this.fundsOnTime = criteriaEvaluationScores.proposalExp_Professional_No
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.FundsOnTime = value.checked;
    this.AddEditDonorCEForm(this.donorCEForm);
  }
  onEffectiveCommunicationChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.effectiveCommunication = criteriaEvaluationScores.proposalExp_EffectiveCommunication_Yes
    } else {
      this.effectiveCommunication = criteriaEvaluationScores.proposalExp_EffectiveCommunication_No
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.EffectiveCommunication = value.checked;
    this.AddEditDonorCEForm(this.donorCEForm);
  }
  onDisputesChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.disputes = criteriaEvaluationScores.proposalExp_EffectiveCommunication_Yes
    } else {
      this.disputes = criteriaEvaluationScores.proposalExp_EffectiveCommunication_No
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.Dispute = value.checked;
    this.AddEditDonorCEForm(this.donorCEForm);
  }

  onOtherDeliverablesChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.otherDeliverables = criteriaEvaluationScores.proposalExp_OtherDeliverable_Yes
    } else {
      this.otherDeliverables = criteriaEvaluationScores.proposalExp_OtherDeliverable_No
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.OtherDeliverable = value.checked;
    this.AddEditDonorCEForm(this.donorCEForm);
  }

  onOtherTypeDeliverablesChange(ev, data: any) {
    debugger
    console.log(data);
    if (ev = "OtherDeliverableType") {
      if (data != null) {
        this.donorCEForm.OtherDeliverableType = data;
      } else {
      }
    }
    this.AddEditDonorCEForm(this.donorCEForm);
  }

  onPastWorkExperienceChange(value) {
    console.log(value);

    if (value.checked === true) {
      this.isDisabledCriticism = false;
      this.pastWorkExperience = criteriaEvaluationScores.pastWorkExperoence_Yes
    } else {
      this.isDisabledCriticism = true;
      this.pastWorkExperience = criteriaEvaluationScores.pastWorkExperoence_No
      this.donorCEForm.CriticismPerformance = false;
      this.donorCEForm.TimeManagement = false;
      this.donorCEForm.MoneyAllocation = false;
      this.donorCEForm.Accountability = false;
      this.donorCEForm.DeliverableQuality = false;
      this.criticismPerformance = 0;
      this.criticismTimeManagement = 0;
      this.criticismMoneyAllocation = 0;
      this.criticismAccountability = 0;
      this.criticismDeliverableQuality = 0;
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.PastWorkingExperience = value.checked;
    this.AddEditDonorCEForm(this.donorCEForm);
  }

  onPerformanceChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.criticismPerformance = criteriaEvaluationScores.pastCriticismPerfomance_Yes
    } else {
      this.criticismPerformance = criteriaEvaluationScores.pastCriticismPerfomance_No
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.CriticismPerformance = value.checked;
    this.AddEditDonorCEForm(this.donorCEForm);
  }

  onTimeManagementChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.criticismTimeManagement = criteriaEvaluationScores.pastCriticismTimeManagement_Yes
    } else {
      this.criticismTimeManagement = criteriaEvaluationScores.pastCriticismTimeManagement_No
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.TimeManagement = value.checked;
    this.AddEditDonorCEForm(this.donorCEForm);
  }

  onMoneyAllocationChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.criticismMoneyAllocation = criteriaEvaluationScores.pastCriticismMoneyAllocation_Yes
    } else {
      this.criticismMoneyAllocation = criteriaEvaluationScores.pastCriticismMoneyAllocation_No
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.MoneyAllocation = value.checked;
    this.AddEditDonorCEForm(this.donorCEForm);
  }

  onAccountabilityChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.criticismAccountability = criteriaEvaluationScores.pastCriticismAccountability_Yes
    } else {
      this.criticismAccountability = criteriaEvaluationScores.pastCriticismAccountability_No
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.Accountability = value.checked;
    this.AddEditDonorCEForm(this.donorCEForm);
  }

  onDeliverableQualityChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.criticismDeliverableQuality = criteriaEvaluationScores.pastCriticismQualityDeliverable_Yes
    } else {
      this.criticismDeliverableQuality = criteriaEvaluationScores.pastCriticismQualityDeliverable_No
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.DeliverableQuality = value.checked;
    this.AddEditDonorCEForm(this.donorCEForm);
  }

  onFinancialHistoryChange(data) {
    debugger;
    console.log(data);
    if (data === 1) {
      this.donorFinancialHistory = criteriaEvaluationScores.finanacingHistory_Good
    }
    else if (data === 2) {
      this.donorFinancialHistory = criteriaEvaluationScores.finanacingHistory_Neutral
    }
    else if (data === 3) {
      this.donorFinancialHistory = criteriaEvaluationScores.finanacingHistory_Bad
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.DonorFinancingHistory = data;
    this.AddEditDonorCEForm(this.donorCEForm);
  }

  onReligiousStandingChange(data) {
    console.log(data);
    if (data === 1) {
      this.donorReligiousStanding = criteriaEvaluationScores.religiousStanding_Good
    }
    else if (data === 2) {
      this.donorReligiousStanding = criteriaEvaluationScores.religiousStanding_Neutral

    }
    else if (data === 3) {
      this.donorReligiousStanding = criteriaEvaluationScores.religiousStanding_Bad
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.ReligiousStanding = data;
    this.AddEditDonorCEForm(this.donorCEForm);
  }
  onPoliticalStandingChange(data) {
    console.log(data);
    if (data === 1) {
      this.donorPoliticalStanding = criteriaEvaluationScores.politicalStanding_Good
    }
    else if (data === 2) {
      this.donorPoliticalStanding = criteriaEvaluationScores.politicalStanding_Neutral
    }
    else if (data === 3) {
      this.donorPoliticalStanding = criteriaEvaluationScores.politicalStanding_Bad
    }
    this.donorCEForm.DonorCEId = this.donorCEForm.DonorCEId
    this.donorCEForm.PoliticalStanding = data;
    this.AddEditDonorCEForm(this.donorCEForm);

  }
  //#endregion

  //#region Purpose Of Initiating
  OnProductChange() {



  }

  onProdWomenChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.prodSelectWomen = criteriaEvaluationScores.prodWomen_Yes
    } else {
      this.prodSelectWomen = criteriaEvaluationScores.prodWomen_No
    }
    this.productAndServiceForm.Women = value.checked;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);

  }

  onProdChildrenChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.prodSelectChildren = criteriaEvaluationScores.prodWomen_Yes
    } else {
      this.prodSelectChildren = criteriaEvaluationScores.prodWomen_No
    }
    this.productAndServiceForm.Children = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  onProdAwarenessChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.prodProdAwareness = criteriaEvaluationScores.prodAwareness_Yes
    } else {
      this.prodProdAwareness = criteriaEvaluationScores.prodEducation_No
    }
    this.productAndServiceForm.Awareness = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }
  onProdEducationChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.prodProdEducation = criteriaEvaluationScores.prodEducation_Yes
    } else {
      this.prodProdEducation = criteriaEvaluationScores.prodEducation_No
    }
    this.productAndServiceForm.Education = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }
  onDrugAbuseChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.prodDrugAbuse = criteriaEvaluationScores.prodDrugAndAbuse_Yes
    } else {
      this.prodDrugAbuse = criteriaEvaluationScores.prodDrugAndAbuse_No
    }
    this.productAndServiceForm.DrugAbuses = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }
  onProdRightsChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.prodRights = criteriaEvaluationScores.prodRights_Yes
    } else {
      this.prodRights = criteriaEvaluationScores.prodRights_No
    }
    this.productAndServiceForm.Right = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  onProdCultureChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.prodCulture = criteriaEvaluationScores.prodRights_Yes
    } else {
      this.prodCulture = criteriaEvaluationScores.prodRights_No
    }
    this.productAndServiceForm.Culture = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }
  onMusicChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.prodMusic = criteriaEvaluationScores.prodMusic_Yes
    } else {
      this.prodMusic = criteriaEvaluationScores.prodMusic_No
    }
    this.productAndServiceForm.Music = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  onProdocumentariesChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.prodDocumentaries = criteriaEvaluationScores.prodDocumentaries_Yes
    } else {
      this.prodDocumentaries = criteriaEvaluationScores.prodDocumentaries_Yes
    }
    this.productAndServiceForm.Documentaries = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }
  onProdJournalismChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.prodJournalism = criteriaEvaluationScores.prodInvestigativeJournlism_Yes
    } else {
      this.prodJournalism = criteriaEvaluationScores.prodInvestigativeJournlism_No
    }
    this.productAndServiceForm.InvestigativeJournalism = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  onProdHealthNutritionChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.prodProdHealthNutrition = criteriaEvaluationScores.prodHealthAndNutrition_Yes
    } else {
      this.prodProdHealthNutrition = criteriaEvaluationScores.prodHealthAndNutrition_No
    }
    this.productAndServiceForm.HealthAndNutrition = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  onProdNewsChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.prodProdNews = criteriaEvaluationScores.prodNews_Yes
    } else {
      this.prodProdNews = criteriaEvaluationScores.prodNews_No
    }
    this.productAndServiceForm.News = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);

  }

  onProdJSocioPoliticalChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.prodSocioPolitical = criteriaEvaluationScores.prodSocioPoliticalDebate_Yes
    } else {
      this.prodSocioPolitical = criteriaEvaluationScores.prodSocioPoliticalDebate_No
    }
    this.productAndServiceForm.SocioPolitiacalDebate = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  onProdStudiesChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.prodStudies = criteriaEvaluationScores.prodStudies_Yes
    } else {
      this.prodStudies = criteriaEvaluationScores.prodStudies_No
    }
    this.productAndServiceForm.Studies = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  onProdReportsChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.prodReports = criteriaEvaluationScores.prodReport_Yes
    } else {
      this.prodReports = criteriaEvaluationScores.prodReport_No
    }
    this.productAndServiceForm.Reports = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  //Service
  onServiCommunityChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.serviCommunity = criteriaEvaluationScores.servCommunityDevelop_Yes
    } else {
      this.serviCommunity = criteriaEvaluationScores.servCommunityDevelop_No
    }
    this.productAndServiceForm.CommunityDevelopment = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  onServAggricultureChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.serviAggriculture = criteriaEvaluationScores.servAggriculture_Yes
    } else {
      this.serviAggriculture = criteriaEvaluationScores.servAggriculture_No
    }
    this.productAndServiceForm.Aggriculture = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }
  onServDRRChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.serviDRR = criteriaEvaluationScores.serDRR_Yes
    } else {
      this.serviDRR = criteriaEvaluationScores.serDRR_No
    }
    this.productAndServiceForm.DRR = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  onServEducationChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.serviEducation = criteriaEvaluationScores.serviceEducation_Yes
    } else {
      this.serviEducation = criteriaEvaluationScores.serviceEducation_No
    }
    this.productAndServiceForm.ServiceEducation = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  onServHealthNutrityionChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.servihealthNutrition = criteriaEvaluationScores.serviceEducation_Yes
    } else {
      this.servihealthNutrition = criteriaEvaluationScores.serviceEducation_No
    }
    this.productAndServiceForm.ServiceHealthAndNutrition = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }
  //activities
  onActivityRadioChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.activityRadio = criteriaEvaluationScores.activityRadioProduction_Yes
    } else {
      this.activityRadio = criteriaEvaluationScores.activityRadioProduction_No
    }
    this.productAndServiceForm.RadioProduction = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  onActivityTVProgramChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.activityTVprogram = criteriaEvaluationScores.activityTVprogram_Yes
    } else {
      this.activityTVprogram = criteriaEvaluationScores.activityTVprogram_No
    }
    this.productAndServiceForm.TVProgram = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  onActivityPrtintedMediaChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.activityPrintedMedia = criteriaEvaluationScores.activityPrintedMedia_Yes
    } else {
      this.activityPrintedMedia = criteriaEvaluationScores.activityPrintedMedia_No
    }
    this.productAndServiceForm.PrintedMedia = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  onActivityRoundTableChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.activityRoundTable = criteriaEvaluationScores.activityRoundTables_Yes
    } else {
      this.activityRoundTable = criteriaEvaluationScores.activityRoundTables_No
    }
    this.productAndServiceForm.RoundTable = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  onActivityOthersChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.activityOtherChangee = criteriaEvaluationScores.activityOther_Yes
    } else {
      this.activityOtherChangee = criteriaEvaluationScores.activityOther_No
    }
    this.productAndServiceForm.OtherActivity = value;
    this.AddEditPurposeOfInitiatingForm(this.productAndServiceForm);
  }

  //ELIGIBILITY
  onDonorEligibiltyCriteraChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.isDisabledEligibilityCriteria = true;
      this.onDonorELegibilityCrteria = criteriaEvaluationScores.onDonorELegibilityCrteria_Yes
      this.eligibilityForm.EligibilityDealine = false;
      this.eligibilityForm.CoPartnership = false;
    } else {
      this.isDisabledEligibilityCriteria = false;
      this.onDonorELegibilityCrteria = criteriaEvaluationScores.onDonorELegibilityCrteria_No
    }
    this.eligibilityForm.DonorCriteriaMet = value.checked;
    this.eligibilityForm.EligibilityId = this.eligibilityForm.EligibilityId;
    this.AddEditEligibilityCEForm(this.eligibilityForm);

  }

  onDonorEligibilityDeadlineChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.donorEligibilityDeadline = criteriaEvaluationScores.donorEligibilityDeadline_Yes
    } else {
      this.donorEligibilityDeadline = criteriaEvaluationScores.donorEligibilityDeadline_No
    }
    this.eligibilityForm.EligibilityDealine = value.checked;
    this.eligibilityForm.EligibilityId = this.eligibilityForm.EligibilityId;
    this.AddEditEligibilityCEForm(this.eligibilityForm);

  }

  onDonorEligibilityPartnershipChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.donorEligibilityPartnership = criteriaEvaluationScores.feasibilityCapacityForProject_Yes
    } else {
      this.donorEligibilityPartnership = criteriaEvaluationScores.feasibilityCapacityForProject_No
    }
    this.eligibilityForm.CoPartnership = value.checked;
    this.eligibilityForm.EligibilityId = this.eligibilityForm.EligibilityId;
    this.AddEditEligibilityCEForm(this.eligibilityForm);

  }
  //#endregion

  //#region  Feasibility
  onCapacityAvailabilityChange(value) {
    debugger;
    console.log(value);
    if (value.checked === true) {
      this.isDisabledCompensation = true;
      this.feasibilityForm.TrainedStaff = false;
      this.feasibilityForm.ByEquipment = false;
      this.feasibilityForm.ExpandScope = false;
      this.feasibilityForm.GeoGraphicalPresence = false;
      this.capacityAvailabilityProject = criteriaEvaluationScores.pastFundingExperience_Yes
    } else {
      this.isDisabledCompensation = false;
      this.capacityAvailabilityProject = criteriaEvaluationScores.pastFundingExperience_No
    }
    this.feasibilityForm.CapacityAvailableForProject = value.checked;
    this.feasibilityForm.FeasibilityId = this.feasibilityForm.FeasibilityId;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }

  onCompensationTrainStaffChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.compensationTrainStaff = criteriaEvaluationScores.compensationTrainedStaff_Yes
    } else {
      this.compensationTrainStaff = criteriaEvaluationScores.compensationTrainedStaff_No
    }
    this.feasibilityForm.TrainedStaff = value.checked;
    this.feasibilityForm.FeasibilityId = this.feasibilityForm.FeasibilityId;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }

  onCompensationByEquipmentChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.compensationByEquipment = criteriaEvaluationScores.compensateByEquipment_Yes
    } else {
      this.compensationByEquipment = criteriaEvaluationScores.compensateByEquipment_No
    }
    this.feasibilityForm.ByEquipment = value.checked;
    this.feasibilityForm.FeasibilityId = this.feasibilityForm.FeasibilityId;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }

  oncompensationExpandScopeChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.compensationExpandScope = criteriaEvaluationScores.compensateExpandScope_Yes
    } else {
      this.compensationExpandScope = criteriaEvaluationScores.compensateExpandScope_No
    }
    this.feasibilityForm.ExpandScope = value.checked;
    this.feasibilityForm.FeasibilityId = this.feasibilityForm.FeasibilityId;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }

  onCompensationGeographicalChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.compensationGeographical = criteriaEvaluationScores.compensateGeographical_Yes
    } else {
      this.compensationGeographical = criteriaEvaluationScores.compensateGeographical_No
    }
    this.feasibilityForm.GeoGraphicalPresence = value.checked;
    this.feasibilityForm.FeasibilityId = this.feasibilityForm.FeasibilityId;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }


  onallowedthirdPartyChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.allowedthirdParty = criteriaEvaluationScores.allowedThirdPartyContract_Yes
    } else {
      this.allowedthirdParty = criteriaEvaluationScores.allowedThirdPartyContract_No
    }

  }
  //#endregion

  //#region AnyInKind component
  onAnyInKindComponentChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.isDisabledAnyInKindComponent = false;
      this.anyInKindComponent = criteriaEvaluationScores.anyInKindComponent_Yes
    } else {
      this.isDisabledAnyInKindComponent = true;
      this.feasibilityForm.UseableByOrganisation = false;
      this.feasibilityForm.FeasibleExpertDeploy = false;
      this.anyInKindComponent = criteriaEvaluationScores.anyInKindComponent_No
    }
    this.feasibilityForm.AnyInKindComponent = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }

  onUseableByOrganisationChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.useableByOrganisation = criteriaEvaluationScores.useableByOrganisation_Yes
    } else {
      this.useableByOrganisation = criteriaEvaluationScores.useableByOrganisation_No
    }
    this.feasibilityForm.UseableByOrganisation = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }

  onFeasibleExpertDeployedChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.fesibilityExpertDeployed = criteriaEvaluationScores.feasibleExpertDeploy_Yes
    } else {
      this.fesibilityExpertDeployed = criteriaEvaluationScores.feasibleExpertDeploy_No
    }
    this.feasibilityForm.FeasibleExpertDeploy = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }

  onExpertsChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.fesibilityExpert = criteriaEvaluationScores.feasibilityExpert_Yes
    } else {
      this.fesibilityExpert = criteriaEvaluationScores.feasibilityExpert_No
    }
    this.feasibilityForm.FeasibilityExpert = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }
  //feasibility right div
  onEnoughTimeQualityChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.enoughTimeQuality = criteriaEvaluationScores.enoughTimeForQualityWork_Yes
    } else {
      this.enoughTimeQuality = criteriaEvaluationScores.enoughTimeForQualityWork_No
    }

    this.feasibilityForm.EnoughTimeForProject = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }

  onProjectallowedByLawChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.projectallowedByLaw = criteriaEvaluationScores.projectAllowedByLaw_Yes
    } else {
      this.projectallowedByLaw = criteriaEvaluationScores.projectAllowedByLaw_No
    }
    this.feasibilityForm.ProjectAllowedBylaw = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }
  onProjectAllowedByOrganisationChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.projectAllowedByOrganisation = criteriaEvaluationScores.projectAllowByOrganisation_Yes
    } else {
      this.projectAllowedByOrganisation = criteriaEvaluationScores.projectAllowByOrganisation_No
    }
    this.feasibilityForm.ProjectByLeadership = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }

  onIsProjectPracticalChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.isProjectPractical = criteriaEvaluationScores.isProjectPractical_Yes
    } else {
      this.isProjectPractical = criteriaEvaluationScores.isProjectPractical_No
    }
    this.feasibilityForm.IsProjectPractical = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);

  }

  onPresenceCoverageinProjectChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.presenceCoverageinProject = criteriaEvaluationScores.presenceCoverage_Yes
    } else {
      this.presenceCoverageinProject = criteriaEvaluationScores.presenceCoverage_No
    }
    this.feasibilityForm.PresenceCoverageInProject = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }

  onProjectInLineOrganisationalChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.projectInLineOrganisational = criteriaEvaluationScores.projectinLineWithFocus_Yes
    } else {
      this.projectInLineOrganisational = criteriaEvaluationScores.projectinLineWithFocus_No
    }
    this.feasibilityForm.ProjectInLineWithOrgFocus = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }

  onENoughTimetoPrepareChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.eNoughTimetoPrepare = criteriaEvaluationScores.enoughTimeToPrepareproposal_Yes
    } else {
      this.eNoughTimetoPrepare = criteriaEvaluationScores.enoughTimeToPrepareproposal_No
    }
    this.feasibilityForm.EnoughTimeToPrepareProposal = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);

  }

  //#region feasibility Cost efficiency
  onCostGreaterThanBudgetChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.costGreaterThanBudget = criteriaEvaluationScores.costGreaterThanBudget_Yes
    } else {
      this.costGreaterThanBudget = criteriaEvaluationScores.costGreaterThanBudget_No
    }
    this.feasibilityForm.IsCostGreaterthenBudget = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }

  onFinancialContributionChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.financialContribution = criteriaEvaluationScores.financialCopntributionFulfil_Yes
    } else {
      this.financialContribution = criteriaEvaluationScores.financialCopntributionFulfil_No
    }
    this.feasibilityForm.IsFinancialContribution = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }
  //disabling conditions
  onSecurityChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.disablingSecurity = criteriaEvaluationScores.disablingSecurity_Yes
    } else {
      this.disablingSecurity = criteriaEvaluationScores.disablingSecurity_No
    }
    this.feasibilityForm.IsSecurity = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);

  }

  onGeographicalChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.disablingGeographicalCondition = criteriaEvaluationScores.disablingGeographical_Yes
    } else {
      this.disablingGeographicalCondition = criteriaEvaluationScores.disablingGeographical_No
    }
    this.feasibilityForm.IsGeographical = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }

  onSeasonalChange(value) {
    if (value.checked === true) {
      this.disablingSeasonalCondition = criteriaEvaluationScores.disablingSeasonal_Yes
    } else {
      this.disablingSeasonalCondition = criteriaEvaluationScores.disablingSeasonal_No
    }
    this.feasibilityForm.IsSeasonal = value.checked;
    this.AddEditFeasibilityCEForm(this.feasibilityForm);
  }

  //#endregion

  //#region Priority CEForm
  onPIncresedEligibilityChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.priorityIncresedEligibility = criteriaEvaluationScores.increasedEligibility_Yes
    } else {
      this.priorityIncresedEligibility = criteriaEvaluationScores.increasedEligibility_No
    }
    this.priorityForm.IncreaseEligibility = value.checked;
    this.AddEditPriorityCEForm(this.priorityForm);
  }

  onIncreasedReputationChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.priorityIncresedReputation = criteriaEvaluationScores.increasedReputation_Yes
    } else {
      this.priorityIncresedReputation = criteriaEvaluationScores.increasedReputation_No
    }
    this.priorityForm.IncreaseReputation = value.checked;
    this.AddEditPriorityCEForm(this.priorityForm);
  }

  onImprovedDonorRelationChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.priorityIncresedDonorRelation = criteriaEvaluationScores.improvedDonorRelationaship_Yes
    } else {
      this.priorityIncresedDonorRelation = criteriaEvaluationScores.improvedDonorRelationaship_No
    }
    this.priorityForm.ImproveDonorRelationship = value.checked;
    this.AddEditPriorityCEForm(this.priorityForm);
  }

  onGoodCauseChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.priorityGoodCause = criteriaEvaluationScores.goodCause_Yes
    } else {
      this.priorityGoodCause = criteriaEvaluationScores.goodCause_No
    }
    this.priorityForm.GoodCause = value.checked;
    this.AddEditPriorityCEForm(this.priorityForm);
  }

  onImprovedPerformanceChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.priorityImprovedPerformance = criteriaEvaluationScores.improvedPerformanceCapacity_Yes
    } else {
      this.priorityImprovedPerformance = criteriaEvaluationScores.improvedPerformanceCapacity_No
    }
    this.priorityForm.ImprovePerformancecapacity = value.checked;
    this.AddEditPriorityCEForm(this.priorityForm);
  }

  onSkillImprovementChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.priorityImprovedSkill = criteriaEvaluationScores.skillImprovement_Yes
    } else {
      this.priorityImprovedSkill = criteriaEvaluationScores.skillImprovement_No
    }
    this.priorityForm.SkillImprove = value.checked;
    this.AddEditPriorityCEForm(this.priorityForm);
  }

  onFillingFundingGapChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.priorityFillingFundingGap = criteriaEvaluationScores.fillingfundingGaps_Yes
    } else {
      this.priorityFillingFundingGap = criteriaEvaluationScores.fillingfundingGaps_No
    }
    this.priorityForm.FillingFundingGap = value.checked;
    this.AddEditPriorityCEForm(this.priorityForm);
  }

  onNewSoftwareChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.priorityNewSoftware = criteriaEvaluationScores.newSoftware_Yes
    } else {
      this.priorityNewSoftware = criteriaEvaluationScores.newSoftware_No
    }
    this.priorityForm.NewSoftware = value.checked;
    this.AddEditPriorityCEForm(this.priorityForm);
  }

  onNewEquipmentChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.priorityNewEquipment = criteriaEvaluationScores.newEquipment_Yes
    } else {
      this.priorityNewEquipment = criteriaEvaluationScores.newEquipment_No
    }
    this.priorityForm.NewEquipment = value.checked;
    this.AddEditPriorityCEForm(this.priorityForm);
  }

  onCoverageAreaExpensionChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.priorityCoverageAreaExp = criteriaEvaluationScores.coverageAreaExpansion_Yes
    } else {
      this.priorityCoverageAreaExp = criteriaEvaluationScores.coverageAreaExpansion_No
    }
    this.priorityForm.CoverageAreaExpansion = value.checked;
    this.AddEditPriorityCEForm(this.priorityForm);
  }

  onNewTrainingChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.priorityNewTraining = criteriaEvaluationScores.newTraining_Yes
    } else {
      this.priorityNewTraining = criteriaEvaluationScores.newTraining_No
    }
    this.priorityForm.NewTraining = value.checked;
    this.AddEditPriorityCEForm(this.priorityForm);
  }

  onPriorityOthersChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.priorityOthers = criteriaEvaluationScores.other_Yes
    } else {
      this.priorityOthers = criteriaEvaluationScores.other_No
    }
    this.priorityForm.Others = value.checked;
    this.AddEditPriorityCEForm(this.priorityForm);
  }

  onProjectExpensionGoalChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.projectExpensionGoal = criteriaEvaluationScores.projectInlineWithOrganisalGoal_Yes
    } else {
      this.projectExpensionGoal = criteriaEvaluationScores.projectInlineWithOrganisalGoal_No
    }
    this.priorityForm.ExpansionGoal = value.checked;
    this.AddEditPriorityCEForm(this.priorityForm);
  }
  //#endregion

  //#region Financial profitability form
  onProjectActivityChange(ev, data: any) {
    debugger;
    console.log(ev);
    if (data != null && data != "" && data != undefined) {
      // var total = data;
      if (ev == 'projectActivity') {
        this.financialForm.ProjectActivities = data;
        this.projectactivity = data;
        this.AddEditFinancialProfitability(this.financialForm);
      }
      if (ev == 'operational') {
        this.financialForm.Operational = data;
        this.operational = data;
        this.AddEditFinancialProfitability(this.financialForm);
      }
      if (ev == "overheadAdmin") {
        this.admin = data;
        this.financialForm.Overhead_Admin = data;
        this.AddEditFinancialProfitability(this.financialForm);
      }
      if (ev == "lumpsum") {
        this.lump = data;
        this.financialForm.Lump_Sum = data;
        this.AddEditFinancialProfitability(this.financialForm);
      }

    }



  }
  //#endregion

  //#region Risk Security form
  onRiskSecurityChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.isDisabledRisk = false;
      this.riskSecurity = criteriaEvaluationScores.riskSecurity_Yes
    } else {
      this.isDisabledRisk = true;
      this.riskForm.Staff = false;
      this.riskForm.ProjectAssets = false;
      this.riskForm.Suppliers = false;
      this.riskForm.Beneficiaries = false;
      this.riskForm.OverallOrganization = false;
      this.riskSecurity = criteriaEvaluationScores.riskSecurity_No
    }
    this.riskForm.Security = value.checked;
    this.AddEditRiskSecurityCEForm(this.riskForm);
  }

  onRiskChildChange(ev, data: any) {
    debugger;
    console.log(ev);
    if (data != null && data != "" && data != undefined) {
      if (ev == 'Staff') {
        this.riskForm.Staff = data;
        this.AddEditRiskSecurityCEForm(this.riskForm);
      }
      if (ev == 'Assets') {
        this.riskForm.ProjectAssets = data;
        this.AddEditRiskSecurityCEForm(this.riskForm);
      }
      if (ev == "Suppliers") {
        this.riskForm.Suppliers = data;
        this.AddEditRiskSecurityCEForm(this.riskForm);
      }
      if (ev == "Beneficiaries") {
        this.riskForm.Beneficiaries = data;
        this.AddEditRiskSecurityCEForm(this.riskForm);
      }
      if (ev == "OverallOrganization") {
        this.riskForm.OverallOrganization = data;
        this.AddEditRiskSecurityCEForm(this.riskForm);
      }
    }
  }

  onRiskReputationChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.isDisabledReputation = false;
      this.riskReputation = criteriaEvaluationScores.riskSecurity_Yes
    } else {
      this.isDisabledReputation = false;
      this.riskForm.Religious = false;
      this.riskForm.Sectarian = false;
      this.riskForm.Ethinc = false;
      this.riskForm.Social = false;
      this.riskForm.Traditional = false;
      this.riskForm.FocusDivertingrisk = false;
      this.riskReputation = criteriaEvaluationScores.riskSecurity_No
    }
    this.riskForm.Reputation = value.checked;
    this.AddEditRiskSecurityCEForm(this.riskForm);
  }

  onReputationChildChange(ev, data: any) {
    debugger;
    console.log(ev);
    if (data != null && data != "" && data != undefined) {
      if (ev == 'Religious') {
        this.riskForm.Religious = data;
        this.AddEditRiskSecurityCEForm(this.riskForm);
      }
      if (ev == 'Sectarian') {
        this.riskForm.Sectarian = data;
        this.AddEditRiskSecurityCEForm(this.riskForm);
      }
      if (ev == "Ethnic") {
        this.riskForm.Ethinc = data;
        this.AddEditRiskSecurityCEForm(this.riskForm);
      }
      if (ev == "Social") {
        this.riskForm.Social = data;
        this.AddEditRiskSecurityCEForm(this.riskForm);
      }
      if (ev == "Traditional") {
        this.riskForm.Traditional = data;
        this.AddEditRiskSecurityCEForm(this.riskForm);
      }
    }
  }

  onFocusDivertingRiskChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.focusDivertingRisk = criteriaEvaluationScores.focusDeliveryRisk_Yes
    } else {
      this.focusDivertingRisk = criteriaEvaluationScores.focusDeliveryRisk_No
    }
    this.riskForm.FocusDivertingrisk = value.checked;
    this.AddEditRiskSecurityCEForm(this.riskForm);
  }


  onDeliveryFailureChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.isDisabledDelivery = false;
      this.deliveryFailure = criteriaEvaluationScores.deliveryFailure_Yes
    } else {
      this.isDisabledDelivery = true;
      this.riskForm.PrematureSeizure = false;
      this.riskForm.GovernmentConfiscation = false;
      this.riskForm.DesctructionByTerroristActivity = false;
      this.deliveryFailure = criteriaEvaluationScores.deliveryFailure_No
    }
    this.riskForm.DeliveryFaiLure = value.checked;
    this.AddEditRiskSecurityCEForm(this.riskForm);
  }
  onRiskDeliveryFailureChildChange(ev, data: any) {
    debugger;
    console.log(ev);
    if (data != null && data != "" && data != undefined) {
      if (ev == 'PrematureSeizure') {
        this.riskForm.PrematureSeizure = data;
        this.AddEditRiskSecurityCEForm(this.riskForm);
      }
      if (ev == 'GovernmentConfiscation') {
        this.riskForm.GovernmentConfiscation = data;
        this.AddEditRiskSecurityCEForm(this.riskForm);
      }
      if (ev == "TerroristActivity") {
        this.riskForm.DesctructionByTerroristActivity = data;
        this.AddEditRiskSecurityCEForm(this.riskForm);
      }

    }
  }

  onFinancialLossesChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.financialLoses = criteriaEvaluationScores.financialLosses_Yes
    } else {
      this.financialLoses = criteriaEvaluationScores.financialLosses_No
    }
    this.riskForm.Financiallosses = value.checked;
    this.AddEditRiskSecurityCEForm(this.riskForm);

  }
  onOpportunityLossChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.opportunityLoses = criteriaEvaluationScores.opportunityLoss_Yes
    } else {
      this.opportunityLoses = criteriaEvaluationScores.opportunityLoss_No
    }
    this.riskForm.Opportunityloss = value.checked;
    this.AddEditRiskSecurityCEForm(this.riskForm);
  }

  onProbabilityDelayChange(value) {
    console.log(value);
    if (value.checked === true) {
      this.opportunityDelay = criteriaEvaluationScores.probabilityDelayCuts_Yes
    } else {
      this.opportunityDelay = criteriaEvaluationScores.probabilityDelayCuts_No
    }
    this.riskForm.Probablydelaysinfunding = value.checked;
    this.AddEditRiskSecurityCEForm(this.riskForm);
  }

  onOrganizationalDescriptionChange(ev, data: any) {
    debugger
    console.log(data);
    if (ev != null) {
      if (ev == 'OrganizationalDescription') {
        this.riskForm.OrganizationalDescription = data;
        this.AddEditRiskSecurityCEForm(this.riskForm);
      }
    }
  }
  //#endregion

  //#endregion

  //#region Get Criteria evaluation by ProjectId Donor
  GetCriteraiEvaluationDetailById(ProjectId: number) {
    debugger;
    // this.OtherProjectList = [];
    if (ProjectId != null && ProjectId != undefined && ProjectId != 0) {
      this.criteriaEvalService.GetCriteriaEvalDetailsByProjectId(this.appurl.getApiUrl() + GLOBAL.API_GetAllCriteriaEvaluationDetail, ProjectId)
        .subscribe(
          (data) => {
            if (data != null) {
              if (data.data.CriteriaEveluationModel != null) {
                debugger;
                this.donorCEForm.PastFundingExperience = data.data.CriteriaEveluationModel.PastFundingExperience;
                this.donorCEForm.DonorCEId = data.data.CriteriaEveluationModel.DonorCEId;
                this.donorCEForm.MethodOfFunding = data.data.CriteriaEveluationModel.MethodOfFunding;
                this.donorCEForm.ProposalAccepted = data.data.CriteriaEveluationModel.ProposalAccepted;
                this.donorCEForm.ProposalExperience = data.data.CriteriaEveluationModel.ProposalExperience;
                this.donorCEForm.Professional = data.data.CriteriaEveluationModel.Professional;
                this.donorCEForm.FundsOnTime = data.data.CriteriaEveluationModel.FundsOnTime;
                this.donorCEForm.EffectiveCommunication = data.data.CriteriaEveluationModel.EffectiveCommunication;
                this.donorCEForm.Dispute = data.data.CriteriaEveluationModel.Dispute;
                this.donorCEForm.OtherDeliverable = data.data.CriteriaEveluationModel.OtherDeliverable;
                this.donorCEForm.OtherDeliverableType = data.data.CriteriaEveluationModel.OtherDeliverableType;

                this.donorCEForm.PastWorkingExperience = data.data.CriteriaEveluationModel.PastWorkingExperience;
                this.donorCEForm.CriticismPerformance = data.data.CriteriaEveluationModel.CriticismPerformance;
                this.donorCEForm.TimeManagement = data.data.CriteriaEveluationModel.TimeManagement;
                this.donorCEForm.MoneyAllocation = data.data.CriteriaEveluationModel.MoneyAllocation;
                this.donorCEForm.Accountability = data.data.CriteriaEveluationModel.Accountability;
                this.donorCEForm.DeliverableQuality = data.data.CriteriaEveluationModel.DeliverableQuality;

                this.donorCEForm.DonorFinancingHistory = data.data.CriteriaEveluationModel.DonorFinancingHistory;
                this.donorCEForm.ReligiousStanding = data.data.CriteriaEveluationModel.ReligiousStanding;
                this.donorCEForm.PoliticalStanding = data.data.CriteriaEveluationModel.PoliticalStanding;




                // this.projectotherDetail.SubmissionDate = data.data.OtherProjectDetailById.SubmissionDate;
                // this.projectotherDetail.REOIReceiveDate = data.data.OtherProjectDetailById.REOIReceiveDate;
                // this.projectotherDetail.StrengthConsiderationId = data.data.OtherProjectDetailById.StrengthConsiderationId;
                // this.projectotherDetail.GenderConsiderationId = data.data.OtherProjectDetailById.StrengthConsiderationId;
                // this.projectotherDetail.GenderRemarks = data.data.OtherProjectDetailById.GenderRemarks;
                // this.projectotherDetail.SecurityId = data.data.OtherProjectDetailById.SecurityId;
                // this.projectotherDetail.SecurityConsiderationId = data.data.OtherProjectDetailById.SecurityConsiderationId;
                // this.projectotherDetail.SecurityRemarks = data.data.OtherProjectDetailById.SecurityRemarks;


                // to get multiselect value of province
                // if (data.data.OtherProjectDetailById.ProvinceId != null) {
                //   var selectedprovince = data.data.OtherProjectDetailById.ProvinceId.split(',');
                //   if (selectedprovince.length > 0) {
                //     debugger;
                //     selectedprovince.forEach(element => {
                //       this.selectedProvince.push(element);
                //     });

                //   }
                // }


              }
            }
          })
    }
  }

  //#region Add edit DOnorCE form
  AddEditDonorCEForm(model: any) {
    debugger;
    if (model != null) {
      let obj: DonorCEModel = {
        ProjectId: this.ProjectId,
        DonorCEId: model.DonorCEId,
        MethodOfFunding: model.MethodOfFunding,
        PastFundingExperience: model.PastFundingExperience,
        ProposalAccepted: model.ProposalAccepted,
        ProposalExperience: model.ProposalExperience,
        Professional: model.Professional,
        FundsOnTime: model.FundsOnTime,
        EffectiveCommunication: model.EffectiveCommunication,
        Dispute: model.Dispute,
        OtherDeliverable: model.OtherDeliverable,
        OtherDeliverableType: model.OtherDeliverableType,
        PastWorkingExperience: model.PastWorkingExperience,
        CriticismPerformance: model.CriticismPerformance,
        TimeManagement: model.TimeManagement,
        MoneyAllocation: model.MoneyAllocation,
        Accountability: model.Accountability,
        DeliverableQuality: model.DeliverableQuality,
        DonorFinancingHistory: model.DonorFinancingHistory,
        ReligiousStanding: model.ReligiousStanding,
        PoliticalStanding: model.PoliticalStanding
      }
      console.log(obj);
      this.criteriaEvalService.AddEditDonorCriteriaEvaluationForm(this.appurl.getApiUrl() + GLOBAL.API_Project_AddEditDonorCriteria, obj)
        .subscribe(
          (response) => {
            if (response.StatusCode == 200) {

            }
          }
        )
    }
  }
  //#endregion

  //#region  add edit purpose of initialting
  AddEditPurposeOfInitiatingForm(model: any) {
    if (model != null) {
      let obj: ProductAndServiceCEModel = {
        ProjectId: this.ProjectId,
        ProductServiceId: model.ProductServiceId,
        Women: model.Women,
        Children: model.Children,
        Awareness: model.Awareness,
        Education: model.Education,
        DrugAbuses: model.DrugAbuses,
        Right: model.Right,
        Culture: model.Culture,
        Music: model.Music,
        Documentaries: model.Documentaries,
        InvestigativeJournalism: model.InvestigativeJournalism,
        HealthAndNutrition: model.HealthAndNutrition,
        News: model.News,
        SocioPolitiacalDebate: model.SocioPolitiacalDebate,
        Studies: model.Studies,
        Reports: model.Reports,
        CommunityDevelopment: model.CommunityDevelopment,
        Aggriculture: model.Aggriculture,
        DRR: model.DRR,
        ServiceEducation: model.ServiceEducation,
        ServiceHealthAndNutrition: model.ServiceHealthAndNutrition,
        RadioProduction: model.RadioProduction,
        TVProgram: model.TVProgram,
        PrintedMedia: model.PrintedMedia,
        RoundTable: model.RoundTable,
        Others: model.Others,
        OtherActivity: model.OtherActivity,
        TargetBenificaiaryWomen: model.TargetBenificaiaryWomen,
        TargetBenificiaryMen: model.TargetBenificiaryMen,
        TargetBenificiaryAgeGroup: model.TargetBenificiaryAgeGroup,
        TargetBenificiaryaOccupation: model.TargetBenificiaryaOccupation,
      }
      console.log(obj);
      this.criteriaEvalService.AddEditProductServiceCEForm(this.appurl.getApiUrl() + GLOBAL.API_Project_AddEditPurposeofInitiativeCriteria, obj)
        .subscribe(
          (response) => {
            if (response.StatusCode == 200) {

            }
          }
        )

    }
  }

  //#endregion

  //#region  add eligibility form
  AddEditEligibilityCEForm(model: any) {

  }
  //#endregion

  //#region add edit feasibility form
  AddEditFeasibilityCEForm(model: any) {

  }
  //#endregion

  //#region add/edit priority ec form
  AddEditPriorityCEForm(model: any) {

  }
  //#endregion

  //#region add/edit financial profitability
  AddEditFinancialProfitability(model: any) {

  }
  //#endregion


  //#region add/edit riskSecurity
  AddEditRiskSecurityCEForm(model: any) {

  }
  //#endregion

  //#region to calculate total value
  get totalValue() {

    this.totalScore = 0;
    this.totalScore =
      this.methodOfFunding +
      this.pastFundingExperience +
      this.proposaAccept +
      this.professional +
      this.fundsOnTime +
      this.effectiveCommunication +
      this.disputes +
      this.otherDeliverables +

      this.pastWorkExperience +
      this.criticismPerformance +
      this.criticismTimeManagement +
      this.criticismMoneyAllocation +
      this.criticismAccountability +
      this.criticismDeliverableQuality +

      this.donorFinancialHistory +
      this.donorReligiousStanding +
      this.donorPoliticalStanding +

      this.prodSelectWomen +
      this.prodSelectChildren +
      this.prodAwareness +
      this.prodProdAwareness +
      this.prodProdEducation +
      this.prodDrugAbuse +
      this.prodRights +
      this.prodCulture +
      this.prodMusic +
      this.prodDocumentaries +
      this.prodJournalism +
      this.prodProdHealthNutrition +
      this.prodProdNews +
      this.prodSocioPolitical +
      this.prodStudies +
      this.prodReports +


      this.serviCommunity +
      this.serviAggriculture +
      this.serviDRR +
      this.serviEducation +
      this.servihealthNutrition;



    return this.totalScore;
  }

  onOtherOrgHarmsChange(e){


  }
  OnServiceChange(){


  }

  onMultipleProjrctSelectionChange(e){


  }

  //#endregion

  // get gettotalFunds() {
  //   var totalfunds = this.projectactivity + this.operational + this.admin + this.lump
  //   return totalfunds;
  // }

}
