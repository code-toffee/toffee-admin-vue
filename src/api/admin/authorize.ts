import { adminHttp } from '/@/utils/http/axios';
import {
  AdminLoginParams,
  LoginResultModel,
  GetUserInfoModel,
  PermCodeModel,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/login',
  GetUserInfo = '/get-user-info',
  GetPremCode = '/get-prem-code',
  Logout = '/logout',
}

/**
 * @description: user login api
 */
export function adminLoginApi(params: AdminLoginParams, mode: ErrorMessageMode = 'modal') {
  return adminHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfoApi() {
  return adminHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo });
}

/**
 * @description: getPermCode
 */
export function getPermCodeApi() {
  return adminHttp.get<PermCodeModel>({ url: Api.GetPremCode });
}

export function doLogoutApi() {
  return adminHttp.get({ url: Api.Logout });
}
