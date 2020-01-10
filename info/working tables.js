//SENATE.JS

//The basics working table with search and sort name and filters

const apiKey = "cHWA0cyVrIeIZHFmZyrlp3UBNFO1aqLn7LsYLij2";
const url = "https://api.propublica.org/congress/v1/116/senate/members.json";

const app = new Vue({
  el: '#app',
  data() {
    return {
      searchQuery: '',
      members: [],
      errored: false,
      currentSort:'last_name',
      currentSortDir:'asc',
      checked: ["D", "R", "ID"],
      state: '',
    }
  },
  async mounted() {
    try{      //try get to make error in loading visible
      response = await axios.get(url, {headers: {"X-Api-Key": apiKey}})       //get data async
      .then((response) => {
        response.data.results[0].members.forEach((item) => {
          if(item.in_office){ //active members only, sorts out doubles
            item.seniority = Number(item.seniority) //Nummer van seniority
            this.members.push(item)//gives actual data
          } // closes active members
        })//closes response manitulations
      })//closes then
    }
    catch(error){console.log(error)
        this.errored = true}
  },

computed: {
  resultQuery(){
    if(this.searchQuery){
      searchresult = this.members.filter((item)=>{
      return this.searchQuery.toLowerCase().split(' ').every(v => item.first_name.toLowerCase().includes(v) ||  item.last_name.toLowerCase().includes(v))
      })
    }      
    else 
      searchresult = this.members

  //select voor party    
  if(this.checked){
    checkedresult = searchresult.filter(function (item) {
    return this.checked.includes(item.party);
    }, this);
  }
  else checkedresult = searchresult

  //select voor state    
  if(this.state){
    stateresult = checkedresult.filter(function (item) {
    return this.state.includes(item.state);
    }, this);
  }
  else stateresult = checkedresult

  // Sort the remaining values 
    return stateresult.sort((a,b) => {
    let modifier = 1;
    if(this.currentSortDir === 'desc') modifier = -1;
    if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
    if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
      });
    }
      },
      
methods:{
  sort(s) {
  //if s == current sort, reverse
  if(s === this.currentSort) {
  this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
  }
  this.currentSort = s;
  },
}
});

//----------------------------------------------------
//HOUSE Working table:

/*const apiKey = "cHWA0cyVrIeIZHFmZyrlp3UBNFO1aqLn7LsYLij2";
const url = "https://api.propublica.org/congress/v1/116/house/members.json";

const appHouse = new Vue({
  el: '#appHouse',
    data() {
      return {
        searchQuery: '',
        members: [],
        errored: false,
        currentSort:'last_name',
        currentSortDir:'asc',
        checked: ["D", "R", "I"],
        state: '',
      }
    },
    async mounted() {
      try{      //try get to make error in loading visible
        response = await axios.get(url, {headers: {"X-Api-Key": apiKey}})       //get data async
        .then((response) => {
          response.data.results[0].members.forEach((item) => {
            if(item.in_office){ //active members only, sorts out doubles
              item.seniority = Number(item.seniority) //Nummer van seniority
              this.members.push(item)//gives actual data
            } // closes active members
          })//closes response manitulations
        })//closes then
      }
      catch(error){console.log(error)
          this.errored = true}
    },

  computed: {
    resultQuery(){       
      if(this.searchQuery){
        searchresult = this.members.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.first_name.toLowerCase().includes(v) ||  item.last_name.toLowerCase().includes(v))
        })
      }      
      else 
        searchresult = this.members

    //select voor party    
    if(this.checked){
      checkedresult = searchresult.filter(function (item) {
      return this.checked.includes(item.party);
      }, this);
    }
    else checkedresult = searchresult

    // //select voor state    
    if(this.state){
      stateresult = checkedresult.filter(function (item) {
      return this.state.includes(item.state);
      }, this);
    }
    else stateresult = checkedresult

    // Sort the remaining values
      return stateresult.sort((a,b) => {
      let modifier = 1;
      if(this.currentSortDir === 'desc') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
        });
      }
        },

  methods:{
    sort(s) {
    //if s == current sort, reverse
    if(s === this.currentSort) {
    this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
    }
    this.currentSort = s;
    },
  },
}); */

//ATT

const apiKey = "cHWA0cyVrIeIZHFmZyrlp3UBNFO1aqLn7LsYLij2";
const url = "https://api.propublica.org/congress/v1/116/senate/members.json";

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

