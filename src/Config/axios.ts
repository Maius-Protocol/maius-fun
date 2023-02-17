import axios from 'axios'
import { Config } from '.'

export const axiosInstance = axios.create({
  baseURL: Config.API_URL,
  timeout: 30000,
})
