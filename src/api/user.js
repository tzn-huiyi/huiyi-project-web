/**
 * 页面主菜单js接口
 */
import request from '@/router/request';
import apiPrefix from '@/api/apiPrefixConfig'

//api前缀
const Prefix = `${apiPrefix.system}/user`


export const findList = (data) => {
    return request.post(`${Prefix}/findList`,data);
};




