let homeFeedItems = [
  {
    type: "course",
    title: "Robotic Course Material",
    description: "You can find the PDFs from our course here.",
    uuid: "123-4321432", //einmalige ID
    badges: ["student", "robotics"], //Tags mit welchen das Item gekennzeichnet und ggf in den Feed gepusht wird, wenn entsprechende Tags dem Account hinterlegt sind
    postedDate: "18.07.2023", //der Moment an dem Item gepostet wird
    postedTime: "12:11",
    timeStart: "08:00",
    timeEnd: "09:00",
    date: "25.05.23", //"Ablaufdatum" oder Zeitpunkt eines Treffens, welches in den Kalender eingetragen werden kann
    class: "homeFeed",
  },
  {
    type: "help",
    title: "How to pay at the mensa?",
    description: "Explanation how to use your student card for payment.",
    uuid: "123-dgasfsa5",
    badges: ["student"],
    postedDate: "12.12.2022",
    postedTime: "16:23",
    timeStart: "",
    timeEnd: "",
    date: "",
    class: "homeFeed",
  },
  {
    type: "thwsAnnouncement",
    title: "THWS Meeting no. 3",
    description: "The big THWS Update in the big hall!",
    uuid: "113-fgasfsa2",
    badges: ["student", "profs", "alumni"],
    postedDate: "20.07.2023",
    postedTime: "14:39",
    timeStart: "11:00",
    timeEnd: "12:30",
    date: "12.09.2023",
    class: "homeFeed",
  },
  {
    type: "groupchat",
    title: "Football Team",
    description:
      "Friday we will exercise in the hall as it is supposed to rain",
    uuid: "123-fgasfsa4",
    badges: ["chat"],
    postedDate: "21.07.2023",
    postedTime: "14:23",
    timeStart: "18:00",
    timeEnd: "20:00",
    date: "23.06.2023",
    class: "homeFeed",
  },
  {
    type: "thwsAnnouncement",
    title: "Summer Party",
    description: "THWS Band and Snacks",
    uuid: "123-fgfsfsa6",
    badges: ["student"],
    postedDate: "19.07.2023",
    postedTime: "08:35",
    timeStart: "",
    timeEnd: "",
    date: "",
    class: "homeFeed",
  },
  {
    type: "job",
    title: "Librarian",
    description: "For our Library we need an Librarian.",
    uuid: "123-fgasfst7",
    badges: ["student", "job", "library"],
    postedDate: "19.07.2023",
    postedTime: "14:45",
    timeStart: "",
    timeEnd: "",
    date: "",
    class: "homeFeed",
  },
  {
    type: "groupchat",
    title: "Basketball",
    description: "Workout Thursday at 7 pm",
    uuid: "123-fgasfsa3",
    badges: ["chat"],
    postedDate: "21.06.2023",
    postedTime: "12:55",
    timeStart: "19:00",
    timeEnd: "21:00",
    date: "",
    class: "homeFeed",
  },
  {
    type: "course",
    title: "Design Course",
    description: "Next week our course will be cancelled",
    uuid: "223-4321432",
    badges: ["student", "design"],
    postedDate: "19.07.2023",
    postedTime: "12:24",
    timeStart: "12:00",
    timeEnd: "13:00",
    date: "26.06.2023",
    class: "homeFeed",
  },
  {
    type: "groupchat",
    title: "Math study Group",
    description: "",
    uuid: "123-fgasdsa4",
    badges: ["chat"],
    postedDate: "23.07.2023",
    postedTime: "15:53",
    timeStart: "16:30",
    timeEnd: "18:00",
    date: "10.07.2023",
    class: "homeFeed",
  },
  {
    type: "thwsAnnouncement",
    title: "Re-registration for the next semester",
    description: "Until 27.08.2023 you have to pay the Semesterbeitrag. IBAN: DE74555555564644777",
    uuid: "123-fgasfsa6",
    badges: ["student", "profs", "alumni"],
    postedDate: "18.07.2023",
    postedTime: "09:30",
    timeStart: "",
    timeEnd: "",
    date: "27.08.2023",
    class: "homeFeed",
  },

  {
    type: "job",
    title: "UX Designer",
    description: "For our new project 'Art Is NOW' we need an UX Designer.",
    uuid: "123-fgasfsa7",
    badges: ["student", "job", "design"],
    postedDate: "13.07.2023",
    postedTime: "12:34",
    timeStart: "",
    timeEnd: "",
    date: "",
    class: "homeFeed",
  },
  {
    type: "groupchat",
    title: "Board Game Night",
    description: "Please bring snacks and games",
    uuid: "143-fgasfsa3",
    badges: ["chat"],
    postedDate: "21.07.2023",
    postedTime: "15:50",
    timeStart: "20:00",
    timeEnd: "23:00",
    date: "",
    class: "homeFeed",
  },
  {
    type: "thwsAnnouncement",
    title: "Students for Students Meet Up",
    description: "We are looking forward to see you!",
    uuid: "124-fgasfsa2",
    badges: ["student"],
    postedDate: "21.07.2023",
    postedTime: "15:39",
    timeStart: "17:00",
    timeEnd: "18:00",
    date: "11.07.2023",
    class: "homeFeed",
  },
  {
    type: "help",
    title: "How to Apply for Visa",
    description: "Learn how to apply for a VISA in Germany",
    uuid: "123-fgasfsa5",
    badges: ["student", "international"],
    postedDate: "02.03.2020",
    postedTime: "16:38",
    timeStart: "",
    timeEnd: "",
    date: "",
    class: "homeFeed",
  },
];

export default homeFeedItems;
