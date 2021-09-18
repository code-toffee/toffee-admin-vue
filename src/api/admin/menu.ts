import { adminHttp } from '/@/utils/http/axios';
import {
  DeleteMenuParam,
  GetAdminMenuTableListApi,
  getMenuListResultModel,
  MenuStructParam,
} from './model/menuModel';

enum Api {
  GetMenuList = '/get-menus',
  GetMenuTableList = '/get-menu-list',
  DeleteMenu = '/delete-menu',
  AddMenu = '/add-menu',
  UpdateMenu = '/update-menu',
}

/**
 * @description: Get user menu based on id
 */

export const getAdminMenuListApi = () => {
  return adminHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};

/**
 * @description: Get user menu based on id
 */

export const getAdminMenuTableListApi = () => {
  return adminHttp.get<GetAdminMenuTableListApi>({ url: Api.GetMenuTableList });
};

export const deleteMenuApi = (params: DeleteMenuParam) =>
  adminHttp.post({ url: Api.DeleteMenu, params });

export const addMenuApi = (params: MenuStructParam) => adminHttp.post({ url: Api.AddMenu, params });
export const updateMenuApi = (params: MenuStructParam) =>
  adminHttp.post({ url: Api.UpdateMenu, params });
