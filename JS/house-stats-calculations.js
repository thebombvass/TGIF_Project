//statistics for house//

//creating statistics object for 113th House //
houseStats = {
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
  
  

  //*****************FUNCTIONS ******************//
  
  //function to get number of members in each party//
  function numberOfMembersCalc(array) {
    for (i = 0; i < array.length; i++) {
      if (array[i].party == "R") {
        houseStats.numberOfReps += 1;
      } else if (array[i].party == "D") {
        houseStats.numberOfDems += 1;
      } else if (array[i].party == "I") {
        houseStats.numberOfInds += 1;
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
    houseStats.repsVoteOnParty = (repPcts.reduce(add) / repPcts.length).toFixed(
      2
    );
    houseStats.demsVoteOnParty = (demPcts.reduce(add) / demPcts.length).toFixed(
      2
    );
    houseStats.indsVoteOnParty = (indPcts>0 ? (indPcts.reduce(add) / indPcts.length).toFixed(2) : 0);
  }
  
  //get a sorted list of congressmen by missed votes//
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
  
  //calculate number of Party Votes and insert correct value for property in object//
  function correctNumberPartyVotes (array) {
    for (i=0; i < array.length; i++) {
      let totalVotes = array[i]["statisticReported"]
      let numPartyVotes = totalVotes*(array[i]["statisticSorted"]/100)
      array[i]["statisticReported"] = Math.round(numPartyVotes)
    }
  }
  
  

  //****************CALLING FUNCTIONS ****************//
  
  //*** Congress 113 Page***//
  
  // functions to fill houseStats with the right numbers//
  numberOfMembersCalc(data.results[0].members);
  votesWithPartyCalc(data.results[0].members);
  
  //stuff to fill 'house at a glance' table//
  document.getElementById("repNum").innerHTML = houseStats.numberOfReps;
  document.getElementById("repPct").innerHTML = ` ${
    houseStats.repsVoteOnParty
  } %`;
  document.getElementById("demNum").innerHTML = houseStats.numberOfDems
  document.getElementById("demPct").innerHTML = ` ${
    houseStats.demsVoteOnParty
  } %`;
  document.getElementById("indNum").innerHTML = houseStats.numberOfInds;
  document.getElementById("indPct").innerHTML = ` ${
    houseStats.indsVoteOnParty
  } %`;
  
  //*** Attendance Page***//
  
  //getting the top 10% attendance//
  houseStats.membersMostEngaged = tenPctCharts(sortByStatistic(data.results[0].members, "missed_votes", "missed_votes_pct"), [
    houseStats.numberOfDems,
    houseStats.numberOfReps,
    houseStats.numberOfInds
  ]);
  
  //stuff to fill 'Most Engaged (Top 10% Attendance)' table//
  if (document.getElementById("mostEngaged")) {
  document.getElementById("mostEngaged").innerHTML = createTenPctTable(houseStats.membersMostEngaged);
  }
  
  //getting the bottom 10% attendance//
  houseStats.membersLeastEngaged = tenPctCharts((sortByStatistic(data.results[0].members, "missed_votes", "missed_votes_pct")).reverse(), [
    houseStats.numberOfDems,
    houseStats.numberOfReps,
    houseStats.numberOfInds
  ]);
  
  //stuff to fill 'Least Engaged (Bottom 10% Attendance)' table//
  if (document.getElementById("leastEngaged")) {
  document.getElementById("leastEngaged").innerHTML = createTenPctTable(houseStats.membersLeastEngaged);
  }
  
  //*** Loyalty Page***//
  
  
  //getting the top 10% loyalty//
  houseStats.membersMostLoyal = tenPctCharts((sortByStatistic(data.results[0].members, "total_votes", "votes_with_party_pct")).reverse(), [
    houseStats.numberOfDems,
    houseStats.numberOfReps,
    houseStats.numberOfInds
  ]);
  //filling in 'Number of Party Votes' since it has to be calculated separately 
  correctNumberPartyVotes(houseStats.membersMostLoyal)
  
  //stuff to fill 'Most Loyal (Top 10%)' table//
  if (document.getElementById("mostLoyal")) {
  document.getElementById("mostLoyal").innerHTML = createTenPctTable(houseStats.membersMostLoyal);
  }
  
  //getting the bottom 10% attendance//
  houseStats.membersLeastLoyal = tenPctCharts(sortByStatistic(data.results[0].members, "total_votes", "votes_with_party_pct"), [
    houseStats.numberOfDems,
    houseStats.numberOfReps,
    houseStats.numberOfInds
  ]);
  //filling in 'Number of Party Votes' since it has to be calculated separately 
  correctNumberPartyVotes(houseStats.membersLeastLoyal)
  
  //stuff to fill 'Least Engaged (Bottom 10% Attendance)' table//
  if (document.getElementById("leastLoyal")) {
  document.getElementById("leastLoyal").innerHTML = createTenPctTable(houseStats.membersLeastLoyal);
  }
  