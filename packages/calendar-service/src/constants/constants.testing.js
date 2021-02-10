const path = require('path')
const fs = require('fs')

module.exports = {
  logs: 'dev',
  calendarId: 'gs0hmj2mibs3i9op5sbm5kpqmk@group.calendar.google.com',
  eventId: 'ebsqcule3hg0k8kiuu71nohou0',
  googleSecrets: JSON.parse(
    fs.readFileSync(path.resolve('./src/constants/credentials.json'))
  ).installed,
  token: JSON.parse(
    fs.readFileSync(path.resolve('./src/constants/token.json'))
  )
}
