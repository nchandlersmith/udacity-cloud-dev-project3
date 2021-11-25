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
})
