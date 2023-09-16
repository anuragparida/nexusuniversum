<script>
import _ from "lodash";
import { infoboard } from "../lib/infoboard";
import { mapGetters } from 'vuex' 
import { parseInfoboard } from "../lib/infoboardhelper";
import Loading from 'vue-loading-overlay';
import moment from 'moment'

const infoboardMatcher = /infoboard-(\d+)/

export default {
  name: "CompBaseview",
  data() {
    return {
      origHomeFeedItems: [],
      busy: false,
      informationItems: [],
      fullPage: true,
      parserItems: [],
      unfilteredParserItems: [],
      parserSlides: [],
    };
  },
  props: {
    uuid: {
      type: String,
      default: undefined,
    }
  },

  components:{
    Loading,
  },

  mounted(){
    this.getDb();
    this.parserItems = this.filteredParserItems;
  },

  computed:{
    ...mapGetters(['dbItems', 'dbSlides', 'storeInitialized', 'loggedIn', 'loggedInUser', 'userBadges']),

    allInfoboard : () => parseInfoboard(infoboard),
    item() {
      let item = this.fetchHomeFeedItem(this.uuid);
      if(item==null) {
        let m = infoboardMatcher.exec(this.uuid)
        if(m) {
          let index = parseInt(m[1])
          item = this.allInfoboard[index];
        }
      }
      if(item==null){
        this.parserItems.forEach(element => {
          if(element.uuid == this.uuid){
            item = element;
          }
        })
      }
      if(item==null){
        let storage = localStorage.getItem('newEvents')
        let items = JSON.parse(storage)
        items.forEach((element) => {
          if(element.uuid == this.uuid){
            item = element; 
          }
        })
      }
      return item || {}
    },    
    mergedItems(){
      let mergedItems = [];
      this.filteredHomeFeedItems.forEach(item => {
        if(item.date && item.postedDate){
          item.date = item.postedDate;
        }
        if(!item.date){
          item.date = item.postedDate;
        }
        if(!item.timeStart){
          item.timeStart = item.postedTime;
        }
        mergedItems.push(item);
      })
      this.filteredInfoboardItems.forEach(item => {
        mergedItems.push(item);
      })
      return mergedItems = _.orderBy(mergedItems, ["date", "timeStart"], ['desc', 'desc']);
    },

    
    filteredInfoboardItems(){
      return this.allInfoboard.filter((item) =>{
        
        let visible = true;
        let infoItemBadges = item.fachbereiche;
        let result = false;
        let badge = false;

        if(this.userBadges.length > 0){ 
          this.userBadges.forEach(element => {
            badge = JSON.stringify(infoItemBadges).includes(element);
            if(badge == true){
              return result = true;
            }
          });
          visible = visible && result; 
        }

        return visible;
      })
    },

    filteredHomeFeedItems() {
      return this.origHomeFeedItems.filter((item) => {
        let visible = true;
        let homeItemBadges = item.badges;
        let result = false;
        let badge = false;

        if(this.userBadges.length > 0){ 
          this.userBadges.forEach(element => {
            badge = homeItemBadges.includes(element);
            if(badge == true){
              return result = true;
            }
          });
          visible = visible && result; 
        }
        return visible;
      });
      
    },
    filteredParserItems(){
      let filteredParserItems = this.unfilteredParserItems;
      if(this.loggedInUser.hiddenPages.length > 0){
        filteredParserItems = this.unfilteredParserItems.filter((item) => {
          if(this.loggedInUser.hiddenPages.includes(item.type)){
            return false;
          }else {
            return true;
          }
        })
      }
      return filteredParserItems
    }
  },

  methods: {
    async getDb() {
      this.busy = true;
      this.parserSlides = this.dbSlides;
      this.unfilteredParserItems = this.dbItems;
      this.busy = false;
    },
    fetchHomeFeedItem(id) {
      return _.find(this.origHomeFeedItems, function (o) {
        return o.uuid == id;
      });
    },
    makeRouterParams(searchText, lastFilters, lastFiltersFB){
      if((searchText != true && searchText != false ) || (lastFilters != true && lastFilters != false) || (lastFiltersFB != true && lastFiltersFB != false)){
        if(this.$route.name == 'infoboard'){
          this.$router.push({ path: '/infoboard', query: {search: searchText, filters: lastFilters, fb: lastFiltersFB}})
        }
        if(this.$route.name == 'home'){
          this.$router.push({ path: '/', query: {search: searchText, filters: lastFilters}})
        }
      }
    },
    getParams(){
      if(this.$route.name == 'infoboard'){
        if(this.$router.currentRoute.value.query.search){
          this.text = this.$router.currentRoute.value.query.search;
        }
        if(this.$router.currentRoute.value.query.filters){
          this.selectedDate = this.$router.currentRoute.value.query.filters;
        }
        if(this.$router.currentRoute.value.query.fb){
          this.selectedFB = this.$router.currentRoute.value.query.fb;
        }
      }
      if(this.$route.name == 'calendar'){
        if(this.$router.currentRoute.value.query.time){
          let unixdate = moment.unix(this.$router.currentRoute.value.query.time)
          this.currentMoment = unixdate.startOf('month');
        }
      }
      if(this.$route.name == 'home'){
        if(this.$router.currentRoute.value.query.search){
          this.text = this.$router.currentRoute.value.query.search;
          this.searchToggle = 'searchOn'
          this.transitionSearch = 'showSearch';
      }
      if(this.$router.currentRoute.value.query.filters){
        if(Array.isArray(this.$router.currentRoute.value.query.filters)){
          let lastSelected = this.$router.currentRoute.value.query.filters;
          lastSelected.forEach(select => {
            this.selected.push(select);
          })
        }
        else{
          this.selected.push(this.$router.currentRoute.value.query.filters);
        }
        this.filterToggle = 'filterOn';
        this.transitionFilter = 'showFilter';
      }
      }
    }
  },
};
</script>
