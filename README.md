#  Firestore CRUD application

Web app that handles firestore documents and supports all the CRUD operations.

![alt text](https://fpegios.000webhostapp.com/fpegios/images/portfolio/firestore-crud.png)

## Prerequisites
  - NodeJS

## Instructions

Execute the following command to load dependencies:
```sh
$ npm install -g gulp-cli
$ npm install
```

In the directory `src/scripts/` create a file **firebase_config.js** with the following content and replace XXXX with your firebase project details:
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