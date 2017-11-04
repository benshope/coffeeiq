"use strict";

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

const sendInvite = event => {
  const snapshot = event.data;
  console.log(snapshot);
  const val = snapshot.val();

  const mailOptions = {
    from: '"CoffeeIQ" <noreply@coffeeiq.org>',
    to: val.email
  };
  mailOptions.subject = val.inviterName + ` has invited you to CoffeeIQ`;
  mailOptions.text = `To sign up, go to coffeeiq.org`;
  if (val.groupId) {
    mailOptions.subject = val.inviterName + ` has invited you to ${val.groupId} in CoffeeIQ\n\n`;
    mailOptions.text = `To accept this invite: https://us-central1-coffeeiq-228b6.cloudfunctions.net/accept/${val.groupId}/${snapshot.key}\n\n`;
  }
  return mailTransport
    .sendMail(mailOptions)
    .then(() => {
      console.log("Invite email sent to: ", val.email);
    })
    .catch(error => {
      console.error("Error sending invite email: ", error);
    });
};

exports.onCreateInvite = functions.database.ref("/orgs/{orgId}/users/{emailId}/invite").onCreate(sendInvite);

exports.onUpdateInvite = functions.database.ref("/orgs/{orgId}/users/{emailId}/invite").onUpdate(sendInvite);

// unauthenticated http cloud functions
const express = require("express");
const cors = require("cors")({ origin: true });
const app = express();
app.use(cors);
app.get("/accept/:groupId/:emailId", (req, res) => {
  const groupName = "getTheGroupName";
  const groupLocation = "getTheGroupLocation";
  res.redirect(`https://coffeeiq.org/accept?groupName="${groupName}"&groupLocation="${groupLocation}"`);
});
exports.app = functions.https.onRequest(app);
