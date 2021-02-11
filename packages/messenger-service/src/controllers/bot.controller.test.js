const Controller = require('./bot.controller')
const messengerService = require('../services/messenger.service')
const httpMocks = require('node-mocks-http')
const faker = require('faker')

messengerService.verifyWebhook = jest.fn()

let req, res, next

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('Service Controller', () => {
  describe('VerifyWebhook - api/v1/calendar/status', () => {
    it('Should have a verifyWebhook function', () => {
      expect(typeof Controller.verifyWebhook).toBe('function')
    })

    it('Should call packageParseInformation()', () => {
      Controller.verifyWebhook(req, res, next)

      expect(messengerService.verifyWebhook).toBeCalledWith(req)
    })

    it('Should return 200 response code', async () => {
      await Controller.verifyWebhook(req, res, next)

      expect(res.statusCode).toBe(200)
      expect(res._isEndCalled()).toBeTruthy()
    })

    it('Should return challenge', async () => {
      const challenge = 1234567890
      messengerService.verifyWebhook.mockResolvedValue(challenge)

      await Controller.verifyWebhook(req, res, next)

      expect(res.statusCode).toStrictEqual(challenge)
    })
  })
})
