//statistics for senate//

// creating statistics object for 113th Senate. The statistics calculated are saved here //
senateStats = {
  numberOfDems: 0,
  numberOfReps: 0,
  numberOfInds: 0,
  demsVoteOnParty: 0,
  repsVoteOnParty: 0,
  indsVoteOnParty: 0,
  membersLeastLoyal: 0,
  membersMostLoyal: 0,
  membersMostEngaged: 0,
  membersLeastEngaged: 0
};



//*************************************** FUNCTIONS ***************************************//

// function to get number of members in each party. Takes the JSON data array of members and counts 
// how many objects in the array belong to each party 
function numberOfMembersCalc(array) {
  for (i = 0; i < array.length; i++) {
    if (array[i].party == "R") {
      senateStats.numberOfReps += 1;
    } else if (array[i].party == "D") {
      senateStats.numberOfDems += 1;
    } else if (array[i].party == "I") {
      senateStats.numberOfInds += 1;
    }
  }
}

// Calculates average % vote with party for each party. Takes the JSON data array of members as parameter
function votesWithPartyCalc(array) {
  // get the list of percent of votes with party for Democrats, Republicans and Independents
  let repPcts = [];
  let demPcts = [];
  let indPcts = [];
  for (i = 0; i < array.length; i++) {
    if (array[i].party == "R") {
      repPcts.push(array[i].votes_with_party_pct);
    } else if (array[i].party == "D") {
      demPcts.push(array[i].votes_with_party_pct);
    } else {
      indPcts.push(array[i].votes_with_party_pct);
    }
  }
  // turn the list of percentages into an average percent//
  const add = (a, b) => a + b;
  senateStats.repsVoteOnParty = (repPcts.reduce(add) / repPcts.length).toFixed(
    2
  );
  senateStats.demsVoteOnParty = (demPcts.reduce(add) / demPcts.length).toFixed(
    2
  );
  senateStats.indsVoteOnParty = (indPcts>0 ? (indPcts.reduce(add) / indPcts.length).toFixed(2) : 0);
}

// Produces a sorted list of Senators by the 'statisticSorted'. Takes parameters 'data' for the JSON data 
// array of members, 'statisticReported' for a statistic which needs to be carried through and displayed but 
// will not be what the list is sorted by, and 'statisticSorted' which is the statistic that the list will be
// sorted by
function sortByStatistic(data, statisticReported, statisticSorted) {
  sortedArray = [];
  for (i = 0; i < data.length; i++) {
      //creating your own little array of objects with only the information you need to display
      sortedArray.push({
        name: data[i].first_name,
        lname: data[i].last_name,
        url: data[i].url,
        statisticReported: data[i][statisticReported],
        statisticSorted: data[i][statisticSorted]
      })
    }
  sortedArray.sort(function(a,b) {
    return a["statisticSorted"] - b["statisticSorted"];
  });
  return sortedArray;
}

// calculates the membersMostEngaged, membersLeastEngaged, membersMostLoyal, and membersLeastLoyal statistic 
// using sorted list in sortByEngaged (reversed for the membersMostLoyal or membersLeastEngaged statistic). Takes parameters
// 'sortedArray' for the sorted list and 'arrayToSum' being an array of numbers which will be totaled. 'arrayToSum' used
// to get total members.
// Note -- this on its own will produce the wrong number for 'Number Votes with Party' on Party Loyalty page since further
//         calculations are needed in correctNumberPartyVotes()
function tenPctCharts(sortedArray, arrayToSum) {
  totalMembers = arrayToSum.reduce((a,b)=> a+b,0);
  tenPercentAmt = Math.ceil(totalMembers * 0.1);
  topten = [];
  for (s = 0; s < tenPercentAmt; s++) {
    topten.push(sortedArray[s]);
  }
  // makese sure that anyone tied with the last value in top/bottom 10% is included
  while (true) {
    if ( 
      sortedArray[topten.length - 1]["statisticSorted"]===
      sortedArray[topten.length]["statisticSorted"]
    ) {
      topten.push(sortedArray[topten.length]);
    } else {
      break;
    }
  }
  return topten
}

// creating the table of 'Most/Least Engaged and Most/LeastLoyal (Top/Bottom 10%)' using membersMostLoyal, membersLeastLoyal,
// membersMostEngaged, or membersLeastEngaged statistic in parameter 'array'
function createTenPctTable (array){
  let resultnext=""
  for (i = 0; i < array.length; i++) {
    result = `<tr><td> <a href=${array[i].url}>${array[i].name} ${array[i].lname}</a></td><td class=centeredCol> ${array[i]["statisticReported"]} </td><td class=centeredCol> ${array[i]["statisticSorted"]} %</td></tr>`;
    resultnext += result;
    }
  return resultnext;
}

// calculate number of Party Votes from array of objects produced by tenPctCharts() and replacing 'statisticReported'
// with this correct value. For Party Loyalty page
function correctNumberPartyVotes (array) {
  for (i=0; i < array.length; i++) {
    let totalVotes = array[i]["statisticReported"]
    let numPartyVotes = totalVotes*(array[i]["statisticSorted"]/100)
    array[i]["statisticReported"] = Math.round(numPartyVotes)
  }
}



