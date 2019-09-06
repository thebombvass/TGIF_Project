//Javascript file for Transparency Government in Fact project //

// *************************************** FUNCTIONS ************************************ //

// function to organzie the  data from JSON into a pretty table as well as sub in full name for party. Takes parameter
// 'data' as the array of senators/congressmen. Adds classes for 'persondata', state, and party for filtering later
function dataInTable(data) {
  //setting up table head
  let result =
    "<thead><th> First Name </th><th> Middle Name </th><th> Last Name </th><th> Party </th><th> State </th><th> Percentage of Votes with Party</th></thead><tbody>";
  let resultnext;
  for (i = 0; i < data.length; i++) {
    resultnext = `<tr class="persondata ${data[i].state} ${
      data[i].party
    }"><td><a href="${data[i].url}"> ${data[i].first_name}</a></td><td> ${data[
      i
    ].middle_name || ""} </td><td> ${data[i].last_name} </td><td>${
      data[i].party == "R"
        ? "Republican"
        : data[i].party == "D"
        ? "Democrat"
        : "Independent"
    }</td><td> ${data[i].state} </td><td class="centeredCol"> ${
      data[i].votes_with_party_pct
    } %</td></tr>`;
    result += resultnext;
  }
  result += `<tr id="emptyMessage" hidden><td colspan="6">Oops! Your search displayed no results. Try adjusting the filters.</td></tr></tbody>`;
  return result;
}

// function to filter the results in the table based on input from the user. It uses classes created when creating the table in dataIntable()
// takes only className='persondata' since this gives you the list of all entries to begin filtering from. State parameter should be
// the value set to the dropdown. This function also prints a message if no results are produced by the combination of filters you chose
function filterResults(className, state) {
  //creating some variables to make things easier
  let people = document.getElementsByClassName(className);
  let Rcheck = document.getElementById("checkRep").checked;
  let Dcheck = document.getElementById("checkDem").checked;
  let Icheck = document.getElementById("checkInd").checked;
  // state ="All" is a unique circumstance in which you can display anyone. Requires different logic a little so
  // we handle this first, then logic for getting list of people for the state necessary
  if (state == "All") {
    for (i = 0; i < people.length; i++) {
      people[i].hidden = false;
    }
  } else {
    for (i = 0; i < people.length; i++) {
      if (people[i].classList[1] == state) {
        people[i].hidden = false;
      } else {
        people[i].hidden = true;
      }
    }
  }
  // if any of the boxes are NOT checked, remove those people
  if (Rcheck == false) {
    for (i = 0; i < people.length; i++) {
      if (people[i].classList[2] == "R") {
        people[i].hidden = true;
      }
    }
  }
  if (Dcheck == false) {
    for (i = 0; i < people.length; i++) {
      if (people[i].classList[2] == "D") {
        people[i].hidden = true;
      }
    }
  }
  if (Icheck == false) {
    for (i = 0; i < people.length; i++) {
      if (people[i].classList[2] == "I") {
        people[i].hidden = true;
      }
    }
  }
  // if there are no results produced by this filter combination, add an alert message
  let notHiddenCounter = 0
  for(i = 0; i < people.length; i++) {
    if (people[i].hidden == false) {
      notHiddenCounter += 1
    }
  }
  if (notHiddenCounter == 0) {
    document.getElementById("emptyMessage").hidden = false
  } else {
    document.getElementById("emptyMessage").hidden = true
  }
}

// function create sorted list of states for dropdown filter. adds class 'stateChosen' so that you can call these states later using
// getElementsByClassName
function createStatesDropDown() {
  let statesByName = [
    "All",
    "Alaska",
    "Alabama",
    "Arkansas",
    "Arizona",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Iowa",
    "Idaho",
    "Illinois",
    "Indiana",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Massachusetts",
    "Maryland",
    "Maine",
    "Michigan",
    "Minnesota",
    "Missouri",
    "Mississippi",
    "Montana",
    "North Carolina",
    "North Dakota",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "Nevada",
    "New York",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Virginia",
    "Vermont",
    "Washington",
    "Wisconsin",
    "West Virginia",
    "Wyoming"
  ];
  let statesByAbbrev = [
    "All",
    "AK",
    "AL",
    "AR",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VA",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY"
  ];
  result = "";
  for (i = 0; i < statesByName.length; i++) {
    result += `<a class="dropdown-item stateChosen" id="${statesByAbbrev[i]}">${
      statesByName[i]
    }</a>`;
  }
  return result;
}

