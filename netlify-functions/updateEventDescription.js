const eventPopper = require('../index')

exports.handler = async function(event, context, callback) {
  const { apiKey, description } = JSON.parse(event.body)
  try {
    if (!process.env.API_KEY) {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({ message: `API_KEY not setup` })
      })
    }
    if (apiKey !== process.env.API_KEY) {
      callback(null, {
        statusCode: 401,
        body: JSON.stringify({ message: `Invalid apiKey` })
      })
    }
    await eventPopper.updateEventDescription(description, {
      organizerId: process.env.EVENTPOP_ORGANIZER_ID,
      eventId: process.env.EVENTPOP_EVENT_ID,
      sessionId: process.env.EVENTPOP_SESSION_ID
    })
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `OK!`
      })
    })
  } catch (e) {
    callback(e)
  }
}
