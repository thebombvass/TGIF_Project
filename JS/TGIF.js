//Javascript file for Transparency Government in Fact project //

//ability to use $ in place of get elem by id

// *********** FUNCTIONS ******************* //

// function to organzie the senate data from JSON into a pretty table as well as sub in full name for party. Takes parameter
// 'data' as the array of senators and takes the parameter 'filter' to display a list of republicans, democrats, independents, or everyone
function dataInTable(data, filter) {
  //setting up table head
  let result =
    "<thead><th> First Name </th><th> Middle Name </th><th> Last Name </th><th> Party </th><th> State </th><th> Percentage of Votes with Party</th></thead><tbody>";
  let resultnext;
  //filtering for republicans for data 
  if (filter == "rep") {
    for (i = 0; i < data.length; i++) {
      if (data[i].party == "R") {
        resultnext = `<tr><td><a href="${data[i].url}"> ${
          data[i].first_name
        }</a></td><td> ${data[i].middle_name || ""} </td><td> ${
          data[i].last_name
        } </td><td> ${
          data[i].party == "R"
            ? "Republican"
            : data[i].party == "D"
            ? "Democrat"
            : "Independent"
        } </td><td> ${data[i].state} </td><td class=centeredCol> ${
          data[i].votes_with_party_pct
        } %</td></tr>`;
        result += resultnext;
      }
    }
  //filtering for democrats for data 
  } else if (filter == "dem") {
    for (i = 0; i < data.length; i++) {
      if (data[i].party == "D") {
        resultnext = `<tr><td><a href="${data[i].url}"> ${
          data[i].first_name
        }</a></td><td> ${data[i].middle_name || ""} </td><td> ${
          data[i].last_name
        } </td><td> ${
          data[i].party == "R"
            ? "Republican"
            : data[i].party == "D"
            ? "Democrat"
            : "Independent"
        } </td><td> ${data[i].state} </td><td class=centeredCol> ${
          data[i].votes_with_party_pct
        } %</td></tr>`;
        result += resultnext;
      }
    }
    //filtering for independents for data 
  } else if (filter == "ind") {
    for (i = 0; i < data.length; i++) {
      if (data[i].party == "I") {
        resultnext = `<tr><td><a href="${data[i].url}"> ${
          data[i].first_name
        }</a></td><td> ${data[i].middle_name || ""} </td><td> ${
          data[i].last_name
        } </td><td> ${
          data[i].party == "R"
            ? "Republican"
            : data[i].party == "D"
            ? "Democrat"
            : "Independent"
        } </td><td> ${data[i].state} </td><td class=centeredCol> ${
          data[i].votes_with_party_pct
        } %</td></tr>`;
        result += resultnext;
      }
    }
  //if 'rep', 'dem' or 'ind' is not present in filter, just send the whole list
  } else {
    for (i = 0; i < data.length; i++) {
      resultnext = `<tr><td><a href="${data[i].url}"> ${
        data[i].first_name
      }</a></td><td> ${data[i].middle_name || ""} </td><td> ${
        data[i].last_name
      } </td><td> ${
        data[i].party == "R"
          ? "Republican"
          : data[i].party == "D"
          ? "Democrat"
          : "Independent"
      } </td><td> ${data[i].state} </td><td class=centeredCol> ${
        data[i].votes_with_party_pct
      } %</td></tr>`;
      result += resultnext;
    }
  }
  return result;
}

// ********************* CALLING FUNCTIONS ****************** //

//filling the Congress113 tables for senate and house//
document.getElementById("table").innerHTML = dataInTable(
  data.results[0].members, "all"
);

//filter functions//
//filtering for republicans when rep box is checked//
document.getElementById("checkRep").addEventListener("click", function() {
  if (document.getElementById("checkRep").checked) {
    document.getElementById("table").innerHTML = dataInTable(
      data.results[0].members, "rep"
    );
  } else {
    document.getElementById("table").innerHTML = dataInTable(
      data.results[0].members, "all"
    );
  }
});

//filtering for democrats when dem box is checked//
document.getElementById("checkDem").addEventListener("click", function() {
  if (document.getElementById("checkDem").checked) {
    document.getElementById("table").innerHTML = dataInTable(
      data.results[0].members, "dem"
    );
  } else {
    document.getElementById("table").innerHTML = dataInTable(
      data.results[0].members, "all"
    );
  }
});

//filtering for independents when ind box is checked//
document.getElementById("checkInd").addEventListener("click", function() {
  if (document.getElementById("checkInd").checked) {
    document.getElementById("table").innerHTML = dataInTable(
      data.results[0].members, "ind"
    );
  } else {
    document.getElementById("table").innerHTML = dataInTable(
      data.results[0].members, "all"
    );
  }
});