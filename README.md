## Installation
- npm install (or yarn install).
- Get the DOMAIN URL  from nodejs project (which is hosted by heroku) or run locally, and put the URL to /src/services/index.js
- yarn start to run locally.

## Setup Firebase Hosting
- Create A firebase project.
- npm install -g firebase-tools
- firebase login
- firebase init
  - Select the Firebase features you want to use. Database and Hosting are selected by default — all you need to do is press enter to go to the next step.
  - Choose the corresponding project using the up and down keys.
  - Keep the default for the Database Rules file name and just press enter.
  - Type “build” and proceed.
  - Type “y” and press enter.
  - Type “n” and press enter.

- [More Infomation about deploying to firebase](https://medium.com/@bensigo/hosting-your-react-app-with-firebase-hosting-add1fa08c214)

## Deploying
- yarn build
- firebase deploy
