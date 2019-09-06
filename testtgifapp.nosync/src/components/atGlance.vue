<template>
    <div>
        <appFetch 
            v-bind:url="chamberToURL(chamber)" 
            :key="chamber"
            v-on:data-response.capture="dataToData"
        />
        <div class="col-sm-6" id="atGlance">
            <h2>Senate at a glance</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Party</th>
                        <th>Number of Reps</th>
                        <th>% Votes with Party</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Republican</td>
                        <td class="centeredCol">{{this.numberOfReps}}</td>
                        <td class="centeredCol"></td>
                    </tr>
                    <tr>
                        <td>Democrat</td>
                        <td class="centeredCol">{{this.numberOfDems}}</td>
                        <td class="centeredCol">{{this.demsVoteOnParty}}</td>
                    </tr>
                    <tr>
                        <td>Independent</td>
                        <td class="centeredCol">{{this.numberOfInds}}</td>
                        <td class="centeredCol"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import appFetch from './fetchData'

export default {
    name: 'appAtGlance',
    components: {
        appFetch
    },
    props: ["chamber"],
    data() {
        return{
            data: [],
        }
    },
    computed: {
        numberOfDems: function() {
            return this.data.filter(function(element) {
                return element.party == "D"
            }).length
        },
        numberOfReps: function() {
            return this.data.filter(function(element) {
                return element.party == "R"
            }).length
        },
        numberOfInds: function() {
            return this.data.filter(function(element) {
                return element.party == "I"
            }).length
        },
        demsVoteOnParty: function() {
            return 0
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
            console.log("yup response here")
        },
        dataToData: function(data) {
            this.data = data;
        },
    }

}
</script>

<style scoped>

</style>