const Controller = require('./calendar.controller')
const informationService = require('../services/information.service')
const callApiService = require('../services/callApi.service')
const httpMocks = require('node-mocks-http')
const faker = require('faker')

informationService.packageParseInformation = jest.fn()
callApiService.callApiService = jest.fn()

let req, res, next

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
})

describe('Calendar Controller', () => {
  describe('GetStatus - api/v1/calendar/status', () => {
    it('Should have a getStatus function', () => {
      expect(typeof Controller.getStatus).toBe('function')
    })

    it('Should call packageParseInformation()', () => {
      Controller.getStatus(req, res, next)

      expect(informationService.packageParseInformation).toBeCalledWith(req)
    })

    it('Should return 200 response code', async () => {
      await Controller.getStatus(req, res, next)

      expect(res.statusCode).toBe(200)
      expect(res._isEndCalled()).toBeTruthy()
    })

    it('Should return name and version in response', async () => {
      informationService.packageParseInformation.mockReturnValue({ name: 'ihna_calendarservice', version: '1.0.0' })

      await Controller.getStatus(req, res, next)

      expect(res._getJSONData()).toStrictEqual({ name: 'ihna_calendarservice', version: '1.0.0' })
    })
  })

  describe('getAllCourse - api/v1/calendar/:calendarID', () => {
    it('Should have a getStatus function', () => {
      expect(typeof Controller.getAllCourse).toBe('function')
    })

    it('Should call getAllCourse()', () => {
      const calendarId = faker.internet.email()
      req.params.calendarId = calendarId

      Controller.getAllCourse(req, res, next)

      expect(callApiService.getAllCourse()).toBeCalledWith(calendarId)
    })

    it('Should return 200 response code', async () => {
      await Controller.getAllCourse(req, res, next)

      expect(res.statusCode).toBe(200)
      expect(res._isEndCalled()).toBeTruthy()
    })

    it('Should return name and version in response', async () => {
      callApiService.getAllCourse().mockReturnValue({ name: 'ihna_calendarservice', version: '1.0.0' })

      await Controller.getAllCourse(req, res, next)

      expect(res._getJSONData()).toStrictEqual({ name: 'ihna_calendarservice', version: '1.0.0' })
    })
  })
})
