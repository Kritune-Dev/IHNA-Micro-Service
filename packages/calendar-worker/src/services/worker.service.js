const logger = require('../utils/logger')(__filename)
const googleApiService = require('./googleApi.service')
const { calendarId } = require('../constants')

exports.Start = () => {
  checkingEvent()
  setInterval(checkingEvent, 300000) // = 5 minutes)
}

/**
 * Fonction principale de l'application
 * Permet de vérifier si les calendriers sont a jour entre eux
 */
async function checkingEvent () {
  logger.info('Demarrage du traitement des calendriers')
  logger.profile('Traitement calendrier \n')

  for (let i = 1; i <= 4; i++) {
    let groupeText = 'P' + i
    if (i === 4) { groupeText = 'D1' }
    if (i === 5) { groupeText = 'D2' }

    logger.info('---> ' + groupeText)
    logger.info('Téléchargement des calendrier')
    const eventsPromo = await googleApiService.downloadCalendar(calendarId[`calendar-all-${groupeText}`])
    const eventTutorat = await googleApiService.downloadCalendar(calendarId['calendar-tutorat'])

    eventTutorat.forEach(event => {
      event.description = event.summary
      eventsPromo.push(event)
    })

    const eventsGR1 = await googleApiService.downloadCalendar(calendarId[`calendar-gr1-${groupeText}`])
    const eventsGR2 = await googleApiService.downloadCalendar(calendarId[`calendar-gr2-${groupeText}`])
    const eventsGR3 = await googleApiService.downloadCalendar(calendarId[`calendar-gr3-${groupeText}`])
    const eventsGR4 = await googleApiService.downloadCalendar(calendarId[`calendar-gr4-${groupeText}`])

    logger.info('Traitement des différences')
    const gr1 = CheckingBetweenCal(eventsPromo, eventsGR1, '1', calendarId[`calendar-gr1-${groupeText}`])
    const gr2 = CheckingBetweenCal(eventsPromo, eventsGR2, '2', calendarId[`calendar-gr2-${groupeText}`])
    const gr3 = CheckingBetweenCal(eventsPromo, eventsGR3, '3', calendarId[`calendar-gr3-${groupeText}`])
    const gr4 = CheckingBetweenCal(eventsPromo, eventsGR4, '4', calendarId[`calendar-gr4-${groupeText}`])
    const nbrAdd = gr1.nbrAdd + gr2.nbrAdd + gr3.nbrAdd + gr4.nbrAdd
    const nbrSuppr = gr1.nbrSuppr + gr2.nbrSuppr + gr3.nbrSuppr + gr4.nbrSuppr
    logger.info(`[Terminé] --> ${nbrAdd} éléments ajoutés et ${nbrSuppr} supprimés\n`)
  }

  logger.profile('Traitement calendrier \n')
}

/**
 * Fonction qui permet un de faire les vérifications entre deux calendriers
 * @param {calendar_v3.Ressource$Events} eventsPromo Le calendrier de l'école.
 * @param {calendar_v3.Ressource$Events} eventsGroupe Le calendrier du groupe à vérifier.
 * @param name Le nom du groupe.Traitement calendrier terminé en
 * @param calendarId L'id du calendrier.
 */
function CheckingBetweenCal (eventsPromo, eventsGroupe, name, calendarId) {
  let nbrSuppr = 0
  eventsGroupe.forEach(function (item) {
    const found = eventsPromo.find(e => e.summary === item.summary && e.description === item.description && e.location === item.location && e.start.dateTime === item.start.dateTime)
    if (found === undefined) {
      deleteCall(item, calendarId)
      nbrSuppr++
    }
  })

  let nbrAdd = 0
  const regex = RegExp('Gr[0-9]+-' + name)
  const regexBis = RegExp('GC[0-9]+-' + name)
  eventsPromo.forEach(function (item) {
    const found = eventsGroupe.find(e => e.summary === item.summary && e.description === item.description && e.location === item.location && e.start.dateTime === item.start.dateTime)
    if (found === undefined && (item.description.includes(`Gr${name}`) || item.description.includes(`GC${name}`) || item.description.includes('Promotion') || item.description.match(regex) || item.description.match(regexBis) || item.organizer.displayName === 'Corpo - PAON - TON')) {
      createCall(item, calendarId)
      nbrAdd++
    }
  })

  return { nbrAdd: nbrAdd, nbrSuppr: nbrSuppr }
}

/**
   * Async Call Event
   * @param {calendar_v3.Schema$Event} event Event to add
   * @param int calendarId Event to add
   */
async function createCall (event, calendarId) {
  logger.debug(`createEvent call : ${event.summary} in ${calendarId} at ${event.start.dateTime}`)
  const result = await googleApiService.createEvent(event, calendarId)
  logger.debug(result)
}

/**
   * Async Call Event
   * @param {calendar_v3.Schema$Event} event Event to delete
   * @param int calendarId Event to delete
   */
async function deleteCall (event, calendarId) {
  logger.debug(`deleteEvent call : ${event.summary} in ${calendarId} at ${event.start.dateTime}`)
  const result = await googleApiService.deleteEvent(event, calendarId)
  logger.debug(result)
}
