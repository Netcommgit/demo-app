import { DdlUser } from "./ddl-user";

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
    departmentId:number
    isExcel: boolean;
    surveyStatus: boolean;
    archieve: boolean;
    // questionDetails?: QuestionDetails;
    // userDropDown?: UserDropdown;
    // createdBy: string;
    // createdOn: Date;
    // modifiedBy: string;
    // modifiedOn: Date;
}


export interface QuestionDetails {
    questionText: string;
    optionType: string;
    newOption: string;
}

export interface UserDropdown {
    userList: string[];           // ids of users selected to move right
    selectedUserList: DdlUser[]; // actual selected user objects
}



