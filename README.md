# event-popper

A Node.js package to update Event Pop event description programmatically.

Useful for, e.g. continuously deploying an Event Pop description page from a Git
repository.

## API

### updateEventDescription(html, config)

Updates an event’s description.

### config

An object with 3 properties:

- `organizerId` (`number`) your organization ID
- `eventId` (`number`) your event ID
- `sessionId` (`string`) your event pop organizer session ID, get from cookie
