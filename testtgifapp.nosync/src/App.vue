<template>
  <div id="app">
    <appHeader />
    <appNavBar />
     <pageHome />
    <appFooter />
  </div>
</template>

<script>
import appHeader from './components/layout/header.vue'
import appNavBar from './components/layout/navbar.vue'
import appFooter from './components/layout/footer.vue'
import pageHome from './components/home'

export default {
  name: 'app',
  components: {
    appHeader,
    appNavBar,
    appFooter,
    pageHome,
  }
}
</script>

<style>
/* clicky stuff */
a {
    color: rgb(39, 39, 39);
}

a:hover {
    color: rgb(39, 39, 39);
}

ul {
    list-style-type: none;
}

h2 {
    margin-bottom: 20px;
}

/* class selectors */

.pre-scrollable {
    max-height: 600px;
}
.dropdown-menu {
    position: relative;
    top: 38px;
    display: none;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index:1;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
}

.dropdown-menu li {
    margin-top: 8px;
}

.centeredCol {
    text-align: center;
}

.btn-text.collapsed:before {
    content: 'read more ▼';
    color: #004ecc;
}

.btn-text:before {
    content: '';
}
</style>
