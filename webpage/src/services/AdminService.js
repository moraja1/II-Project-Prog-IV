import axios from "axios";

const REST_URL_PREFIX= "http://localhost:8080/admin";

export const userList = () => axios.get(`${REST_URL_PREFIX}/users`);

