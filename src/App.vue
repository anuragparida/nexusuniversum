<script>
import { mapGetters } from 'vuex' 
import TheMenus from "./components/TheMenus.vue";
import TheFooter from "./components/TheFooter.vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';


export default {
  data() {
    return {
      fullPage: true,
      isInitialized: true
    };
  },
  components: {
    TheMenus,
    TheFooter,
    Loading,
  },
  computed: {
    ...mapGetters(['theme', 'storeInitialized','loggedIn', 'loggedInUser']),

    db(){
      return this.$store.commit('db');
    }
  },
  mounted() {
    if(this.storeInitialized) {
      this.userCheck()
    }
    this.pageCheck()
    this.db
    if(localStorage.getItem("theme") == 'darkmode' ){
      this.valueDarkMode = true;
      this.$store.commit('themeSwitch')
    }
  },
  watch : {
    storeInitialized() {
      this.userCheck()
      this.isInitialized = false;
    }
  },
  methods: {
    async logout() {
      await this.$router.push("/login");
      await this.$nextTick();
      this.$store.commit('logoutUser');
    },

    userCheck() {
      if(!this.loggedIn) {
        console.warn("KEIN LOGIN ")
      }
    },
    pageCheck(){
      if( (this.loggedIn == false && localStorage.getItem('knumber') == null && this.$route.name != "login") ){
          this.$router.push("/login")
      }
    },
  },
};
</script>


<template>
  <div id="page-wrapper" :class="theme">
    <div class="vl-parent">
      <loading v-model:active="isInitialized"
          :can-cancel="false"
          :is-full-page="fullPage"
          color="#ee750d"
      />
    </div>

    <header v-if="loggedIn !== false">
      <div class="wrapper">
        <TheMenus />
      </div>
    </header>

      <div v-if="storeInitialized" class="content">
        <RouterView />
      </div>

    <footer v-if="loggedIn !== false" class="footer">
      <TheFooter />
    </footer>
  </div>
</template>

<style scoped lang="scss">
@import "scss/custom.scss";

#page-wrapper{
  padding: 0 20px 0 20px;
  width: 100%;
  background-color: $color-white;
  min-height: 100vh;
}

header {
  display: flex;
  line-height: 1.5;
  max-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: $color-white;
  z-index: 1;
  justify-content: center;
}

.wrapper {
  width: 100%;
}
.content {
  padding-top: 5.3em;
  padding-bottom: 5.5rem;
  z-index: -1;
  width: 100%;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: $color-white;
  z-index: 100;
}
</style>
