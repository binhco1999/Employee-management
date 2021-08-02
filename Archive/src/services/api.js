import axios from 'axios';
import Cookies from 'js-cookie' 
 
const url={
    baseUrl:"http://localhost:8080/api/test",
    departments:"/departments",
    employees:"/employees",
    login:"/login",

};

const instance=axios.create({
    baseURL:url.baseUrl,
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    },
});
/*
instance.interceptors.request.use((request) =>{
    const loginInfoStr = Cookies.get("loginInfo");
    if(loginInfoStr){
        const loginInfo = JSON.parse(loginInfoStr);
        request.headers.Authorization = `Bearer ${loginInfo.accessToken}`;
    }
    return request;
});

instance.interceptors.response.use((response) => {
    return response;
    },
    (error) => {
        if(error.response.status === 401) {
            window.location.href = "/login";
        }
    }
);
*/

export default{
    url:url,
    axios:instance,
    get:instance.get,
    put:instance.put,
    post:instance.post,
    delete:instance.delete
}