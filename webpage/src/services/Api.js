import axios from 'axios';

const getHeaders = (user) => {
    if(typeof user !== 'undefined') {return {}}
    return {
        'id': user.id,
    }
}

export const gnrlAPI = axios.create({
    baseURL: `http://localhost:8080/api/users`
});

export const adminAPI = axios.create({
    baseURL: `http://localhost:8080/api/admin/users`
});

export const authAPI = axios.create({
    baseURL: 'http://localhost:8080/api/auth'
})