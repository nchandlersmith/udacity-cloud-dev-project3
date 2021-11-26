import axios from "axios";
import {Sequelize} from "sequelize-typescript";
import {toBeNotEmptyString} from "../../../../test-utils/ExpectExtensions";

expect.extend({
  toBeNotEmptyString
})

describe('users router', () => {
  const host = 'http://localhost:8082'
  const usersPath = '/api/v0/users'
  let sequelize: Sequelize

  const buildUrl = (endpoint: string): string => {
    return `${host}${usersPath}${endpoint}`
  }
  describe(' get /:id', () => {
    // TODO: should handle out of range errors
    // TODO: return valid JSON
    // TODO: should not return null item, ugh
    it('should do something', async () => {
      // TODO: should probably use test account injected in setup
      const result = await axios.get(buildUrl('/hello@gmail.com'))
      expect(result.status).toEqual(200)
      expect(result.data.createdAt).toBeNotEmptyString()
      expect(result.data.email).toEqual('hello@gmail.com')
      expect(result.data.passwordHash).not.toBeNull()
      expect(result.data.passwordHash).not.toEqual('')
      expect(result.data.updatedAt).toBeNotEmptyString()
    })
  })
})
