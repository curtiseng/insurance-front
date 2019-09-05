import { axios } from '@/utils/request'

const api = {
  distribution: '/distribution'
}

export function getDistributions (parameter) {
  return axios({
    url: api.distribution,
    method: 'get',
    params: parameter
  })
}

export function addDistribution (parameter) {
  return axios({
    url: api.distribution,
    method: 'post',
    data: parameter
  })
}
