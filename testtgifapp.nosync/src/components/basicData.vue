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
    </div>
</template>

<script>
export default {
    name: 'pageBasicData',
    props: ['chamber']
}
</script>

<style scoped>

</style>