#  Firestore CRUD application

Web app that handles firestore documents and support all the CRUD operations.

## Prerequisites
  - NodeJS

## Instructions

Execute the following command to load dependencies:
```sh
$ npm install -g gulp-cli
$ npm install
```

In root directory of the project create a file **firebase_config.js** with the following content and replace XXXX with your firebase project details:
```
var config = {
    apiKey: "XXXX",
    authDomain: "XXXX",
    databaseURL: "XXXX",
    projectId: "XXXX",
    storageBucket: "XXXX",
    messagingSenderId: "XXXX"
};
firebase.initializeApp(config);
``` 

Run the project
```sh
$ gulp
```