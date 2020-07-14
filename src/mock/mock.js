import Axios from 'axios'
import MockAdapter from 'axios-mock-adapter';
// 1.引入构造数据的mock方法
import {
  Users
} from '@/mock/data/user.js';

let _Users = Users;


// 2.定义 封装并暴露获取数据的框架
export default {
  bootstrap() {
    const mock = new MockAdapter(Axios);

    //获取商品列表 
    //config是axios config 
    mock.onGet('/api/product/list').reply(config => {
      let {
        name
      } = config.params;
      // let name = config.params.name;
      console.log(`name:  ${name}`);

      let mockUsers = _Users.filter(user => {
        // if (name && user.name.indexOf(name) == -1) return false;
        // return true;
        return !(name && user.name.indexOf(name) == -1);
      });

      console.log(`mockUsers:  ${mockUsers}`);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]); //返回一个数组[status, data, headers] 
        }, 500);
      });
    });
    // ====================================================================
    // 02.获取用户分页
    mock.onGet('/api/product/listpage').reply(config => {
      let {
        page,
        name
      } = config.params;
      let mockUsers = _Users.filter(user => { // filter遍历数组  user是数组项 不满足if条件的内容赋值给mockUsers
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });

      const pageSize = 8; // 每页显示数据条数
      const total = mockUsers.length; // 构造数据的总条数
      mockUsers = mockUsers.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 400);
      })
    });

    //======================================================================================== 
    // 03.删除用户
    mock.onGet('/api/product/remove').reply(config => {
      let {
        id
      } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/api/product/batchremove').reply(config => {
      let {
        ids
      } = config.params;
      // console.log(ids);
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/api/product/edit').reply(config => {
      let {
        id,
        name,
        addr,
        age,
        birth,
        sex
      } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/api/product/add').reply(config => {
      let {
        name,
        addr,
        age,
        birth,
        sex
      } = config.params;
      console.log(`name ${name} addr: ${addr} age:${age}`)
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });
  }
}
