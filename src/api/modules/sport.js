/*
*  运动场地  接口
*/
import request from 'utils/request'

// 列表
function list(params) {
  return request.get('/sport/list',params)
}

// 添加
function add(params) {
  return request.postJson('/sport/add', params)
}

// 修改
function edit(params) {
  return request.put('/sport/update', params)
}

// 详情
function detail(id) {
  return request.get(`/sport/detail/${id}`)
}

// 删除
function _delete(id) {
  return request.delete(`/sport/delete/${id}`)
}


//所有运动
function getSports(params){
  return request.get('/sport/allSport',params)
}
//禁、启用场地
function handleStatus(params) {
  return request.postJson('/sport/status', params)
}

export default {
  list,
  add,
  edit,
  detail,
  _delete,
  getSports,
  handleStatus
}
