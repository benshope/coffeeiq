import webapp2
import os
import json
import cgi
import urllib
from google.appengine.api import mail

class SendMessage(webapp2.RequestHandler):
    def get(self):
        mail.send_mail(
        	sender='nimajnebs@gmail.com',
            to='nimajnebs@gmail.com',
            subject='Ben Shope Contact Form',
            body='THIS IS AN EMAIL BODY')
        self.response.out.write('Thanks!  Your message has been sent.')

app = webapp2.WSGIApplication([
  ('/mail', SendMessage)
])