//ATTH

/* const apiKey = "cHWA0cyVrIeIZHFmZyrlp3UBNFO1aqLn7LsYLij2";
const url = "https://api.propublica.org/congress/v1/116/house/members.json";

const app = new Vue({
    el: '#appLh',
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
            checked: ["D", "R", "I"],
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

                        else if (item.party === "I") {
                            this.iRep += 1
                            this.iVoteT += Number(item.votes_with_party_pct)
                        }

                        if (item.party) {
                            this.tRep += 1
                            this.tVoteT += Number(item.votes_with_party_pct)
                        }

                        //calculate average voted with party
                        this.dVote = (this.dVoteT / this.dRep).toFixed(2);
                        this.rVote = (this.rVoteT / this.rRep).toFixed(2);
                        this.iVote = (this.iVoteT / this.iRep).toFixed(2);
                        this.tVote = (this.tVoteT / this.tRep).toFixed(2);

                        this.members.push(item)//gives actual data
                        }//closes if member in office
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
            //sort members for missed votes percentage and slice bottom 10%
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
}); */




























// const apiKey = "cHWA0cyVrIeIZHFmZyrlp3UBNFO1aqLn7LsYLij2";
// const url = "https://api.propublica.org/congress/v1/116/senate/members.json";
// let members;

// const senate = async() => {
//     try {
//       const response = await fetch(url, {headers: {"X-Api-Key": apiKey}});
//       if(response.ok){
//         const jsonResponse = await response.json();
//         //testveld.innerHTML = JSON.stringify(jsonResponse.results[0].members); WERKT
//         //const results = jsonResponse.results 
//         //testveld.innerHTML = JSON.stringify(results) WERKT
//         members = jsonResponse.results[0].members;
//         //testveld.innerHTML = JSON.stringify(senatemembers[0].first_name) 
//         //testfirst.innerHTML = JSON.stringify(senatemembers[1].first_name); //WERKT
//         //const senatename1 = senatemembers[0].first_name
//         //testveld.innerHTML = JSON.stringify(senatename1) WERKT!!!
//         // update vue app
//         //updateVue(senatemembers);
//         return members
//         }
//       else throw new Error('Request failed!'); 
//     }
//     catch (error) {
//       console.log(error);
//     }
// }
// senate() 

// Vue.component('demo-grid', {
//     template: '#grid-template',
//     props: {
//       members: async() => {
//         try {
//           const response = await fetch(url, {headers: {"X-Api-Key": apiKey}});
//           if(response.ok){
//             const jsonResponse = await response.json();
//             //testveld.innerHTML = JSON.stringify(jsonResponse.results[0].members); WERKT
//             //const results = jsonResponse.results 
//             //testveld.innerHTML = JSON.stringify(results) WERKT
//             members = jsonResponse.results[0].members;
//             //testveld.innerHTML = JSON.stringify(senatemembers[0].first_name) 
//             //testfirst.innerHTML = JSON.stringify(senatemembers[1].first_name); //WERKT
//             //const senatename1 = senatemembers[0].first_name
//             //testveld.innerHTML = JSON.stringify(senatename1) WERKT!!!
//             // update vue app
//             //updateVue(senatemembers);
//             return members
//             }
//           else throw new Error('Request failed!'); 
//         }
//         catch (error) {
//           console.log(error);
//         }
//     },
//       columns: Array,
//       filterKey: String
//     },
//     data: function () {
//       var sortOrders = {}
//       this.columns.forEach(function (key) {
//         sortOrders[key] = 1
//       })
//       return {
//         sortKey: '',
//         sortOrders: sortOrders
//       }
//     },
//     computed: {
//       filteredMembers: function () {
//         var sortKey = this.sortKey
//         var filterKey = this.filterKey && this.filterKey.toLowerCase()
//         var order = this.sortOrders[sortKey] || 1
//         var members = this.members
//         if (filterKey) {
//             members = members.filter(function (row) {
//             return Object.keys(row).some(function (key) {
//               return String(row[key]).toLowerCase().indexOf(filterKey) > -1
//             })
//           })
//         }
//         if (sortKey) {
//             members = members.slice().sort(function (a, b) {
//             a = a[sortKey]
//             b = b[sortKey]
//             return (a === b ? 0 : a > b ? 1 : -1) * order
//           })
//         }
//         return members
//       }
//     },
//     filters: {
//       capitalize: function (str) {
//         return str.charAt(0).toUpperCase() + str.slice(1)
//       }
//     },
//     methods: {
//       sortBy: function (key) {
//         this.sortKey = key
//         this.sortOrders[key] = this.sortOrders[key] * -1
//       }
//     }
//   })
  
