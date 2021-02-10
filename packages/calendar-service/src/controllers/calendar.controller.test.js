const Controller = require('./calendar.controller')
const informationService = require('../services/information.service')
const callApiService = require('../services/callApi.service')
const httpMocks = require('node-mocks-http')
const allCoursMock = require('../../mocks/allCourse.json')
const faker = require('faker')

informationService.packageParseInformation = jest.fn()
callApiService.getAllCourse = jest.fn()
callApiService.getDayCourses = jest.fn()
callApiService.getWeekCourses = jest.fn()
callApiService.getCoursById = jest.fn()

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
      informationService.packageParseInformation.mockReturnValue({
        name: 'ihna_calendarservice',
        version: '1.0.0'
      })

      await Controller.getStatus(req, res, next)

      expect(res._getJSONData()).toStrictEqual({
        name: 'ihna_calendarservice',
        version: '1.0.0'
      })
    })
  })

  describe('getAllCourse - api/v1/calendar/:calendarID', () => {
    it('Should have a getAllCourse function', () => {
      expect(typeof Controller.getAllCourse).toBe('function')
    })

    it('Should call callApiService.getAllCourse()', () => {
      const calendarId = faker.internet.email()
      req.params.calendarId = calendarId

      Controller.getAllCourse(req, res, next)

      expect(callApiService.getAllCourse).toBeCalledWith(calendarId)
    })

    it('Should return 200 response code', async () => {
      await Controller.getAllCourse(req, res, next)

      expect(res.statusCode).toBe(200)
      expect(res._isEndCalled()).toBeTruthy()
    })

    it('Should return name and version in response', async () => {
      callApiService.getAllCourse.mockResolvedValue(allCoursMock)

      await Controller.getAllCourse(req, res, next)

      expect(res._getJSONData()).toStrictEqual(allCoursMock)
    })

    it('Should handle errors', async () => {
      const errorMessage = { message: 'Error finding' }
      callApiService.getAllCourse.mockRejectedValue(errorMessage)

      await Controller.getAllCourse(req, res, next)

      expect(next).toBeCalledWith(errorMessage)
    })
  })

  describe('getDayCourses - api/v1/calendar/:calendarID/day', () => {
    it('Should have a getDayCourses function', () => {
      expect(typeof Controller.getDayCourses).toBe('function')
    })

    it('Should call callApiService.getDayCourses()', () => {
      const calendarId = faker.internet.email()
      req.params.calendarId = calendarId

      Controller.getDayCourses(req, res, next)

      expect(callApiService.getDayCourses).toBeCalledWith(calendarId, NaN)
    })

    it('Should call callApiService.getDayCourses() for the day asked', () => {
      const calendarId = faker.internet.email()
      req.params.calendarId = calendarId
      const day = 1729
      req.params.nextDay = day

      Controller.getDayCourses(req, res, next)

      expect(callApiService.getDayCourses).toBeCalledWith(calendarId, day)
    })

    it('Should return 200 response code', async () => {
      await Controller.getDayCourses(req, res, next)

      expect(res.statusCode).toBe(200)
      expect(res._isEndCalled()).toBeTruthy()
    })

    it('Should return courses for the next day in response', async () => {
      callApiService.getDayCourses.mockResolvedValue(allCoursMock)

      await Controller.getDayCourses(req, res, next)

      expect(res._getJSONData()).toStrictEqual(allCoursMock)
    })

    it('Should handle errors', async () => {
      const errorMessage = { message: 'Error finding' }
      callApiService.getDayCourses.mockRejectedValue(errorMessage)

      await Controller.getDayCourses(req, res, next)

      expect(next).toBeCalledWith(errorMessage)
    })
  })

  describe('getWeekCourses - api/v1/calendar/:calendarID/week', () => {
    it('Should have a getWeekCourses function', () => {
      expect(typeof Controller.getWeekCourses).toBe('function')
    })

    it('Should call callApiService.getWeekCourses()', () => {
      const calendarId = faker.internet.email()
      req.params.calendarId = calendarId

      Controller.getWeekCourses(req, res, next)

      expect(callApiService.getWeekCourses).toBeCalledWith(calendarId, NaN)
    })

    it('Should call callApiService.getDayCourses() for the day asked', () => {
      const calendarId = faker.internet.email()
      req.params.calendarId = calendarId
      const day = 1729
      req.params.nextWeek = day

      Controller.getWeekCourses(req, res, next)

      expect(callApiService.getWeekCourses).toBeCalledWith(calendarId, day)
    })

    it('Should return 200 response code', async () => {
      await Controller.getWeekCourses(req, res, next)

      expect(res.statusCode).toBe(200)
      expect(res._isEndCalled()).toBeTruthy()
    })

    it('Should course for the week response', async () => {
      callApiService.getWeekCourses.mockResolvedValue(allCoursMock)

      await Controller.getWeekCourses(req, res, next)

      expect(res._getJSONData()).toStrictEqual(allCoursMock)
    })

    it('Should handle errors', async () => {
      const errorMessage = { message: 'Error finding' }
      callApiService.getWeekCourses.mockRejectedValue(errorMessage)

      await Controller.getWeekCourses(req, res, next)

      expect(next).toBeCalledWith(errorMessage)
    })
  })

  describe('getWeekCourses - api/v1/calendar/:calendarID/:eventId', () => {
    it('Should have a getCoursById function', () => {
      expect(typeof Controller.getCoursById).toBe('function')
    })

    it('Should call callApiService.getWeekCourses()', () => {
      const calendarId = faker.internet.email()
      const eventId = faker.internet.password(17, true)
      req.params.calendarId = calendarId
      req.params.idCours = eventId

      Controller.getCoursById(req, res, next)

      expect(callApiService.getCoursById).toBeCalledWith(calendarId, eventId)
    })

    it('Should return 200 response code', async () => {
      await Controller.getCoursById(req, res, next)

      expect(res.statusCode).toBe(200)
      expect(res._isEndCalled()).toBeTruthy()
    })

    it('Should return name and version in response', async () => {
      callApiService.getCoursById.mockResolvedValue(allCoursMock)

      await Controller.getCoursById(req, res, next)

      expect(res._getJSONData()).toStrictEqual(allCoursMock)
    })

    it('Should handle errors', async () => {
      const errorMessage = { message: 'Error finding' }
      callApiService.getCoursById.mockRejectedValue(errorMessage)

      await Controller.getCoursById(req, res, next)

      expect(next).toBeCalledWith(errorMessage)
    })
  })
})
