require('dotenv').load();

// Twilio Library
const Twilio = require('twilio');

// Access Token used for Video, IP Messaging, and Sync
const AccessToken = Twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const IpMessagingGrant = AccessToken.IpMessagingGrant;
const SyncGrant = AccessToken.SyncGrant;

const nameGenerator = require('../name_generator');

/**
 * Generate an Access Token for an application user - it generates a random
 * username for the client requesting a token, and takes a device ID as a query
 * parameter.
 * @return {Object}
 *         {Object.identity} String random indentity
 *         {Object.token} String token generated
 */
function tokenGenerator() {
  // Create an access token which we will sign and return to the client
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  // Assign the generated identity to the token
  token.identity = nameGenerator();

  // Grant the access token Twilio Video capabilities
  const videoGrant = new VideoGrant({room: 'default room'});
  token.addGrant(videoGrant);

  if (process.env.TWILIO_CHAT_SERVICE_SID) {
    // Create a "grant" which enables a client to use IPM as a given user,
    // on a given device
    const ipmGrant = new IpMessagingGrant({
      serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
    });
    token.addGrant(ipmGrant);
  }

  if (process.env.TWILIO_SYNC_SERVICE_SID) {
    // Create a "grant" which enables a client to use Sync as a given user,
    // on a given device
    const syncGrant = new SyncGrant({
      serviceSid: process.env.TWILIO_SYNC_SERVICE_SID,
    });
    token.addGrant(syncGrant);
  }

  // Serialize the token to a JWT string and include it in a JSON response
  return {
    identity: token.identity,
    token: token.toJwt(),
  };
}

module.exports = tokenGenerator;
