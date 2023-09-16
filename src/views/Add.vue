<script>
import CompBaseView from "./CompBaseView.vue";
import HomeFeedItem from "../components/HomeFeedItem.vue";

export default {
  extends: CompBaseView,
  name: "Add",
  data() {
    return {
      filterFaculty: "",
      filterSemester: "",
      filterStarted: "",
      searchToggle: "",
      transitionSearch: "",
      text: "",
    };
  },

  props: {
    filter: {
      type: String,
      default: undefined,
    },
  },

  components: {
    HomeFeedItem,
  },

  mounted() { 
    this.getDb();
  },

  computed: {
    filteredItems(){
      return this.parserItems.filter((item) => {
        let visible = true;
        if(item.type != this.filter){
          visible = false;
        }
        if(localStorage.getItem('entered-' + item.uuid) == 'true'){
          visible = false;
        }
        if(this.filterFaculty != ""){
          visible = visible && item.badges.includes(this.filterFaculty);
        }
        if(this.filterSemester != ""){
          visible = visible && item.badges.includes(this.filterSemester);
        }
        if(this.filterStarted != ""){
          visible = visible && item.badges.includes(this.filterStarted);
        }
        if(this.text != ""){
          visible = visible && item.title.toLowerCase().includes(this.text.toLowerCase());
        }
        return visible;
      })
    }
  },

  methods: {
    routerHistory(){
      this.$router.back();
    },
    getItems(){
      let items = [];
      
      if(this.filter){
        this.parserItems.forEach((item) => {
          if(item.type == this.filter && localStorage.getItem('entered-' + item.uuid) != 'true'){
            items.push(item)
          }
        })
      }
      return items;
    },
    getFilterOptionsFaculty(){
      let faculties = [];
      
      this.parserItems.forEach((item) => {
        if(item.type == 'course'){
          if(!faculties.includes(item.badges[0])){
            faculties.push(item.badges[0])
          }
        }
      })

      return faculties;
    },
    getFilterOptionsSemester(){
      let semesters = [];
      this.parserItems.forEach((item) => {
        if(item.type == 'course'){
          if(!semesters.includes(item.badges[2])){
            semesters.push(item.badges[2])
          }
        }
      })
      return semesters;
    },
    getFilterOptionsStarted(){
      let startdates = [];
      this.parserItems.forEach((item) => {
        if(item.type == 'course'){
          if(!startdates.includes(item.badges[1])){
            startdates.push(item.badges[1])
          }
        }
      })
      return startdates;
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
  <div class="container-add">
    <div class="head">
      <a @click="routerHistory()" class="back">
        <svg 
          class="back-arrow" 
          width="8px" 
          height="8px" 
          version="1.1" 
          viewBox="0 0 1200 1200" 
          xmlns="http://www.w3.org/2000/svg"
          >
          <path d="m30 375.6c0-31.199 12-61.199 34.801-85.199 46.801-46.801 123.6-46.801 170.4 0l364.8 363.6 364.8-364.8c46.801-46.801 123.6-46.801 170.4 0 46.801 46.801 46.801 123.6 0 170.4l-450 450c-22.801 22.801-52.801 34.801-85.199 34.801s-62.398-13.199-85.199-34.801l-450-448.8c-22.801-24-34.801-55.199-34.801-85.199z"/>
        </svg>
      </a>
      <div class="headline">
        <h1 v-if="filter != 'course' ">Join {{ filter }} Groups</h1>
        <h1 v-if="filter == 'course'">Add {{ filter }}s</h1> 
      </div>
      <button @click="toggleSearch()" class="button">
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

    <div v-if="filter == 'course'" class="filters">
      <select v-model="filterFaculty" class="filter">
        <option style="display: none;" value="" disabled selected>
          Faculty
        </option>
        <option value="">
          --
        </option>
        <option v-for="faculty in getFilterOptionsFaculty()" :value="faculty" :key="faculty"> 
          {{ faculty }}
        </option>
      </select> 

      <select v-model="filterSemester" class="filter">
        <option style="display: none;" value="" disabled selected>
          Semester
        </option>
        <option value="">
          --
        </option>
        <option v-for="semester in getFilterOptionsSemester()" :value="semester" :key="semester"> 
          {{ semester }}
        </option>
      </select>

      <select v-model="filterStarted" class="filter">
        <option style="display: none;" value="" disabled selected>
          Started
        </option>
        <option value="">
          --
        </option>
        <option v-for="started in getFilterOptionsStarted()" :value="started" :key="started"> 
          {{ started }}
        </option>
      </select>
    </div>
    <div class="content" :class="filter">
      <div v-for="element in filteredItems" :key="element">
        <HomeFeedItem :element="element" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/custom.scss";
h1 {
  color: $color-maintext;
  font-weight: $font-weight-heading;
  font-size: 25px;
  text-transform: capitalize;
  word-break: break-word;
}
.container-add {
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
      width: calc(100% - 93px);
      display: flex;
      flex-direction: row;
      text-align: start;
      line-height: 1.2;
      word-break: break-all;
      margin-top: 5px;
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

  .filters {
    // position: fixed;
    top: 145px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
    width: calc(100% + 40px);
    padding: 0 20px 0 20px;
    .filter {
      height: 35px;
      grid-column: 1fr;
      border-radius: 10px;
      border-color: $color-academic;
      background-color: $color-lightgrey;
      border: none;
      text-indent: 5px;
      font-size: 15px;
    }
  }
  .content {
    box-shadow: inset 0 10px 5px -10px $color-boxshadow;
    padding: 10px 20px 0 20px;
    width: calc(100% + 40px);
    &.course {
      margin-top: 20px;
    }
  }
  
}
</style>
