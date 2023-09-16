<script>
import CompBaseView from "./CompBaseView.vue";
import MessageItem from "../components/MessageItem.vue"

export default {
  extends: CompBaseView,
  name: "Chat",
  
  components: {
    MessageItem,
  },

  data() {
    return {
      transitionSearch: "",
      searchToggle: "",
      text: "",
      userSubscribed: false,
      sendMessage: "",
      allMessages: [],
      user: "",
      isWirting: false,
      eliza: {},
    };
  },

  // watch: {
  //   allMessages: {
  //     deep: true,
  //     handler(){
  //       this.scrollToElement();
  //       console.log("test")
  //     }
  //   }
  // },

  mounted() {
    this.getDb();
    this.checkUserSubscribed();
  },

  methods:{
    checkUserSubscribed(){
      let data = localStorage.getItem('entered-' + this.uuid)
      if(data == 'true'){
        this.userSubscribed = true;
      }else {
        this.$router.push({name: 'item-info', params: {uuid: this.uuid}})
      }
    },
    routerHistory(){
      this.$router.back();
    },
    toggleCheckbox(){
      if(this.icon == "icon"){
        this.icon = "";
      } else {
        this.icon = "icon"
      }
    },
    toggleSearch(){
      if(this.searchToggle === ''){
        this.searchToggle = 'searchOn';

        window.setTimeout(() => {
          this.transitionSearch = 'showSearch';
        }, 50)
        
      } else if(this.searchToggle === 'searchOn'){
        this.transitionSearch = "";
        this.text = "";

        window.setTimeout(() => {
          this.searchToggle = '';
        }, 500)
      }
    },
    writeMessage(messageText){

      this.userMessage(messageText);
      
      this.botMessage(messageText);
      this.scrollToElement();
    },

    userMessage(messageText){
      let singleMessage = {user: 'You', message: messageText}
      this.allMessages.push(singleMessage);
      this.sendMessage = "";
    },

    botMessage(messageText){
      window.setTimeout(() => {
        this.isWirting = true;
        this.scrollToElement();
      }, 500)

      window.setTimeout(() => {
        let reply = this.eliza.transform(messageText);
        let singleMessage = {user: 'Bot', message: reply}
        this.allMessages.push(singleMessage);
        this.isWirting = false;
        this.scrollToElement();
      }, 2500)
    },

    scrollToElement() {
      var container = this.$refs.scrollarea;
      var messageBox = this.$refs.messagebox;

      this.$nextTick().then(function() {
        container.scroll(0, messageBox.scrollHeight);
      });
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
  <div v-if="userSubscribed == true" class="container-chat">
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
        <RouterLink class="group" :to="{ name: 'item-info', params: { uuid: item.uuid } }">
          <svg width="26" height="26" class="groupImg" :class="item.type" version="1.1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="m32 122.67h64c4.4648 0 8.6953-2.0117 11.512-5.4766 2.8164-3.4648 3.9219-8.0156 3.0078-12.387-5.3594-25.93-22.316-40.805-46.52-40.805s-41.16 14.875-46.52 40.805c-0.91406 4.3711 0.19141 8.9219 3.0078 12.387 2.8164 3.4648 7.0469 5.4766 11.512 5.4766zm-4.0781-15.703c3.0469-14.734 11.781-32.297 36.078-32.297s33.031 17.562 36.078 32.297c0.28125 1.25-0.03125 2.5664-0.85547 3.5547-0.78906 0.96094-1.9766 1.5078-3.2227 1.4805h-64c-1.2422 0.011719-2.4219-0.55078-3.1992-1.5156-0.82031-0.97656-1.1445-2.2773-0.87891-3.5195z"/>
              <path d="m64 58.668c7.0742 0 13.855-2.8125 18.855-7.8125s7.8125-11.781 7.8125-18.855-2.8125-13.855-7.8125-18.855-11.781-7.8125-18.855-7.8125-13.855 2.8125-18.855 7.8125-7.8125 11.781-7.8125 18.855c0.007813 7.0703 2.8203 13.852 7.8203 18.848 4.9961 5 11.777 7.8125 18.848 7.8203zm0-42.668c4.2422 0 8.3125 1.6875 11.312 4.6875s4.6875 7.0703 4.6875 11.312-1.6875 8.3125-4.6875 11.312-7.0703 4.6875-11.312 4.6875-8.3125-1.6875-11.312-4.6875-4.6875-7.0703-4.6875-11.312c0.007812-4.2422 1.6953-8.3086 4.6914-11.309 3-2.9961 7.0664-4.6836 11.309-4.6914z"/>
            </g>
          </svg>
        
          <div class="title">{{ item.title }}</div>
          <div v-if="!item.title">Chat Page - COMING SOON</div>
        </RouterLink>  
        
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

      <div class="scroll-container" ref="scrollarea">
        <div class="messages-area" ref="messagebox" >
          <h1 v-if="!allMessages.length > 0" style="text-align: center;">Write A Message</h1>

          <MessageItem 
            v-for="newMessage in allMessages" 
            class="message" 
            :class="newMessage.user" 
            :user="newMessage.user" 
            :message="newMessage.message"
            :key="newMessage.message"
          />

          <div v-if="isWirting" class="load-wrapp">
            <div class="load-3">
              <p></p>
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="type-message">
        <input type="text" v-model="sendMessage" class="message-input" @keyup.enter="writeMessage(sendMessage)" placeholder="Type Message" autocapitalize="none">
        <button @click="writeMessage(sendMessage)" class="message-button">
          <svg
            class="backwards"
            width="20px"
            height="20px"
            version="1.1"
            viewBox="0 0 1200 1200"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
              d="m30 375.6c0-31.199 12-61.199 34.801-85.199 46.801-46.801 123.6-46.801 170.4 0l364.8 363.6 364.8-364.8c46.801-46.801 123.6-46.801 170.4 0 46.801 46.801 46.801 123.6 0 170.4l-450 450c-22.801 22.801-52.801 34.801-85.199 34.801s-62.398-13.199-85.199-34.801l-450-448.8c-22.801-24-34.801-55.199-34.801-85.199z"
            />
          </svg>
        </button>
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
.container-chat {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;

  .head {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;

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
      // margin-top: 1px;
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

  .search{
    height: 0px;
    transition: all .4s;
    overflow: hidden;
    align-items: flex-start;
    display: flex;

    &.showSearch{
      height: 42px;
    }

    .searchbar{
      margin-right: auto;
      width: 100%;
      border: solid;
      border-color: $color-primary;
      border-radius: 10px;
      border-width: 2px;
      text-indent: 20px;
      margin-top: 5px;
      margin-bottom: 5px;
      font-size: 18px;
    }
  }
  .content{
    display: flex;
    flex-direction: column;
    width: calc(100% + 40px);
    height: calc(100vh - 223px);
    padding-top: 2px;
    box-shadow: inset 0 10px 5px -10px $color-boxshadow;
    .description{
      display: flex;
    }
    .scroll-container {
      width: 100vw;
      padding: 20px 20px;
      overflow-y: scroll;
      height: calc(100% - 65px);
      .messages-area {
        height: auto;

        .message {
          width: 75%;
          margin-left: auto;
          margin-top: 15px;
          margin-bottom: 15px;

          &.Bot {
            margin-left: 0;
            margin-right: auto;
            background-color: $color-darkgrey;
          }
        }
      }
    }

    .type-message {
      width: calc(100% - 40px);
      height: 45px;
      margin: 0 20px 0 20px;
      position: fixed;
      bottom: 100px;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: $color-lightgrey;
      border-radius: 10px;
      
      .message-input {
        width: 100%;
        background-color: $color-lightgrey;
        height: 40px;
        border-radius: 10px;
        border: none;
        text-indent: 10px;
        font-size: 16px;
      }
      .message-button {
        width: 30px;
        height: 30px;
        margin-right: 5px;
        margin-left: 5px;
        border-radius: 10px;
        border: none;
        background-color: $color-primary;
        svg {
          transform: rotate(270deg);
          fill: $color-white;
          width: 20px;
          height: 20px;
          align-self: center;
        }
      }
    }
    
  }
}

.load-wrapp {
  // float: left;
  // width: 100px;
  // height: 100px;
  // margin: 0 10px 10px 0;
  // padding: 20px 20px 20px;
  // border-radius: 5px;
  // text-align: center;
  // background-color: #d8d8d8;
}

.load-wrapp p {
  padding: 0 0 20px;
  color: $color-lightgrey;
}
.load-wrapp:last-child {
  margin-right: 0;
}

.line {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: $color-primary;
}

.load-3 .line:nth-last-child(1) {
  animation: loadingC 0.6s 0.1s linear infinite;
}
.load-3 .line:nth-last-child(2) {
  animation: loadingC 0.6s 0.2s linear infinite;
}
.load-3 .line:nth-last-child(3) {
  animation: loadingC 0.6s 0.3s linear infinite;
}

@keyframes loadingC {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 15px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
