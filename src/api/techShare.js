/**
 * js接口
 */
import request from '@/router/request';
import apiPrefix from '@/api/apiPrefixConfig'

//api前缀
const Prefix = `${apiPrefix.system}/techShare`

//获取列表数据
export const findList = (data) => {
    return request.post(`/${Prefix}/findList`,data);
};

//获取详情数据
export const findOne = (id) => {
    return request.get(`/${Prefix}/findOne/${id}`);
  };

