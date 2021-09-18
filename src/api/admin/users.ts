import { BasicPageParams } from '../model/baseModel';
import {
  ChargePwdParams,
  UserIdParam,
  UserListItem,
  UsersActionLogListGetResultModel,
  UsersListGetResultModel,
} from './model/usersModel';
import { adminHttp } from '/@/utils/http/axios';
enum Api {
  UsersList = '/get-user-table-list',
  DeleteUser = '/delete-user',
  AddUser = '/add-user',
  UpdateUser = '/update-user',
  UserDetail = '/get-user-detail-info',
  UserActionLog = '/get-action-log',
  ChargePwd = '/charge-pwd',
}

export const getUsersListApi = (params?: BasicPageParams) =>
  adminHttp.get<UsersListGetResultModel>({ url: Api.UsersList, params });

export const deleteUserApi = (params: UserIdParam) =>
  adminHttp.post({ url: Api.DeleteUser, params });

export const addUserApi = (params: UserListItem) => adminHttp.post({ url: Api.AddUser, params });

export const updateUserApi = (params: UserListItem) =>
  adminHttp.post({ url: Api.UpdateUser, params });

export const userDetailApi = (params: UserIdParam) =>
  adminHttp.post<UserListItem>({ url: Api.UserDetail, params });

export const getUserActionLogApi = (params: BasicPageParams) =>
  adminHttp.post<UsersActionLogListGetResultModel>({ url: Api.UserActionLog, params });

export const chargeUserPwdApi = (params: ChargePwdParams) =>
  adminHttp.post({ url: Api.ChargePwd, params });
