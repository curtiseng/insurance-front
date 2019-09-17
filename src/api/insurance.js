import { axios } from '@/utils/request'

const api = {
  insurance: '/insurance',
  list: '/insurance/list'
}

// 列出客户
export function getInsuracnes (parameter) {
  return axios({
    url: api.insurance,
    method: 'get',
    params: parameter
  })
}

export function getInsuracneList (parameter) {
  return axios({
    url: api.list,
    method: 'get',
    params: parameter
  })
}

export function getInsuracneById (id) {
  return axios({
    url: `${api.insurance}/${id}`,
    method: 'get'
  })
}

// 删除用户
export function deleteInsurance (id) {
  return axios({
    url: `${api.insurance}/${id}`,
    method: 'delete'
  })
}

// 增加用户
export function addInsurance (parameter) {
  return axios({
    url: api.insurance,
    method: 'post',
    data: parameter
  })
}

export function updateInsurance (parameter) {
  return axios({
    url: api.insurance,
    method: 'put',
    data: parameter
  })
}
