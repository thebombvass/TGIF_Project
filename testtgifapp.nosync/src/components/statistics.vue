<template>
    <div>
        <div class="container-fluid">
        <div class="row">
            <div v-if="paragraph==0" class="col-sm-6">
            <h2>Attendance</h2>
            <p>The Constitution specifies that a majority of members constitutes a quorum to do business in each house. Representatives and senators rarely force the presence of a quorum by demanding quorum calls; thus, in most cases, debates continue even if a majority is not present.</p>
            <p>The Senate uses roll-call votes; a clerk calls out the names of all the senators, each senator stating "aye" or "no" when his or her name is announced. The House reserves roll-call votes for the most formal matters, as a roll-call of all 435 representatives takes quite some time; normally, members vote by electronic device. In the case of a tie, the motion in question fails. In the Senate, the Vice President may (if present) cast the tiebreaking vote.</p>
            </div>
            <div v-if="paragraph==1" class="col-sm-6">
                <h2>Party Loyalty</h2>
                <p>Those who consider themselves to be strong partisans, strong Democrats and strong Republicans respectively, tend to be the most faithful in voting for their party's nominee for office and legislation that backs their party's agenda. </p>
            </div>
        </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'pageStatistics',
    props: ["chamber", "paragraph"],
}
</script>

<style scoped>

</style>