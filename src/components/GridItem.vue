<script>
import { mapGetters } from 'vuex' 
import { ModalsContainer } from 'vue-final-modal'
import ModalConfirm from '../components/Modal.vue'

export default {
  data() {
    return{
      fullDate: this.item.date.format("DD.MM.YY"),
      oneEvent: "",
      show: false,
      newEvent: {},
      newEvents: [],
      error: false,
      array: [],
      uuids: []
    };
  },

  props: {
    item: {
      type: Object,
      default: undefined,
    },
    callback: {
      type: Function,
      default: undefined
    }  
  },

  components: {
    ModalsContainer,
    ModalConfirm
  },

  computed: {
    ...mapGetters(['storeInitialized', 'loggedIn', 'loggedInUser', 'userBadges']),

    AmountEvents(){
      if(this.item.events.length == 1){
        this.oneEvent = "one-event";
      }else {
        this.oneEvent = ""
      }
      return this.oneEvent;
    },

    dateDay() {
      return this.item.date.format("D")
    },
    
  },
  methods: {
    dateToStore(date){
      this.$store.commit('date', date)
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
      
        this.show = false;
        this.callback()
      }
    },
    cancel(){
      this.show = false;
    },
  }, 

  mounted(){
    this.AmountEvents;
  },
}

</script>
<template>
  <RouterLink v-if="item.events.length > 0" :to="{ name: 'calendarDay' }" 
    class="item-container" 
    @click="dateToStore(item.date)" 
    :class="[item.current, oneEvent]"
    >

    <p class="day-date" :class="item.today">
      {{ dateDay }}
    </p>
    <div v-for="event in item.events.slice(0, 4)" 
      class="day-event" 
      :class="event.type"
      :key="event"
    >
      {{ event.title }} 
    </div> 
    <div class="day-event plus" v-if="item.events.length > 5">
      +{{ item.events.length - 4 }}
    </div>

  </RouterLink>

  <div v-else @click="show = true" class="item-container" :class="[item.current, oneEvent]">
    <p class="day-date" :class="item.today">
      {{ dateDay }}
    </p>
    <div v-for="event in item.events.slice(0, 4)" 
    class="day-event" 
    :class="event.type"
    :key="event"
    >
      {{ event.title }} 
    </div> 
    <div class="day-event plus" v-if="item.events.length > 5">
      +{{ item.events.length - 4 }}
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
  </div>

  
</template>

<style scoped lang="scss">
@import "../scss/custom";

%day-date{
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  cursor: default;
  grid-column-start: 1;
  grid-column-end: 3;
}

%item-container{
  width: 100%;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-content: start;
  min-height: 110px;
}

.item-container{
  @extend %item-container;

  &.notCurrent{
    background-color: $color-extralightgrey;
  }
  &.default{
    margin-bottom: 2px;
    >.day-date{
      @extend %day-date;
      border-bottom-color: $color-lightgrey;
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-top: unset;
      border-left: unset;
      border-right: unset;
      font-size: 12px;

      &.today{
        color: $color-academic;
        text-decoration: underline;
      }
    }
      
    >.day-event{
      &.none {
        @include event-default(changeColor($color-information));
      }
      &.plus{
        @include event-default($color-lightgrey);
        text-align: center;
      }
      &.course{
        @include event-default(changeColor($color-course));
      }
      &.sports{
        @include event-default(changeColor($color-sports));
      }
      &.social{
        @include event-default(changeColor($color-social));
      }
      &.academic{
        @include event-default(changeColor($color-academic));
      }
      &.none{
        @include event-default(changeColor($color-information));
      }
    
    }
  }
  &.simple{
    padding-bottom: 1rem;
    padding: 2px;
    position: relative;
    // z-index: -1;
    border-top-color: $color-lightgrey;
    border-top-style: solid;
    border-top-width: 1px;
    border-bottom: unset;
    border-left: unset;
    border-right: unset;

    &.one-event {
      grid-template-columns: unset;
      justify-items: center;
    }
    .day-date{
      @extend %day-date;
      padding-top: 5px;
      padding-bottom: 6px;
      font-size: 15px;

      &.today{
        color: $color-academic;
        text-decoration: underline;
      }
    }
    .day-event{
      &.plus{
        @include event-default($color-lightgrey);
        justify-self: center;
        grid-template-columns: repeat(2, 1fr);
        width: 34px;
        padding: 2px 10.5px;
        
      }
      &.course{
        @include event-simple(changeColor($color-course));
      }
      &.sports{
        @include event-simple(changeColor($color-sports));
      }
      &.social{
        @include event-simple(changeColor($color-social));
      }
      &.academic{
        @include event-simple(changeColor($color-academic));
      }
      &.none{
        @include event-simple(changeColor($color-information));
      }
    }    
  }
} 

</style>