<template>
    <div>
        <nav class="navbar navbar-expand-sm container-fluid">
            <ul class="nav navbar-nav" id=navWrapper>
                <li @click="$emit('nav-home', 'pageHome')"><a href="#">Home</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-display="static">Congress 113</a>
                    <ul class="dropdown-menu">
                        <li @click="$emit('nav-dataSenate', 'pageBasicData')" ><a href="#">Senate</a></li>
                        <li><a href="#">House</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Attendance</a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Senate</a></li>
                        <li><a href="#">House</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Party Loyalty</a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Senate</a></li>
                        <li><a href="#">House</a></li>
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