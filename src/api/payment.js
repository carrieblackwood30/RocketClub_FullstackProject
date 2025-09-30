import api from './axios'

export const confirmPayment = () => api.post('/payment/confirm')