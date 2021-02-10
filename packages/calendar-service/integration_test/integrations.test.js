const supertest = require('supertest')
const app = require('../src/server')
const { calendarId, eventId } = require('../src/constants')
const googleAuth = require('../src/services/googleAuth.service')

const endpointUrl = '/api/v1/calendar'

beforeEach(() => {
  googleAuth.connect()
})

describe(
  'Integreation test for Calendar Service controllers : ' + endpointUrl,
  () => {
    describe('Good fonctionnement of all function', () => {
      it(
        'Should GET' +
          endpointUrl +
          '/status return informations with name and version',
        async () => {
          const response = await supertest(app).get(endpointUrl + '/status')

          expect(response.statusCode).toBe(200)
          expect(response.body.message).toBeDefined()
          expect(response.body.timestamp).toBeDefined()
          expect(response.body.name).toBeDefined()
          expect(response.body.version).toBeDefined()
          expect(response.body.revision).toBeDefined()
        }
      )

      it(
        'Should GET' + endpointUrl + '/:calendarId return allCourse',
        async () => {
          const response = await supertest(app).get(
            endpointUrl + '/' + calendarId
          )

          expect(response.statusCode).toBe(200)
          expect(Array.isArray(response.body.all)).toBeTruthy()
        }
      )

      it(
        'Should GET' +
          endpointUrl +
          '/:calendarId/day return course of the day',
        async () => {
          const response = await supertest(app).get(
            endpointUrl + '/' + calendarId + '/day'
          )

          expect(response.statusCode).toBe(200)
          expect(Array.isArray(response.body.day)).toBeTruthy()
        }
      )

      it(
        'Should GET' + endpointUrl + '/:calendarId/day/id return course',
        async () => {
          const response = await supertest(app).get(
            endpointUrl + '/' + calendarId + '/day/1'
          )

          expect(response.statusCode).toBe(200)
          expect(Array.isArray(response.body.day)).toBeTruthy()
        }
      )

      it(
        'Should GET' +
          endpointUrl +
          '/:calendarId/week return course of the day',
        async () => {
          const response = await supertest(app).get(
            endpointUrl + '/' + calendarId + '/week'
          )

          expect(response.statusCode).toBe(200)
          expect(Array.isArray(response.body.week)).toBeTruthy()
        }
      )

      it(
        'Should GET' + endpointUrl + '/:calendarId/week/id return course',
        async () => {
          const response = await supertest(app).get(
            endpointUrl + '/' + calendarId + '/week/1'
          )

          expect(response.statusCode).toBe(200)
          expect(Array.isArray(response.body.week)).toBeTruthy()
        }
      )

      it(
        'Should GET' + endpointUrl + '/:calendarId/eventId return only event',
        async () => {
          const response = await supertest(app).get(
            endpointUrl + '/' + calendarId + '/' + eventId
          )

          expect(response.statusCode).toBe(200)
          expect(response.body.title).toBeDefined()
        }
      )
    })

    describe('Testing all possible error', () => {
      it(
        'Should GET' + endpointUrl + '/:calendarId with bad id return an error',
        async () => {
          const badCalendarId = 'error@group.calendar.google.com'
          const response = await supertest(app).get(
            endpointUrl + '/' + badCalendarId
          )

          expect(response.statusCode).toBe(500)
          expect(response.body.message).toBe(
            'An error occured fetching all course in calendar ' +
              badCalendarId +
              ', err:Error: Not Found'
          )
        }
      )

      it(
        'Should GET' +
          endpointUrl +
          '/:calendarId/day with bad id return an error',
        async () => {
          const badCalendarId = 'error@group.calendar.google.com'
          const response = await supertest(app).get(
            endpointUrl + '/' + badCalendarId + '/day'
          )

          expect(response.statusCode).toBe(500)
          expect(response.body.message).toBe(
            'An error occured fetching all course of the day in calendar ' +
              badCalendarId +
              ', err:Error: Not Found'
          )
        }
      )

      it(
        'Should GET' +
          endpointUrl +
          '/:calendarId/week with bad id return an error',
        async () => {
          const badCalendarId = 'error@group.calendar.google.com'
          const response = await supertest(app).get(
            endpointUrl + '/' + badCalendarId + '/week'
          )

          expect(response.statusCode).toBe(500)
          expect(response.body.message).toBe(
            'An error occured fetching all course of the week in calendar ' +
              badCalendarId +
              ', err:Error: Not Found'
          )
        }
      )

      it(
        'Should GET' +
          endpointUrl +
          '/:calendarId/:eventId with bad id return an error',
        async () => {
          const badCalendarId = 'error@group.calendar.google.com'
          const eventId = 'bsqcule38kiuu71nohou0'
          const response = await supertest(app).get(
            endpointUrl + '/' + badCalendarId + '/' + eventId
          )

          expect(response.statusCode).toBe(404)
          expect(response.body.message).toBe(
            `An error occured fetching course (${eventId}) in calendar ${badCalendarId}`
          )
        }
      )
    })
  }
)
