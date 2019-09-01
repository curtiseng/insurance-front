import { axios } from '@/utils/request'

const api = {
  company: '/admin/company'
}

// 删除用户
export function deleteCompanyAdmin (id) {
  return axios({
    url: `${api.company}/${id}`,
    method: 'delete'
  })
}

// 获取用户列表 parameter: { size: 10, page: 1 }
export function getCompanyAdmins (parameter) {
  return axios({
    url: api.company,
    method: 'get',
    params: parameter
  })
}

// 增加用户
export function addCompanyAdmin (parameter) {
  return axios({
    url: api.company,
    method: 'post',
    data: parameter
  })
}
