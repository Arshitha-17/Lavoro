import axios from "axios";

export const usersApi = axios.create({
    baseURL: 'https://www.lavoroo.site/api/',
  });

  