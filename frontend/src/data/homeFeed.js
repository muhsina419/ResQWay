export const homeFeed = {
  actions: [
    { label: "Report Emergency", icon: "🚨", route: "/report" },
    { label: "Request Blood", icon: "🩸", route: "/request-blood" },
    { label: "Join as Volunteer", icon: "🤝", route: "/volunteer" }
  ],
  feed: [
    {
      type: "blood",
      title: "Urgent Blood Request",
      description: "A+ blood needed at Amrita Hospital, Kochi",
      timestamp: "2 mins ago",
      color: "#e91e63"
    },
    {
      type: "emergency",
      title: "Nearby Emergency Case",
      description: "Accident reported near Edappally Junction",
      timestamp: "5 mins ago",
      color: "orange"
    },
    {
      type: "emergency",
      title: "Nearby Emergency Case",
      description: "Fire alert near Kalamassery Metro Station",
      timestamp: "12 mins ago",
      color: "lightblue"
    }
  ]
};
