const Router = require('express').Router;

const {registerBind, sendNotification} = require('./notification_handler');
const tokenGenerator = require('./token_generator');

const router = new Router();

router.get('/token', (req, res) => {
  res.send(tokenGenerator());
});

router.post('/register', (req, res) => {
  const endpoint = req.body.endpoint;
  const identity = req.body.identity;
  const bindingType = req.body.BindingType;
  const address = req.body.Address;
  registerBind(endpoint, identity, bindingType, address).then((data) => {
    res.status(data.status);
    res.send(data.data);
  });
});

router.post('/send-notification', (req, res) => {
  const identity = req.body.identity;
  sendNotification(identity).then((data) => {
    res.status(data.status);
    res.send(data.data);
  });
});

module.exports = router;
