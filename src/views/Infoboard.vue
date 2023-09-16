<script>
import InfoboardItem from "../components/InfoboardItem.vue";
import { infoboard } from "../lib/infoboard";
import { parseInfoboard } from "../lib/infoboardhelper";
import CompBaseView from "./CompBaseView.vue";

export default {
  name: "Infoboard",
  extends: CompBaseView,

  data() {
    return {
      text: "",
      selectedDate: "",
      selectedFB: "",
    };
  },

  watch:{
    text(){
      this.makeRouterParams(this.text, this.selectedDate, this.selectedFB) 
    },
    selectedDate(){
      this.makeRouterParams(this.text, this.selectedDate, this.selectedFB)
    },
    selectedFB(){
      this.makeRouterParams(this.text, this.selectedDate, this.selectedFB)
    }
  },

  computed: {
    allInfoboard : () => parseInfoboard(infoboard),
    
    fachbereiche(){
      let fachbereiche = []
      this.allInfoboard.forEach(element => { //jedes element vom infoboard
        let myArray = element.fachbereiche; //speichert den array fachbereiche in myArray
        myArray.forEach(element => { //jedes element vom Array
          let i = element.length; //länge des arrays
          if(!fachbereiche.includes(element) && i > 0){ //wenn in fachbereiche kein element des arrays ist + der array > 0
            fachbereiche.push(element); //element wird in fachbereiche gepusht
          }
        });
        
      });
      return fachbereiche;
    },

    dates(){
      let date = [];
      this.allInfoboard.forEach(element => {
        if(!date.includes(element.date)){
          date.push(element.date);
        }
      })
      return date;
    },
    
    filteredInfoBoard() {
      return this.allInfoboard.filter((item) => { //filter jedes item aus dem Infoboard
        let visible = true;
        if(this.selectedFB.length > 0) { //die anzahl an ausgewählten FB ist größer als 0
          visible = visible && item.fachbereiche.includes(this.selectedFB); // dann visible = true wenn visible true und FB includes selectedFB
        }
        if(this.selectedDate.length > 0 ) { //die anzahl an ausgewählten Dates ist > 0
         visible = visible && item.date == this.selectedDate; // dann visible = true wenn visible true und date = selectedDate
        }
        if(this.text.length > 0 ) { //es gibt einen searchText
          visible = visible &&  JSON.stringify(item).toLowerCase().includes(this.text.toLowerCase());// dann visible = true wenn visible true und element includes searchInfoboard = true
        }
        return visible
      })
    },
    
  },
  mounted(){
    this.getParams();
  },
  components: {
    InfoboardItem,
  },
  methods: {
  },
};
</script>

<template>
  <div class="container-infoBoard">
    <div class="head">
      <div class="headlines">
        <h2>Welcome!</h2>
        <h1>Your Home Feed</h1>
      </div>
    </div>
    <div class="filters">
      <form id="select_date" class="filter">
        <select name="date" v-model="selectedDate">
          <option style="display: none;" value="" disabled selected>
            Choose Date
          </option>
          <option value="">
            --
          </option>
          <option v-for="date in dates" :value="date" :key="date">
            {{ date }}
          </option>
        </select>
        <div class="buttons">
          <svg
            width="25px"
            height="25px"
            version="1.1"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m53.492 103.44c3.0156 1.8633 6.7852 2.0312 9.957 0.44922l10.238-5.1211h0.003906c3.4727-1.7344 5.668-5.2812 5.668-9.1641v-21.363l17.484-17.473c1.9219-1.9219 3-4.5273 2.9961-7.2461v-10.238c0-2.7188-1.0781-5.3203-3-7.2422-1.918-1.9219-4.5234-3-7.2383-3h-51.203c-5.6523 0-10.238 4.5859-10.238 10.242v10.238c-0.003906 2.7188 1.0742 5.3242 2.9961 7.2461l17.484 17.473v26.48c-0.003906 3.5508 1.832 6.8516 4.8516 8.7188zm-15.094-59.918v-10.238h51.203v10.238l-20.48 20.48v25.602l-10.238 5.1211-0.003906-30.723z"
            />
          </svg>
        </div>
      </form>

      <form id="select_fachbereich" class="filter">
        <select name="date" v-model="selectedFB" style="width: 100%">
          <option style="display: none;" value="" disabled selected>
            Choose Course
          </option>
          <option value="">
            --
          </option>
          <option v-for="bereich in fachbereiche.sort()" :value="bereich" :key="bereich">
            {{ bereich }}
          </option>
        </select>
        <div class="buttons">
          <svg
            width="25px"
            height="25px"
            version="1.1"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m53.492 103.44c3.0156 1.8633 6.7852 2.0312 9.957 0.44922l10.238-5.1211h0.003906c3.4727-1.7344 5.668-5.2812 5.668-9.1641v-21.363l17.484-17.473c1.9219-1.9219 3-4.5273 2.9961-7.2461v-10.238c0-2.7188-1.0781-5.3203-3-7.2422-1.918-1.9219-4.5234-3-7.2383-3h-51.203c-5.6523 0-10.238 4.5859-10.238 10.242v10.238c-0.003906 2.7188 1.0742 5.3242 2.9961 7.2461l17.484 17.473v26.48c-0.003906 3.5508 1.832 6.8516 4.8516 8.7188zm-15.094-59.918v-10.238h51.203v10.238l-20.48 20.48v25.602l-10.238 5.1211-0.003906-30.723z"
            />
          </svg>
        </div>
      </form>

      <div class="filter">
        <input
          v-model="text"
          type="text"
          placeholder="Search"
        >
        <button class="buttons">
          <svg
            width="21px"
            height="21px"
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
    <div class="content">
      <InfoboardItem :item="item" v-for="item in filteredInfoBoard" :key="item" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../scss/custom.scss";

h2 {
  font-family: "Inter";
  margin-bottom: -10px;
  font-size: 13px;
  font-weight: $font-weight-subheading;
}
h1 {
  font-weight: $font-weight-heading;
  font-size: 25px;
}
select{
  border-color: $color-darkgrey;
  color: $color-darkgrey;
}
input{
  border-color: $color-darkgrey;
  border-width: 1px;
}

.head {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 5px;
}

.filters {
  margin-left: auto;
  margin-top: 12px;
  display: flex;
  gap: 5px;
  align-items: center;
  flex-direction: column;
  width: 100%;
  & path {
    fill: $color-primary;
  }
  .filter{
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 10px;
    align-items: center;
    .buttons {
      border: none;
      background-color: transparent;
      display: flex;
    }
  }
}

.content {
  width: 100%;
}
</style>
