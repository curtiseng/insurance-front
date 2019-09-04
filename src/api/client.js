import { axios } from '@/utils/request'

const api = {
  client: '/client',
  clientBalance: '/client/balance'
}

// 列出客户
export function getClients (parameter) {
  return axios({
    url: api.client,
    method: 'get',
    params: parameter
  })
}

// 增加客户
export function addClient (parameter) {
  return axios({
    url: api.client,
    method: 'post',
    data: parameter
  })
}

// 删除客户
export function deleteClient (parameter) {
  return axios({
    url: `${api.client}/${parameter}`,
    method: 'delete'
  })
}

// 添加金额
export function addClientBalance (parameter) {
  return axios({
    url: api.clientBalance,
    method: 'post',
    data: parameter
  })
}
