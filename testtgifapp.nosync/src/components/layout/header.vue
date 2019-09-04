<template>
    <div>
    <header>
    <img src="../../assets/logo.jpg" alt="Transparent Government in Fact Logo" id="logo">
    <div id="mailUsLink">
        <i class="fa fa-envelope-o"></i><a href="mailto:info@tgif.net">info@tgif.net</a>
    </div>
    </header>
    </div>
</template>

<script>
export default {
    name: 'appHeader'
}
</script>

<style scoped>
header {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

a {
    color: rgb(0, 115, 209);
    margin: 10px;
}

#logo {
    width: 40%;
    margin: 10px;
}

#mailUsLink {
    align-self:flex-end;
}
</style>