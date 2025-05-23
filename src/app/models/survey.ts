export interface Survey {
    surveyId: number;
    surveyName: string;
    surveyStart: Date | null;
    surveyEnd: Date | null;
    surveyInstruction: string;
    surveyConfirmation: string;
    surveyView: boolean;    
    authView: number;       
    plantId: number;
    isExcel: boolean;
    surveyStatus: boolean;
    archieve: boolean;
    // createdBy: string;
    // createdOn: Date;
    // modifiedBy: string;
    // modifiedOn: Date;
}
