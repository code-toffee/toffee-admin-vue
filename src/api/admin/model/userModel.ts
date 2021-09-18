/**
 * @description: Login interface parameters
 */
export interface AdminLoginParams {
  username: string;
  password: string;
  key: string;
  code: string;
}

export interface RoleInfo {
  value: number;
  name: string;
  level: number;
  dataScope: string;
  description: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: number;
  token: string;
  role: RoleInfo[];
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: number;
  // 用户名
  userName: string;
  // 真实名字
  realName: string;
  //手机
  phone: string;
  //首页
  homePath: string;
  avatar: string;
}

export interface PermCodeModel {
  permCode: string[];
}
