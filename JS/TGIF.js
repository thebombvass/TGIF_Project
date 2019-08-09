//Javascript file for Transparency Government in Fact project //


// *********** FUNCTIONS ******************* //

// function to organzie the senate data from JSON into a pretty table as well as sub in full name for party //
function dataInTable(data) {
    let result = "<thead><th> First Name </th><th> Middle Name </th><th> Last Name </th><th> Party </th><th> State </th><th> Percentage of Votes with Party</th></thead><tbody>"
    let resultnext;
  for (i = 0; i < data.length; i++) {
    resultnext = `<tr><td><a href="${data[i].url}"> ${data[i].first_name}</a></td><td> ${data[i].middle_name || ""} </td><td> ${data[i].last_name} </td><td> ${(data[i].party == "R" ? "Republican":data[i].party == "D" ?"Democrat":"Independent")} </td><td> ${data[i].state} </td><td class=centeredCol> ${data[i].votes_with_party_pct} %</td></tr>`;
    result += resultnext;
    }
  return result;
}

// ********************* CALLING FUNCTIONS ****************** //

document.getElementById('table').innerHTML = dataInTable (data.results[0].members)
