import { BasicFetchResult } from '../../model/baseModel';

export interface DeptListItem {
  id: string;
  orderNo: number;
  createTime: string;
  remark: string;
  status: boolean;
  children?: DeptListItem[];
  pid?: string | number;
}

export interface DeleteDeptListParam {
  ids: string[];
}

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;
