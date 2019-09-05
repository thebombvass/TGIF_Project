<template>
    <div>
        <nav class="navbar navbar-expand-sm container-fluid">
            <ul class="nav navbar-nav" id=navWrapper>
                <!--emit sending data to App.vue. Parameters include main component to load, and 0 for Senate vs 1 for House-->
                <li @click="$emit('nav-home', ['pageHome', 2])"><a href="#">Home</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-display="static">Congress 113</a>
                    <ul class="dropdown-menu">
                        <li @click="$emit('nav-data', ['pageBasicData', 0])" ><a href="#">Senate</a></li>
                        <li @click="$emit('nav-data', ['pageBasicData', 1])" ><a href="#">House</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Attendance</a>
                    <ul class="dropdown-menu">
                    <!--emit sending data to App.vue. Parameters include main component to load, 0 for Senate vs 1 for House, and 0 for Attendance and 1 for -->
                        <li @click="$emit('nav-stats', ['pageStatistics', 0, 0])" ><a href="#">Senate</a></li>
                        <li @click="$emit('nav-stats', ['pageStatistics', 1, 0])" ><a href="#">House</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Party Loyalty</a>
                    <ul class="dropdown-menu">
                        <li @click="$emit('nav-stats', ['pageStatistics', 0, 1])" ><a href="#">Senate</a></li>
                        <li @click="$emit('nav-stats', ['pageStatistics', 1, 1])" ><a href="#">House</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'appNavBar',
    methods: {
        check: function() {
            console.log("helooo")
        }
    }
}
</script>

<style scoped>
nav {
    background-color: rgb(219, 219, 219);
    margin-bottom: 40px;
}

#navWrapper {
    display: flex;
    width: 50%;
    justify-content: space-around;
    align-items: center;
}

</style>