//Javascript file for Transparency Government in Fact project //

//ability to use $ in place of get elem by id

// *********** FUNCTIONS ******************* //

// function to organzie the senate data from JSON into a pretty table as well as sub in full name for party.
function dataInTable(data) {
  //setting up table head
  let result =
    "<thead><th> First Name </th><th> Middle Name </th><th> Last Name </th><th> Party </th><th> State </th><th> Percentage of Votes with Party</th></thead><tbody>";
  let resultnext;
    for (i = 0; i < data.length; i++) {
        resultnext = `<tr class=${data[i].party=="R" ? "dataReps" : (data[i].party=="D" ? "dataDems": "dataInds")}><td><a href="${data[i].url}"> ${
          data[i].first_name
        }</a></td><td> ${data[i].middle_name || ""} </td><td> ${
          data[i].last_name
        } </td><td>${data[i].party=="R" ? "Republican" : (data[i].party=="D" ? "Democrat": "Independent")}</td><td> ${data[i].state} </td><td class=centeredCol> ${
          data[i].votes_with_party_pct
        } %</td></tr>`;
      result += resultnext;
    }
  return result;
}

//function to filter out by party//
function filterOnOff(className, status) {
  let people = document.getElementsByClassName(className)
  for (i=0;i<people.length;i++) {
    people[i].hidden=status
  }
}

// ********************* CALLING FUNCTIONS ****************** //

//filling the Congress113 tables for senate and house//
document.getElementById("table").innerHTML = dataInTable(
  data.results[0].members
);

//filtering for republicans when rep box is checked//
document.getElementById("checkRep").addEventListener("click", function() {
  if (document.getElementById("checkRep").checked) {
    filterOnOff('dataReps',false)
  } else {
    filterOnOff('dataReps',true)
  }
});

// //filtering for democrats when dem box is checked//
document.getElementById("checkDem").addEventListener("click", function() {
  if (document.getElementById("checkDem").checked) {
    filterOnOff('dataDems',false)
  } else {
    filterOnOff('dataDems',true)
  }
});

// //filtering for independents when ind box is checked//
document.getElementById("checkInd").addEventListener("click", function() {
  if (document.getElementById("checkInd").checked) {
    filterOnOff('dataInds',false)
  } else {
    filterOnOff('dataInds',true)
  }
});