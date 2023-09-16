<script>
import CompBaseView from "./CompBaseView.vue";

export default {
  extends: CompBaseView,
  name: "Profile",

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
  }
};
</script>

<template>
  <loading v-model:active="busy"
      :can-cancel="false"
      :is-full-page="fullPage"
      color="#ee750d"
    />
  <div class="container-profile">
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
      <h1 class="headline">
        Profile
      </h1>
    </div>
    <div class="content">
      <img class="profilepic" src="../components/icons/noun-user-4383878.svg">
      
      <div class="info">
        <div class="names">
          {{ loggedInUser.firstname }}
          {{ loggedInUser.lastname }}
        </div>
        <div class="studies">
          {{ loggedInUser.course }}
        </div>
      </div>

      <div class="experiences">
        <div class="description">
          Experiences:
        </div>
        <div class="text">
          Lorem ipsum - dolor sit amet, consetetur
          <br>
          Sed diam - nonumy eirmod tempor invidunt 
          <br>
          Magna - aliquyam erat, sed diam voluptua
          <br>
          At vero - eos et accusam et justo duo
        </div>
      </div>
      
      <button class="button primary edit">
        Edit
      </button>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import "../scss/custom";

h1 {
  font-weight: $font-weight-heading;
}
.container-profile {
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
      margin-top: 4px;
    }
    .headline{
      width: calc(100% - 35px);
      display: flex;
      flex-direction: row;
      text-align: start;
      line-height: 1.2;
      word-break: break-all;
    }
  }
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% + 40px);
    padding: 0 20px 0 20px;
    box-shadow: inset 0 10px 5px -10px $color-boxshadow;
    gap: 20px;
    .profilepic {
      width: 100px;
      align-self: center;
      margin-top: 15px;
    }
    .description{
      display: flex;
      font-weight: $font-weight-subheading;
    }
    .text{
      
    }
    .info {
      align-self: center;
      display: flex;
      align-items: center;
      flex-direction: column;
      .names {
        display: flex;
        flex-direction: row;
      }
      .studies{
        color: $color-primary;
      }
    }
    .edit {
      display: flex;
      align-self: center;
      position: absolute;
      top: 65vh;
    }
  }
}

</style>
