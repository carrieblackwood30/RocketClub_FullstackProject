import api from './axios'

export const getVisits = () => api.get('/visits')
export const useVisit = () => api.post('/visits/use')