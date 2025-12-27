
import { User, UserPermissions } from "../types";
import { DB_CONFIG } from "../config";

const DEFAULT_PERMISSIONS: UserPermissions = {
  CAN_ADD: false, CAN_UPDATE: false, CAN_DELETE: false, CAN_UPLOAD: false, SEE_REPORTS: false, ROP_EDIT: false,
  Supper_User: false, Finance_Officer: false, Dashboard: true, PowerBI: false, Setting: false, Other: false,
  BaselineQOL: false, Family_Development_Plan: false, Family_Approval_CRC: false, Family_Income: false, ROP: false, SWB_Families: false,
  TRACKING_SYSTEM: false, PLAN_INTERVENTION: false, access_loans: false, baseline_access: false, bank_account: false
};

// Mock "Table_User"
let MOCK_USERS: User[] = [
  {
    USER_ID: 'admin',
    USER_FULL_NAME: 'System Administrator',
    USER_TYPE: 'SuperUser',
    DESIGNATION: 'MIS Manager',
    ACTIVE: true,
    REGION: 'HQ',
    permissions: { ...DEFAULT_PERMISSIONS, Supper_User: true, Setting: true, CAN_ADD: true, CAN_UPDATE: true, CAN_DELETE: true }
  },
  {
    USER_ID: '_websitsjda',
    USER_FULL_NAME: 'SJDA Web Service',
    USER_TYPE: 'System',
    DESIGNATION: 'API Access',
    ACTIVE: true,
    permissions: { ...DEFAULT_PERMISSIONS, Dashboard: true, PowerBI: true }
  }
];

export const apiService = {
  async login(userId: string, password: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const normalizedUser = userId.toLowerCase();
    
    // Developer bypass or standard credentials
    if (normalizedUser === 'admin' || password === 'MIS4SJDA@786') {
      const user = MOCK_USERS.find(u => u.USER_ID.toLowerCase() === normalizedUser);
      return user || MOCK_USERS[0];
    }
    throw new Error(`Invalid credentials for ${DB_CONFIG.catalog}.`);
  },

  async getUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [...MOCK_USERS];
  },

  async saveUser(userData: User): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 600));
    const index = MOCK_USERS.findIndex(u => u.USER_ID === userData.USER_ID);
    
    const processedUser = {
      ...userData,
      UPDATE_DATE: new Date().toISOString(),
      // Ensure RE_PASSWORD matches if missing
      RE_PASSWORD: userData.RE_PASSWORD || userData.PASSWORD
    };

    if (index >= 0) {
      MOCK_USERS[index] = processedUser;
    } else {
      MOCK_USERS.push(processedUser);
    }
    return processedUser;
  },

  async deleteUser(userId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 400));
    MOCK_USERS = MOCK_USERS.filter(u => u.USER_ID !== userId);
  }
};
