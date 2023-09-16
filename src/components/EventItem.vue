<script>
import moment from 'moment'

export default {
  data(){
    return{
      hours: moment().hour(),
    }
  },

  props:{
    appointment: {
      type: Object,
      default: undefined,
    },
    height:{
      type: Number,
      default: undefined,
    }
  },
  
  mounted(){
    this.getHours();
  },

  methods:{
    getHours(){
      this.hours = [];
      for(let i = 0; i <= 24; i++){
        let startOfHour = moment().startOf("day").add(i, 'hour').format('hh:mm');
        let endOfHour = moment().startOf("day").add(i + 1, 'hour').format('hh:mm');
        let hour = startOfHour.toString() + " - " + endOfHour.toString()
        this.hours.push(hour)
      }
    }
  }
}

</script>

<template>
  <div class="container-eventItem">
    <RouterLink v-if="appointment" :to="{ name: 'appointment', params: {uuid: appointment.uuid}}">
    <!-- <div v-if="appointment"> -->
      <div class="event-container" :class="appointment.type" :style="{'height': height * 24 + 'px'}">
        <div class="wrapper" :style="{'height': ( height * 24 - 30) + 'px'}">
          <div class="headline">
            {{ appointment.title }}
          </div>
          <div class="description">
            {{ appointment.description }}
            {{ appointment.info }}
          </div>
          <div class="location">
            {{ appointment.ortRaum }}
          </div>
        </div>
      </div>
    <!-- </div> -->
    </RouterLink>
    

    <div v-else class="add">
      <button class="plus">
        <svg width="22px" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
          <path d="m708.54 491.46v-302.71c0-59.953-48.602-108.54-108.54-108.54-59.953 0-108.54 48.602-108.54 108.54v302.7l-302.71 0.003907c-59.953 0-108.54 48.602-108.54 108.54 0 59.953 48.602 108.54 108.54 108.54h302.7v302.7c0 59.953 48.602 108.54 108.54 108.54 59.941 0 108.54-48.602 108.54-108.54l0.003906-302.69h302.7c59.953 0 108.54-48.602 108.54-108.54 0-59.941-48.602-108.54-108.54-108.54z"/>
        </svg>
        <div class="new">New Appointment</div>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/custom";


.add {
  border: 2px solid $color-lightgrey;
  margin-right: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 10px;
  min-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  .plus{
    border: none;
    background-color: transparent;
    & path{
      fill: $color-lightgrey;
    }
  }
  .new{
    color: $color-lightgrey;
    font-family: "Inter";
    font-size: 10px;
    font-weight: $font-weight-heading;
    text-align: center;
  }
}

.event-container{
  padding: 15px;
  border-radius: 10px;
  margin-right: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  line-height: 1.2;
  border: solid 2px $color-darkgrey;

  .wrapper {
    overflow: hidden;

    .headline{
      font-size: 14px;
      font-weight: 500;
      color: white;
      font-family: "Inter";
      overflow: hidden;
      word-break: break-word;
    }

    .description{
      color: $color-darkgrey;
      font-size: 12px;
      font-weight: $font-weight-subheading;
      overflow: hidden;
      word-break: break-word;
    }

    .location{
      color: $color-darkgrey;
      overflow: hidden;
      word-break: break-word;
    }
  }
  &.course {
    background-color: $color-course;
  }
  &.academic {
    background-color: $color-academic;
  }
  &.sports {
    background-color: $color-sports;
  }
  &.social {
    background-color: $color-social;
  }
  &.none {
    background-color: $color-information;
  }
  
}


</style>