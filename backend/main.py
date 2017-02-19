import webapp2
import os
import json
import cgi
import urllib
from google.appengine.api import mail

class SendMail(webapp2.RequestHandler):
    def post(self):
        data = [self.request.get(x) for x in ['name', 'email', 'message']]
        mail.send_mail(sender='nimajnebs@gmail.com',
            to='nimajnebs@gmail.com',
            subject='Ben Shope Contact Form'.format(data[0]),
            body='From: {} | {} \nMessage: {}'.format(*data))
        self.response.out.write('Thanks!  Your message has been sent.')

app = webapp2.WSGIApplication([
  ('/mail', SendMail)
])
