var config = {
    apiKey: "AIzaSyBPBsi5zfZCgY4muyswWAQC3wK7BNE6MCg",
    authDomain: "realtime-database-exampl-f77f2.firebaseapp.com",
    databaseURL: "https://realtime-database-exampl-f77f2.firebaseio.com",
    projectId: "realtime-database-exampl-f77f2",
    storageBucket: "realtime-database-exampl-f77f2.appspot.com",
    messagingSenderId: "860473344145"
};

firebase.initializeApp(config);
  
var inputFirstname = document.querySelector("#firstname");
var inputLastname = document.querySelector("#lastname");
var addButton = document.querySelector("#add");
var delColButton = document.querySelector("#delete-col");
var userlist = document.querySelector("#userlist");

var db = firebase.firestore();
var usersRef = firebase.firestore().collection("users");
var users = "";

loadCollection();

// LOAD all users
function loadCollection() {
    usersRef.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
                users = users.concat("<p id=\"" + doc.id + "\">"+doc.data().firstName + " " + doc.data().lastName + "</p>");
            });
            userlist.innerHTML = users;
            users = "";
        }).catch(function(error){
            console.log("Got an error: ", error);
        });
}

// CREATE new user
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
        users = "";
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});

// DELETE collection
delColButton.addEventListener("click",function(){
    deleteCollection(db, usersRef, 1);
});

function deleteCollection(db, collectionRef, batchSize) {
    var query = collectionRef.orderBy('__name__');

    return new Promise(function(resolve, reject) {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
    query.get()
        .then(function (snapshot) {
            // When there are no documents left, we are done
            if (snapshot.size == 0) {
                userlist.innerHTML = "";
                return 0;
            }

            // Delete documents in a batch
            var batch = db.batch();
            snapshot.docs.forEach(function(doc) {
                batch.delete(doc.ref);
            });

            return batch.commit().then(function() {
                return snapshot.size;
            });
        }).then(function(numDeleted) {
            if (numDeleted <= batchSize) {
                resolve();
                userlist.innerHTML = "";
                return;
            }

            // Recurse on the next process tick, to avoid
            // exploding the stack.
            process.nextTick(function() {
                deleteQueryBatch(db, query, batchSize, resolve, reject);
            });
        })
        .catch(reject);
}