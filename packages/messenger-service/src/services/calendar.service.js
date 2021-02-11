const axios = require('axios')
const _ = require('lodash')

exports.getDayCourse = (calendarId, day) => {
  let dayReq = ''
  if (day) { dayReq = '/' + day } else { dayReq = '/' }
  return new Promise((resolve, reject) => {
    const urlService = 'http://www.ihna-service.com/api/v1/calendar/' + calendarId + '/day' + dayReq
    this.callService(urlService)
      .then((response) => {
        const day = getDate(response.data.day[0].dateStart)
        let message = `${day} \n-------------------------\n`
        response.data.day.map(async (event, i) => {
          message += prepareCours(event)
        })
        resolve(message)
      })
      .catch(error => {
        reject(error)
      })
  })
}

exports.callService = (urlService) => {
  return new Promise((resolve, reject) => {
    axios.get(urlService)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

function prepareCours (event) {
  let heure = new Date(event.dateStart)
  heure = `${heure.getHours()}h${heure.getMinutes()}`
  const title = event.title.split(': ')
  const titre = title[1]
  const salle = event.location.substr(5)
  const description = event.description.split('| ')
  const resume = description[description.length - 1]

  return `${heure} --- ${titre} \n${resume} \nAvec ${_.startCase(event.prof)} \nEn ${salle} \nDurée du cours ${event.duree}\n\n`
}

function getDate (dateStart) {
  const day = new Date(dateStart)
  let message = 'Le'
  switch (day.getDay()) {
    case 1:
      message += ' lundi'
      break
    case 2:
      message += ' mardi'
      break
    case 3:
      message += ' mercredi'
      break
    case 4:
      message += ' jeudi'
      break
    case 5:
      message += ' vendredi'
      break
    default:
      message = 'Je sais pas'
      break
  }
  message += ` ${day.getDate()} février`
  return message
}
