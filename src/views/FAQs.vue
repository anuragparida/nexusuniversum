<script>
import CompBaseView from "./CompBaseView.vue";

export default {
  extends: CompBaseView,
  name: "FAQs",
  data() {
    return {
    };
  },

  mounted() {    
    this.getDb();
  },

  methods: {
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
  <div class="container-faculties">
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
        FAQ's & QNA's
      </h1>
    </div>
    <div class="content">
      <h1 style="text-align: center;">COMING SOON</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/custom.scss";
h1{
  color: $color-maintext;
  text-align: center;
}
h3 {
  font-size: 11px;
  font-family: "Inter";
  font-weight: $font-weight-heading;
  margin-left: 10px;
  color: $color-lightgrey;
}
.container-faculties {
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
    margin-left: -15px;

    .back {
      @include back-button;
    }
    .headline{
      width: calc(100% - 26px);
      display: flex;
      flex-direction: row;
      text-align: start;
      line-height: 1.2;
      word-break: break-all;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% + 40px);
    padding: 0 20px 0 20px;
    box-shadow: inset 0 10px 5px -10px $color-boxshadow;
    height: calc(100vh - 220px);
  }
  
}
</style>
