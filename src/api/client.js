import { axios } from '@/utils/request'

const api = {
  client: '/client',
  allClient: '/client/all',
  clientBalance: '/client/balance',
  workspace: '/workspace',
  billing: '/billings',
  clientBilling: '/client/billings'
}

// 列出客户
export function getClients (parameter) {
  return axios({
    url: api.client,
    method: 'get',
    params: parameter
  })
}

export function getAllClients () {
  return axios({
    url: api.allClient,
    method: 'get'
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

export function updateClient (parameter) {
  return axios({
    url: api.client,
    method: 'put',
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

export function getWorkSpaceMap () {
  return axios({
    url: api.workspace,
    method: 'get'
  })
}

export function getBillings (parameter) {
  return axios({
    url: api.billing,
    method: 'get',
    params: parameter
  })
}

export function getClientBillings (parameter) {
  return axios({
    url: api.clientBilling,
    method: 'get',
    params: parameter
  })
}
