<script>
import HomeFeedItem from "../components/HomeFeedItem.vue";
import InformationItem from "../components/InformationItem.vue";
import { mapGetters } from 'vuex' 
import CompBaseView from "./CompBaseView.vue";
import  _ from 'lodash';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Loading from 'vue-loading-overlay';

export default {
  extends: CompBaseView,

  data() {
    return {
      origHomeFeedItems: [],
      busy: false,
      fullPage: true,
      searchToggle: "",
      transitionSearch: "",
      text: "",
    };
  },

  props:{
    filter: {
      type: String,
      default: undefined,
    }
  },
  

  watch:{
    text(){
      this.makeRouterParams(this.text, this.selected) 
    },
    selected(){
      this.makeRouterParams(this.text, this.selected)
    }
  },

  computed: {

    ...mapGetters(['storeInitialized', 'loggedIn', 'loggedInUser', 'userBadges']),

    },

  components: {
    HomeFeedItem,
    InformationItem,
    Loading,
  },

  mounted() {
    this.getParams();
  },

  methods: {
    routerHistory(){
      this.$router.back();
    },
    getItems(){
      let items = [];
      if(this.filter != 'information' && this.filter != 'alumni'){
        this.parserItems.forEach((item) => {
          if(item.type == this.filter && localStorage.getItem('entered-' + item.uuid) == 'true'){
            items.push(item)
          }
        })
      }
      if(this.filter == 'information'){
        this.parserItems.forEach((item) => {
          if(item.type == this.filter) {
            items.push(item)
          }
        })  
      }

      if(this.filter == 'alumni'){
        this.parserItems.forEach((item) => {
          if(item.type == this.filter && localStorage.getItem('entered-' + item.uuid) != 'true'){
            items.push(item)
          }
        })
      }
      
      return items;
    },
    toggleSearch(){
      if(this.searchToggle === ''){
        this.searchToggle = 'searchOn';

        window.setTimeout(() => {
          this.transitionSearch = 'showSearch';
        }, 50)
        
      } else if(this.searchToggle === 'searchOn'){
        this.transitionSearch = "";
        this.text = "";

        window.setTimeout(() => {
          this.searchToggle = '';
        }, 500)
      }
    },
  }
};
</script>

<template>
  <loading v-model:active="busy"
    :can-cancel="false"
    :is-full-page="fullPage"
    color="#ee750d"
  />
  <div class="container-filteredHomeFeed">
    <div class="head">
      <a @click="routerHistory()" class="back">
        <svg 
          class="back-arrow" 
          width="8px" 
          height="8px" 
          version="1.1" 
          viewBox="0 0 1200 1200" 
          xmlns="http://www.w3.org/2000/svg">
          <path d="m30 375.6c0-31.199 12-61.199 34.801-85.199 46.801-46.801 123.6-46.801 170.4 0l364.8 363.6 364.8-364.8c46.801-46.801 123.6-46.801 170.4 0 46.801 46.801 46.801 123.6 0 170.4l-450 450c-22.801 22.801-52.801 34.801-85.199 34.801s-62.398-13.199-85.199-34.801l-450-448.8c-22.801-24-34.801-55.199-34.801-85.199z"/>
        </svg>
      </a>
      <div class="headline">
        <h1 v-if="filter == 'course'">
          Your {{ filter }}s
        </h1>
        <h1 v-if="filter == 'information'">
          Information Page
        </h1>
        <h1 v-if="filter == 'academic' || filter == 'social' || filter == 'sports' ">
          Your {{ filter }} Groups
        </h1>
        <h1 v-if="filter == 'alumni'">
          Alumni Page
        </h1>
      </div>
      <button v-if="getItems().length > 4" @click="toggleSearch()" class="button">
        <svg
          width="22px"
          height="22px"
          version="1.1"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m109.74 98.895-21.281-19.578c4.7266-6.5664 7.543-14.605 7.543-23.316 0-22.094-17.906-40-40-40-22.09 0-40 17.906-40 40s17.906 40 40 40c8.7109 0 16.746-2.8164 23.316-7.543l19.578 21.281c2.9531 3.2109 7.9883 3.3164 11.074 0.23047s2.9805-8.1211-0.23047-11.074zm-53.738-16.895c-14.359 0-26-11.641-26-26s11.641-26 26-26 26 11.641 26 26-11.641 26-26 26z"
          />
        </svg>
      </button>
    </div>

    <div v-if="searchToggle == 'searchOn'" class="search" :class="transitionSearch">
      <input
        v-model="text"
        type="text"
        placeholder="Search"
        class="searchbar"
      >
    </div>

    <div class="content">
      <div v-for="element in getItems()" :key="element">
        <HomeFeedItem v-if="filter != 'information'" :element="element" />
        <InformationItem v-if="filter == 'information'" :element="element" />
      </div>
    </div>

    <div v-if="filter != 'information' && filter != 'alumni'" class="icons">
      <RouterLink :to="{ name: 'add' }" class="more-button">
        <svg width="19" height="19" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
          <path d="m708.54 491.46v-302.71c0-59.953-48.602-108.54-108.54-108.54-59.953 0-108.54 48.602-108.54 108.54v302.7l-302.71 0.003907c-59.953 0-108.54 48.602-108.54 108.54 0 59.953 48.602 108.54 108.54 108.54h302.7v302.7c0 59.953 48.602 108.54 108.54 108.54 59.941 0 108.54-48.602 108.54-108.54l0.003906-302.69h302.7c59.953 0 108.54-48.602 108.54-108.54 0-59.941-48.602-108.54-108.54-108.54z"/>
        </svg>
      </RouterLink>
    </div>
  </div> 
