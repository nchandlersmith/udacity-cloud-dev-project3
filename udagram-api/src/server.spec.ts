import axios from 'axios'

describe('root endpoints', () => {
  describe('/', () => {
    // TODO: should return valid JSON
    it('should return 200', async () => {
      const result = await axios.get('http://localhost:8082/')
      expect(result.status).toEqual(200)
      expect(result.data).toEqual('Nothing here.')
    })
  })

  describe('/health', () => {
    it('should return 200', async () => {
      const result = await axios.get("http://localhost:8082/health")
      expect(result.status).toEqual(200)
      expect(result.data.message).toEqual('App is healthy.')
    })
  })
})