// function to unselect 'Select All' checkbox if one of the checkboxes
// is not selected
function selectAllResponse() {
  let selectAll = document.getElementById("checkAll");
  if (document.getElementById("checkRep").checked == false) {
    selectAll.checked = false;
  } else if (document.getElementById("checkDem").checked == false) {
    selectAll.checked = false;
  } else if (document.getElementById("checkInd").checked == false) {
    selectAll.checked = false;
  } else {
    selectAll.checked = true;
  }
}

// ********************************************** CALLING FUNCTIONS **************************************** //
document.getElementById("table").innerHTML='<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>'


// creating the dropdown for states //
document.getElementById("stateDropDown").innerHTML = createStatesDropDown();

// setting URL for where the data will come from depending on which page is being loaded
let url = "";
if (document.getElementById("title").innerHTML=="TGIF House Data") {
  console.log("yes")
  url = "https://api.propublica.org/congress/v1/113/house/members.json"
} else {
  console.log('no')
  url = "https://api.propublica.org/congress/v1/113/senate/members.json"
}

// getting the data dynamically/asychronously using AJAX
fetch(url, {
  method: "get",
  headers: {
    "X-API-Key" : "9PxBtcchx3OZS4CHGYPU8VD0nG68lNGgic8kiU73"
  }
}).then(response => {
  if (response.status !== 200) {
    console.log("Looks like there was an issue. Status is "+ response.status);
    return;
  } 
  response.json().then(data => {
    console.log("ProPublica Response is good!")
    console.log(data.results[0].members)
    // filling the Congress113 tables for senate and house
    document.getElementById("table").innerHTML = dataInTable(
      data.results[0].members
    );

    // filtering for republicans when rep box is checked. Must be done after load
    document.getElementById("checkRep").addEventListener("click", function() {
      let state = document.getElementById("stateDropDownBtn").value;
      selectAllResponse();
      filterResults("persondata", state);
    });
    // filtering for democrats when dem box is checked. Uses 'persondata' class created in dataIntable()//
    document.getElementById("checkDem").addEventListener("click", function() {
      let state = document.getElementById("stateDropDownBtn").value;
      selectAllResponse();
      filterResults("persondata", state);
    });

    // filtering for independents when ind box is checked. Uses 'persondata' class created in dataIntable()//
    document.getElementById("checkInd").addEventListener("click", function() {
      let state = document.getElementById("stateDropDownBtn").value;
      selectAllResponse();
      filterResults("persondata", state);
    });

    // when a state is chose from the dropdown, filter for that state and set the value of dropdown. Uses 'persondata'
    // class created in dataIntable() and 'stateChosen' class created in createStatesDropDown(). Also changes the label of dropdown to
    // reflect the state that was last clicked/is being filtered for
    let stateChosen = document.getElementsByClassName("stateChosen");
    Array.from(stateChosen).forEach(function(element) {
      element.addEventListener("click", function() {
        document.getElementById("stateDropDownBtn").value = `${element.id}`;
        document.getElementById("stateDropDownBtn").innerHTML = `State: ${
          element.id
        }`;
        filterResults("persondata", element.id);
      });
    });

    // turn on select all box
    document.getElementById("checkAll").addEventListener("click", function() {
      document.getElementById("checkRep").checked = true;
      document.getElementById("checkDem").checked = true;
      document.getElementById("checkInd").checked = true;
      filterResults("persondata", document.getElementById("stateDropDownBtn").value);
    });

    //   data.results[0].members.filter(function(member) {
    //   return member.party == "R"
    // }))
  })
  .catch(err =>{
    console.log("Fetch Error :-S", err)
  })
})