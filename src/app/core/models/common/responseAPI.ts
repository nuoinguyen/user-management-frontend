import { AxiosResponse } from "axios"

declare module 'axios' {
    export interface AxiosRequestConfig {
      raw?: boolean
      silent?: boolean
    }
  }

export class HttpError extends Error {
    constructor(message?: string) {
      super(message) // 'Error' breaks prototype chain here
      this.name = 'HttpError'
      Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    }
  }