<template>
  <div id="app">
    <appHeader />
    <appNavBar 
    v-on:nav-home.capture="swapComponent"
    v-on:nav-dataSenate.capture="swapComponent" />
    <component 
      :is="currentComponent"
    ></component>
    <!--<pageBasicData />-->
    <!--<pageHome />-->
    <appFooter/>
  </div>
</template>

<script>
import appHeader from './components/header.vue'
import appNavBar from './components/navbar.vue'
import appFooter from './components/footer.vue'
import pageHome from './components/home.vue'
import pageBasicData from './components/basicData.vue'

export default {
  name: 'app',
  components: {
    appHeader,
    appNavBar,
    appFooter,
    pageHome,
    pageBasicData,
  }, data() {
    return {
    currentComponent: 'pageHome',
    }
  }, methods: {
    swapComponent: function(component) {
      this.currentComponent = component;
      console.log(this.currentComponent)
    },
    help : function() {
      console.log('i need somebody HELP')
    }
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
