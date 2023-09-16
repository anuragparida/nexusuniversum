<script>
import { RouterLink } from "vue-router";
import CompBaseView from "./CompBaseView.vue";

export default {
  extends: CompBaseView,
  name: "AllChats",
  data() {
    return {
      transitionSearch: "",
      searchToggle: "",
      text: "",
    };
  },
  mounted() {
    this.getDb();
    this.directMessages;
  },
  computed: {
    directMessages() {
      let directMessagesUuids = [];
      let directMessages = [];
      this.parserItems.forEach((item) => {
        if (localStorage.getItem("entered-" + item.uuid)) {
          directMessagesUuids.push(item.uuid);
        }
      });
      directMessagesUuids.forEach((item) => {
        this.parserItems.forEach((element) => {
          if (element.uuid == item) {
            directMessages.push(element);
          }
        });
      });
      return directMessages;
    },
    filteredDirectMessages(){
      return this.directMessages.filter((item) => {
        let visible = true;
        if(this.text != ""){
          visible = visible && item.title.toLowerCase().includes(this.text.toLowerCase());
        }
        return visible;
      })
    }
  },
  methods: {
    routerHistory() {
      this.$router.back();
    },
    toggleCheckbox() {
      if (this.icon == "icon") {
        this.icon = "";
      }
      else {
        this.icon = "icon";
      }
    },
    toggleSearch() {
      if (this.searchToggle === '') {
        this.searchToggle = 'searchOn';
        window.setTimeout(() => {
          this.transitionSearch = 'showSearch';
        }, 50);
      }
      else if (this.searchToggle === 'searchOn') {
        this.transitionSearch = "";
        this.text = "";
        window.setTimeout(() => {
          this.searchToggle = '';
        }, 500);
      }
    },
  },
  components: { RouterLink }
};
</script>

<template>
  <loading v-model:active="busy"
      :can-cancel="false"
      :is-full-page="fullPage"
      color="#ee750d"
    />
  <div class="container-allchats">
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

      <div class="headline">
        <div class="group">
          <!-- <svg width="26" height="26" class="groupImg" :class="item.type" version="1.1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="m32 122.67h64c4.4648 0 8.6953-2.0117 11.512-5.4766 2.8164-3.4648 3.9219-8.0156 3.0078-12.387-5.3594-25.93-22.316-40.805-46.52-40.805s-41.16 14.875-46.52 40.805c-0.91406 4.3711 0.19141 8.9219 3.0078 12.387 2.8164 3.4648 7.0469 5.4766 11.512 5.4766zm-4.0781-15.703c3.0469-14.734 11.781-32.297 36.078-32.297s33.031 17.562 36.078 32.297c0.28125 1.25-0.03125 2.5664-0.85547 3.5547-0.78906 0.96094-1.9766 1.5078-3.2227 1.4805h-64c-1.2422 0.011719-2.4219-0.55078-3.1992-1.5156-0.82031-0.97656-1.1445-2.2773-0.87891-3.5195z"/>
              <path d="m64 58.668c7.0742 0 13.855-2.8125 18.855-7.8125s7.8125-11.781 7.8125-18.855-2.8125-13.855-7.8125-18.855-11.781-7.8125-18.855-7.8125-13.855 2.8125-18.855 7.8125-7.8125 11.781-7.8125 18.855c0.007813 7.0703 2.8203 13.852 7.8203 18.848 4.9961 5 11.777 7.8125 18.848 7.8203zm0-42.668c4.2422 0 8.3125 1.6875 11.312 4.6875s4.6875 7.0703 4.6875 11.312-1.6875 8.3125-4.6875 11.312-7.0703 4.6875-11.312 4.6875-8.3125-1.6875-11.312-4.6875-4.6875-7.0703-4.6875-11.312c0.007812-4.2422 1.6953-8.3086 4.6914-11.309 3-2.9961 7.0664-4.6836 11.309-4.6914z"/>
            </g>
          </svg> -->
        
          <div class="title">Your DMs</div>
        </div>  
        
        <button @click="toggleSearch()" class="button" :class="item.type">
          <svg
            width="25px"
            height="25px"
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

    <div v-if="searchToggle == 'searchOn'" class="search" :class="transitionSearch">
      <input
        v-model="text"
        type="text"
        placeholder="Search"
        class="searchbar"
      >
    </div>

    <div class="content">
      <h1 v-if="filteredDirectMessages.length < 1" style="text-align: center;">No Direct Messages</h1>
      <div class="scroll">
        <RouterLink 
          :to="{ name: 'chat', params: { uuid: dm.uuid } }" 
          class="direct-messages" 
          v-for="dm in filteredDirectMessages" 
          :key="dm"
          >
          <div class="chat">
            <div class="image">
              <img :src="dm.img">
            </div>
            <div class="name">
              {{ dm.title }}
            </div>
          </div>
          <hr>
        </RouterLink>  
      </div>
      
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/custom.scss";

