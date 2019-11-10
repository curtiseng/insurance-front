import { axios } from '@/utils/request'

const api = {
  staff: '/staff',
  upload: '/staff/excel/import',
  createMail: '/staff/create/send',
  leaveMail: '/staff/leave/send',
  batchDelete: '/staff/batch/delete'
}

// 删除用户
export function deleteStaff (id) {
  return axios({
    url: `${api.staff}/${id}`,
    method: 'delete'
  })
}

export function batchDelete (ids) {
  return axios({
    url: api.batchDelete,
    method: 'post',
    data: ids
  })
}

// 获取用户列表 parameter: { size: 10, page: 1 }
export function getStaff (parameter) {
  return axios({
    url: api.staff,
    method: 'get',
    params: parameter
  })
}

// 没有client参数增加用户
export function addStaff (parameter) {
  return axios({
    url: api.staff,
    method: 'post',
    data: parameter
  })
}

// 有client参数增加用户,供管理员使用
export function addStaffWithClient (parameter) {
  return axios({
    url: api.staff,
    method: 'post',
    data: parameter,
    params: parameter.clientId
  })
}

export function uploadStaffs (parameter) {
  return axios({
    url: api.upload,
    method: 'post',
    data: parameter,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function sendCreateEmail (parameter) {
  return axios({
    url: api.createMail,
    method: 'get',
    params: parameter
  })
}

export function sendLeaveEmail (parameter) {
  return axios({
    url: api.leaveMail,
    method: 'get',
    params: parameter
  })
}
