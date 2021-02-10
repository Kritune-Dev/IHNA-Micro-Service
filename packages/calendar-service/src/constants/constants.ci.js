module.exports = {
  logs: 'dev',
  calendarId: 'gs0hmj2mibs3i9op5sbm5kpqmk@group.calendar.google.com',
  eventId: 'ebsqcule3hg0k8kiuu71nohou0',
  googleSecrets: {
    client_id: process.env.CLIENT_ID,
    project_id: process.env.PROJECT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: [process.env.REDIRECT_URI, 'http://localhost']
  },
  token: {
    access_token: process.env.ACCES_TOKEN,
    refresh_token: process.env.REFRESH_TOKEN,
    scope: 'https://www.googleapis.com/auth/calendar',
    token_type: 'Bearer',
    expiry_date: 1600288901520
  }
}
