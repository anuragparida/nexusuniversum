<script>
import CompBaseView from "./CompBaseView.vue";
import { infoboard } from "../lib/infoboard";
import { parseInfoboard } from "../lib/infoboardhelper";

export default {
  extends: CompBaseView,
  name: "Appointment",

  data() {
    return {
    };
  },

  mounted() {
    this.getDb();
  },

  computed:{

  },

  methods:{
    routerHistory(){
      this.$router.back();
    },
    deleteEvent(){
      let storage = localStorage.getItem('newEvents')
      let events = JSON.parse(storage);
      let filteredEvents = events.filter((item) => {
        if(item.uuid != this.uuid){
          return true;
        }
      })

      localStorage.setItem('newEvents', JSON.stringify(filteredEvents))
      this.$router.back();
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
  <div class="container-course">
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
      <h1 v-if="item" class="headline">
        {{ item.title }}
      </h1>
    </div>

    <div class="content">

      <div class="item-img">
        <img v-if="item.class == 'homeFeed'" :src="item.img">
      </div>

      <div class="description">
        {{ item.description }}
      </div>
      <div class="description">
        {{ item.info }}
      </div>
      <div class="description">
        {{ item.ortRaum }}
      </div>
      <div class="description">
        {{ item.prof }}
      </div>
      <div class="description">
        {{ item.date }}
      </div>
      <div class="description">
        {{ item.timeStart }} - {{ item.timeEnd }}
      </div>
    </div>

    <div v-if="!item.new" class="buttons">
      <div class="button primary">
        Accept
      </div>
      <div class="button secondary">
        Decline
      </div>
    </div>

    <div v-if="item.new" @click="deleteEvent()" class="buttons">
      <div class="button primary big">
        Delete Event
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/custom";

img {
  max-width: 100%;
  max-height: 130px;
  margin: auto;
}

h3 {
  font-size: 11px;
  font-family: "Inter";
  font-weight: $font-weight-subheading;
  margin-left: 10px;;
  color: $color-lightgrey;
}

h1 {
  font-weight: $font-weight-heading;
}
.container-course {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;

  .head {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
    .back {
      @include back-button;
    }
    .headline{
      width: calc(100% - 26px);
      display: flex;
      flex-direction: row;
      text-align: start;
      line-height: 1.2;
      word-break: break-word;
    }
  }
  
  .content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% + 40px);
    padding: 0 20px 0 20px;
    box-shadow: inset 0 10px 5px -10px $color-boxshadow;

    .item-img {
      max-height: 130px;
      width: 100%;
      display: grid;
      margin: 15px 0 15px 0;
      border-radius: 10px;
      background: $color-lightgrey;
    }
    .description {
      display: flex;
    }
  }
  .buttons {
    display: flex; 
    height: 40px;
    gap: 5px;
    position: fixed;
    justify-content: center;
    bottom: 100px;

    .big {
      width: 160px;
    }
  }
}


</style>
