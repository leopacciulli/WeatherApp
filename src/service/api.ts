import axios, { AxiosPromise } from 'axios'
import { API_KEY } from '../utils/ApiKey'

export class Weather {
  getWeather(location: any, measure: string): AxiosPromise<any> {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&units=${measure}`)
  }
}