</template>

<style scoped lang="scss">
@import "../scss/custom.scss";

button {
  cursor: pointer;
}
h1 {
  color: $color-maintext;
  font-weight: $font-weight-heading;
  font-size: 25px;
  text-transform: capitalize;
  word-break: break-word;
}
h2 {
  font-family: "Inter";
  color: $color-maintext;
  margin-bottom: -10px;
  font-size: 13px;
  font-weight: $font-weight-subheading;
}
input[type="checkbox"]:focus {
  outline: max(1px, 0.1em) solid $color-darkgrey;
}
label{
  margin-left: 3px;
  font-weight: 600;
  font-size: 15px;
}

.container-filteredHomeFeed {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  .head {
    width: 100%;
    min-height: 40px;
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
    // margin-left: -7px;

    .back {
      @include back-button;
    }
    .headline {
      width: calc(100% - 60px);
      height: auto;
      display: flex;
      flex-direction: row;
      text-align: start;
      line-height: 1.2;
      word-break: break-all;
      margin-top: 5px;
      text-align: start;
    }
    .button {
      border: none;
      background-color: transparent;
      padding-right: 0px;
      width: 42px;
      height: 42px;
      svg {
        width: 25px;
        height: 25px;
      }

      & path {
        fill: $color-primary;
      }
    }
  }
  .search{
    height: 0px;
    transition: all .4s;
    overflow: hidden;
    align-items: flex-start;
    display: flex;
    width: 100%;

    &.showSearch{
      height: 50px;
    }

    .searchbar{
      margin-right: auto;
      width: 100%;
      height: 30px;
      border: solid;
      border-color: $color-primary;
      border-radius: 10px;
      border-width: 2px;
      text-indent: 10px;
      margin-top: 5px;
      margin-bottom: 5px;
      font-size: 18px;
    }
  }
  .content {
    box-shadow: inset 0 10px 5px -10px $color-boxshadow;
    padding: 10px 20px 0 20px;
    width: calc(100% + 40px);
  }
  .icons {
    position: fixed;
    justify-content: center;
    bottom: 100px;
    left: calc(50% - 16px);
    padding-left: 0.1em;
    display: flex;
    .more-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 31px;
      height: 31px;
      border-radius: 20px;
      background-color: $color-primary;
      border: none;

      & path {
        fill: $color-white;
      }
    }
  }
}

// .checkboxSVG{
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   column-gap: 10px;
//   height: 0px;
//   transition: all .4s;
//   overflow: hidden;
//   align-items: flex-start;
//   justify-content: center;

//   &.showFilter{
//     height: 48px;
//   }
//   .filter{
//     display: flex;
//     justify-content: center;
//     // align-items: center;
//   }
// }

// .search{
//   height: 0px;
//   transition: all .4s;
//   overflow: hidden;
//   align-items: flex-start;
//   display: flex;

//   &.showSearch{
//     height: 42px;
//   }

//   .searchbar{
//     margin-right: auto;
//     width: 100%;
//     border: solid;
//     border-color: $color-primary;
//     border-radius: 10px;
//     border-width: 2px;
//     text-indent: 20px;
//     margin-top: 5px;
//     margin-bottom: 5px;
//     font-size: 18px;
//   }
// }


</style>
