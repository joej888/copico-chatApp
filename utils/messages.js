
////****** Functions for messages before ouputing to UI *****//
////****** ----------------------------*************//

const moment = require('moment');

////****** Functions for handeling new messages *****//
////****** ----------------------------*************//
function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

////****** Functions for handeling old history messages saved in database *****//
////****** ----------------------------*************//
function formatHistoryMessage(element) {
  elementArray = Object.values(element)
  var username = elementArray[0]["user.name"]
  var text = elementArray[0]["chatContent"]
  var time = elementArray[0]["createdAt"]
  return {
    username,
    text,
    time: moment(time).format('h:mm a')
  };
}

module.exports = { formatMessage, formatHistoryMessage };


