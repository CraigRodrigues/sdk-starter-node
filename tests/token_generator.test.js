const jwt = require('jsonwebtoken');
const tokenGenerator = require('../src/token_generator');

describe('#tokenGenerator', () => {
  it('generates a new token', () => {
    const token = tokenGenerator();
    const decoded = jwt.decode(token.token, {complete: true});

    expect(decoded).toHaveProperty('payload.grants.identity', token.identity);
    expect(decoded).toHaveProperty('payload.grants.video.room', 'default room');
    expect(decoded).toHaveProperty('payload.grants.ip_messaging.service_sid');
    expect(decoded).toHaveProperty('payload.grants.data_sync.service_sid');
  });
});
