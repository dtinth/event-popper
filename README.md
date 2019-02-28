# event-popper

A Node.js package and a deployable REST API to update Event Pop event
description programmatically.

This can be useful for, e.g. continuously deploying an Event Pop description
page from a Git repository.

## Disclaimer

This project is not affiliated with or endorsed by Event Pop. I just kinda
reverse-engineered the HTTP requests to make it easier for developers to update
the description page. No support is provided, although contributions are
welcome.

## REST API

Using a REST API is a useful and more secure method that offers protection of
your session ID. (A session ID can be used to do _anything_ to every event the
user has access to, while the REST API only allows updating the description of
one event.)

1. **Deploy the API to Netlify** by clicking this button:

   [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dtinth/event-popper)

   In **Configure your site** step, enter:

   - **API Key** — put in some random string here to protect the endpoint. You
     need this API key to call it. For example:
     `4122c643d4fc3af51fd9e42b6d59e6a9412bc0bd`
   - **Event Pop Organizer ID** — obtain from organizer URL
   - **Event Pop Event ID** — obtain from organizer URL
   - **Event Pop Session ID** — obtain this from the browser cookie named
     `_stampmein_session`

2. **Once deployed, you can call the API.** Here’s an example using
   [HTTPie](https://httpie.org/):

   ```
   http post https://______.netlify.com/.netlify/functions/updateEventDescription \
     apiKey=4122c643d4fc3af51fd9e42b6d59e6a9412bc0bd \
     description=TEST
   ```

3. **After a while the session may expire.** You need to go to Netlify’s project
   **Settings** &rarr; **Build & deploy** &rarr; **Build environment variables**
   &rarr; **`EVENTPOP_SESSION_ID`** and replace it with a new session ID.

## Node.js API

### updateEventDescription(html, config)

Updates an event’s description.

### config

An object with 3 properties:

- `organizerId` (`number`) your organization ID
- `eventId` (`number`) your event ID
- `sessionId` (`string`) your event pop organizer session ID, get from cookie
  named `_stampmein_session`
