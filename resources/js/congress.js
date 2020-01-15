const apiKey = "cHWA0cyVrIeIZHFmZyrlp3UBNFO1aqLn7LsYLij2";
let url = "";
 
let urlfetch = () => {
  let filename = location.href.split("/").slice(-1);
  if (filename[0] === "congr_senate.html" || filename[0] === "att_senate.html" || filename[0] === "loyal_senate.html"){
    url = "https://api.propublica.org/congress/v1/116/senate/members.json"
  }
  if (filename[0] === "congr_house.html" || filename[0] === "att_house.html" || filename[0] === "loyal_house.html"){
    url = "https://api.propublica.org/congress/v1/116/house/members.json";
  }
}
urlfetch();

const app = new Vue({
  el: '#app',
  data() {
    return {
      searchQuery: '',
      members: [],
      errored: false,
      currentSort:'last_name',
      currentSortDir:'asc',
      currentSort2: 'last_name',
      currentSortDir2: 'asc',
      checked: ["D", "R", "ID", "I"],
      state: '',
      dRep: 0, rRep: 0, tRep: 0, iRep: 0,
      dVoteT: 0, rVoteT: 0, tVoteT: 0, iVoteT: 0,
      dVote: 0, rVote: 0, tVote: 0, iVote: 0,
      activeMember: [],
    }
  },
  async mounted() {
    try{      //try catch to make error in loading data visible
      response = await axios.get(url, {headers: {"X-Api-Key": apiKey}})       //get data async
      .then((response) => {
        response.data.results[0].members.forEach((item) => {
           //active members only, sorts out doubles
          if(item.in_office){
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

            else if (item.party === "ID" || item.party === "I") {
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
          } // closes active members
        })//closes response manitulations
      })//closes then
    }
    catch(error){console.log(error)
        this.errored = true}
  },

computed: {
    //-----------------------------MAIN TABLE------------------------------------
  resultQuery(){
    //live search results
    if(this.searchQuery){
      searchresult = this.members.filter((item)=>{
      return this.searchQuery.toLowerCase().split(' ').every(v => item.first_name.toLowerCase().includes(v) ||  item.last_name.toLowerCase().includes(v))
      })
    }      
    else 
      searchresult = this.members

  //select voor party    
  if(this.checked){
    checkedresult = searchresult.filter((item) => {
      return this.checked.includes(item.party);
    });
  }
  else checkedresult = searchresult

  //select voor state    
  if(this.state){
    stateresult = checkedresult.filter((item) => {
      return this.state.includes(item.state);
    });
  }
  else stateresult = checkedresult

  // Sort the remaining values 
    return stateresult.sort((a,b) => {
    document.getElementById("app").style.display = "block" // show the tables after everything is done
    let modifier = 1;
    if(this.currentSortDir === 'desc') modifier = -1;
    if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
    if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
      });
    },

    //-----------------------------ATTENDANCE TABLES------------------------------------
  losers() {
    //sort members for attendance and slice bottom 10%
    this.activeMember = this.members.sort((a, b) => b.missed_votes_pct - a.missed_votes_pct)
    leastloyal = this.activeMember.slice(0, Math.round(this.tRep / 10))
    //   Sort the remaining values 
    return leastloyal.sort((a, b) => {
      let modifier = 1;
      if (this.currentSortDir === 'desc') modifier = -1;
      if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
    })
  },

  winwin() {
    //slice sorted members for 10% most active
    winners = this.activeMember.slice((this.tRep - Math.round(this.tRep / 10)), this.tRep)
    //   Sort the remaining values 
    return winners.sort((a, b) => {
      document.getElementById("app").style.display = "block" // show the tables after everything is done
      let modifier = 1;
      if (this.currentSortDir2 === 'desc') modifier = -1;
      if (a[this.currentSort2] < b[this.currentSort2]) return -1 * modifier;
      if (a[this.currentSort2] > b[this.currentSort2]) return 1 * modifier;
      return 0;
    })
  },

  //-----------------------------LOYALTY TABLES------------------------------------
  swing() {
  //sort members for both functions and slice for lowest 10% loyalty
    this.activeMember = this.members.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)
    swingers = this.activeMember.slice(0, Math.round(this.tRep / 10))
    //   Sort the remaining values 
    return swingers.sort((a, b) => {
      let modifier = 1;
      if (this.currentSortDir === 'desc') modifier = -1;
      if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
    })
  },

  loyal() {
  //slice sorted members for highest 10% loyalty
    loyalists = this.activeMember.slice((this.tRep - Math.round(this.tRep / 10)), this.tRep)
    //   Sort the remaining values 
    return loyalists.sort((a, b) => {
      document.getElementById("app").style.display = "block" // show the tables after everything is done
      let modifier = 1;
      if (this.currentSortDir2 === 'desc') modifier = -1;
      if (a[this.currentSort2] < b[this.currentSort2]) return -1 * modifier;
      if (a[this.currentSort2] > b[this.currentSort2]) return 1 * modifier;
      return 0;
    })
  },
},

methods:{
  sort(s) {
  //if s == current sort, reverse
  if(s === this.currentSort) {
  this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
  }
  this.currentSort = s;
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