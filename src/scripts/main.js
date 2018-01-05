var config = {
    apiKey: "AIzaSyBPBsi5zfZCgY4muyswWAQC3wK7BNE6MCg",
    authDomain: "realtime-database-exampl-f77f2.firebaseapp.com",
    databaseURL: "https://realtime-database-exampl-f77f2.firebaseio.com",
    projectId: "realtime-database-exampl-f77f2",
    storageBucket: "realtime-database-exampl-f77f2.appspot.com",
    messagingSenderId: "860473344145"
};
firebase.initializeApp(config);
  
var header = document.querySelector("#fullname");
var inputFirstname = document.querySelector("#firstname");
var inputLastname = document.querySelector("#lastname");
var addButton = document.querySelector("#add");
var loadButton = document.querySelector("#load");
var userlist = document.querySelector("#userlist");

var db = firebase.firestore();
var usersRef = firebase.firestore().collection("users");
var users = "";

usersRef.get()
.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
        users = users.concat("<p id=\"" + doc.id + "\">"+doc.data().firstName + " " + doc.data().lastName + "</p>");
    });
    userlist.innerHTML = users;
}).catch(function(error){
    console.log("Got an error: ", error);
});;

// add new user
addButton.addEventListener("click",function(){
    var firstName = inputFirstname.value;
    var lastName = inputLastname.value;

    usersRef.add({
        firstName: firstName,
        lastName: lastName
    })
    .then(function(doc) {
        newDocId = doc.id;
        console.log("Document written with ID: ", doc.id);
        users = users.concat("<p id=\"" + doc.id + "\">"+firstName + " " + lastName + "</p>");
        userlist.innerHTML = users;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});

// load and show users collection
loadButton.addEventListener("click",function(){
    users = "";
    usersRef.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            users = users.concat("<p id=\"" + doc.id + "\">"+doc.data().firstName + " " + doc.data().lastName + "</p>");
        });
        userlist.innerHTML = users;
    }).catch(function(error){
        console.log("Got an error: ", error);
    });;
});