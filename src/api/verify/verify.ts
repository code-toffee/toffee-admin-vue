import { defHttp } from '/@/utils/http/axios';

import { GetImgCodeModel } from './model/verifyModel';

enum Api {
  ImgCode = '/verify/img-code',
}

export function getImgCodeApi() {
  return defHttp.get<GetImgCodeModel>({ url: Api.ImgCode });
}
