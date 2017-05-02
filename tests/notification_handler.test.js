const {registerBind, sendNotification} = require('../src/notification_handler');

const when = describe;

describe.skip('#registerBind', () => {
  when('given bad credentials', () => {
    it('returns an error', () => {
      return registerBind(
        'endpoint', 'identity',
        'bindingType', 'address'
      ).then((res) => {
        expect(res).toHaveProperty('status', 500);
        expect(res.message).toContain('Failed to create binding');
      });
    });
  });

  when('given good credentials', () => {
    it('returns an error', () => {
      const endpoint = 'endpoint';
      const identity = 'identity';
      const bindingType = 'bindingType';
      const address = 'address';
      return registerBind(
        endpoint, identity,
        bindingType, address
      ).then((res) => {
        expect(res).toHaveProperty('status', 200);
        expect(res.data).toContains('Success everywhere!!');
      });
    });
  });
});

describe.skip('#sendNotification', () => {
  when('', () => {
    it('', () => {
      const identity = 'identity';
      sendNotification(identity).then((res) => {
        expect(res).toHaveProperty('status', 200);
        // expect(res.data).toContains();
      });
    });
  });
});
