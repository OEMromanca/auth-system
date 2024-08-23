import * as CryptoJS from 'crypto-js'

export const generateToken = () => {
  return CryptoJS.lib.WordArray.random(16).toString()
}

export const hashPassword = (password: string) => {
  return CryptoJS.SHA256(password).toString()
}
