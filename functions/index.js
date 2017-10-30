"use strict";

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

const sendInvite = toGroup => event => {
  const snapshot = event.data;
  console.log(snapshot);
  const val = snapshot.val();

  const mailOptions = {
    from: '"CoffeeIQ" <noreply@coffeeiq.org>',
    to: val.email
  };

  mailOptions.subject = toGroup
    ? val.inviterName + ` has invited you to ___ group in CoffeeIQ`
    : val.inviterName + ` has invited you to CoffeeIQ`;
  mailOptions.text = toGroup ? `To sign up go to TODO INVITE LINK` : `To sign up, go to coffeeiq.org`;
  return mailTransport
    .sendMail(mailOptions)
    .then(() => {
      console.log("Invite email sent to:", val.email);
    })
    .catch(error => {
      console.error("Error sending invite email:", error);
    });
};

exports.onCreateInvite = functions.database.ref("/orgs/{orgId}/invites/{inviteId}").onCreate(sendInvite());

exports.onUpdateInvite = functions.database.ref("/orgs/{orgId}/invites/{inviteId}").onUpdate(sendInvite());

exports.onCreateInviteToGroup = functions.database
  .ref("/orgs/{orgId}/groups/{groupId}/invites/{inviteId}")
  .onCreate(sendInvite(true));

exports.onUpdateInviteToGroup = functions.database
  .ref("/orgs/{orgId}/groups/{groupId}/invites/{inviteId}")
  .onUpdate(sendInvite(true));
