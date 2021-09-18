import { DeleteDeptListParam, DeptListGetResultModel, DeptListItem } from './model/deptModel';
import { adminHttp } from '/@/utils/http/axios';
enum Api {
  DeptList = '/get-dept-list',
  AddDept = '/add-dept',
  UpdateDept = '/update-dept',
  DeleteDept = '/delete-dept',
}

export const getDeptListApi = (params?: DeptListItem) =>
  adminHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const addDeptApi = (params?: DeptListItem) =>
  adminHttp.post<DeptListGetResultModel>({ url: Api.AddDept, params });

export const updateDeptApi = (params?: DeptListItem) =>
  adminHttp.post<DeptListGetResultModel>({ url: Api.UpdateDept, params });

export const deleteDeptApi = (params: DeleteDeptListParam) =>
  adminHttp.post<DeptListGetResultModel>({ url: Api.DeleteDept, params });
