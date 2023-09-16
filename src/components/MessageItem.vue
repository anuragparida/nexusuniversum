<script>
import moment from 'moment'

export default {
  data(){
    return{
      time: moment().format('LT'),
    }
  },

  props:{
    message: {
      type: String,
      default: undefined,
    },
    user: {
      type: String,
      default: undefined,
    }
  },
  
  mounted(){
  },

  methods:{
  }
}

</script>

<template>
  <div class="container-message" :class="user">
    <div class="user">
      {{ user }}
    </div>
    <div class="message">
      {{ message }}
    </div>
    <div class="time">
      {{ time }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/custom";

.container-message {
  height: auto;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border-bottom-right-radius: 0px;
  background-color: $color-lightgrey;
  color: $color-maintext;

  &.Bot {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 10px;

    .user {
      color: $color-white;
    }
    .message {
      color: $color-white;
    }
    .time {
      color: $color-white;
    }
  }

  .user {
    font-weight: $font-weight-subheading;
  }
  .message {
    line-height: 1.2;
  }

  .time {
    text-align: right;
    color: $color-subtext;
    font-size: 12px;
    line-height: 1.2;
    padding-top: 3px;
  }
}


</style>