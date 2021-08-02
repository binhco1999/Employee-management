import Api from './api'

const list = () => Api.get(Api.url.employees);

const get = (id) => Api.get(`${Api.url.employees}/${id}`);

const add = (data) => Api.post(Api.url.employees, data);

const update = (id, data) => Api.put(`${Api.url.employees}/${id}`, data);

const remove = (id) => Api.delete(`${Api.url.employees}/${id}`);

export default {
  list: list,
  get: get,
  add: add,
  update: update,
  remove: remove,
};