<script>
import { VueFinalModal } from 'vue-final-modal'
import _ from "lodash";

export default {
  name: "Modal",
  data(){
    return {
      eventObj: {},
    }
  },

  mounted(){
    this.onLoad();
  },
  props: {
    title: {
      type: String,
      default: undefined
    },
    confirmcallback: {
      type: Function,
      default: undefined
    },
    oncancel: {
      type: Function,
      default: undefined
    },
    error: {
      type: Boolean,
      default: undefined
    }
  },
  components: {
    VueFinalModal,
  },
  methods: {
    onLoad() {
      if(this.eventObj.title) {
        let copy = _.cloneDeep(this.eventObj);
        this.eventObj = copy; 
      } else {
        this.eventObj = {
          title: '',
          description: '',
          type: 'none',
          date: '',
          timeStart: '',
          timeEnd: '',
          uuid: '',
          new: 'newItem'
        }
      }
    },
    onConfirm() {
      this.confirmcallback(this.eventObj)
    },
  }
}
</script>


<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    v-if="eventObj"
  >
    
    <h1>{{ title }}</h1>
    <p class="error" v-if="error">
      Error
    </p>

    <div class="input-field">
      <p>*Title:</p>
      <input type="text" v-model="eventObj.title">
    </div>

    <div class="input-field">
      <p>Description:</p>
      <input type="text" v-model="eventObj.description">
    </div>

    
    <p>Choose one or none category:</p>
    <div class="row category">
      <div>
        <input type="radio" value="none" v-model="eventObj.type" :class="'none'">  
      </div>
      <div>
        <input type="radio" value="academic" v-model="eventObj.type" :class="'academic'">
      </div>
      <div>
        <input type="radio" value="social" v-model="eventObj.type" :class="'social'">  
      </div>
      <div>
        <input type="radio" value="sports" v-model="eventObj.type" :class="'sports'">  
      </div>
      <div>
        <input type="radio" value="course" v-model="eventObj.type" :class="'course'">  
      </div>
  </div>

    <div class="input-field">
      <p>*Date:</p>
      <input type="date" v-model="eventObj.date">
    </div>

    <div class="input-field">
      <p>*Start:</p>
      <input type="time" v-model="eventObj.timeStart">
    </div>

    <div class="input-field">
      <p>*End:</p>
      <input type="time" v-model="eventObj.timeEnd">
    </div>

    <p><b>Each field with * must be filled.</b></p>
    <hr>

    <div class="row">
      <button class="button secondary" @click="oncancel()">
        Cancel
      </button>
      <button class="button primary" @click="onConfirm">
        Confirm
      </button>
    </div>

  </VueFinalModal>
</template>

<style lang="scss">
@import "../scss/custom.scss";

.input-field {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.error {
  color: red;
}

input {
  margin-left: auto;
}
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm-modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
  width: 85%;
  min-height: 150px;
}
.confirm-modal-content > * + *{
  margin: 0.5rem 0;
}
.confirm-modal-content h1 {
  font-size: 24px;
  color: $color-maintext;
}
.dark .confirm-modal-content {
  background: #000;
}

.row {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &.category {
    margin-top: -0.5rem;
    flex-wrap: wrap;
    > div  {
      flex: 0 0 auto;
      width: fit-content;
      margin-bottom: 10px;
    }
        input[type="radio"] {
          appearance: none;
          height: 0;
          width: auto;
          margin: 0;
          flex: 0 0 auto;

          &::before {
            content: '';
            flex: 0 0 auto;
            display: block;
            border: none;
            border-radius: 10px;
            width: fit-content;
            padding: 8px;
            text-align: center;
            background-color: $color-lightgrey;
            color: $color-maintext;
          }
          &.none {
            
            &::before {
              content: 'None';
            }
            &:checked::before {
              background-color: $color-information;
              color: $color-white;
            }
          }
          &.sports {
            &::before {
              content: 'Sports';
            }
            &:checked::before {
            background-color: $color-sports;
            color: $color-white;
            }
          }
          &.academic {
            &::before {
              content: 'Academic';
            }
            &:checked::before {
            background-color: $color-academic;
            color: $color-white;
            }
          }
          &.social {
            &::before {
              content: 'Social';
            }
            &:checked::before {
            background-color: $color-social;
            color: $color-white;
            }
          }
          &.course {
            &::before {
              content: 'Course';
            }
            &:checked::before {
            background-color: $color-course;
            color: $color-white;
            }
          }
        }
    .input-field {

      label {
        border: none;
        border-radius: 10px;
        width: auto;
        padding: 8px;
        text-align: center;
        height: 40px;
        background-color: $color-lightgrey;
        color: $color-maintext;

      }

    }
  }
}
</style>