h1{
  color: $color-maintext;
  text-align: start;
  font-weight: $font-weight-heading;
  word-break: break-all;
  overflow: hidden;
  line-height: 1.2;
}

h3 {
  font-size: 11px;
  font-family: "Inter";
  font-weight: $font-weight-subheading;
  margin-left: 10px;
  color: $color-lightgrey;
}

hr {
  border: 1px solid $color-lightgrey;
}

.container-allchats {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;

  .head {
    position: fixed;
    top: 80px;
    width: calc(100% - 40px);
    height: 60px;
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    text-align: center;
    padding: 10px 0 10px 0;


    .back {
      @include back-button;
      width: 27px;
    }

    .headline{
      margin-top: 2px;
      width: calc(100% - 39px);
      height: 100%;
      display: flex;
      flex-direction: row;
      text-align: start;
      line-height: 1.2;
      // overflow: hidden;
      .title {
        font-size: 30px;
        font-weight: $font-weight-heading;
        margin-bottom: auto;
        color: $color-maintext;
        text-transform: capitalize;
        margin-top: -1px;
        flex-direction: row;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: calc(100% - 28px);
      }
      .group {
        display: flex;
        flex-direction: row;
        width: calc(100% - 35px);
      }
      .groupImg {
        width: 28px;
        height: 28px;
        margin-top: 3px;
        margin-right: 5px;
        background-color: $color-white;
        border-radius: 15px;

        &.course {
          background-color: $color-course;
        }
        &.academic {
          background-color: $color-academic;
        }
        &.social {
          background-color: $color-social;
        }
        &.sports {
          background-color: $color-sports;
        }
      }
    }

    .button {
      height: 35px;
      border: none;
      background-color: transparent;
      margin-left: auto;

      & path {
        fill: $color-maintext;
      }

      &.course {
        & path {
          fill: $color-course;
        }
      }
      &.academic {
        & path {
          fill: $color-academic;
        }
      }
      &.social {
        & path {
          fill: $color-social;
        }
      }
      &.sports {
        & path {
          fill: $color-sports;
        }
      }
    }
  }

  .search {
    position: relative;
    top: 60px;
    height: 0px;
    transition: all .4s;
    overflow: hidden;
    align-items: flex-start;
    display: flex;
    width: 100%;

    &.showSearch {
      height: 42px;
    }

    .searchbar {
      margin-right: auto;
      width: 100%;
      border: solid;
      border-color: $color-primary;
      border-radius: 10px;
      border-width: 2px;
      text-indent: 20px;
      margin-bottom: 5px;
      font-size: 18px;
    }
  }
  .content{
    display: flex;
    flex-direction: column;
    width: calc(100% + 40px);
    padding: 0px 20px 0 20px;
    box-shadow: inset 0 10px 5px -10px $color-boxshadow;
    margin-top: 60px;

    h1 {
      margin-top: 20px;
    }

    .scroll {
      height: calc(100% - 220px);
      overflow-y: scroll;

      .direct-messages {
        width: 100%;

        .chat {
          width: 100%;
          height: 70px;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 15px;

          .image {
            width: 45px;
            height: 45px;
            border-radius: 25px;
            overflow: hidden;
            img {
              width: 50px;
            }
          }

          .name {
            font-weight: $font-weight-heading;
            font-size: 18px;
          }

        }
      }
    }
    
  }
}
</style>
