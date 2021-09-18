import { BasicFetchResult } from '../../model/baseModel';

export interface RoleListItem {
  id: number;
  name: string;
  level: number;
  description: string;
  dataScope: string;
  createdTime: string;
  deptIds?: string[];
  menuIds?: string[];
}

export interface DeleteRoleParams {
  id: number;
}

export interface RoleAllListItem {
  id: number;
  name: string;
}

export type RoleListGetResultModel = BasicFetchResult<RoleListItem>;
export type RoleAllListGetResultModel = BasicFetchResult<RoleAllListItem>;
