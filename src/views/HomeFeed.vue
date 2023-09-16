<script>
import HomeFeedItem from "../components/HomeFeedItem.vue";
import InfoboardItem from "../components/InfoboardItem.vue";
import { infoboard } from "../lib/infoboard";
import { parseInfoboard } from "../lib/infoboardhelper";
import { mapGetters } from 'vuex' 
import CompBaseView from "./CompBaseView.vue";
import  _ from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, A11y } from 'swiper/modules';
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
      search: "",
      text: "",
      selected: [],
      filterToggle: "",
      searchToggle: "",
      transitionFilter: "",
      transitionSearch: "",
      busy: false,
      fullPage: true,
      slides: [],
    };
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

    allInfoboard : () => parseInfoboard(infoboard),

    filteredInfoboardItems(){
      return this.allInfoboard.filter((item) =>{
        
        let visible = true;
        let infoItemBadges = item.fachbereiche;
        let result = false;
        let badge = false;

        //hat item die gleichen badges wie user? 
        if(this.userBadges.length > 0){ 
          this.userBadges.forEach(element => {
            badge = JSON.stringify(infoItemBadges).includes(element);
            if(badge == true){
              return result = true;
            }
          });
          visible = visible && result; 
        }

        //enthält item text aus der Suche?
        if (this.text.length > 0) { 
          visible = visible && JSON.stringify(item).toLowerCase().includes(this.text.toLowerCase());
        }

        //hat item den type der Auswahl?
        if (this.selected.length > 0) { 
          visible = visible && this.selected.includes(item.type = "course");
        }

        return visible;
      })
    },

    filteredHomeFeedItems() {
      return this.origHomeFeedItems.filter((item) => {
        let visible = true;
        let homeItemBadges = item.badges;
        let result = false;
        let badge = false;

        //hat item die gleichen badges wie user?
        if(this.userBadges.length > 0){ 
          this.userBadges.forEach(element => {
            badge = homeItemBadges.includes(element);
            if(badge == true){
              return result = true;
            }
          });
          visible = visible && result; 
        }

        //hat item text aus der Suche?
        if (this.text.length > 0) { 
          visible = visible && JSON.stringify(item).toLowerCase().includes(this.text.toLowerCase());
        } 

        //hat item den type der Auswahl?
        if (this.selected.length > 0) { 
          visible = visible && this.selected.includes(item.type);
        } 
        return visible;
      });
    },
  },
  components: {
    HomeFeedItem,
    InfoboardItem,
    Swiper,
    SwiperSlide,
    Loading,
  },
  setup() {
    return {
      modules: [Pagination, A11y],
    };
  },  

  mounted() {
    this.getParams();
  },

  methods: {
    toggleFilter(){
      if(this.filterToggle === ''){
        this.filterToggle = 'filterOn';

        window.setTimeout(() => {
          this.transitionFilter = 'showFilter';
        }, 50)
        
      } else if(this.filterToggle === 'filterOn'){
        this.transitionFilter = "";
        this.selectedFilter = [];

        window.setTimeout(() => {
          this.filterToggle = '';
        }, 400)
        
      }
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
  <div class="container-homeFeed">
    <RouterLink to="/">FilterHomeFeed</RouterLink>
    <div class="head">
      <div class="headlines">
        <h2>Welcome {{ loggedInUser.firstname }}!</h2>
        <h1>Your Home Feed</h1>
      </div>
      <div class="icons">
        <button @click="toggleFilter()" class="button">
          <svg
            width="25px"
            height="25px"
            version="1.1"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m53.492 103.44c3.0156 1.8633 6.7852 2.0312 9.957 0.44922l10.238-5.1211h0.003906c3.4727-1.7344 5.668-5.2812 5.668-9.1641v-21.363l17.484-17.473c1.9219-1.9219 3-4.5273 2.9961-7.2461v-10.238c0-2.7188-1.0781-5.3203-3-7.2422-1.918-1.9219-4.5234-3-7.2383-3h-51.203c-5.6523 0-10.238 4.5859-10.238 10.242v10.238c-0.003906 2.7188 1.0742 5.3242 2.9961 7.2461l17.484 17.473v26.48c-0.003906 3.5508 1.832 6.8516 4.8516 8.7188zm-15.094-59.918v-10.238h51.203v10.238l-20.48 20.48v25.602l-10.238 5.1211-0.003906-30.723z"
            />
          </svg>
        </button>
        
        <button @click="toggleSearch()" class="button">
          <svg
            width="21px"
            height="21px"
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
    </div>
    <div v-if="searchToggle == 'searchOn'" class="search" :class="transitionSearch">
      <input
        v-model="text"
        type="text"
        placeholder="Search"
        class="searchbar"
      >
    </div>
    <hr class="invisible">

    <div v-if="filterToggle == 'filterOn'" class="checkboxSVG" :class="transitionFilter">
      <div class="filter">
        <input type="checkbox" class="course" value="course" v-model="selected">
        <label for="type-chat"> Courses</label>
      </div>
      <div class="filter">
        <input type="checkbox" class="thwsAnnouncement" value="thwsAnnouncement" v-model="selected">
        <label for="type-chat"> THWS Announcements</label>
      </div>
      <div class="filter">
        <input type="checkbox" class="groupchat" value="groupchat" v-model="selected">
        <label for="type-chat"> Chats</label>
      </div>
      <div class="filter">
        <input type="checkbox" class="help" value="help" v-model="selected">
        <label for="type-chat"> Help</label>
      </div>
      <div class="filter">
        <input type="checkbox" class="job" value="job" v-model="selected">
        <label for="type-chat"> Jobs</label>
      </div>
      
    </div>
    <hr class="invisible">

    <swiper
      class="mySwiper"
      :modules="modules"
      :slides-per-view="1"
      :pagination="true"
      :loop="true"
      :effect="'fade'"
      >
      <swiper-slide v-for="slide in slides" class="swiper-slide" :key="slide">
        <a :href="slide.link">
          <img :src="slide.image">
        </a>
      </swiper-slide>
    </swiper>

    <div class="content">
      <div v-for="item in mergedItems" :key="item">
        <HomeFeedItem v-if="item.class == 'homeFeed'" :item="item" />
        <InfoboardItem v-if="item.class == 'infoBoard'" :item="item" />
      </div>
    </div>
  </div> 
</template>

<style scoped lang="scss">
@import "../scss/custom.scss";

button {
  cursor: pointer;
}
h1 {
  font-weight: $font-weight-heading;
  font-size: 25px;
}
h2 {
  font-family: "Inter";
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
img {
  height: 120px;
  object-fit: cover;
}
.container-homeFeed {
  .head {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 5px;

    .icons {
      margin-left: auto;
      margin-top: 12px;
      display: flex;
      gap: 5px;
      align-items: center;
    }
    .button {
      border: none;
      background-color: transparent;

      & path {
        fill: $color-primary;
      }
    }
  }

  .invisible {
    border: none;
  }

  .checkboxSVG{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 10px;
    height: 0px;
    transition: all .4s;
    overflow: hidden;
    align-items: flex-start;
    justify-content: center;

    &.showFilter{
      height: 48px;
    }
    .filter{
      display: flex;
      justify-content: center;
      // align-items: center;
    }
  }

  .search{
    height: 0px;
    transition: all .4s;
    overflow: hidden;
    align-items: flex-start;
    display: flex;

    &.showSearch{
      height: 42px;
    }

    .searchbar{
      margin-right: auto;
      width: 100%;
      border: solid;
      border-color: $color-primary;
      border-radius: 10px;
      border-width: 2px;
      text-indent: 20px;
      margin-top: 5px;
      margin-bottom: 5px;
      font-size: 18px;
    }
  }
  .mySwiper {
    z-index: 0;
    border-radius: 10px;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    height: 120px;
    background: $color-lightgrey;
    display: flex;
    justify-content: center;
  }

  .content {
    width: 100%;
  }
}

</style>
