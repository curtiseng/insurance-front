import { axios } from '@/utils/request'

const api = {
  insurance: '/insurance'
}

// 列出客户
export function getInsuracnes (parameter) {
  return axios({
    url: api.insurance,
    method: 'get',
    params: parameter
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
