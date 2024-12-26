/**
 * 页面主菜单js接口
 */
import request from '@/router/request';
import apiPrefix from '@/api/apiPrefixConfig'

//api前缀
const Prefix = `${apiPrefix.system}/menu`

//获取菜单树
export const getMenuTree = (data) => {
    return request.post(`${Prefix}/getMenuTree`,data);
};

//编辑菜单
export const updateOne = (data) => {
    return request.post(`${Prefix}/updateOne`,data);
};

//删除菜单
export const deleteOne = (id) => {
    return request.post(`${Prefix}/deleteOne/${id}`);
};

//修改排序
export const updateMenuOrder = (data) => {
    return request.post(`${Prefix}/updateMenuOrder`,data);
}

