// @ts-check
const axios = require("axios");
const cheerio = require("cheerio");
const debug = require("debug")("event-popper");
const { VError } = require("verror");

exports.updateEventDescription = updateEventDescription;

/**
 * @typedef {Object} EventPopConfig
 * @property {number} organizerId
 * @property {number} eventId
 * @property {string} sessionId
 */

/**
 * @param {string} html
 * @param {EventPopConfig} config
 */
async function updateEventDescription(html, config) {
  try {
    const client = axios.default.create({
      headers: {
        cookie: `_eventpop_session=${config.sessionId}`,
      },
    });
    debug("Getting page editor");
    const editorUrl = `https://www.eventpop.me/organizers/${config.organizerId}/event_details/${config.eventId}/edit/page_editor`;

    const getResponse = await client
      .get(editorUrl, { responseType: "text" })
      .catch((e) => {
        throw new VError(e, "Cannot GET page_editor");
      });
    const $ = cheerio.load(getResponse.data);
    const token = $('input[name="authenticity_token"]').val();
    if (!token) {
      debug(getResponse.data);
      throw new VError(`Authenticity token not found in page_editor response`);
    }
    debug("Found authenticity_token", token);

    const patchResponse = await client
      .patch(
        editorUrl,
        {
          authenticity_token: token,
          event_detail: {
            description_th: html,
          },
        },
        {
          maxRedirects: 0,
          validateStatus: (status) => status < 400,
        }
      )
      .catch((e) => {
        throw new VError(e, "Cannot PATCH page_editor");
      });
    debug("PATCH page_editor returned", patchResponse.status);
  } catch (e) {
    throw new VError(e, "updateEventDescription failed");
  }
}