//   // bootstrap the demo
//   var app2 = new Vue({
//     el: '#app2',
//     data: {
//         searchQuery: '',
//         gridColumns: ['first name', 'middle name', 'last name', 'party', 'state', 'seniority', '% votes with party', '% votes against party'],
//         gridData: async() => {
//             try {
//               const response = await fetch(url, {headers: {"X-Api-Key": apiKey}});
//               if(response.ok){
//                 const jsonResponse = await response.json();
//                 //testveld.innerHTML = JSON.stringify(jsonResponse.results[0].members); WERKT
//                 //const results = jsonResponse.results 
//                 //testveld.innerHTML = JSON.stringify(results) WERKT
//                 members = jsonResponse.results[0].members;
//                 //testveld.innerHTML = JSON.stringify(senatemembers[0].first_name) 
//                 //testfirst.innerHTML = JSON.stringify(senatemembers[1].first_name); //WERKT
//                 //const senatename1 = senatemembers[0].first_name
//                 //testveld.innerHTML = JSON.stringify(senatename1) WERKT!!!
//                 // update vue app
//                 //updateVue(senatemembers);
//                 return members
//                 }
//               else throw new Error('Request failed!'); 
//             }
//             catch (error) {
//               console.log(error);
//             }
//         }
//     }
//   })




// const app = new Vue({
//     el: '#app',
//     data: {
//       search: '',
//       members: {async() {
//         try {
//           const response = await fetch(url, {headers: {"X-Api-Key": apiKey}});
//           if(response.ok){
//             const jsonResponse = await response.json();
//             //testveld.innerHTML = JSON.stringify(jsonResponse.results[0].members); WERKT
//             //const results = jsonResponse.results 
//             //testveld.innerHTML = JSON.stringify(results) WERKT
//             members = jsonResponse.results[0].members;
//             //testveld.innerHTML = JSON.stringify(senatemembers[0].first_name) 
//             //testfirst.innerHTML = JSON.stringify(senatemembers[1].first_name); //WERKT
//             //const senatename1 = senatemembers[0].first_name
//             //testveld.innerHTML = JSON.stringify(senatename1) WERKT!!!
//             // update vue app
//             //updateVue(senatemembers);
//             }
//           else throw new Error('Request failed!'); 
//         }
//         catch (error) {
//           console.log(error);
//         };
//       }}
//     },

//   });  






// const apiKey = "cHWA0cyVrIeIZHFmZyrlp3UBNFO1aqLn7LsYLij2";
// const url = "https://api.propublica.org/congress/v1/116/senate/members.json";
  

// Vue.component('senateTable', {
//     template: `<div class="col-12" v-for="member in members">
//     <div class="card">
//         <div class="card-header">
//             {{ member.first_name }} 
//             {{ member.middle_name }}
//             {{ member.last_name }}
//         </div>
//         <div class="card-section">  
//             <p>Party: {{ member.party }}.</p>
//             <p>State: {{ member.state }}.</p> 
//             <p>seniority: {{ member.seniority }}.</p>
//             <p>Party Votes with: {{ member.votes_with_party_pct }}%</p>
//             <p>Partry votes against: {{ member.votes_against_party_pct }}%</p>
//       </div>
//     </div>`,
//     props: {
//         members: Array,
//         columns: Array,
//         filterKey: String
//     },
//     data: function () {
//         var sortOrders = {}
//         this.columns.forEach(function (key) {
//             sortOrders[key] = 1
//         })
//         return {
//             sortKey: '',
//             sortOrders: sortOrders
//         }
//     },
    
