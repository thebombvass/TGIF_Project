//statistics for senate// 

//creating statistics object for 113th Senate //
senateStats = {numberOfDems: 0, numberOfReps: 0, numberOfInds: 0, 
    demsVoteOnParty: 0, repsVoteOnParty: 0, indsVoteOnParty: 0, membersVoteAgainstParty: 0,
    membersVoteWithParty: 0, membersMissedVotesMost: 0, 
    membersMissedVotesLeast: 0 }

//*****************FUNCTIONS ******************//

//function to get number of members in each party//
function numberOfMembersCalc (array) {
    for (i = 0; i < array.length; i++) {
        if (array[i].party == "R") {
            senateStats.numberOfReps += 1;
          } else if (array[i].party == "D") {
            senateStats.numberOfDems +=1
          } else if (array[i].party == "I") {
            senateStats.numberOfInds += 1
          }
    }
}

//function to get average Democrat vote with party and average Republican vote with party 
function votesWithPartyCalc (array) {
    //get the list of percent of votes with party for dems and reps//
    let repPcts = []
    let demPcts = []
    let indPcts = []
    for (i = 0; i < array.length; i++) {
        if (array[i].party == "R") {
            repPcts.push(array[i].votes_with_party_pct)
          } else if (array[i].party == "D") {
            demPcts.push(array[i].votes_with_party_pct)
          } else {
            indPcts.push(array[i].votes_with_party_pct)
          }
    }
    //turn the array into an average, reps first then dems//
    const add = (a,b) => a+b
    senateStats.repsVoteOnParty = ((repPcts.reduce(add))/repPcts.length).toFixed(2)
    senateStats.demsVoteOnParty = ((demPcts.reduce(add))/demPcts.length).toFixed(2)
    senateStats.indsVoteOnParty = ((indPcts.reduce(add))/indPcts.length).toFixed(2)
}

function heyonesecjustsettingup (array) {
    //get the list of percent of votes with party for dems and reps//
    let repPcts = []
    let demPcts = []
    let indPcts = []
    for (i = 0; i < array.length; i++) {
        if (array[i].party == "R") {
            repPcts.push(array[i].votes_with_party_pct)
          } else if (array[i].party == "D") {
            demPcts.push(array[i].votes_with_party_pct)
          } else {
            indPcts.push(array[i].votes_with_party_pct)
          }
    }
    //turn the array into an average, reps first then dems//
    const add = (a,b) => a+b
    senateStats.repsVoteOnParty = ((repPcts.reduce(add))/repPcts.length).toFixed(2)
    senateStats.demsVoteOnParty = ((demPcts.reduce(add))/demPcts.length).toFixed(2)
    senateStats.indsVoteOnParty = ((indPcts.reduce(add))/indPcts.length).toFixed(2)
}

//****************CALLING FUNCTIONS ****************//

// functions to fill senateStats with the right numbers//
numberOfMembersCalc (senateData.results[0].members)
votesWithPartyCalc(senateData.results[0].members)

//stuff to fill 'senate at a glance' table//
document.getElementById("repNum").innerHTML = senateStats.numberOfReps
document.getElementById("repPct").innerHTML = ` ${senateStats.repsVoteOnParty} %`
document.getElementById("demNum").innerHTML = senateStats.numberOfDems
document.getElementById("demPct").innerHTML = ` ${senateStats.demsVoteOnParty} %`
document.getElementById("indNum").innerHTML = senateStats.numberOfInds
document.getElementById("indPct").innerHTML = ` ${senateStats.indsVoteOnParty} %`
