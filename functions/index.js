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
  console.log(snapshot, event);
  const val = snapshot.val();

  const mailOptions = {
    from: '"CoffeeIQ" <noreply@coffeeiq.org>',
    to: val.email
  };
  mailOptions.subject = val.inviterName + ` has invited you to CoffeeIQ`;
  mailOptions.text = `To sign up, go to coffeeiq.org`;
  if (val.groupId) {
    mailOptions.subject = val.inviterName + ` invites you to coffee with ${val.groupName}\n\n`;
    mailOptions.text = `To begin getting weekly scheduled coffee meetings with ${val.groupName} click this link: https://us-central1-coffeeiq-228b6.cloudfunctions.net/app/accept/${event
      .params.orgId}/${val.groupId}/${val.emailId}/${encodeURIComponent(val.groupName)}/${encodeURIComponent(
      val.groupLocation
    )}\n\n`;
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
app.get("/accept/:orgId/:groupId/:emailId/:groupName/:groupLocation", (req, res) => {
  let updates = {};
  updates[`groups/${req.params.groupId}/emailIds/${req.params.emailId}`] = true;
  updates[`users/${req.params.emailId}/groupIds/${req.params.groupId}`] = true;
  admin
    .database()
    .ref(`/orgs/${req.params.orgId}`)
    .update(updates);
  res.redirect(
    `https://coffeeiq.org/accept?email=${req.params.emailId}&groupName=${req.params.groupName}&groupLocation=${req
      .params.groupLocation}`
  );
});
exports.app = functions.https.onRequest(app);
