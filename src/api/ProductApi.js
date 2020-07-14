import Axios from 'axios';

// 封装并暴露调用mockjs 构造获取商品用户列表（分页）的框架 的接口
export const RequestProductListPage = function(name,pageno) {
    return Axios({
        url: '/api/product/listpage',
        method: 'get',
        params: {
            name: name,
            page: pageno
        }
    })
}

// 封装并暴露调用mockjs 构造 删除商品用户数据框架 的接口
export const RequestProductDeleteByID = (id) => {
    return Axios({
        url: '/api/product/remove',
        method: 'get',
        params:{
            id
        }
    })
}

// 封装并暴露 批量删除用户的接口
export const RequestProducDeleteBatch = (ids) =>{
    return Axios({
        url:'/api/product/batchremove',
        method:'get',
        params: {
            ids:ids.ids
        }
    })
}

// 封装添加商品用户数据的接口

export const RequestProductAdd = (name,addr,age,birth,sex) => {
    return Axios({
        url: '/api/product/add',
        method: 'get',
        params:{
            name,
            addr,
            age,
            birth,
            sex
        }
    })
}

//  封装编辑 的接口
export const RequestProductEdit = (user) => {
    return Axios({
        url:'/api/product/edit',
        method:'get',
        params: {
            id:user.id, name:user.name, addr:user.addr, age:user.age, birth:user.birth, sex:user.sex
        }
    })
}