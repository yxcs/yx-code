/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export type TAdminOptions = {
  userName: string;
  password: string;
  userMail?: string;
  userPhone?: string;
  userUid?: string;
  createAt?: Date;
  updateAt?: Date;
  lastLoginAt?: Date;
  userAvatar?: string;
  userLink?: string;
  userToken?: string;
  userAge?: number;
  userAddress?: string;
}