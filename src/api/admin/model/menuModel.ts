import type { RouteMeta } from 'vue-router';
import { BasicFetchResult } from '../../model/baseModel';
export interface RouteItem {
  id: string;
  pid?: string;
  permission?: string;
  status?: boolean;

  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}

export interface DeleteMenuParam {
  ids: string[];
}

export interface MenuStructParam {
  id: string;
  type: number;
  title: string;
  path: string;
  redirect: string;
  pid: string;
  status: boolean;
  component: string;
  name: string;
  orderNo: number;
  icon: string;
  permission: string;
  iFrame: boolean;
  framePath: string;
  cache: boolean;
  hideMenu: boolean;
  ids?: string[];
  children?: MenuStructParam[];
}

/**
 * @description: Get menu return value
 */
export type getMenuListResultModel = BasicFetchResult<RouteItem>;

export type GetAdminMenuTableListApi = BasicFetchResult<MenuStructParam>;
