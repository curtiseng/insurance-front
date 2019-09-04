import { axios } from '@/utils/request'

const api = {
  backend: '/admin/backend',
  company: '/admin/company'
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
export function deleteBackendAdmin (id) {
  return axios({
    url: `${api.backend}/${id}`,
    method: 'delete'
  })
}

// 获取用户列表 parameter: { size: 10, page: 1 }
export function getBackendAdmins (parameter) {
  return axios({
    url: api.backend,
    method: 'get',
    params: parameter
  })
}

// 增加用户
export function addBackendAdmin (parameter) {
  return axios({
    url: api.backend,
    method: 'post',
    data: parameter
  })
}

// 增加用户
export function addCompanyAdmin (parameter, client) {
  return axios({
    url: api.company,
    method: 'post',
    data: parameter,
    params: client
  })
}
