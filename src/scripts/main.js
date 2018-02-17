var inputFirstname = document.querySelector("#firstname");
var inputLastname = document.querySelector("#lastname");
var addButton = document.querySelector("#add");
var deleteButton = document.querySelector("#delete-col");
var userlist = document.querySelector("#userlist");
var modal = document.getElementById('myModal');
var modalName = document.getElementById('modal-name');
var span = document.getElementsByClassName("close")[0];
var inputNewFirstname = document.querySelector("#new-firstname");
var inputNewLastname = document.querySelector("#new-lastname");
var updateButton = document.querySelector("#update");
var deleteUserButton = document.querySelector("#delete-user");

var db = firebase.firestore();
var usersCollection = db.collection("users");
var usersHTML = "";
var inputs = {
    firstName: "",
    lastName: ""
}
var newInputs = {
    firstName: "",
    lastName: ""
}
var clickedUserId = "";

readCollection(usersCollection);

addButton.onclick = function() {
    inputs.firstName = inputFirstname.value;
    inputs.lastName = inputLastname.value;
    if (inputs.firstName != "" && inputs.lastName) {
        createDocument(usersCollection, inputs);
    } else {
        alert("You must complete First and Last Name.");
    }
};

deleteButton.onclick = function() {
    if (usersHTML != "") {
        deleteCollection(usersCollection);
    }
};

deleteUserButton.onclick = function() {
    deleteDocument(usersCollection, clickedUserId);
};

updateButton.onclick = function() {
    newInputs.firstName = inputNewFirstname.value;
    newInputs.lastName = inputNewLastname.value;
    updateDocument(usersCollection, clickedUserId, newInputs);
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function openModal(clickedUser) {
    clickedUserId = clickedUser.id;
    modalName.innerHTML = "User: " + clickedUser.innerHTML;
    newInputs.firstName = inputNewFirstname.value = "";
    newInputs.lastName = inputNewLastname.value = "";
    modal.style.display = "block";
}

// READ collection
function readCollection(collection) {
    usersHTML = "";
    userlist.innerHTML = usersHTML;
    collection.get().then(function(querySnapshot) {
        $(".loading-users").hide();
        if (querySnapshot.size != 0) {
            console.log("Collection successfully fetched!");
            querySnapshot.forEach(function(doc) {
                usersHTML = usersHTML.concat("<p id=\"" + doc.id + "\" onclick=\"openModal(this)\">" + doc.data().firstName + " " + doc.data().lastName + "</p>");
            });
            userlist.innerHTML = usersHTML;
        } else {
            $(".no-users").show();
            console.log("Empty collection!");
        }
    }).catch(function(error){
        console.log("Got an error: ", error);
    });
}

// CREATE document
function createDocument(collection, document) {
    // Add a new document with a generated id.
    collection.add(document).then(function(doc) {
        console.log("Document successfully created!");
        $(".no-users").hide();
        newDocId = doc.id;
        usersHTML = usersHTML.concat("<p id=\"" + doc.id + "\" onclick=\"openModal(this)\">" + document.firstName + " " + document.lastName + "</p>");
        userlist.innerHTML = usersHTML;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// DELETE collection
function deleteCollection(collection) {
    collection.get().then(function (snapshot) {
        // When there are no documents left, we are done
        if (snapshot.size == 0) {
            console.log("Empty collection!");
            userlist.innerHTML = "";
            usersHTML = "";
            return 0;
        }

        // delete all documents in a batch
        var batch = db.batch();
        snapshot.docs.forEach(function(doc) {
            batch.delete(doc.ref);
        });

        // commit batch
        batch.commit().then(function() {
            console.log("Collection deleted!");
            $(".no-users").show();
            userlist.innerHTML = "";
            usersHTML = "";
        });
    });
}

// UPDATE document
function updateDocument(collection, documentId, updatedDocument) {
    collection.doc(documentId).update(updatedDocument).then(function() {
        console.log("Document successfully updated!");
        modal.style.display = "none";
        document.getElementById(documentId).innerHTML = inputNewFirstname.value + " " + inputNewLastname.value;
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    }, { merge: true });
}

// DELETE document
function deleteDocument(collection, documentId) {
    collection.doc(documentId).delete().then(function() {
        console.log("Document successfully deleted!");
        document.getElementById(documentId).remove();
        modal.style.display = "none";
        if ($( "#userlist" ).html() == "") {
            usersHTML = "";
            $(".no-users").show();
        }
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}