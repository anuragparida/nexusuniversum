<script>
import CompBaseView from "./CompBaseView.vue";
import GridItem from "../components/GridItem.vue"
import moment from 'moment'
import _ from "lodash";

export default {
  extends: CompBaseView,
  name: "Calendar",

  data() {
    return {
      theme: "default",
      monthMMM: moment().format("MMM"),
      years: [],
      dayCache: {},
      currentMoment: moment().startOf('month'),
      currentMonth: moment().month(),
      currentYear: moment().year(),
      itsToday: "",
      today: moment().format("DD.MM.YY"),
      selectedFilter: [],
      filterToggle: "",
      searchToggle: "",
      transitionFilter: "",
      transitionSearch: "",
      visibleDays: [],
      text: "",
      counter: 0,
      arrayEvents: []
    };
  },

  mounted() {
    this.getParams();
    this.getDb();
  },

  watch: {
    parserItems(val) {
      if(val) {
        this.visibleDaysOrig();
      }
    },
    currentMoment(val){
      this.currentMonth = val.month();
      this.currentYear = val.year();
      this.monthMMM = val.format("MMM");
      this.visibleDaysOrig();
      this.getYears();
      this.makeRouterParams(val);
    },
    selectedFilter(){
      this.visibleDaysOrig();
    },
    text(){
      this.visibleDaysOrig();
    }
  },

  computed:{
    filteredEventsReload(){
      return this.filteredEvents();
    }
  },

  components:{
    GridItem,
  },

  methods:{
    visibleDaysOrig() {
      let month_cache_key = this.currentMoment.format("M-Y");
      if(this.dayCache[month_cache_key] && !this.selectedFilter) {
        this.visibleDays = this.dayCache[month_cache_key];
      }
      this.getYears();
      this.visibleDays = this.createMonth(this.currentMoment);
    },

    filteredEvents(){
      let events = this.parserItems.filter((item) =>{
        let visible = true;
        if (!item.date){
          visible = false;
        }
        if (this.selectedFilter.length > 0) { 
          visible = visible && this.selectedFilter.includes(item.type);
        }
        if (this.text.length > 0) { 
          visible = visible && JSON.stringify(item).toLowerCase().includes(this.text.toLowerCase());
        } 
        
        return visible;
      })

      let storage = localStorage.getItem('newEvents')
      let unfilteredNewEvents = []
      if(storage){
        storage = JSON.parse(storage);
        storage.forEach((item) => {
          unfilteredNewEvents.push(item)
        })
        let filteredNewEvents = unfilteredNewEvents.filter((item) => {
          let visible = true;
          if (!item.date){
            visible = false;
          }
          if (this.selectedFilter.length > 0) { 
            visible = visible && this.selectedFilter.includes(item.type);
          }
          if (this.text.length > 0) { 
            visible = visible && JSON.stringify(item).toLowerCase().includes(this.text.toLowerCase());
          } 
          return visible;
        })
        filteredNewEvents.forEach((item) => {
          events.push(item)
        })
      }  
      this.arrayEvents = events;
      return events;
    },

    createMonth(currentMoment) {
      let startdate = moment(currentMoment).startOf('month');
      let month_cache_key = startdate.format("M-Y"); // bsp. 8-2023

      //solange es nicht Montag ist, startday -1
      while(startdate.weekday() != 0) { 
        startdate.subtract(1, "day");
      }

      //42 Tage vom startdate aus werden in den array gepusht
      let month = [];
      for(let i = 0; i < 42; i++) { 
        startdate = startdate.add(1, "day");
        let dayEvents = [];
        let itsToday = "";
        let currentMonth = "";
        let events = this.filteredEvents();
        let item = "";
        if (events.length < 1){
          events.push("dummy")
        }
        events.forEach(element => {
          if(element.date == startdate.format("DD.MM.YY")){
            dayEvents.push(element);
          }
          if(startdate.format("DD.MM.YY") == this.today){
            itsToday = 'today';
          }
          if(startdate.format("MM") != currentMoment.format("MM")){
            currentMonth = 'notCurrent';
          }
          item = element;
        });
        month.push({
          date: moment(startdate),
          events: dayEvents,
          today: itsToday,
          current: currentMonth,
          element: item,
        });
      }
      // console.log(month)

      //in das objekt dayCache wird der Array mit den Tagen unter der Bezeichnung des month_cache_key gespeichert
      this.dayCache[month_cache_key] = month;

      return month;
    },    
    
    changeYear(){
      this.currentMoment = moment(this.currentMoment.year(this.currentYear));
    },

    nextMonth() {
      this.currentMoment = moment(this.currentMoment.add(1, 'month'))
      this.counter++
    },

    refreshMonth() {
      let current = _.cloneDeep(this.currentMoment);
      this.currentMoment = current;
    },

    previousMonth() {
      this.currentMoment = moment(this.currentMoment.subtract(1, 'month'))
      this.counter++
    },

    getYears(){
      this.years = [];
      for(let i = 0; i <= 8; i++){
        this.years.push(this.currentMoment.year() -5 + i)
      }
      this.years = this.years.sort((a, b) => b - a);
    },

    changeTheme(old){
      if(old == "default"){
        this.theme = "simple";
      }
      if(old == "simple"){
        this.theme = "default"
      }
    },    
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
        }, 400)
      }
    },
    routerHistory(){
      this.$router.go(-this.counter - 1);
      
    },
    makeRouterParams(selectedMonth){
      if(selectedMonth != true && selectedMonth != false ){
        if(this.$route.name == 'calendar'){
          this.$router.push({ path: '/calendar', query: {time: selectedMonth.unix()}})
        }
      }
    },
    
  }
};
</script>

