//Javascript file for Transparency Government in Fact project //

function dothis(data) {
    let result = "<thead><th> First Name </th><th> Middle Name </th><th> Last Name </th><th> Party </th><th> State </th><th> Percentage of Votes with Party</th></thead><tbody>"
    let resultnext;
  for (i = 0; i < data.length; i++) {
      if (data[i].party == "R") {
        resultnext = `<tr><td> ${data[i].first_name} </td><td> ${data[i].middle_name || ""} </td><td> ${data[i].last_name} </td><td> Republican </td><td> ${data[i].state} </td><td id=pctPartyCol> ${data[i].votes_with_party_pct} %</td></tr>`;
      } else if (data[i].party == "D") {
        resultnext = `<tr><td> ${data[i].first_name} </td><td> ${data[i].middle_name || ""} </td><td> ${data[i].last_name} </td><td> Democrat </td><td> ${data[i].state} </td><td id=pctPartyCol> ${data[i].votes_with_party_pct} %</td></tr>`;
      } else if (data[i].party == "I") {
        resultnext = `<tr><td> ${data[i].first_name} </td><td> ${data[i].middle_name || ""} </td><td> ${data[i].last_name} </td><td> Independent </td><td> ${data[i].state} </td><td id=pctPartyCol> ${data[i].votes_with_party_pct} %</td></tr>`;
      } else {
        resultnext = `<tr><td> ${data[i].first_name} </td><td> ${data[i].middle_name || ""} </td><td> ${data[i].last_name} </td><td> Unkown </td><td> ${data[i].state} </td><td id=pctPartyCol> ${data[i].votes_with_party_pct} %</td></tr>`;
      }
    result += resultnext;
    }
  return result;
}
console.log(dothis(senateData.results[0].members));

document.getElementById("senateData").innerHTML = dothis(senateData.results[0].members);
