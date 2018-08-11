// Initialize Firebase
var config = {
    apiKey: "AIzaSyCtmU_PMKspjUCJyLBiCOFSGSD4M74RYfw",
    authDomain: "train-time-fda24.firebaseapp.com",
    databaseURL: "https://train-time-fda24.firebaseio.com",
    projectId: "train-time-fda24",
    storageBucket: "",
    messagingSenderId: "711187521199"
};
firebase.initializeApp(config);

var database = firebase.database();

var name, destination, startTime, frequency, tMinutesTillTrain, nextTrain;

$("#submit").on("click", function (event) {
    event.preventDefault();
    name = $("#inputTrainName").val();
    destination = $("#inputDestination").val();
    startTime = $("#inputTrainTime").val();
    frequency = $("#inputFrequency").val();
    console.log(name);
    console.log(destination);
    console.log(startTime);
    console.log(frequency);
    nextArrival();
    database.ref().push({
        name: name,
        destination: destination,
        startTime: startTime,
        frequency: frequency,
        minutesTillTrain: tMinutesTillTrain,
        nextTrain: nextTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

});     //submit-button on.click() closed

database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    sv = snapshot.val();
    var newRow = $("<tr>");
    var nameEntry = $("<td>");
    var destinationEntry = $("<td>");
    var frequencyEntry = $("<td>");
    var nextTrainEntry = $("<td>");
    var minutesAwayEntry = $("<td>");
    nameEntry.text(sv.name);
    destinationEntry.text(sv.destination);
    frequencyEntry.text(sv.frequency);
    nextTrainEntry.text(sv.nextTrain);
    minutesAwayEntry.text(sv.minutesTillTrain);
    newRow.append(nameEntry);
    newRow.append(destinationEntry);
    newRow.append(frequencyEntry);
    newRow.append(nextTrainEntry);
    newRow.append(minutesAwayEntry);
    $("#trainRow").append(newRow);
}, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
});

function nextArrival(){
    var startTimeConverted = moment(startTime, "HH:mm");
    console.log(startTimeConverted);
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
     tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrainVar = moment().add(tMinutesTillTrain, "minutes");
    console.log(nextTrainVar);
    console.log("ARRIVAL TIME: " + moment(nextTrainVar).format("hh:mm"));
    nextTrain = nextTrainVar.format("hh:mm");
    console.log(nextTrain);
}
