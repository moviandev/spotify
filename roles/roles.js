const AccessControl = require('accesscontrol');

const ac = new AccessControl();

exports.roles = (function() {
  ac.grant('user')
    .readOwn('profile')
    .updateOwn('profile')
    .deleteOwn('profile')
    .readAny('musics')
    .readAny('albuns');

  ac.grant('artist')
    .extends('user')
    .updateOwn('music')
    .updateOwn('albuns')
    .deleteOwn('music')
    .deleteOwn('albuns');

  ac.grant('admin')
    .extends('user')
    .extends('artist')
    .updateAny('profile')
    .updateAny('musics')
    .updateAny('albuns')
    .deleteAny('profile')
    .deleteAny('musics')
    .deleteAny('albuns');

  return ac;
})();
