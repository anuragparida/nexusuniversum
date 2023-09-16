<script>
import HomeFeedItem from "../components/HomeFeedItem.vue";
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
      busy: false,
      fullPage: true,
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
    },

  components: {
    HomeFeedItem,
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
    
    findFilter(){
      let filters = [];
      this.parserItems.forEach(element => {
        let filter = element.type;
        if(filters.indexOf(filter) === -1){
          filters.push(filter);
        }
      })
      return filters;
    }
  }
};
</script>

<template>
  <loading v-model:active="busy"
    :can-cancel="false"
    :is-full-page="fullPage"
    color="#ee750d"
  />
  <div class="container-filterHomeFeed">
    <!-- <RouterLink to="/homefeed">old HomeFeed</RouterLink> -->
    <div class="head">
      <div class="headlines">
        <h2>Welcome {{ loggedInUser.firstname }}!</h2>
        <h1>Your Home Feed</h1>
      </div>
    </div>

    <swiper
      class="mySwiper"
      :modules="modules"
      :slides-per-view="1"
      :pagination="true"
      :loop="true"
      :effect="'fade'"
      >
      <swiper-slide v-for="slide in parserSlides" class="swiper-slide" :key="slide">
        <a :href="slide.link">
          <img :src="slide.image">
        </a>
      </swiper-slide>
    </swiper>

    <div class="content">
      <div v-for="filter in findFilter()" :key="filter">
        <HomeFeedItem :filter="filter" />
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
  color: $color-maintext;
}
h2 {
  font-family: "Inter";
  margin-bottom: -10px;
  font-size: 13px;
  font-weight: $font-weight-subheading;
  color: $color-maintext;
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
.container-filterHomeFeed {
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

  .mySwiper {
    z-index: 0;
    border-radius: 10px;
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      height: 120px;
      background: $color-lightgrey;
      display: flex;
      justify-content: center;
    }
  }
  
  .content {
    width: 100%;
  }
}


// .invisible {
//   border: none;
// }

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
