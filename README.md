# event-popper

A Node.js package and a deployable REST API to update Event Pop event
description programmatically.

This can be useful for, e.g. continuously deploying an Event Pop description
page from a Git repository. For example,
[global diversity CFP day (Bangkok 2019)’s Event Pop page](https://www.eventpop.me/e/5302-global-diversity-cfp-day-bangkok-2019)
was
[generated using React](https://gitlab.com/dtinth/gdcd-2019-bangkok/blob/master/EventPop-Description.html)
and
[continuously deployed using GitLab CI](https://gitlab.com/dtinth/gdcd-2019-bangkok/blob/master/.gitlab-ci.yml).

## Disclaimer

This project is not affiliated with or endorsed by Event Pop. I just kinda
reverse-engineered the HTTP requests to make it easier for developers (and
outside contributors) to update the event description page, even if they don’t
have access to Event Pop’s organizer system. Do not abuse, and USE IT AT YOUR
OWN RISK. No support is provided, although contributions are welcome.

## Preparation

To use this you need to find your _organizer ID_, _event ID_ and _session ID_.

1. **Sign in to Event Pop organizer account** and **go to an event dashboard.**
   You should have the URL in this form:

   ```
   https://www.eventpop.me/organizers/<organizerId>/events/<eventId>-*
   ```

2. **Open your dev tools** and **extract the cookie called
   `_stampmein_session`** from your browser. This is your _session ID_. Protect
   this ID as anyone who has it can impersonate you!

## REST API

Using a REST API is a useful and more secure method that offers protection of
your _session ID_.

If your session ID fell into a wrong hand, it can be used to do _anything_ to
every event that you have access to. It can also be used to buy tickets on your
behalf. This REST API only allows updating the description of a single event
using an API key, hiding your session ID.

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

_Note: This module is not published to npm yet._

### updateEventDescription(html, config)

Updates an event’s description.

### config

An object with 3 properties:

- `organizerId` (`number`) your organization ID
- `eventId` (`number`) your event ID
- `sessionId` (`string`) your event pop organizer session ID, get from cookie
  named `_stampmein_session`
