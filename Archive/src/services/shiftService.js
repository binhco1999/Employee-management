import { post } from 'jquery';
import Api from './api';
 
const list=()=>Api.get(Api.url.shifts);
const get=id=>Api.get(`${Api.url.shifts}/${id}`)

const add=data=>Api.post(Api.url.departshiftsments,data);
const update=(id,data)=>Api.put(`${Api.url.shifts}/${id}`, data);
const remove=(id)=>Api.delete(`${Api.url.shifts}/${id}`);

export default {
    list:list,
    get:get,
    add:add,
    update:update,
    delete:remove
}