import axios from "axios";
import {testConfig} from "../../../../test-utils/TestConfig";

describe('auth router', () => {
  const host = `${testConfig.host}:${testConfig.port}`
  const authRoute = '/api/v0/users/auth'
  const buildUrl = (endpoint: string) => `${host}${authRoute}${endpoint}`

  describe('get /verification', () => {
    it('should return unauthorized when headers are missing',async () => {
      const result = await axios.get(buildUrl('/verification'))
        .catch(error => error)
      expect(result.response.status).toEqual(401)
      expect(result.response.data.message).toEqual('No authorization headers.')
    })

    it('should return unauthorized when authorization headers are empty',async () => {
      const headers = {authorization: ''}
      const result = await axios.get(buildUrl('/verification'), {headers})
        .catch(error => error)
      expect(result.response.status).toEqual(401)
      expect(result.response.data.message).toEqual('No authorization headers.')
    })

    it('should return error malformed token when auth token malformed',async () => {
      const headers = {authorization: 'foo'}
      const result = await axios.get(buildUrl('/verification'), {headers})
        .catch(error => error)
      expect(result.response.status).toEqual(401)
      expect(result.response.data.message).toEqual('Malformed token.')
    })

    it('should return server error when authorization header fails to authenticate',async () => {
      const headers = {authorization: 'Bearer foo'}
      const result = await axios.get(buildUrl('/verification'), {headers})
        .catch(error => error)
      expect(result.response.status).toEqual(500)
      expect(result.response.data.message).toEqual('Failed to authenticate.')
      expect(result.response.data.auth).toEqual(false)
    })

    it('should verify authentication', async () => {
      const headers = {authorization: `Bearer ${testConfig.token}`}
      const result = await axios.get(buildUrl('/verification'), {headers})
      expect(result.status).toEqual(200)
      expect(result.data.message).toEqual('Authenticated.')
      expect(result.data.auth).toEqual(true)
    })
  })
})
