const apiKey = "cHWA0cyVrIeIZHFmZyrlp3UBNFO1aqLn7LsYLij2";
const url = "https://api.propublica.org/congress/v1/116/senate/members.json";
setTimeout(function(){
    document.getElementById("appLa").style.display = "block"; 
   }, 1000);

const app = new Vue({
  el: '#appLa',
  data() {
    return {
        searchQuery: '',
        members: [],
        errored: false,
        currentSort: 'missed_votes',
        currentSortLoyal: 'votes_with_party_pct',
        currentSorted: 'last_name',
        currentSortDir: 'asc',
        currentSort2: 'last_name',
        currentSortDir2: 'asc',
        checked: ["D", "R", "ID"],
        state: '',
        dRep: 0,
        rRep: 0,
        tRep: 0,
        iRep: 0,
        dVoteT: 0,
        rVoteT: 0,
        tVoteT: 0,
        iVoteT: 0,
        dVote: 0,
        rVote: 0,
        tVote: 0,
        iVote: 0,
        activeMember: [],
    }
},

async mounted() { 
    try {
        //get data async
        response = await axios.get(url, { headers: { "X-Api-Key": apiKey } })
            //add numNum to members to sort seniority
            .then((response) => {
                response.data.results[0].members.forEach((item) => {
                    if(item.in_office){ //active members only, sorts out doubles
                      item.seniority = Number(item.seniority) //Nummer van seniority

                    if (!item.votes_with_party_pct) {
                        item.votes_with_party_pct = 0
                    }
                    
                    item.party_votes = ((item.total_votes / 100) * item.votes_with_party_pct).toPrecision(3)
                    
                    //count members in R and D and and total voted with party
                    if (item.party === "D") {
                        this.dRep += 1
                        this.dVoteT += item.votes_with_party_pct

                    }

                    else if (item.party === "R") {
                        this.rRep += 1
                        this.rVoteT += Number(item.votes_with_party_pct)
                    }

                    else if (item.party === "ID") {
                        this.iRep += 1
                        this.iVoteT += Number(item.votes_with_party_pct)
                    }

                    if (item.party) {
                        this.tRep += 1
                        this.tVoteT += Number(item.votes_with_party_pct)
                    }

                    //calculate average cvoted with party
                    this.dVote = (this.dVoteT / this.dRep).toFixed(2);
                    this.rVote = (this.rVoteT / this.rRep).toFixed(2);
                    this.iVote = (this.iVoteT / this.iRep).toFixed(2);
                    this.tVote = (this.tVoteT / this.tRep).toFixed(2);

                    this.members.push(item)//gives actual data
                }
                })//closes response manitulations
            })//closes then
    }
    catch (error) {
        console.log(error)
        this.errored = true
    }
},
computed: {
    losers() {
        //sort members for attendance and slice bottom 10%
        this.activeMember = this.members.sort((a, b) => b.missed_votes_pct - a.missed_votes_pct)
        leastloyal = this.activeMember.slice(0, Math.round(this.tRep / 10))
        //   Sort the remaining values 
        return leastloyal.sort((a, b) => {
            let modifier = 1;
            if (this.currentSortDir === 'desc') modifier = -1;
            if (a[this.currentSorted] < b[this.currentSorted]) return -1 * modifier;
            if (a[this.currentSorted] > b[this.currentSorted]) return 1 * modifier;
            return 0;
        })
    },
    winwin() {
        //slice sorted members for 10% most active
        winners = this.activeMember.slice((this.tRep - Math.round(this.tRep / 10)), this.tRep)
        //   Sort the remaining values 
        return winners.sort((a, b) => {
            let modifier = 1;
            if (this.currentSortDir2 === 'desc') modifier = -1;
            if (a[this.currentSort2] < b[this.currentSort2]) return -1 * modifier;
            if (a[this.currentSort2] > b[this.currentSort2]) return 1 * modifier;
            return 0;
        })
    },

    //used for Loyalty
    swing() {
        //sort members for both functions and slice for lowest 10% loyalty
        this.activeMember = this.members.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)
        swingers = this.activeMember.slice(0, Math.round(this.tRep / 10))
        //   Sort the remaining values 
        return swingers.sort((a, b) => {
            let modifier = 1;
            if (this.currentSortDir === 'desc') modifier = -1;
            if (a[this.currentSorted] < b[this.currentSorted]) return -1 * modifier;
            if (a[this.currentSorted] > b[this.currentSorted]) return 1 * modifier;
            return 0;
        })
    },

    loyal() {
        //slice sorted members for highest 10% loyalty
        loyalists = this.activeMember.slice((this.tRep - Math.round(this.tRep / 10)), this.tRep)
        //   Sort the remaining values 
        return loyalists.sort((a, b) => {
            let modifier = 1;
            if (this.currentSortDir2 === 'desc') modifier = -1;
            if (a[this.currentSort2] < b[this.currentSort2]) return -1 * modifier;
            if (a[this.currentSort2] > b[this.currentSort2]) return 1 * modifier;
            return 0;
        })
    }
},

methods: {
    sort(s) {
        //if s == current sort, reverse
        if (s === this.currentSorted) {
            this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
        }
        this.currentSorted = s;
    },

    sort2(s) {
        //if s == current sort, reverse
        if (s === this.currentSort2) {
            this.currentSortDir2 = this.currentSortDir2 === 'asc' ? 'desc' : 'asc';
        }
        this.currentSort2 = s;
    },
}
});