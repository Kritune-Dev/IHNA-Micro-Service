const googleAuth = require('google-auth-library')
const { google } = require('googleapis')
const { googleSecrets, token } = require('../constants')

let auth

exports.connect = () => {
  console.log(googleSecrets)

  auth = new googleAuth.OAuth2Client(
    googleSecrets.client_id,
    googleSecrets.client_secret,
    googleSecrets.redirect_uris[0]
  )

  auth.setCredentials(token)

  return 'Authentification GoogleAPI done'
}

exports.getCalendar = () => {
  return google.calendar({ version: 'v3', auth })
}
