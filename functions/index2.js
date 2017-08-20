// 'use-strict';

// require('@google-cloud/debug-agent').start({ allowExpressions: true });

// const functions = require('firebase-functions');

// exports.sendCalendarInvite = functions.https.onRequest((req, res) => {
//   const user = event.data; // The Firebase user.
//   const email = user.email; // The email of the user.
//   const displayName = user.displayName; // The display name of the user.

//   console.log('getRequest');
//   headers.append('Authorization', 'Bearer ' + this.authToken);
//   headers.append('Content-Type', 'application/json');
//   return this.http.get(
//     'https://www.googleapis.com/gmail/v1/')
//     .map(response => response.json())
//     .map(console.log(email, displayName));
// });

// function sendCalendarInvite(email, displayName) {
//   this.getRequest('users/me/profile');
//   console.log('send calendar invites');

// //   var request = gapi.client.calendar.events.insert({
// //   'calendarId': 'primary',
// //   'resource': event
// // });
//   //
// };

//     // this.sendRequest(
//     //   'GET',
//     //   'https://www.googleapis.com/calendar/v3/calendars/main/events'
