import sinon from 'sinon';
import { expect } from 'chai';
import { validate as validateUuid } from 'uuid';

import { describe, afterEach, it } from 'mocha';
import userService from '../../server/services/UserService';
import User from '../../server/models/User';

const mockUser = {
  uuid: 'aa6e2378-0999-4d78-bcf9-9cbd09e65c1a',
  password: 'qwerty',
  name: 'Sasha',
  email: 'sasha@ex.ua',
};

describe('userService test', () => {
  const sandbox = sinon.createSandbox();
  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  describe('userService.createNewUser', () => {
    it('success', () => {
      sandbox.replace(User, 'insert', () => true);
      sandbox.spy(User, 'insert');
      sandbox.replace(User, 'getByUUID', () => mockUser);
      sandbox.spy(User, 'getByUUID');

      const result = userService.createNewUser(
        mockUser.name,
        mockUser.email,
        mockUser.password,
      );

      sandbox.assert.calledOnce(User.insert);
      expect(validateUuid(User.insert.getCall(0).args[0].uuid)).to.equal(true);
      expect(User.insert.getCall(0).args[0].name).to.equal(mockUser.name);
      expect(User.insert.getCall(0).args[0].email).to.equal(mockUser.email);
      expect(User.insert.getCall(0).args[0].password).to.equal(mockUser.password);

      sandbox.assert.calledOnce(User.getByUUID);
      expect(validateUuid(User.getByUUID.getCall(0).args[0])).to.equal(true);

      sandbox.assert.calledOnce(User.insert);
      expect(result).deep.equal(mockUser);
    });

    it('throw PASSWORD_IS_TOO_SHORT', () => {
      sandbox.spy(User, 'insert');
      sandbox.spy(User, 'getByUUID');

      const call = () => userService.createNewUser(
        mockUser.name,
        mockUser.email,
        false,
      );
      sandbox.assert.notCalled(User.insert);
      sandbox.assert.notCalled(User.getByUUID);

      expect(call).to.throw();
    });

    it('throw NAME_IS_NOT_VALID', () => {
      sandbox.spy(User, 'insert');
      sandbox.spy(User, 'getByUUID');

      const call = () => userService.createNewUser(
        false,
        mockUser.email,
        mockUser.password,
      );
      sandbox.assert.notCalled(User.insert);
      sandbox.assert.notCalled(User.getByUUID);

      expect(call).to.throw();
    });
  });

  describe('userService.getUser', () => {
    it('success', () => {
      sandbox.replace(User, 'getByUUID', () => mockUser);
      sandbox.spy(User, 'getByUUID');

      const result = userService.getUser(mockUser.uuid);

      sandbox.assert.calledOnce(User.getByUUID);
      expect(User.getByUUID.getCall(0).args[0]).to.equal(mockUser.uuid);
      expect(result).deep.equal(mockUser);
    });

    it('throw BAD_UUID', () => {
      sandbox.replace(User, 'getByUUID', () => mockUser);
      sandbox.spy(User, 'getByUUID');

      const result = () => userService.getUser(undefined);
      sandbox.assert.notCalled(User.getByUUID);
      expect(result).to.throw();
    });

    it('throw USER_NOT_FOUND', () => {
      sandbox.replace(User, 'getByUUID', () => null);
      sandbox.spy(User, 'getByUUID');

      const result = () => userService.getUser(mockUser.uuid);
      expect(result).to.throw();
      sandbox.assert.calledOnce(User.getByUUID);
    });
  });
});