<template>
  <div class="vl-parent">
    <loading v-model:active="busy"
      :can-cancel="false"
      :is-full-page="fullPage"
      color="#ee750d"
    />
  </div>
  <div class="container-calendar">
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
          <path d="m30 375.6c0-31.199 12-61.199 34.801-85.199 46.801-46.801 123.6-46.801 170.4 0l364.8 363.6 364.8-364.8c46.801-46.801 123.6-46.801 170.4 0 46.801 46.801 46.801 123.6 0 170.4l-450 450c-22.801 22.801-52.801 34.801-85.199 34.801s-62.398-13.199-85.199-34.801l-450-448.8c-22.801-24-34.801-55.199-34.801-85.199z" />
        </svg>
      </a>

      <div class="headline">
        <div class="month-select">
          <button @click="previousMonth" class="button backward">
            <svg
              class="backwards"
              width="16px"
              height="16px"
              version="1.1"
              viewBox="0 0 1200 1200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m30 375.6c0-31.199 12-61.199 34.801-85.199 46.801-46.801 123.6-46.801 170.4 0l364.8 363.6 364.8-364.8c46.801-46.801 123.6-46.801 170.4 0 46.801 46.801 46.801 123.6 0 170.4l-450 450c-22.801 22.801-52.801 34.801-85.199 34.801s-62.398-13.199-85.199-34.801l-450-448.8c-22.801-24-34.801-55.199-34.801-85.199z"
              />
            </svg>
          </button>
          <h2>
            {{ monthMMM }} 
            <select @change="changeYear" v-model="currentYear" class="yearPicker">
              <option style="display: none;" value="" disabled selected>
                {{ currentYear }}
              </option>
              <option v-for="year in years" :value="year" :key="year">
                {{ year }}
              </option>
            </select>            
          </h2>
          <button @click="nextMonth" class="button">
            <svg
              class="forwards"
              width="16px"
              height="16px"
              version="1.1"
              viewBox="0 0 1200 1200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m30 375.6c0-31.199 12-61.199 34.801-85.199 46.801-46.801 123.6-46.801 170.4 0l364.8 363.6 364.8-364.8c46.801-46.801 123.6-46.801 170.4 0 46.801 46.801 46.801 123.6 0 170.4l-450 450c-22.801 22.801-52.801 34.801-85.199 34.801s-62.398-13.199-85.199-34.801l-450-448.8c-22.801-24-34.801-55.199-34.801-85.199z"
              />
            </svg>
          </button>
        </div>
        
        <div class="icons">
          <button @click="changeTheme(theme)" class="button">
            <svg width="26" height="26" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
              <path d="m862.5 225h-329.81c-7.5391 0-14.887 2.2891-21.113 6.5234l-76.273 52.012-76.352-53.25c-11.438-7.9844-26.398-8.9609-38.812-2.4727-12.375 6.4492-20.137 19.273-20.137 33.227v451.46c0 20.738 16.762 37.5 37.5 37.5h150v187.5c0 20.738 16.762 37.5 37.5 37.5h150c20.738 0 37.5-16.762 37.5-37.5v-187.5h150c20.738 0 37.5-16.762 37.5-37.5v-450c0-20.699-16.762-37.5-37.5-37.5zm-487.5 107.93 38.586 26.926c12.824 8.9258 29.773 9 42.602 0.22656l88.086-60.078h280.73v225h-450zm450 342.07h-150c-20.738 0-37.5 16.762-37.5 37.5v187.5h-75v-187.5c0-20.738-16.762-37.5-37.5-37.5h-150v-75h450z" />
            </svg>
          </button>

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
    </div>
    <div v-if="searchToggle == 'searchOn'" class="search" :class="transitionSearch">
      <input
        v-model="text"
        type="text"
        placeholder="Search"
        class="searchbar"
        @change="refreshMonth()"
      >
    </div>
    <form v-if="filterToggle == 'filterOn'" class="checkboxSVG" :class="transitionFilter">
      
      <div class="filter">
        <input
          class="academic"
          type="checkbox"
          value="academic"
          v-model="selectedFilter"
          @change="refreshMonth()"
        >
        <label for="type-academic"> Academic Groups</label>
      </div> 
      <div class="filter">
        <input
          class="social"
          type="checkbox"
          value="social"
          v-model="selectedFilter"
          @change="refreshMonth()"
        >
        <label for="type-social"> Social Groups</label>
      </div>
      <div class="filter">
        <input
          class="sports"
          type="checkbox"
          value="sports"
          v-model="selectedFilter"
          @change="refreshMonth()"
        >
        <label for="type-sports"> Sports Groups</label>
      </div>
      <div class="filter">
        <input
          class="course"
          type="checkbox"
          value="course"
          v-model="selectedFilter"
          @change="refreshMonth()"
        >
        <label for="type-course"> Courses</label>
      </div>
      <div class="filter">
        <input
          class="none"
          type="checkbox"
          value="none"
          v-model="selectedFilter"
          @change="refreshMonth()"
        >
        <label for="type-course"> None</label>
      </div>
    </form>
    
    <div class="content">
      <div class="weekdays" :class="theme">
        <div class="weekday">
          Mo
        </div>
        <div class="weekday">
          Tu
        </div>
        <div class="weekday">
          We
        </div>
        <div class="weekday">
          Th
        </div>
        <div class="weekday">
          Fr
        </div>
        <div class="weekday">
          Sa
        </div>
        <div class="weekday">
          Su
        </div>
      </div>
      
      <div class="scroll-container" :class="[transitionFilter, transitionSearch]">
        <div class="grid-parent" :class="theme">
          <template v-if="visibleDays">
            <div v-touch:swipe.left="nextMonth" v-touch:swipe.right="previousMonth" v-for="day in visibleDays" :key="day">
              <GridItem :item="day" :class="theme" :callback="visibleDaysOrig" />  
            </div>  
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/custom.scss";

