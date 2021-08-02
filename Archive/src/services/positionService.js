import { post } from 'jquery';
import Api from './api';
 
const list=()=>Api.get(Api.url.positions);
const get=id=>Api.get(`${Api.url.positions}/${id}`)

const add=data=>Api.post(Api.url.positions,data);
const update=(id,data)=>Api.put(`${Api.url.positions}/${id}`, data);
const remove=(id)=>Api.delete(`${Api.url.positions}/${id}`);

export default {
    list:list,
    get:get,
    add:add,
    update:update,
    delete:remove
}