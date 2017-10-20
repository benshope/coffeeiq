"use strict";

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

const sendInvite = event => {
  const snapshot = event.data;
  const val = snapshot.val();

  const mailOptions = {
    from: '"CoffeeIQ" <noreply@coffeeiq.org>',
    to: val.email
  };

  mailOptions.subject = val.inviterName + ` has invited you to CoffeeIQ`;
  mailOptions.text = `To sign up, go to <a href="//coffeeiq.org">coffeeiq.org</a>`;
  return mailTransport
    .sendMail(mailOptions)
    .then(() => {
      console.log("Invite email sent to:", val.email);
    })
    .catch(error => {
      console.error("Error sending invite email:", error);
    });
};

// Sends an email confirmation when a user changes his mailing list subscription.
// exports.onCreateInvite = functions.database
//   .ref("/orgs/{orgId}/invites/{inviteId}")
//   .onCreate(sendInvite);

exports.onUpdateInvite = functions.database.ref("/orgs/{orgId}/invites/{inviteId}").onUpdate(sendInvite);

// const sendInviteToGroup = event => {
//   const snapshot = event.data;
//   const val = snapshot.val();

//   const mailOptions = {
//     from: '"CoffeeIQ" <noreply@coffeeiq.org>',
//     to: val.email
//   };

//   mailOptions.subject = val.inviterName + ` has invited you to the group ____ in CoffeeIQ`;
//   mailOptions.text = `To sign up, go to <a href="//coffeeiq.org/join/SOME_NUMBER">coffeeiq.org/join/SOME_NUMBER</a>`;
//   return mailTransport
//     .sendMail(mailOptions)
//     .then(() => {
//       console.log("Invite email sent to:", val.email);
//     })
//     .catch(error => {
//       console.error("Error sending invite email:", error);
//     });
// };

// exports.onUpdateInviteToGroup = functions.database
//   .ref("/orgs/{orgId}/groups/{groupId}/invites/{inviteId}")
//   .onUpdate(sendInviteToGroup);
