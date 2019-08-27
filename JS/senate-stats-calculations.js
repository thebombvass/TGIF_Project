//statistics for senate//

//creating statistics object for 113th Senate //
senateStats = {
  numberOfDems: 0,
  numberOfReps: 0,
  numberOfInds: 0,
  demsVoteOnParty: 0,
  repsVoteOnParty: 0,
  indsVoteOnParty: 0,
  membersVoteAgainstParty: 0,
  membersVoteWithParty: 0,
  membersMostEngaged: 0,
  membersLeastEngaged: 0
};



//*****************FUNCTIONS ******************//

//function to get number of members in each party//
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

//function to get average Democrat vote with party and average Republican vote with party
function votesWithPartyCalc(array) {
  //get the list of percent of votes with party for dems and reps//
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
  //turn the array into an average, reps first then dems//
  const add = (a, b) => a + b;
  senateStats.repsVoteOnParty = (repPcts.reduce(add) / repPcts.length).toFixed(
    2
  );
  senateStats.demsVoteOnParty = (demPcts.reduce(add) / demPcts.length).toFixed(
    2
  );
  senateStats.indsVoteOnParty = (indPcts.reduce(add) / indPcts.length).toFixed(
    2
  );
}

//get a sorted list of senators by missed votes//
function sortByStatistic(data, statisticReported, statisticSorted) {
  sortedArray = [];
  for (i = 0; i < data.length; i++) {
      sortedArray.push({
        name: data[i].first_name,
        lname: data[i].last_name,
        statisticReported: data[i][statisticReported],
        statisticSorted: data[i][statisticSorted]
      })
    }
  sortedArray.sort(function(a,b) {
    return a["statisticSorted"] - b["statisticSorted"];
  });
  return sortedArray;
}

//calculates the membersMostEngaged or membersLeastEngaged statistic using sorted list in sortByEngaged (reversed for least)//
function tenPctCharts(sortedArray, arrayToSum) {
  console.log(sortedArray)
  totalMembers = arrayToSum.reduce((a,b)=> a+b,0);
  tenPercentAmt = Math.ceil(totalMembers * 0.1);
  topten = [];
  for (s = 0; s < tenPercentAmt; s++) {
    topten.push(sortedArray[s]);
  }
  //makese sure that anyone tied with the lowest number of votes is included//
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

//creating the table of 'Most/Least Engaged (Top/Bottom 10% Attendance)' using membersMostEngaged or membersLeastEngaged stat//
function createTenPctTable (array){
  let resultnext=""
  for (i = 0; i < array.length; i++) {
    result = `<tr><td>${array[i].name} ${array[i].lname} </td><td class=centeredCol> ${array[i]["statisticReported"]} </td><td class=centeredCol> ${array[i]["statisticSorted"]} %</td></tr>`;
    resultnext += result;
    }
  return resultnext;
}


//****************CALLING FUNCTIONS ****************//

//*** Congress 113 Page***//

// functions to fill senateStats with the right numbers//
numberOfMembersCalc(data.results[0].members);
votesWithPartyCalc(data.results[0].members);

//stuff to fill 'senate at a glance' table//
document.getElementById("repNum").innerHTML = senateStats.numberOfReps;
document.getElementById("repPct").innerHTML = ` ${
  senateStats.repsVoteOnParty
} %`;
document.getElementById("demNum").innerHTML = senateStats.numberOfDem
document.getElementById("demPct").innerHTML = ` ${
  senateStats.demsVoteOnParty
} %`;
document.getElementById("indNum").innerHTML = senateStats.numberOfInds;
document.getElementById("indPct").innerHTML = ` ${
  senateStats.indsVoteOnParty
} %`;


//*** Attendance Page***//

//getting the top 10% attendance//
senateStats.membersMostEngaged = tenPctCharts(sortByStatistic(data.results[0].members, "missed_votes", "missed_votes_pct"), [
  senateStats.numberOfDems,
  senateStats.numberOfReps,
  senateStats.numberOfInds
]);


//stuff to fill 'Most Engaged (Top 10% Attendance)' table//
if (document.getElementById("mostEngaged")) {
document.getElementById("mostEngaged").innerHTML = createTenPctTable(senateStats.membersMostEngaged);
}

//getting the bottom 10% attendance//
senateStats.membersLeastEngaged = tenPctCharts((sortByStatistic(data.results[0].members, "missed_votes", "missed_votes_pct")).reverse(), [
  senateStats.numberOfDems,
  senateStats.numberOfReps,
  senateStats.numberOfInds
]);

//stuff to fill 'Least Engaged (Bottom 10% Attendance)' table//
if (document.getElementById("leastEngaged")) {
document.getElementById("leastEngaged").innerHTML = createTenPctTable(senateStats.membersLeastEngaged);
}

//*** Loyalty Page***//


//getting the top 10% loyalty//
senateStats.membersVoteWithParty = tenPctCharts((sortByStatistic(data.results[0].members, "votes_with_party_pct", "votes_with_party_pct")).reverse(), [
  senateStats.numberOfDems,
  senateStats.numberOfReps,
  senateStats.numberOfInds
]);

//stuff to fill 'Most Loyal (Top 10%)' table//
if (document.getElementById("mostLoyal")) {
document.getElementById("mostLoyal").innerHTML = createTenPctTable(senateStats.membersVoteWithParty);
console.log(senateStats.membersVoteWithParty)
}

//getting the bottom 10% attendance//
senateStats.membersVoteAgainstParty = tenPctCharts(sortByStatistic(data.results[0].members, "votes_with_party_pct", "votes_with_party_pct"), [
  senateStats.numberOfDems,
  senateStats.numberOfReps,
  senateStats.numberOfInds
]);


//stuff to fill 'Least Engaged (Bottom 10% Attendance)' table//
if (document.getElementById("leastLoyal")) {
document.getElementById("leastLoyal").innerHTML = createTenPctTable(senateStats.membersVoteAgainstParty);
}


//*Number Party Votes is member.total_votes*member.votes_with_party_pct/100