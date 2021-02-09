const supertest = require('supertest')
const app = require('../src/server')
const { calendarId, eventId } = require('../src/constants')
const googleAuth = require('../src/services/googleAuth.service')

const endpointUrl = '/api/v1/calendar'

beforeEach(() => {
  googleAuth.connect()
})

describe('Integreation test for Calendar Service controllers : ' + endpointUrl, () => {
  describe('Good fonctionnement of all function', () => {
    it('Should GET' + endpointUrl + '/status return informations with name and version', async () => {
      const response = await supertest(app)
        .get(endpointUrl + '/status')

      expect(response.statusCode).toBe(200)
      expect(response.body.message).toBeDefined()
      expect(response.body.timestamp).toBeDefined()
      expect(response.body.name).toBeDefined()
      expect(response.body.version).toBeDefined()
      expect(response.body.revision).toBeDefined()
    })

    it('Should GET' + endpointUrl + '/:calendarId return allCourse', async () => {
      const response = await supertest(app)
        .get(endpointUrl + '/' + calendarId)

      expect(response.statusCode).toBe(200)
      expect(Array.isArray(response.body.all)).toBeTruthy()
    })

    it('Should GET' + endpointUrl + '/:calendarId/day return course of the day', async () => {
      const response = await supertest(app)
        .get(endpointUrl + '/' + calendarId + '/day')

      expect(response.statusCode).toBe(200)
      expect(Array.isArray(response.body.day)).toBeTruthy()
    })

    it('Should GET' + endpointUrl + '/:calendarId/day/id return course', async () => {
      const response = await supertest(app)
        .get(endpointUrl + '/' + calendarId + '/day/1')

      expect(response.statusCode).toBe(200)
      expect(Array.isArray(response.body.day)).toBeTruthy()
    })

    it('Should GET' + endpointUrl + '/:calendarId/week return course of the day', async () => {
      const response = await supertest(app)
        .get(endpointUrl + '/' + calendarId + '/week')

      expect(response.statusCode).toBe(200)
      expect(Array.isArray(response.body.week)).toBeTruthy()
    })

    it('Should GET' + endpointUrl + '/:calendarId/week/id return course', async () => {
      const response = await supertest(app)
        .get(endpointUrl + '/' + calendarId + '/week/1')

      expect(response.statusCode).toBe(200)
      expect(Array.isArray(response.body.week)).toBeTruthy()
    })

    it('Should GET' + endpointUrl + '/:calendarId/eventId return only event', async () => {
      const response = await supertest(app)
        .get(endpointUrl + '/' + calendarId + '/' + eventId)

      expect(response.statusCode).toBe(200)
      expect(response.body.title).toBeDefined()
    })
  })
})
