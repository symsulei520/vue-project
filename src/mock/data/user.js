import Mock from 'mockjs';

// 1.定义一个数组接收mockjs构造出的数据
const Users = [];

// 2.定义Mock构造数据的方法
for (let i = 0; i < 20; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }))
}

// 3.暴露接受mock构造的数据的数组

export {
  Users
};
