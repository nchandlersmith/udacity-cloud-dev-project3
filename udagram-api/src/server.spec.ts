import axios from 'axios'

describe('root endpoints', () => {
  describe('/', () => {
    it('should return 200', async () => {
      const result = await axios.get('http://localhost:8082/')
      expect(result.status).toBe(200)
      expect(result.data).toBe('Nothing here.')
    })
  })

  describe('/health', () => {
    it('should return 200', async () => {
      const result = await axios.get("http://localhost:8082/health")
      expect(result.status).toBe(200)
      expect(result.data.message).toBe('App is healthy.')
    })
  })
})