h2 {
  font-family: "Inter";
  font-weight: $font-weight-heading;
  cursor: default;
  width: 60%;
  justify-content: center;
  align-items: center;
  display: flex;
}

h3 {
  font-size: 11px;
  font-family: "Inter";
  font-weight: $font-weight-subheading;
  margin-left: 10px;;
  color: $color-lightgrey;
}

button:focus{
  outline: 2px solid $color-darkgrey;
}

select:focus{
  outline-color: $color-darkgrey;
}
select:active {
  padding: 8px 12px;
}
select option{
  color: $color-white;
  font-weight: $font-weight-heading;
}

input[type="checkbox"]:focus {
  outline: max(1px, 0.1em) solid $color-darkgrey;
}
label{
  margin-left: 3px;
  font-weight: 600;
  font-size: 15px;
}

%button{
  border: none;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 10px;
}

%weekdays{
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 8px;
  cursor: default;
}

.container-calendar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  background-color: $color-white;

  .head {
    margin-top: 1px;
    width: 100%;
    height: 57px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px 0 20px; 
    
    .back {
      @include back-button;
    }
    .headline {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin-top: -32px; 

      .month-select{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-right: 4px;
        width: 100%;

        .button {
          border: none;
          background-color: transparent;
          justify-content: center;
          align-items: center;
          display: flex;
          border-radius: 10px;

          &.backward{
            padding-left: 0;

            .backwards {
              transform: rotate(90deg);
              margin-top: 1px;
              margin-left: -1px;
              margin-right: -3px;
            }
          }
          & path {
            fill: $color-academic;
          }

          .forwards {
            transform: rotate(-90deg);
            margin-top: 1px;
          }
        }
        .yearPicker{
          font-family: "Inter";
          font-weight: $font-weight-heading;
          text-indent: 10px;
          width: 50%;
          height: 21px;
          margin-left: 10px;
          padding-top: 1px;
          border-radius: 20px;
          border-color: $color-academic;
          background-color: $color-academic;
          color: $color-white;
          border: none;
        }
      }
      .icons {
        margin-left: auto;
        display: flex;
        gap: 5px;
        align-items: center;
        margin-top: 1px;
        & path {
          fill: $color-academic;
        }
        .button{
          @extend button ;
        }
      }
    }
  }
  .checkboxSVG{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 10px;
    justify-content: center;
    align-items: flex-start;
    height: 0px;
    transition: all .4s;
    overflow: hidden;
    padding: 0 20px 0 20px;

    &.showFilter{
      height: 55px;
      padding-bottom: 5px;
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
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    

    &.showSearch{
      height: 44px;
    }
    .searchbar{
      width: 342px;
      margin-bottom: 5px;
      margin-top: 5px;
      border: solid;
      border-radius: 15px;
      border-width: 2px;
      border-color: $color-academic;
      text-indent: 20px;
      background-color: $color-white;
      font-size: 18px;
      &:focus{
        outline: 2px solid $color-darkgrey;
        border: none;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: $color-white;

    .weekdays{
      @extend %weekdays;

      &.simple{
        box-shadow: inset 0 10px 5px -10px $color-boxshadow;
      
      }
      &.default{
        box-shadow: inset 0 10px 5px -10px $color-boxshadow;
      }
      .weekday{
        display: flex;
        text-transform: uppercase;
        width: 100%;
        justify-content: center;
        font-family: "Inter";
        font-weight: 700;
      }
    }
    .scroll-container {
      height: calc(100vh - 261px);
      overflow-y: scroll;
      z-index: 100;
      background-color: $color-white;
      &.showFilter{
        height: calc(100vh - 272px - 32px);
        &.showSearch{
        height: calc(100vh - 272px - 72px);
      }
      }
      &.showSearch{
        height: calc(100vh - 272px - 38px);
      }
      .grid-parent {
        position: relative;
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(6, 1fr auto);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        justify-content: center;
        overflow-y:auto;
        overflow-x: hidden;
        z-index: -100;

        &.default{
          padding-top: 0px;
        }
        > div {
          position: relative;
        }
      }
    }
  }
}
</style>
