const googleAuth = require('./googleAuth.service')

exports.downloadCalendar = (calendarId) => {
  const calendar = googleAuth.getCalendar()

  return new Promise((resolve, reject) => {
    calendar.events.list({
      calendarId: calendarId,
      timeMin: (new Date().toISOString()),
      singleEvents: true,
      maxResults: 1000,
      orderBy: 'startTime'
    }).then(result => {
      resolve(result.data.items)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * Appel API to delete event
 * @param {calendar_v3.Schema$Event} event Event to delete
 * @param int calendarId Event to delete
 */
exports.deleteEvent = (event, calendarId) => {
  const calendar = googleAuth.getCalendar()

  return new Promise(resolve => {
    calendar.events.delete({
      calendarId: calendarId,
      eventId: event.id
    }, function (err) {
      if (err) {
        resolve('There was an error contacting the Calendar service: ' + err)
        return
      }
      resolve('Event deleted')
    })
  })
}

/**
 * Appel API to add new event
 * @param {calendar_v3.Schema$Event} event Event to add
 * @param int calendarId Event to add
 */
exports.createEvent = (event, calendarId) => {
  const calendar = googleAuth.getCalendar()

  return new Promise(resolve => {
    const newEvent = {
      summary: event.summary,
      location: event.location,
      description: event.description,
      start: {
        dateTime: event.start.dateTime,
        timeZone: event.start.timeZone
      },
      end: {
        dateTime: event.end.dateTime,
        timeZone: event.end.timeZone
      },
      attendees: event.attendees,
      reminders: event.reminders
    }

    calendar.events.insert({
      calendarId: calendarId,
      resource: newEvent
    }, function (err) {
      if (err) {
        resolve('There was an error contacting the Calendar service: ' + err)
        return
      }
      resolve('Event created')
    })
  }
  )
}
