import Mock from 'mockjs'
import { getData } from '.';
import homeApi from './mockServeData/home'
import user from './mockServeData/User'
import permission from './mockServeData/permission';

//定义mock请求拦截
// Mock.mock('/api/home/getData',function(){
//     // 拦截到请求后的处理逻辑
//     console.log('拦截');
//     return []
// })

Mock.mock('/api/home/getData',homeApi)

// 用户列表的数据
Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock(/api\/user\/getUser/,user.getUserList)

Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)





