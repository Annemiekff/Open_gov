const apiKey = "cHWA0cyVrIeIZHFmZyrlp3UBNFO1aqLn7LsYLij2";
const url = "https://api.propublica.org/congress/v1/116/senate/members.json";
setTimeout(function(){
  document.getElementById("app").style.display = "block"; 
 }, 750);

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
    try{      //try catch to make error in loading data visible
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