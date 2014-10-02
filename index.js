/**
 * ComMon - Communication Monitoring
 * =================================
 *
 * Using the Data Class Documentation.
 * Async events have to 'listen' before retrieving results
 *
 *
 *
 */

var request = require('request');

var SERVER = 'http://10.10.20.149';

var API = {
  'getSession':   SERVER + '/rest/new',                         // creates a session
  'pollShort':    SERVER + '/rest/poll/<session-id>',           // immediate state infos  > ASYNC
  'callFunction': SERVER + '/rest/request/<session-id>',        // execute remote call    > SYNC
  'pollLong':     SERVER + '/longpoll.rb?session=<session-id>'  // continous subscription > ASYNC
};





// example call
getSession(function (session) {
  callFunction(session, {
    'call': 'SysInfo_getInfo',
    'params': {
      'name': 'ipv4'
    }
  }, function (data) {
    console.log(data.value);
  });
});








/**
 * [getSession description]
 *
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getSession (next) {
  request({
    'method': 'GET',
    'url': API.getSession
  }, function (err, res, body) {
    if (err) throw err;
    next(body.session);
  });
}


/**
 * [callFunction description]
 *
 * All arguents can be send as params in the body.
 *
 * @param  {[type]}   session [description]
 * @param  {[type]}   data    [description]
 * @param  {Function} next    [description]
 * @return {[type]}           [description]
 */
function callFunction (session, data, next) {
  request({
    'method': 'POST',
    'url': API.callFunction.replace('<session-id>', session),
    'body': data,
    'json': true
  }, function (err, res, body) {
    if (err) throw err;
    next(body);
  });
}



/**
 * [pollShort description]
 *
 * TODO: liste to Eents fist
 *
 * @param  {[type]}   session [description]
 * @param  {[type]}   data    [description]
 * @param  {Function} next    [description]
 * @return {[type]}           [description]
 */
// function pollShort (session, data, next) {
//   request({
//     'method': 'POST',
//     'url': API.pollShort.replace('<session-id>', session),
//     'body': {
//       'call': 'listen',
//       'params': {
//         'events': data // define events to listen ...
//       }
//     },
//     'json': true
//   }, function (err, res, body) {
//     if (err) throw err;
//     next(body);
//   });
// }

// function pollLong (session, data, next) {
//   request({
//     'method': 'POST',
//     'url': API.pollShort.replace('<session-id>', session),
//     'body': {
//       'call': 'listen',
//       'params': {
//         'events': data // define events to listen ...
//       }
//     },
//     'json': true
//   }, function (err, res, body) {
//     if (err) throw err;
//     next(body);
//   });
// // }


