# event-popper

A Node.js package and a deployable REST API to update Event Pop event
description programmatically.

This can be useful for, e.g. continuously deploying an Event Pop description
page from a Git repository.

## REST API

_Under construction_

Using a REST API is a useful and more secure method that offers protection of
your session ID. (A session ID can be used to do _anything_ to every event the
user has access to, while the REST API only allows updating the description of
one event)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dtinth/event-popper)

## Node.js API

### updateEventDescription(html, config)

Updates an event’s description.

### config

An object with 3 properties:

- `organizerId` (`number`) your organization ID
- `eventId` (`number`) your event ID
- `sessionId` (`string`) your event pop organizer session ID, get from cookie
