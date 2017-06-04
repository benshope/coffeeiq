'use strict';

require('@google-cloud/debug-agent').start({ allowExpressions: true });

const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const google = require('googleapis');

const events = google.calendar('v3').events;
const OAuth2 = google.auth.OAuth2;
const auth = new OAuth2(
  '515941571789-msk9v5lr3q12d9miptrn39ntvom12j3r.apps.googleusercontent.com',
  'xT6rtV60Mvp7QX7S_BMUdLFO'
);

// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
// const gmailEmail = encodeURIComponent(functions.config().firebase.apiKey);
// const gmailPassword = encodeURIComponent(functions.config().firebase);
// const mailTransport = nodemailer.createTransport(
//     `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

// Your company name to include in the email
// TODO: Change this to your app or company name to customize the email sent.
// const APP_NAME = 'CoffeeIQ';


// sendCalendarInvites = () => {
//    let headers = new Headers();
//    headers.append('Authorization', 'Bearer ' + apiKey);
//    headers.append('Content-Type', 'application/json');
//    return request(
//      'https://www.googleapis.com/calendar/v3/calendars/primary/events?sendNotifications=true', { method: 'POST', body: 'a=1' })
//      {
//        attachments: [],
//        location: 'The bedroom of Lexis',
//        summary: 'Martin Luther King, Jr. Day',
//        description: 'An important civil rights holiday',
//        attendees: [
//          {email: 'nimajnebs@gmail.com'},
//          {email: 'lexishanson@gmail.com'}
//        ],
//        reminders: {
//          useDefault: true
//        },
//        start: {
//          dateTime: '2017-02-27T08:00:00-07:00'
//        },
//        end: {
//          dateTime: '2017-02-27T08:00:00-08:00'
//        }
//      },
//      { headers: headers })
//        .map(response => response.json())
//        .subscribe(console.log, console.error);
//  };
// }


// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
// exports.sendWelcomeEmail = functions.auth.user().onCreate(event => {
// // [END onCreateTrigger]
//   // [START eventAttributes]
//   const user = event.data; // The Firebase user.

//   const email = user.email; // The email of the user.
//   const displayName = user.displayName; // The display name of the user.
//   // [END eventAttributes]

//   return sendWelcomeEmail(email, displayName);
// });
// // [END sendWelcomeEmail]

// // [START sendByeEmail]
// /**
//  * Send an account deleted email confirmation to users who delete their accounts.
//  */
// // [START onDeleteTrigger]
// exports.sendByeEmail = functions.auth.user().onDelete(event => {
// // [END onDeleteTrigger]
//   const user = event.data;

//   const email = user.email;
//   const displayName = user.displayName;

//   return sendGoodbyEmail(email, displayName);
// });
// // [END sendByeEmail]



// [START testTriggerCoffeeIQ]
exports.invite = functions.https.onRequest((req, res) => {
  //const user = event.data; // The Firebase user.
  // const email = user.email; // The email of the user.
  //const displayName = user.displayName; // The display name of the user.
  cors(req, res, () => {
    events.list({
      auth: auth,
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var events = response.items;
      if (events.length === 0) {
        console.log('No upcoming events found.');
      } else {
        console.log('Upcoming 10 events:');
        for (var i = 0; i < events.length; i++) {
          var event = events[i];
          var start = event.start.dateTime || event.start.date;
          console.log('%s - %s', start, event.summary);
        }
      }
    });
    return console.log(events, functions.config(), functions.config().gmailEmail, functions.config().firebase.apiKey);
  });
});

// // [END testTriggerCoffeeIQ]

// function sendCalendarInvite() {
//     var headers = {
//   Authorization: 'Bearer ', // + payload.accessToken,
//   noXsrfToken: true
// };
// sendRequest(
//   'GET',
//   'https://www.googleapis.com/calendar/v3/calendars/main/events',
//   undefined,
//   headers).then(
//     () => { console.log('SUCCESS'); },
//     () => { console.log('ERROR'); });



// Sends a welcome email to the given user.
// }
