[![CircleCI](https://circleci.com/bb/benshope/coffeeiq.svg?style=shield&circle-token=520c5f98bda3f7f45656e8de7c96f37e4b03c138)](https://circleci.com/bb/benshope/coffeeiq)

# CoffeeIQ

 CoffeeIQ is a simple app that schedules a coffee break with a new coworker each week.  It regularly pairs up team members who don’t know each other well to spread trust and collaboration across your organization.

## TODO
- Make "your org needs to input an auth token" notification work
- Create calendar invite send script
- Add contact/support page
- Keep a record of historical meetings sent to create schedule priority so that users do not get matched again?
- Add CRON cloud function to trigger calendar invites
- Set up CRON job to trigger calendar send endpoint
- Org admin functionality
- Site admin functionality
- Improve home page copy, group page copy (describe what a group is/that calendar invites are sent within a group).

## Stack
- Create React App
- React Redux
- React Router
- React Router Redux
- Redux Observable
- Redux Devtools Extension for Chrome
- Firebase SDK with OAuth authentication
- SASS
