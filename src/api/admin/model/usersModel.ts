import { BasicFetchResult } from '../../model/baseModel';
import { MenuStructParam } from './menuModel';

export interface UserListItem {
  id: number;
  deptId: number;
  userName: string;
  realName: string;
  phone: string;
  isAdmin: boolean;
  state: boolean;
  roleIds: number[];
  homePath: string;

  rolesName?: string[];
  deptName?: string;
  permCode?: string[];
  menuList?: MenuStructParam[];
}

export interface UserActionLog {
  id: string;
  descript: string;
  method: string;
  controller: string;
  requestIp: string;
  ipAddr: string;
  brower: string;
  request: string;
  response: string;
  createdTime: string;
}

export interface UserIdParam {
  id: number;
}

export interface ChargePwdParams {
  oldPwd: string;
  newPwd: string;
}

export type UsersListGetResultModel = BasicFetchResult<UserListItem>;
export type UsersActionLogListGetResultModel = BasicFetchResult<UserActionLog>;
