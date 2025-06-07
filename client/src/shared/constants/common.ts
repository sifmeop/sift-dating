export const API_HOST = new URL(process.env.NEXT_PUBLIC_API_URL as string).origin
export const API_URL = API_HOST + '/api'
