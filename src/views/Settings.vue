<script>
import CompBaseView from "./CompBaseView.vue";
import { mapGetters } from "vuex";

export default {
  extends: CompBaseView,
  name: "Settings",
  data() {
    return {
      valueDarkMode: true,
    };
  },

  computed: {
    ...mapGetters(["theme", "storeInitialized", "loggedIn", "loggedInUser"]),
  }, 

  mounted() {    
    this.getDb();
    if(localStorage.getItem("theme") == 'darkmode' ){
      this.valueDarkMode = false;
    }
  },

  methods: {
    routerHistory(){
      this.$router.back();
    },
    toggleCheckbox(){
      this.$store.commit('themeSwitch')
      this.valueDarkMode = false;
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
  <div class="container-settings">
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
      <h1 class="headline">
        Settings
      </h1>
    </div>
    <div class="content">
      <div class="lang">
        <h4>Language: </h4>
      </div>
      <hr>
      <div class="iconmenu">
        <h4 class="link theme">Dark Mode: </h4>
        <label class="switch">
          <input type="checkbox" @click="toggleCheckbox()" v-model="valueDarkMode">
          <span class="slider round"></span>
        </label>
      </div>
      <hr>
      <div class="logout">
        <div class="iconlogout">
          <svg
            width="23px"
            version="1.1"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m33.973 88.871c-1.75-1.75-1.75-4.5859 0-6.3359 1.7461-1.75 4.5859-1.75 6.3359 0 10.246 10.246 26.859 10.246 37.105 0 10.25-10.246 10.25-26.859 0-37.109-10.246-10.246-26.859-10.246-37.105 0-1.75 1.75-4.5898 1.75-6.3359 0-1.75-1.75-1.75-4.5859 0-6.3359 13.746-13.746 36.031-13.746 49.777 0s13.746 36.035 0 49.781-36.031 13.746-49.777 0zm36.863-22.273-13.102 12.832c-3.6211 3.6094-9.0508-1.8047-5.4297-5.4141l4.4219-4.3945c1.0039-1 0.67188-1.8086-0.74609-1.8086h-17.609c-2.1016 0-3.8281-1.7148-3.8281-3.832 0-2.1094 1.7148-3.8281 3.8281-3.8281h17.609c1.4102 0 1.75-0.8125 0.74609-1.8125l-4.4219-4.3945c-3.6211-3.6094 1.8086-9.0234 5.4297-5.4141l13.082 12.703c1.5312 1.4844 1.5352 3.8789 0.019532 5.3633z"
              fill-rule="evenodd"
            />
          </svg>
        </div>
        <button @click="$root.logout" class="link">Logout</button>
      </div>
    </div>
    <br>
    <br>
    <h1>COMING SOON</h1>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/custom.scss";

%link {
  font-family: "Inter";
  border: none;
  background-color: transparent;
  
}
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 26px;
  top: -1px;
  margin-left: auto;
}
.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-lightgrey;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: $color-primary-dark;
}
input:focus + .slider {
  box-shadow: 0 0 1px $color-primary-dark;
}
input:checked + .slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(17px);
}
.slider.round {
  border-radius: 17px;
}
.slider.round:before {
  border-radius: 50%;
}
hr {
  border: 1px solid $color-lightgrey;
}

h1{
  color: $color-maintext;
  text-align: center;
}

h4 {
  font-size: 18px;
}
.container-settings {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  .head{
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 40px;

    .back {
      @include back-button;
    }

    .headline{
      width: calc(100% - 38px);
      display: flex;
      flex-direction: row;
      text-align: start;
      line-height: 1.2;
      word-break: break-all;
      }
  }
  .content{
    box-shadow: inset 0 10px 5px -10px $color-boxshadow;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% + 40px);
    padding: 10px 20px 0 20px;
    
    .lang {
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .iconmenu{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 15px;
      margin-bottom: 15px;
      padding-right: 15px;
      .link {
        @extend %link;

        &.theme {
          color: $color-maintext;
          padding-right: 10px;
        }
      }
    }
    .logout{
      width: 124px;
      position: fixed;
      bottom: 100px;
      left: calc(50% - 62px);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      background-color: $color-white;
      outline: 3px solid $color-primary;
      outline-offset: -3px;
      margin-top: 20px;
      padding: 5px 8px 5px 5px;

      &:hover {
        background-color: $color-primary;
      }
      .iconlogout {
        width: 23px;
        height: 23px;
        justify-content: center;
        align-items: center;
        display: flex;
        // margin-right: auto;
        border: none;
        // margin-right: -10px;

        svg {
          fill: $color-darkgrey;
        }
      }
      .link {
        @extend %link;
        color: $color-darkgrey;
        font-size: 20px;
        font-weight: $font-weight-subheading;
        line-height: 35px;
        padding: 0;
      }
      
    }
  }
}
</style>
