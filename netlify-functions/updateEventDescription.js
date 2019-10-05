const eventPopper = require('../index')
const jwt = require('jsonwebtoken')

exports.handler = async function(event, context, callback) {
  const { apiKey, description } = JSON.parse(event.body)
  if (!process.env.API_KEY) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ message: `API_KEY not setup` })
    })
  }
  let organizerId = process.env.EVENTPOP_ORGANIZER_ID
  let eventId = process.env.EVENTPOP_EVENT_ID
  if (apiKey === process.env.API_KEY) {
    // OK! continue
  } else {
    // Try JWT...
    try {
      const decoded = jwt.verify(apiKey, process.env.API_KEY)
      if (decoded.organizerId) organizerId = decoded.organizerId
      if (decoded.eventId) eventId = decoded.eventId
    } catch (e) {
      console.log('Cannot decode JWT', e)
      return {
        statusCode: 401,
        body: JSON.stringify({ message: `Invalid apiKey` })
      }
    }
  }
  await eventPopper.updateEventDescription(description, {
    organizerId,
    eventId,
    sessionId: process.env.EVENTPOP_SESSION_ID
  })
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `OK!`
    })
  }
}
