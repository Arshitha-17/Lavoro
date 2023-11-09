import axios from "axios";

export const usersApi = axios.create({
    baseURL:  "http://www.lavoroo.site/api/",
  });

