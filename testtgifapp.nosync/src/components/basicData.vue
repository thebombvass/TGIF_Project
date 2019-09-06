<template>
    <div>
        <!--<div>-->
        <div v-if="chamber==0" class="container-fluid">
            <h2>Senators</h2>
            <p>First convened in 1789, the composition and powers of the Senate are established in Article One of the U.S. Constitution. Each state is represented by two senators, regardless of population, who serve staggered six-year terms. The Senate has several exclusive powers not granted to the House, including consenting to treaties as a precondition to their ratification and consenting to or confirming appointments of Cabinet secretaries, federal judges, other federal executive officials, military officers, regulatory officials, ambassadors, and other federal uniformed officers, as well as trial of federal officials impeached by the House.</p>
        </div>
        <div v-if="chamber==1" class="container-fluid">
            <h2>Congressmen</h2>
            <p>The major power of the House is to pass federal legislation that affects the entire country, although its bills must also be passed by the Senate and further agreed to by the U.S. President before becoming law (unless both the House and Senate re-pass the legislation with a two-thirds majority in each chamber). The House has some exclusive powers: the power to initiate revenue bills, to impeach officials (impeached officials are subsequently tried in the Senate), and to elect the U.S. President in case there is no majority in the Electoral College.</p>
            <p>Each U.S. state is represented in the House in proportion to its population as measured in the census, but every state is entitled to at least one representative. </p>
        </div>

        <appFetch 
            v-bind:url="chamberToURL(chamber)" 
            :key="chamber"
            v-on:data-response.capture="dataInTable"
        />

        <div class="row">
            <span class="col-sm-2"></span>
            <div class="container-fluid pre-scrollable col-sm-8" id="containerTableData">
                <table id="table" class="table">
                    <thead>
                        <th> First Name </th>
                        <th> Middle Name </th>
                        <th> Last Name </th>
                        <th> Party </th>
                        <th> State </th>
                        <th> Percentage of Votes with Party</th>
                    </thead>
                    <tbody>
                        <tr v-for="(element, index) in data" :key="index" :class="element.party">
                            <td>{{element.first_name}}</td>
                            <td>{{element.middle_name}}</td>
                            <td>{{element.last_name}}</td>
                            <td>{{element.party}}</td>
                            <td>{{element.state}}</td>
                            <td class="centeredCol">{{element.votes_with_party_pct}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <span class="col-sm-2"></span>
        </div>
    </div>
</template>

<script>
import appFetch from './fetchData.vue'

export default {
    name: 'pageBasicData',
    components: {
        appFetch,
    },
    props: ['chamber'], 
    data() {
        return {
            data: []
        }
    },
    methods: { 
        chamberToURL: function(chamber) {
            if (chamber == 0) {
                return 'https://api.propublica.org/congress/v1/113/senate/members.json'
            } else if (chamber == 1) {
                return 'https://api.propublica.org/congress/v1/113/house/members.json'
            }
        },
        check: function() {
            console.log("checked!")
        },
        dataInTable: function(data) {
            this.data = data;
            console.log(this.data)
        },
    },
}
</script>

<style scoped>
#containerTableData {
    margin-top: 10px;
}

th {
    background-color: #b9443c;
    color: rgb(238, 237, 237);
    position: sticky; 
    top: 0;
}

td {
    background-color: white;
}

.centeredCol {
    text-align: center;
}

</style>