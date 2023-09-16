<script>
import CompBaseView from "./CompBaseView.vue";
import { mapGetters } from 'vuex' 
import moment from 'moment'
import EventItem from "../components/EventItem.vue"
import _ from "lodash";
import { ModalsContainer } from 'vue-final-modal'
import ModalConfirm from '../components/Modal.vue'

export default{
  extends: CompBaseView,
  data(){
    return {
      startOfWeek: "",
      selectedWeek: [],
      todayDate: moment(),
      hours: [],
      filterToggle: "",
      transitionFilter: "",
      selectedFilter: [],
      show: false,
      newEvent: {},
      newEvents: [],
      error: false,
      array: [],
      uuids: [],
      event: [],
      eventsArray: []
    }
  },

  components:{
    EventItem,
    ModalsContainer,
    ModalConfirm
  },

  mounted(){
    if(this.storeInitialized) {
      this.check();
      this.getHours();
      this.getEvents()
      this.eventPositionMap()
    }
  },

  watch: {
    eventsArray(){
      this.eventPositionMap()
    }
  },

  computed:{
    ...mapGetters(['selectedDate', 'storeInitialized','loggedIn', 'loggedInUser', 'userBadges']),

    currentWeekforSelect(){
      if(!this.storeInitialized) return ""
      let currentWeek = this.selectedDate.isoWeek();
      let start = moment().isoWeek(currentWeek).startOf('isoWeek').format('DD.MM.YY');
      let end = moment().isoWeek(currentWeek).endOf('isoWeek').format('DD.MM.YY');
      let week = start.toString() + " - " + end.toString()
      return week
    },
    week(){
      let week = [];
      this.selectedWeek = this.selectedDate.isoWeek();
      let selectedWeek = this.selectedWeek;
      this.startOfWeek = moment().isoWeek(selectedWeek).startOf("week");
      
      for(let i = 1; i <= 7; i++){
        let weekDate = moment(this.startOfWeek).add(i, "day");
        week.push({
          date: weekDate,
        });

      }
      return week;
    },

    hourPositionMap() {
      let hours = [];

      for(let i = 0; i < 24; i++) {
        let date_time = moment(this.todayDate).hour(i).minute(0);
        let date_time_next = moment(this.todayDate).hour(i + 1).minute(0);
        let display_start = date_time.format("HH:mm");
        let display_end = date_time_next.format("HH:mm");
        let start_pos_percent = (i / 24) * 100;
        let end_pos_percent = ((i + 1) / 24) * 100;
        let height_percent = end_pos_percent - start_pos_percent;
        hours.push({
          moment_start: date_time,
          moment_end: date_time_next,
          display_start: display_start,
          display_end: display_end,
          top_percent: start_pos_percent,
          bottom_percent: end_pos_percent,
          height_percent: height_percent,
        });
      }

      return hours;
    },

    eventPositionMapReload(){
      return this.eventPositionMap();
    },

  },

  methods: {
    eventPositionMap() {
      let events = this.eventsArray;

      let eventsWithOverlappingArrays = []
      let event_positions = [];

      for(let event of events) {
        let event_start = moment(event.date + " " + event.timeStart, "DD.MM.YYYY HH:mm");
        let event_end = moment(event.date + " " + event.timeEnd, "DD.MM.YYYY HH:mm");
        let start_pos_percent = ((60 * event_start.hour() + event_start.minutes()) / (24 * 60)) * 100;
        let end_pos_percent = ((60 * event_end.hour() + event_end.minutes()) / (24 * 60)) * 100;
        let overlappingEvents = []

        events.forEach((item) => {
          let item_event_start = moment(item.date + " " + item.timeStart, "DD.MM.YYYY HH:mm");
          let item_event_end = moment(item.date + " " + item.timeEnd, "DD.MM.YYYY HH:mm");
          let item_start_pos_percent = ((60 * item_event_start.hour() + item_event_start.minutes()) / (24 * 60)) * 100;
          let item_end_pos_percent = ((60 * item_event_end.hour() + item_event_end.minutes()) / (24 * 60)) * 100;

          if(!(item_end_pos_percent > start_pos_percent) || !(item_start_pos_percent < end_pos_percent) || item.uuid == event.uuid){
            return
          } else {
            overlappingEvents.push(item)
          }                  

        })
        event.overlappings = overlappingEvents;
        if(overlappingEvents.length > 0){
          eventsWithOverlappingArrays.push([event, event.overlappings]);
        } else {
          eventsWithOverlappingArrays.push(event);
        }

      }

      eventsWithOverlappingArrays.forEach((event) => {
        // Wenn Event Überschneidungen hat
        if(Array.isArray(event)){
          // und die uuid noch nicht 'gesetzt' wurde mach bei dem Event das:
          if(!this.uuids.includes(event[0].uuid)){
            let event_start = moment(event[0].date + " " + event[0].timeStart, "DD.MM.YYYY HH:mm");
            let event_end = moment(event[0].date + " " + event[0].timeEnd, "DD.MM.YYYY HH:mm");
            let start_pos_percent = ((60 * event_start.hour() + event_start.minutes()) / (24 * 60)) * 100;
            let end_pos_percent = ((60 * event_end.hour() + event_end.minutes()) / (24 * 60)) * 100;
            let height_percent = end_pos_percent - start_pos_percent;
            let event_width = ''
            let event_left = ''

            if (event[0].overlappings.length == 0){
              event_width = 'calc(100% - 85px)'
            } 
            else if (event[0].overlappings.length == 1) {
              for(let event_position of event_positions){
                if(event_position.event_width === 'calc((100% - 85px) / 2)'){
                  event_width = event_position.event_width
                }else {
                  event_width = 'calc((100% - 85px) / 2)'
                }
              }
            } 
            else if (event[0].overlappings.length == 2){
              for(let event_position of event_positions){
                if(event_position.event_width === 'calc((100% - 85px) / 3)'){
                  event_width = event_position.event_width
                }else {
                  event_width = 'calc((100% - 85px) / 3)'
                }
              }
            } 
            else if (event[0].overlappings.length == 3){
              event_width = 'calc((100% - 85px) / 4)'
            }

            event_positions.push({
              top_percent: start_pos_percent,
              bottom_percent: end_pos_percent,
              height_percent: height_percent,
              event_width: event_width,
              event_left: event_left,
              event: event[0],
            });

            this.uuids.push(event[0].uuid)
          }

          // und bei den Überschneidungen des Events das:
          for(let [index, overlapping] of event[1].entries()){
            index = index + 1
            // Wenn die überschneidung der Überlappung noch nicht gesetzt wurde
            if(!this.uuids.includes(overlapping.uuid)){
              let event_start = moment(overlapping.date + " " + overlapping.timeStart, "DD.MM.YYYY HH:mm");
              let event_end = moment(overlapping.date + " " + overlapping.timeEnd, "DD.MM.YYYY HH:mm");
              let start_pos_percent = ((60 * event_start.hour() + event_start.minutes()) / (24 * 60)) * 100;
              let end_pos_percent = ((60 * event_end.hour() + event_end.minutes()) / (24 * 60)) * 100;
              let height_percent = end_pos_percent - start_pos_percent;
              let event_width = ''
              let event_left = ''

              if (event[0].overlappings.length == 0){
                event_width = 'calc(100% - 85px)'
              } 
              else if (event[0].overlappings.length == 1) {
                for(let event_position of event_positions){
                  if(event_position.uuid == overlapping.uuid && event_position.event_width === 'calc((100% - 85px) / 2)'){
                    event_width = event_position.event_width
                  }else {
                    event_width = 'calc((100% - 85px) / 2)'
                  }
                }
                event_left = 'calc(76px + ((100% - 85px) / 2))'
              } 
              else if (event[0].overlappings.length == 2){
                for(let event_position of event_positions){
                  if(event_position.uuid == overlapping.uuid && event_position.event_width === 'calc((100% - 85px) / 3)'){
                    event_width = event_position.event_width
                  }else {
                    event_width = 'calc((100% - 85px) / 3)'
                  }
                }
                event_left = 'calc(76px + ((100% - 85px) /' + (3 / index) + ' ))'
              } 
              else if (event[0].overlappings.length == 3){
                for(let event_position of event_positions){
                  if(event_position.uuid == overlapping.uuid && event_position.event_width === 'calc((100% - 85px) / 4)'){
                    event_width = event_position.event_width
                  }else {
                    event_width = 'calc((100% - 85px) / 4)'
                  }
                }
                event_left = 'calc(76px + ((100% - 85px) /' + (4 / index) + ' ))'
              }

              event_positions.push({
                top_percent: start_pos_percent,
                bottom_percent: end_pos_percent,
                height_percent: height_percent,
                event_width: event_width,
                event_left: event_left,
                event: overlapping,
              });
              this.uuids.push(overlapping.uuid)
            }
          }
        }
        //wenn Event keine Überschneidungen hat:
        else {
          if(!this.uuids.includes(event.uuid)){
            let event_start = moment(event.date + " " + event.timeStart, "DD.MM.YYYY HH:mm");
            let event_end = moment(event.date + " " + event.timeEnd, "DD.MM.YYYY HH:mm");
            let start_pos_percent = ((60 * event_start.hour() + event_start.minutes()) / (24 * 60)) * 100;
            let end_pos_percent = ((60 * event_end.hour() + event_end.minutes()) / (24 * 60)) * 100;
            let height_percent = end_pos_percent - start_pos_percent;
            let event_width = ''
            let event_left = ''

            event_positions.push({
              top_percent: start_pos_percent,
              bottom_percent: end_pos_percent,
              height_percent: height_percent,
              event_width: event_width,
              event_left: event_left,
              event: event,
            });
          }
        }
      })
      
      this.array = this.sortEvents(event_positions)
      this.uuids = []
    },
    sortEvents(events) {
      let event_positions = events;
      let sorted_event_positions = _.sortBy(event_positions, 'height_percent')

      return sorted_event_positions;
    },
    getEvents(){
      
      let events = this.parserItems.filter((item) => {
        let visible = true;
        if(this.selectedFilter.length > 0){
          visible = visible && this.selectedFilter.includes(item.type);
        }else{
          visible = (item.date == moment(this.selectedDate).format("DD.MM.YY"));
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
          if(this.selectedFilter.length > 0){
            console.log("test")
            visible = visible && this.selectedFilter.includes(item.type) ;
            console.log(this.selectedFilter.includes(item.type))
          }else {
            visible = (item.date == moment(this.selectedDate).format("DD.MM.YY"));
          }
          return visible;
        })
        filteredNewEvents.forEach((item) => {
          events.push(item)
        })
      }
      this.eventsArray = events;
    },
    routerHistory(){
      this.$router.back();
    },
    changeDate(day){
      this.$store.commit('date', moment(day))
      this.eventPositionMapReload
    },
    getAllWeeksSelect(){
      let weeksNumber = [];
      let weeks = [];
      
      let currentWeek = this.selectedDate.isoWeek();
      for(let i = -5; i <= 3; i++){
        weeksNumber.push(currentWeek + i)
      }
      weeksNumber = weeksNumber.reverse();
      weeksNumber.forEach(number => {
        let start = moment().isoWeek(number).startOf('isoWeek').format('DD.MM.YY');
        let end = moment().isoWeek(number).endOf('isoWeek').format('DD.MM.YY');
        let week = start.toString() + " - " + end.toString()
        weeks.push({value: number, display: week})
      })
      return weeks;
    },
    changeSelectedWeek(event) {
      this.selectedWeek = parseInt(event.target.value);
      this.changeDate(moment().isoWeek(this.selectedWeek).startOf('isoWeek'));
    },
    getHours(){
      this.hours = [];
      for(let i = 0; i <= 24; i++){
        let startOfHour = moment().startOf("day").add(i, 'hour').format('hh:mm');
        let endOfHour = moment().startOf("day").add(i + 1, 'hour').format('hh:mm');
        let hour = startOfHour.toString() + " - " + endOfHour.toString()
        this.hours.push(hour)
      }
    },
    check(){
      if(this.selectedDate == false){
        this.$router.push("/calendar")
      }
    },
    nextWeek(){
      this.changeDate(moment(this.selectedDate).add(1, "isoWeek"))

    },
    previousWeek(){
      this.changeDate(moment(this.selectedDate).subtract(1, "isoWeek"))
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
    refreshMonth() {
      let current = _.cloneDeep(this.week);
      this.currentMoment = current;
    },
    confirm(eventObj) {

      if(eventObj.date == "" || eventObj.start == "" || eventObj.end == "" || eventObj.title == "" || eventObj.start > eventObj.end){
        this.error = true;
      }else {
        this.newEvent = eventObj;
        this.newEvent.uuid = JSON.stringify(this.newEvent)
        let splitted = this.newEvent.date.split("-")
        
        splitted = splitted.reverse()
        splitted[2] = splitted[2].slice(-2)
        splitted = splitted.toString()
        this.newEvent.date = splitted.replaceAll(',', '.')

        let storage = localStorage.getItem('newEvents')
        if(storage){
          this.newEvents = JSON.parse(storage)
        }
        this.newEvents.push(this.newEvent);
        
        localStorage.setItem('newEvents', JSON.stringify(this.newEvents))

        this.eventPositionMap()
        this.show = false;

      }
      

    },
    cancel(){
      this.show = false;
    },
  }
}
</script>

<template>
  <loading v-model:active="busy"
      :can-cancel="false"
      :is-full-page="fullPage"
      color="#ee750d"
    />
  <div class="container-day">
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
        <div class="week-select">
          <select @change="changeSelectedWeek" class="weekPicker">
            <option style="display: none;" value="" disabled selected>
              {{ currentWeekforSelect }}
            </option>
            <option v-for="week in getAllWeeksSelect()" :value="week.value" :key="week.value">
              {{ week.display }}
            </option>
          </select>
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

          <button class="button" @click="show = true">
            <svg width="20" height="20" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
              <path d="m708.54 491.46v-302.71c0-59.953-48.602-108.54-108.54-108.54-59.953 0-108.54 48.602-108.54 108.54v302.7l-302.71 0.003907c-59.953 0-108.54 48.602-108.54 108.54 0 59.953 48.602 108.54 108.54 108.54h302.7v302.7c0 59.953 48.602 108.54 108.54 108.54 59.941 0 108.54-48.602 108.54-108.54l0.003906-302.69h302.7c59.953 0 108.54-48.602 108.54-108.54 0-59.941-48.602-108.54-108.54-108.54z" />
            </svg>
          </button>

        </div>
      </div>
    </div>
    <form v-if="filterToggle == 'filterOn'" class="checkboxSVG" :class="transitionFilter">
        <div class="filter">
          <input
            class="academic"
            type="checkbox"
            value="academic"
            v-model="selectedFilter"
            @change="getEvents()"
          >
          <label for="type-academic"> Academic Groups</label>
        </div>
        <div class="filter">
          <input
            class="social"
            type="checkbox"
            value="social"
            v-model="selectedFilter"
            @change="getEvents()"
          >
          <label for="type-social"> Social Groups</label>
        </div> 
        <div class="filter">
          <input
            class="sports"
            type="checkbox"
            value="sports"
            v-model="selectedFilter"
            @change="getEvents()"
          >
          <label for="type-sports"> Sports Groups</label>
        </div>

        <div class="filter">
          <input
            class="course"
            type="checkbox"
            value="course"
            v-model="selectedFilter"
            @change="getEvents()"
          >
          <label for="type-course"> Courses</label>
        </div>


        <div class="filter">
          <input
            class="none"
            type="checkbox"
            value="none"
            v-model="selectedFilter"
            @change="getEvents()"
          >
          <label for="type-course"> None</label>
        </div>
    </form>
    <div class="content">
      <div class="weekdays">
        <div v-for="day in week" :key="day.date.unix()" class="weekday">
          {{ day.date.format("dd") }}
        </div>
      </div>
      <div v-touch:swipe.left="nextWeek" v-touch:swipe.right="previousWeek" class="weekdates">
        <div v-for="day in week" class="weekday" :key="day">
          <div @click="changeDate(day.date)"
              :class="{'today-marker' : todayDate.isSame(day.date, 'day'), 'selected' : selectedDate.isSame(day.date, 'day')}"
          >
            {{ day.date.format("D") }}
          </div>
        </div>
      </div>

      <ModalsContainer />
      <ModalConfirm
            v-model="show"
            title="Add Event"
            :confirmcallback="confirm"
            :oncancel="cancel"
            :error="error"
            v-if="newEvent && show"
          >
      <br>
      </ModalConfirm>

      <div>
        <div class="day-wrapper" :class="transitionFilter">
          <div
            v-for="hour in hourPositionMap"
            :key="hour.moment_start.unix()"
            class="hour-wrapper"
            :style="{'top': hour.top_percent * 24 + 'px', 'height': hour.height_percent * 24 + 'px'}"
          >
            <div class="time">
              <span>{{ hour.display_start }}</span>
            </div>
            <hr>
          </div>

          <div
            v-for="event in array"
            :key="event.event.uuid"
            class="event-wrapper"
            :class="event.overlapping_amount"
            :style="{
              'top': event.top_percent * 24 + 'px', 
              'height': event.height_percent * 24 + 'px',
              'width': event.event_width,
              'left': event.event_left
            }"
          >
            <div class="event">
              <EventItem :appointment="event.event" :height="event.height_percent" />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/custom.scss";
