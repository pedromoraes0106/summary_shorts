import axios from "axios" //Conecta front-end com back-end

export const server = axios.create({
  baseURL: "http://localhost:3333/",
})