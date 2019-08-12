import { axios } from '@/utils/request'

const api = {
  info: '/admin',
  list: '/admin'
}

// 根据用户 id 获取用户信息
export function getAdmin (id) {
  return axios({
    url: `${api.user}/${id}`,
    method: 'get'
  })
}

// 增加用户
export function addAdmin (parameter) {
  return axios({
    url: api.user,
    method: 'post',
    data: parameter
  })
}

// 更新用户 // or (id, parameter)
export function updateAdmin (parameter) {
  return axios({
    url: `${api.user}/${parameter.id}`, // or `${api.user}/${id}`
    method: 'put',
    data: parameter
  })
}

// 删除用户
export function deleteAdmin (id) {
  return axios({
    url: `${api.user}/${id}`,
    method: 'delete'
  })
}

// 获取用户列表 parameter: { pageSize: 10, pageNo: 1 }
export function getAdmins (parameter) {
  return axios({
    url: api.list,
    method: 'get',
    params: parameter
  })
}
