<script>
// import { RouterLink } from 'vue-router';

export default {
    props: {
        item: {
          type: Object,
          default: undefined,
        },
        filter: {
          type: String,
          default: undefined,
        },
        element: {
          type: Object,
          default: undefined,
        }
    },
    data() {
      return {
        itemsMap: {
          information: {
            path_data: [
              "m99.625 37.762c-1.125-11.734-7.9531-22.156-18.262-27.875-10.305-5.7148-22.766-5.9922-33.312-0.73438-10.547 5.2578-17.832 15.371-19.473 27.039-1.6406 11.672 2.5664 23.402 11.258 31.363 3.1797 3.0156 4.9922 7.1992 5.0234 11.582-2.7383 1.6367-4.418 4.5938-4.4219 7.7852v10.668c0.015625 5.0117 4.0781 9.0703 9.0898 9.0781h28.945c5.0117-0.007813 9.0742-4.0664 9.0898-9.0781v-10.668c-0.007812-3.1953-1.6914-6.1523-4.4336-7.7852 0.066406-4.5156 1.9844-8.8008 5.3086-11.855 8.125-7.5586 12.262-18.477 11.188-29.52zm-22.73 58.238h-25.789v-7.5508h25.789zm4.2656-36.539c-5.1445 4.7617-8.2461 11.324-8.6641 18.324h-17.004c-0.35938-6.918-3.3945-13.426-8.4648-18.148-6.1055-5.5898-9.0664-13.828-7.9141-22.027 1.1523-8.1992 6.2695-15.305 13.68-18.996 7.4102-3.6914 16.164-3.4922 23.402 0.52734 7.2383 4.0195 12.031 11.348 12.812 19.59 0.75391 7.7539-2.1484 15.418-7.8477 20.73z",
              "m74.668 112h-21.336c-2.9453 0-5.332 2.3867-5.332 5.332 0 2.9453 2.3867 5.3359 5.332 5.3359h21.336c2.9453 0 5.332-2.3906 5.332-5.3359 0-2.9453-2.3867-5.332-5.332-5.332z",
            ],
          },
        },
        openItem: false,
        openTransition: "",
      }
    },
    methods: {
      toggleTransition(){
        if(this.openTransition == ""){
          this.openItem = true;
          window.setTimeout(() => {
            this.openTransition = "open";
          }, 100)
          
        }else {
          this.openItem = false;
          window.setTimeout(() => {
            this.openTransition = "";
          }, 200)
        }
      }
    },
    // components: { RouterLink },
    mounted(){
    },
    computed: {
    }
};
</script>

<template>
    <div @click="toggleTransition()" class="container-informationItem">
      <div class="head">
        <div class="headline">

            {{ element.title }}
          
        </div>

        <div class="more">
          <svg width="18" height="18" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
            <path d="m30 375.6c0-31.199 12-61.199 34.801-85.199 46.801-46.801 123.6-46.801 170.4 0l364.8 363.6 364.8-364.8c46.801-46.801 123.6-46.801 170.4 0 46.801 46.801 46.801 123.6 0 170.4l-450 450c-22.801 22.801-52.801 34.801-85.199 34.801s-62.398-13.199-85.199-34.801l-450-448.8c-22.801-24-34.801-55.199-34.801-85.199z"/>
          </svg>
        </div>
      </div>
      <div class="grid" :class="openTransition">
        <p class="description">
          {{ element.body }}
        </p>
      </div>
      
    </div>
</template>

<style scoped lang="scss">
@import "../scss/custom.scss";

.plural {
  text-transform: lowercase;
}
p {
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // width: 208px;
}
.container-informationItem {
  width: 100%;
  // max-height: 70px;
  min-height: 70px;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  border-radius: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 23px 15px 23px 15px;
  background-color: $color-lightgrey;

  .head {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .headline {
      width: calc(100% - 18px);
      font-size: 16px;
      font-weight: 700;
      color: $color-maintext;
      text-transform: capitalize;
      // margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .more {
      transform: rotate(360deg);
      border: none;
      background-color: transparent;
      width: 18px;
      height: 18px;
      fill: $color-darkgrey;
      margin-left: auto;
    } 
  }

  .grid {
    display: grid;
    // height: 0px;
    grid-template-rows: 0;
    transition: all .4s;

    &.open {
      grid-template-rows: 1fr;
      // height: 300px;
    }
    .description {
      display: flex;
      width: 100%;
      font-size: 14px;
      font-weight: $font-weight-maintext;
      font-family: "Inter";
      color: $color-subtext;
      text-align: justify;
      overflow: hidden;
    }
  }
  
  
}



</style>
