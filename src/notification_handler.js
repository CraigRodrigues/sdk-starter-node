require('dotenv').load();

// Twilio Library
const Twilio = require('twilio');

// Create a device binding from a POST HTTP request
exports.registerBind = function registerBind(
  endpoint, identity, bindingType, address
) {
  const client = new Twilio(
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    {accountSid: process.env.TWILIO_ACCOUNT_SID}
  );

  // Get a reference to the user notification service instance
  const service = client.notify.v1.services(
    process.env.TWILIO_NOTIFICATION_SERVICE_SID
  );

  return service.bindings.create({
    endpoint, identity,
    bindingType, address,
  }).then((binding) => {
    console.log(binding);
    // Send a JSON response indicating success
    return {
      status: 200,
      data: {message: 'Binding created!'},
    };
  }).catch((error) => {
    console.log(error);
    return {
      status: 500,
      data: {
        error: error,
        message: 'Failed to create binding: ' + error,
      },
    };
  });
};

// Notify - send a notification from a POST HTTP request
exports.sendNotification = function sendNotification(identity) {
  // Authenticate with Twilio
  const client = new Twilio(
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    {accountSid: process.env.TWILIO_ACCOUNT_SID}
  );

  // Create a reference to the user notification service
  const service = client.notify.v1.services(
    process.env.TWILIO_NOTIFICATION_SERVICE_SID
  );

  // Send a notification
  service.notifications.create({
    'identity': identity,
    'body': `Hello, ${identity }!`,
  }).then((message) => {
    console.log(message);
    return {
      status: 200,
      data: {message: 'Successful sending notification'},
    };
  }).catch((error) => {
    console.log(error);
    return {
      status: 500,
      data: {error: error},
    };
  });
};
