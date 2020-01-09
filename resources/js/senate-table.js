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