//************************************ CALLING FUNCTIONS ***********************************//


// setting URL for where the data will come from depending on which page is being loaded
let url = "";
if (document.getElementById("title").innerHTML.includes("House")) {
  console.log("yes")
  url = "https://api.propublica.org/congress/v1/113/house/members.json"
} else {
  console.log('no')
  url = "https://api.propublica.org/congress/v1/113/senate/members.json"
}

if (document.getElementById("mostEngaged")) {
  document.getElementById("mostEngaged").innerHTML = `<tr><td colspan="3"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></td></tr>`
}
if (document.getElementById("leastEngaged")) {
  document.getElementById("leastEngaged").innerHTML = `<tr><td colspan="3"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></td></tr>`
}
if (document.getElementById("mostLoyal")) {
  document.getElementById("mostLoyal").innerHTML = `<tr><td colspan="3"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></td></tr>`
}
if (document.getElementById("leastLoyal")) {
  document.getElementById("leastLoyal").innerHTML = `<tr><td colspan="3"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></td></tr>`
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
    // calling functions which will fill numberOfDems, numberOfReps, numberOfInds, repsVoteOnParty, 
    // demsVoteOnParty, indsVoteOnParty with correct answer to be used in 'senate at a glance' table
    numberOfMembersCalc(data.results[0].members);
    votesWithPartyCalc(data.results[0].members);

    // filling 'senate at a glance' table with correct numbers from senateStats
    document.getElementById("repNum").innerHTML = senateStats.numberOfReps;
    document.getElementById("repPct").innerHTML = ` ${
      senateStats.repsVoteOnParty
    } %`;
    document.getElementById("demNum").innerHTML = senateStats.numberOfDems
    document.getElementById("demPct").innerHTML = ` ${
      senateStats.demsVoteOnParty
    } %`;
    document.getElementById("indNum").innerHTML = senateStats.numberOfInds;
    document.getElementById("indPct").innerHTML = ` ${
      senateStats.indsVoteOnParty
    } %`;


    //--------------- Attendance Page ---------------//

    // calling tenPctCharts() to fill membersMostEngaged with the correct information
    senateStats.membersMostEngaged = tenPctCharts(sortByStatistic(data.results[0].members, "missed_votes", "missed_votes_pct"), [
      senateStats.numberOfDems,
      senateStats.numberOfReps,
      senateStats.numberOfInds
    ]);

    // filling 'Most Engaged (Top 10% Attendance)' table with membersMostEngaged statistic and createTenPctTable() function
    if (document.getElementById("mostEngaged")) {
    document.getElementById("mostEngaged").innerHTML = createTenPctTable(senateStats.membersMostEngaged);
    }

    // calling tenPctCharts() to fill membersLeastEngaged with the correct information
    // Note -- this one uses reversed list
    senateStats.membersLeastEngaged = tenPctCharts((sortByStatistic(data.results[0].members, "missed_votes", "missed_votes_pct")).reverse(), [
      senateStats.numberOfDems,
      senateStats.numberOfReps,
      senateStats.numberOfInds
    ]);

    // filling 'Least Engaged (Bottom 10% Attendance)' table with membersLeastEngaged statistic and createTenPctTable() function
    if (document.getElementById("leastEngaged")) {
    document.getElementById("leastEngaged").innerHTML = createTenPctTable(senateStats.membersLeastEngaged);
    }


    //--------------- Loyalty Page ---------------//


    // calling tenPctCharts() to fill membersMostLoyal with the correct information
    // Note -- this one uses reversed list
    senateStats.membersMostLoyal = tenPctCharts((sortByStatistic(data.results[0].members, "total_votes", "votes_with_party_pct")).reverse(), [
      senateStats.numberOfDems,
      senateStats.numberOfReps,
      senateStats.numberOfInds
    ]);
    // calling correctNumberPartyVotes to change 'statisticReported' for 'Number of Party Votes' since it has 
    // to be calculated separately 
    correctNumberPartyVotes(senateStats.membersMostLoyal)

    // filling 'Most Loyal (Top 10% )' table with membersMostLoyal statistic and createTenPctTable() function
    if (document.getElementById("mostLoyal")) {
    document.getElementById("mostLoyal").innerHTML = createTenPctTable(senateStats.membersMostLoyal);
    }

    // calling tenPctCharts() to fill membersLeastLoyal with the correct information
    senateStats.membersLeastLoyal = tenPctCharts(sortByStatistic(data.results[0].members, "total_votes", "votes_with_party_pct"), [
      senateStats.numberOfDems,
      senateStats.numberOfReps,
      senateStats.numberOfInds
    ]);
    // calling membersLeastLoyal to change 'statisticReported' for 'Number of Party Votes' since it has 
    // to be calculated separately 
    correctNumberPartyVotes(senateStats.membersLeastLoyal)

    // calling tenPctCharts() to fill membersLeastLoyal with the correct information
    if (document.getElementById("leastLoyal")) {
    document.getElementById("leastLoyal").innerHTML = createTenPctTable(senateStats.membersLeastLoyal);
    }
  })
  .catch(err =>{
    console.log("Fetch Error :-S", err)
  })
})