label{
  margin-left: 3px;
  font-weight: 600;
  font-size: 15px;
}

h3 {
  font-size: 11px;
  font-family: "Inter";
  font-weight: $font-weight-subheading;
  margin-left: 10px;;
  color: $color-lightgrey;
}
select:focus {
  outline-color: $color-darkgrey;
}
select:active {
  padding: 8px 12px;
}
select option {
  color: $color-white;
  font-weight: $font-weight-heading;
}

button:focus {
  outline: 2px solid $color-darkgrey;
}

%weekday {
  display: flex;
  text-transform: uppercase;
  width: 100%;
  justify-content: center;
  font-family: "Inter";
  font-weight: 700;
}
.container-day {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;

  .head {
    width: 100%;
    height: 57px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0 20px 0 20px; 
    padding-top: 10px;

    .back {
      @include back-button;
      margin-right: 0px;
      width: 28px;
    }
    .headline {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin-top: -11px;
      width: calc(100% - 27px);
      .week-select{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-right: 1px;
        margin-left: 5px;
        width: 100%;
        .weekPicker{
          font-family: "Inter";
          font-weight: $font-weight-heading;
          text-indent: 10px;
          width: 100%;
          height: 21px;
          margin-left: 10px;
          padding-top: 1px;
          border-radius: 20px;
          border-color: $color-academic;
          background-color: $color-academic;
          color: $color-white;
        }
      }
      .icons {
        margin-left: auto;
        display: flex;
        gap: 5px;
        align-items: center;
        margin-top: 1px;
        width: 45%;
        justify-content: flex-end;
        & path {
          fill: $color-academic;
        }
        .button {
          border: none;
          background-color: transparent;
          justify-content: center;
          align-items: center;
          display: flex;
          border-radius: 10px;
          & path {
            fill: $color-academic;
          }
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
  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    .weekdays{
      display: flex;
      flex-direction: row;
      width: 100%;
      align-items: center;
      justify-content: center;
      padding-top: 10px;
      padding-bottom: 8px;
      cursor: default;
      box-shadow: inset 0 10px 5px -10px $color-boxshadow;
      .weekday{
        @extend %weekday;
      }
    }
    .weekdates{
      display: flex;
      flex-direction: row;
      width: 100%;
      align-items: center;
      justify-content: center;
      padding-top: 10px;
      padding-bottom: 8px;
      cursor: default;
      box-shadow: 0 0 5px 0px $color-boxshadow;
      margin-bottom: 5px;
      .weekday{
        @extend %weekday;

        >.today-marker{
          text-decoration: underline;
        }
        >.selected{
          background-color: $color-academic;
          color: $color-white;
          width: 27px;
          border-radius: 5px;
          justify-content: center;
          display: flex;
        }
      }
    }
    .day-wrapper {
      overflow: scroll;
      height: calc(100vh - 320px);
      position: relative;
      transition: height .4s;
      &.showFilter {
        height: calc(100vh - 375px);
      }

      .hour-wrapper:nth-child(1) hr {
        visibility: hidden;
      }
      .hour-wrapper {
        width: 50px;
        position: absolute;
        min-height: 100px;
        margin-top: -5px;
      
        .time {
          padding-left: 20px;
          padding-top: 10px;
          line-height: 1.2;
          font-family: "Inter";
          font-size: 12px;
          font-weight: $font-weight-subheading;
        }
        
        hr {
          position: relative;
          left: 70px;
          bottom: 7px;
          width: calc(100vw - 70px);
        }
      }
    
      .event-wrapper {
        width: calc(100% - 85px);
        left: 75px;
        position: absolute;
        min-height: 100px;

        // &.null {
        //   // width: auto;
        // }

        // &.one {
        //   width: calc((100% - 85px) - 30%);
        //   left: calc(76px + 30%);
        // }

        // &.two {
        //   width: calc(290px - 25%);
        // }

        // &.more {
        //   width: calc(290px - 30%);
        // }
      
        .event {     
          line-height: 1.2;
          font-family: "Inter";
          font-size: 12px;
          font-weight: $font-weight-subheading;
        }
      }
    }
  }
}
</style>