//     // computed: {
//     //     filteredMembers: function () {
//     //         var sortKey = this.sortKey
//     //         var filterKey = this.filterKey && this.filterKey.toLowerCase()
//     //         var order = this.sortOrders[sortKey] || 1
//     //         var members = this.members
//     //         if (filterKey) {
//     //             members = members.filter(function (row) {
//     //                 return Object.keys(row).some(function (key) {
//     //                     return String(row[key]).toLowerCase().indexOf(filterKey) > -1
//     //                 })
//     //             })
//     //         }
//     //         if (sortKey) {
//     //             members = members.slice().sort(function (a, b) {
//     //                 a = a[sortKey]
//     //                 b = b[sortKey]
//     //                 return (a === b ? 0 : a > b ? 1 : -1) * order
//     //             })
//     //         }
//     //         return members
//     //     }
//     // },
//     // filters: {
//     //     capitalize: function (str) {
//     //         return str.charAt(0).ToUpperCase() + str.slice(1)
//     //     }
//     // },
//     // methods: {
//     //     sortBy: function (key) {
//     //         this.sortKey = key
//     //         this.sortOrders[key] = this.sortOrders[key] * -1
//     //     }
//     // }
// });

// const app = new Vue({
//     el: '#app',
//     data: {
//         gridColumns: ['first name', 'middle name', 'last name', 'party', 'state', 'seniority', '% votes with party', '% votes against party'],
//         members: []
//     },
//     mounted() {async() => {
//             try {
//               const response = await fetch(url, {headers: {"X-Api-Key": apiKey}});
//               if(response.ok){
//                 const jsonResponse = await response.json();
//                 //testveld.innerHTML = JSON.stringify(jsonResponse.results[0].members); WERKT
//                 //const results = jsonResponse.results 
//                 //testveld.innerHTML = JSON.stringify(results) WERKT
//                 members = jsonResponse.results[0].members;
//                 //testveld.innerHTML = JSON.stringify(senatemembers[0].first_name) 
//                 //testfirst.innerHTML = JSON.stringify(senatemembers[1].first_name); //WERKT
//                 //const senatename1 = senatemembers[0].first_name
//                 //testveld.innerHTML = JSON.stringify(senatename1) WERKT!!!
                 
//                 // update vue app
//                 //updateVue(senatemembers);
//                 }
//               else throw new Error('Request failed!'); 
//             }
//             catch (error) {
//               console.log(error);
//             };
//           };
//     },
//     component: senateTable
//   });



 

  /*
  // create Vue instance
const app = new Vue({
   el: '#app',
   data: {
      message: 'Hello Vue!',
      congressMembers: [],
      searchQuery: ''
   }
})
  // Create component to display a senate member
  Vue.component('senatemember-card', {
      props: ['member'],
      template: `<div class="col-sm-6 col-lg-3">
      <div class="card" style="width: 16rem;">
      <a v-bind:href="member.url"><h5 class="card-header"> {{ member.first_name }} {{ member.middle_name }} {{ member.last_name }}</h5></a>
      <ul class="list-group list-group-flush">
      <li class="list-group-item party" v-if="member.party === 'R'">Republican</li>
      <li class="list-group-item party" v-else-if="member.party === 'D'">Democrat</li>
      <li class="list-group-item party" v-else-if="member.party === 'ID'">Independent</li>
      <li class="list-group-item party" v-else>Other</li>
      <li class="list-group-item state">State: {{ member.state }}</li>
      <li class="list-group-item seniority">Seniority: {{ member.seniority }}</li>
      <li class="list-group-item party-votes">Party Votes with: {{ member.votes_with_party_pct }}%</li>
      <li class="list-group-item party-votes">Party Votes against: {{ member.votes_against_party_pct }}%</li>
      </ul>
      </div>
      </div>`
  })
  // update vue app
  function updateVue(senatemembers){
      app.senatemembers = senatemembers;
  }
*/


// const testveld = document.querySelector('#testveld');

// const getData = async() => {
//     try {
//       const response = await fetch(url, {headers: {"X-Api-Key": apiKey}});
//       if(response.ok){
//         const jsonResponse = await response.json();
//         //testveld.innerHTML = JSON.stringify(jsonResponse.results[0].members); WERKT
//         //const results = jsonResponse.results 
//         //testveld.innerHTML = JSON.stringify(results) WERKT
//         senatemembers = jsonResponse.results[0].members;
//         //testveld.innerHTML = JSON.stringify(senatemembers[0].first_name) 
//         //testfirst.innerHTML = JSON.stringify(senatemembers[1].first_name); //WERKT
//         //const senatename1 = senatemembers[0].first_name
//         //testveld.innerHTML = JSON.stringify(senatename1) WERKT!!!
         
//         // update vue app
//         //updateVue(senatemembers);
//         }
//       else throw new Error('Request failed!'); 
//     }
//     catch (error) {
//       console.log(error);
//     };
//   };

// getData();


