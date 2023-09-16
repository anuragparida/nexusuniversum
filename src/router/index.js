import { createRouter, createWebHistory } from "vue-router";
import HomeFeed from "../views/HomeFeed.vue";
import FilterHomeFeed from "../views/FilterHomeFeed.vue";
import FilteredHomeFeed from "../views/FilteredHomeFeed.vue";
import Login from "../views/Login.vue";
import Calendar from "../views/Calendar.vue";
import Chat from "../views/Chat.vue";
import AllChats from "../views/AllChats.vue";
import ItemInfo from "../views/ItemInfo.vue";
import Information from "../views/Information.vue";
import Appointment from "../views/Appointment.vue";
import Infoboard from "../views/Infoboard.vue";
import Faculties from "../views/Faculties.vue";
import Settings from "../views/Settings.vue";
import Profile from "../views/Profile.vue";
import Add from "../views/Add.vue";
// import InfoboardItemInfo from "../views/InfoboardItemInfo.vue"
import Day from "../views/Day.vue"
import FAQs from "../views/FAQs.vue"
import UniTokens from "../views/UniTokens.vue"
import DigitalStudentID from "../views/DigitalStudentID.vue"
import MensaMenu from "../views/MensaMenu.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/homefeed",
      name: "home",
      component: HomeFeed,
      props: true,
    },
    {
      path: "/mensa-menu",
      name: "mensaMenu",
      component: MensaMenu,
      props: true,
    },
    {
      path: "/uni-tokens",
      name: "uniTokens",
      component: UniTokens,
      props: true,
    },
    {
      path: "/digital-student-id",
      name: "digitalStudentId",
      component: DigitalStudentID,
      props: true,
    },
    {
      path: "/faqs",
      name: "faqs",
      component: FAQs,
      props: true,
    },
    {
      path: "/",
      name: "filterhomefeed",
      component: FilterHomeFeed,
      props: true,
    },
    {
      path: "/filterhomefeed/:filter",
      name: "filteredhomefeed",
      component: FilteredHomeFeed,
      props: true,
    },
    {
      path: "/filterhomefeed/:filter/add",
      name: "add",
      component: Add,
      props: true,
    },
    {
      path: "/infoboard",
      name: "infoboard",
      component: Infoboard,
      props: true,
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
      props: true,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      props: true,
    },
    {
      path: "/faculties",
      name: "faculties",
      component: Faculties,
      props: true,
    },
    // {
    //   path: "/infoboard/:uuid",
    //   name: "infoboardInfo",
    //   component: InfoboardItemInfo,
    //   props: true,
    // },
    {
      path: "/login",
      name: "login",
      component: Login,
      props: true,
    },
    {
      path: "/calendar",
      name: "calendar",
      component: Calendar,
      props: true,
    },
    {
      path: "/calendar/day",
      name: "calendarDay",
      component: Day,
      props: true,
    },
    {
      path: "/chats",
      name: "chats",
      component: AllChats,
      props: true,
    },
    {
      path: "/chat/:uuid",
      name: "chat",
      component: Chat,
      props: true,
    },
    {
      path: "/groupchat/:uuid",
      name: "groupchat",
      component: Chat,
      props: true,
    },
    {
      path: "/info/:uuid",
      name: "item-info",
      component: ItemInfo,
      props: true,
    },
    {
      path: "/information/:uuid",
      name: "help",
      component: Information,
      props: true,
    },
    {
      path: "/appointment/:uuid",
      name: "appointment",
      component: Appointment,
      props: true,
    },
    {
      path: "/reset-password",
      name: "reset-password",
      // component: ,
      props: true,
    },
  ],
});

export default router;
