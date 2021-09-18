import { BasicPageParams } from '../model/baseModel';
import {
  DeleteRoleParams,
  RoleAllListGetResultModel,
  RoleListGetResultModel,
  RoleListItem,
} from './model/roleModel';
import { adminHttp } from '/@/utils/http/axios';
enum Api {
  RoleList = '/get-role-list',
  AddRole = '/add-role',
  UpdateRole = '/update-role',
  DeleteRole = '/delete-role',
  GetAllRoleList = '/get-all-role-list',
}

export const getRoleListApi = (params?: BasicPageParams) =>
  adminHttp.get<RoleListGetResultModel>({ url: Api.RoleList, params });

export const getAllRoleListApi = (params?: BasicPageParams) =>
  adminHttp.get<RoleAllListGetResultModel>({ url: Api.GetAllRoleList, params });

export const addRoleApi = (params?: RoleListItem) =>
  adminHttp.post<RoleListGetResultModel>({ url: Api.AddRole, params });

export const updateRoleApi = (params?: RoleListItem) =>
  adminHttp.post<RoleListGetResultModel>({ url: Api.UpdateRole, params });

export const deleteRoleApi = (params: DeleteRoleParams) =>
  adminHttp.post<RoleListGetResultModel>({ url: Api.DeleteRole, params });
