import http from '../utils/request'


// //请求首页的数据
export const getData = () => {
    // 返回一个promise对象
    return http.get('/home/getData');
}

export const getUser = (params)=>{
    // 返回用户列表
    return http.get('/user/getUser',params)
  
}
console.log(getUser,"+++++");

export const addUser = (data)=>{
    // 
    return http.post('/user/add',data)
}

export const editUser = (data)=>{
    // 
    return http.post('/user/edit',data)
}

export const delUser = (data)=>{
    // 
    return http.post('/user/del',data)
}


// export default({
//     data() {
//         return {}
//     }
// }

export const getMenu = (data)=>{
    console.log(data,'getmenudata');
    return http.post('/permission/getMenu',data)
}













