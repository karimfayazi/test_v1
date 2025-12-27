
export enum ProjectStatus {
  PLANNED = 'Planned',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  ON_HOLD = 'On Hold'
}

export interface UserPermissions {
  // Core Actions
  CAN_ADD: boolean;
  CAN_UPDATE: boolean;
  CAN_DELETE: boolean;
  CAN_UPLOAD: boolean;
  SEE_REPORTS: boolean;
  ROP_EDIT: boolean;
  
  // System Access
  Supper_User: boolean;
  Finance_Officer: boolean;
  Dashboard: boolean;
  PowerBI: boolean;
  Setting: boolean;
  Other: boolean;
  
  // Module Access
  BaselineQOL: boolean;
  Family_Development_Plan: boolean;
  Family_Approval_CRC: boolean;
  Family_Income: boolean;
  ROP: boolean;
  SWB_Families: boolean;
  
  // System Tools
  TRACKING_SYSTEM: boolean;
  PLAN_INTERVENTION: boolean;
  
  // Financial/Special
  access_loans: boolean;
  baseline_access: boolean;
  bank_account: boolean;
}

export interface User {
  USER_ID: string;
  USER_FULL_NAME: string;
  PASSWORD?: string;
  RE_PASSWORD?: string;
  USER_TYPE: string;
  DESIGNATION: string;
  ACTIVE: boolean;
  UPDATE_DATE?: string;
  
  // Regional/Org Fields
  PROGRAM?: string;
  REGION?: string;
  AREA?: string;
  SECTION?: string;
  FDP?: string;
  RC?: string;
  LC?: string;
  REPORT_TO?: string;
  
  permissions: UserPermissions;
}

export interface MISProject {
  id: string;
  title: string;
  department: string;
  budget: number;
  spent: number;
  startDate: string;
  status: ProjectStatus;
  progress: number;
  coordinator: string;
}

export interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  permission?: keyof UserPermissions;
}
