import axios from 'axios'

describe('feed router', () => {
  const host = 'http://localhost:8082'
  const feedPath = '/api/v0/feed'
  const buildUrl = (endpoint: string): string => {
    return `${host}${feedPath}${endpoint}`
  }

  describe('get /',() => {
    it('should return all feed items', async () => {
      const result = await axios.get(buildUrl('/'))
      expect(result.status).toEqual(200)
      expect(result.data.count).toEqual(1)
      expect(result.data.rows[0].caption).toEqual('Hello')
      expect(result.data.rows[0].createdAt).toEqual('2021-11-25T15:31:17.238Z')
      expect(result.data.rows[0].updatedAt).toEqual('2021-11-25T15:31:17.238Z')
      expect(result.data.rows[0].url).toContain('https://udagram-707863247739-dev.s3.amazonaws.com/test.jpg')
      expect(result.data.rows[0].id).toEqual(1)
    })
  })

  // TODO: handle out of range
  describe('get /1', () => {
    it('should return feed item with id = 1', async () => {
      const result = await axios.get(buildUrl('/1'))
      expect(result.status).toEqual(200)
      expect(result.data.caption).toEqual('Hello')
      expect(result.data.createdAt).toEqual('2021-11-25T15:31:17.238Z')
      expect(result.data.updatedAt).toEqual('2021-11-25T15:31:17.238Z')
      expect(result.data.url).toContain('test.jpg')
      expect(result.data.id).toEqual(1)
    })
  })

  describe('get signed-url/:filename', () => {
    it('should return unauthorized when headers are missing',async () => {
      const result = await axios.get(buildUrl('/signed-url/test.jpg'))
        .catch(error => error)
      expect(result.response.status).toEqual(401)
      expect(result.response.data.message).toEqual('No authorization headers.')
    })

    it('should return unauthorized when authorization headers are empty',async () => {
      const headers = {authorization: ''}
      const result = await axios.get(buildUrl('/signed-url/test.jpg'), {headers})
        .catch(error => error)
      expect(result.response.status).toEqual(401)
      expect(result.response.data.message).toEqual('No authorization headers.')
    })

    it('should return error malformed token when auth token not Bearer',async () => {
      const headers = {authorization: 'foo'}
      const result = await axios.get(buildUrl('/signed-url/test.jpg'), {headers})
        .catch(error => error)
      expect(result.response.status).toEqual(401)
      expect(result.response.data.message).toEqual('Malformed token.')
    })

    it('should return server error when authorization header fails to authenticate',async () => {
      const headers = {authorization: 'Bearer foo'}
      const result = await axios.get(buildUrl('/signed-url/test.jpg'), {headers})
        .catch(error => error)
      expect(result.response.status).toEqual(500)
      expect(result.response.data.message).toEqual('Failed to authenticate.')
    })

    it('should return signed url to file',async () => {
      const headers = {authorization: `Bearer ${process.env.JWT_TEST_TOKEN}`}
      const result = await axios.get(buildUrl('/signed-url/test.jpg'), {headers})
      expect(result.status).toEqual(201)
      expect(result.data.url).toContain('https://udagram-707863247739-dev.s3.amazonaws.com/test.jpg')
    })
  })
})
