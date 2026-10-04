/* ============================================================
   Team C.A.R.E — content.js (V9)
   Roadmap: prototype milestones + full achievement timeline.
   Videos use their own first frame as thumbnail (no poster file).
   ============================================================ */
window.CARE = {

  site: {
    stat_awards: "14",       stat_awards_plus: true,
    stat_members: "3",       stat_members_plus: false,
    stat_projects: "3",      stat_projects_plus: true,
    stat_years: "2",         stat_years_plus: true,
    contact_email: "teamcareofficial25@gmail.com",
    contact_location: "Dhaka, Bangladesh",
    contact_social: "@teamcare.bd"
  },

  team: {
    members: [
      { name: "Team Lead",      role: "Founder & Lead",    photo: "", linkedin: "", facebook: "" },
      { name: "Research Head",  role: "R&D Division",      photo: "", linkedin: "", facebook: "" },
      { name: "Software Lead",  role: "AI / ML Engineer",  photo: "", linkedin: "", facebook: "" },
      { name: "Hardware Lead",  role: "Electronics & IoT", photo: "", linkedin: "", facebook: "" },
      { name: "Design Lead",    role: "UX / Mechanical",   photo: "", linkedin: "", facebook: "" }
    ]
  },

  gallery: {
    photos: [
      { image: "./images/gallery/photo-1.jpg", cat: "team" },
      { image: "./images/gallery/photo-2.jpg", cat: "lab" },
      { image: "./images/gallery/photo-3.jpg", cat: "awards" },
      { image: "./images/gallery/photo-4.jpg", cat: "events" }
    ]
  },

  news: {
    items: [
      { icon: "plane",  date: "Sept 20, 2026", title: "Team Represents Bangladesh at WICE Malaysia",   link: "https://www.facebook.com/teamcare.bd" },
      { icon: "globe",  date: "Dec 01, 2025",  title: "APICTA Awards 2025 Winner in Taiwan",            link: "https://www.facebook.com/teamcare.bd" },
      { icon: "trophy", date: "Oct 18, 2025",  title: "Champion at Bangladesh ICT & Innovation Award",  link: "https://www.facebook.com/teamcare.bd" },
      { icon: "medal",  date: "May 03, 2025",  title: "Champion at 16th DRMC Science Carnival",         link: "https://www.facebook.com/teamcare.bd" }
    ]
  },

  achievements: {
    items: [
      { image: "./images/awards/1.jpg",  title: "World Robot Games (WRG) Bangladesh 2026", desc: "Gold Medalist (National Champion) in the Robo Innovator (Senior) category at World Robot Games Bangladesh 2026, organized by Tech Autocrats.", year: "2026", date: "September 2026", badge: "National", link: "https://www.facebook.com/teamcare.bd" },
      { image: "./images/awards/2.jpg",  title: "World Robot Olympiad (WRO) Bangladesh 2026", desc: "Gold Medalist (National Champion) in the Future Innovators (Senior) category at the World Robot Olympiad Bangladesh 2026, organized by BdOSN & WRO Bangladesh.", year: "2026", date: "August 2026", badge: "National", link: "https://www.facebook.com/teamcare.bd" },
      { image: "./images/awards/3.jpg",  title: "Fibonacci Robot Olympiad National 2026", desc: "Gold Medalist (National Champion) in the Health Tech category at Fibonacci Robot Olympiad National 2026, organized by Fibonacci Robot Olympiad Committee & STEM Education Partners.", year: "2026", date: "May 2026", badge: "National", link: "https://www.facebook.com/teamcare.bd" },
      { image: "./images/awards/4.jpg",  title: "17th Asia Pacific ICT Alliance (APICTA) Awards 2025", desc: "Top 6 International Finalist (6th Position) in Inclusion and Community Services / Student Category at the 17th APICTA Awards 2025, held in Kaohsiung, Taiwan. Organized by APICTA & Ministry of Digital Affairs, Taiwan.", year: "2025", date: "December 5–8, 2025", badge: "International", link: "https://www.facebook.com/teamcare.bd" },
      { image: "./images/awards/5.jpg",  title: "Global Robotics and Innovation Championship (GRIC) Bangladesh 2026", desc: "Honorable Mention in the Robotics and IoT category at the Global Robotics and Innovation Championship Bangladesh 2026, organized by Tech Autocrats.", year: "2026", date: "May 2026", badge: "National", link: "https://www.facebook.com/teamcare.bd" },
      { image: "./images/awards/6.jpg",  title: "World Invention Competition and Exhibition (WICE) National 2026", desc: "Silver Medalist in the Health Tech category at the World Invention Competition and Exhibition National 2026, organized by IYSA & National Partners.", year: "2026", date: "May 2026", badge: "International", link: "https://www.facebook.com/teamcare.bd" },
      { image: "./images/awards/7.jpg",  title: "16th DRMC International Science Carnival 2026", desc: "Champion (National Champion) in the Mechanical & Hardware Project Display category at the 16th DRMC International Science Carnival 2026, organized by DRMC & DRMC Science Club.", year: "2026", date: "February 6–8, 2026", badge: "National", link: "https://www.facebook.com/teamcare.bd" },
      { image: "./images/awards/8.jpg",  title: "Bangladesh ICT and Innovation Awards 2025", desc: "Champion in the Inclusion and Community Services category at the Bangladesh ICT and Innovation Awards 2025, organized by Bangladesh ICT and Innovation Network & ICT Division.", year: "2025", date: "October 2025", badge: "National", link: "https://www.facebook.com/teamcare.bd" },
      { image: "./images/awards/9.jpg",  title: "Startup Bangladesh Science Project Competition 2026", desc: "Top 4 Innovator in the Social Impact & Scientific Innovation category at the Startup Bangladesh Science Project Competition 2026. Received prize from the Honorable Prime Minister. Organized by Startup Bangladesh Limited & ICT Division.", year: "2026", date: "June 2026", badge: "National", link: "https://www.facebook.com/teamcare.bd" },
      { image: "./images/awards/10.jpg", title: "46th National Science and Technology Week (National Round) 2025", desc: "Special 3rd Position in the Senior Project Display (National Level) category at the 46th National Science and Technology Week 2025, organized by NMST & Ministry of Science and Technology.", year: "2025", date: "June 2025", badge: "National", link: "https://www.facebook.com/teamcare.bd" },
      { image: "./images/awards/11.jpg", title: "46th National Science and Technology Week (District Round) 2025", desc: "District Champion in the Senior Science Project Display category at the 46th National Science and Technology Week 2025 (District Round), organized by District Administration & NMST.", year: "2025", date: "May 2025", badge: "National", link: "https://www.facebook.com/teamcare.bd" },
      { image: "./images/awards/12.jpg", title: "Technovation 2025", desc: "Champion in the Hardware & Assistive Tech Project Exhibition category at Technovation 2025, organized by Saint Joseph Higher Secondary School, Dhaka.", year: "2025", date: "April 2025", badge: "National", link: "https://www.facebook.com/teamcare.bd" },
      { image: "./images/awards/13.jpg", title: "DRMC Tech International Fest 2025", desc: "1st Runner-Up in the Tech Project Display (Senior Division) category at DRMC Tech International Fest 2025, organized by DRMC IT Club.", year: "2025", date: "February 2025", badge: "National", link: "https://www.facebook.com/teamcare.bd" },
      { image: "./images/awards/14.jpg", title: "DRMC Math Fest 2025", desc: "1st Runner-Up in the Applied Math & Engineering Innovation category at DRMC Math Fest 2025, organized by DRMC Math Club.", year: "2025", date: "January 2025", badge: "National", link: "https://www.facebook.com/teamcare.bd" }
    ]
  },

  roadmap: {
    items: [
      { kind: "milestone", date: "MAY 2025", title: "C.A.R.E WHEELCHAIR V1", status: "done",
        desc: "The first functional prototype — hand gesture control, basic IoT integration, and smart mobility assistance.",
        media: { type: "video", src: "./videos/1.mp4" } },

      { kind: "milestone", date: "NOVEMBER 2025", title: "C.A.R.E WHEELCHAIR V2", status: "done",
        desc: "Redesigned chassis with head gesture control, improved responsiveness, and enhanced safety systems.",
        media: { type: "image", src: "./images/roadmap/2.jpg" } },

      { kind: "milestone", date: "AUGUST 2026", title: "C.A.R.E WHEELCHAIR V3", status: "done",
        desc: "AI-powered obstacle detection, voice interaction, smart navigation, live monitoring, and IoT dashboard.",
        media: { type: "video", src: "./videos/3.mp4" } },

      { kind: "achievement", date: "SEPTEMBER 2026", title: "WORLD ROBOT GAMES (WRG) BANGLADESH 2026", status: "done",
        desc: "Gold Medalist (National Champion) — Robo Innovator (Senior). Organized by Tech Autocrats.",
        media: { type: "image", src: "./images/awards/1.jpg" } },

      { kind: "achievement", date: "AUGUST 2026", title: "WORLD ROBOT OLYMPIAD (WRO) BANGLADESH 2026", status: "done",
        desc: "Gold Medalist (National Champion) — Future Innovators (Senior). Organized by BdOSN & WRO Bangladesh.",
        media: { type: "image", src: "./images/awards/2.jpg" } },

      { kind: "achievement", date: "JUNE 2026", title: "STARTUP BANGLADESH SCIENCE PROJECT COMPETITION 2026", status: "done",
        desc: "Top 4 Innovator — Social Impact & Scientific Innovation. Prize received from the Honorable Prime Minister.",
        media: { type: "image", src: "./images/awards/9.jpg" } },

      { kind: "achievement", date: "MAY 2026", title: "FIBONACCI ROBOT OLYMPIAD NATIONAL 2026", status: "done",
        desc: "Gold Medalist (National Champion) — Health Tech Category.",
        media: { type: "image", src: "./images/awards/3.jpg" } },

      { kind: "achievement", date: "MAY 2026", title: "GLOBAL ROBOTICS AND INNOVATION CHAMPIONSHIP (GRIC) 2026", status: "done",
        desc: "Honorable Mention — Robotics and IoT. Organized by Tech Autocrats.",
        media: { type: "image", src: "./images/awards/5.jpg" } },

      { kind: "achievement", date: "MAY 2026", title: "WORLD INVENTION COMPETITION AND EXHIBITION (WICE) NATIONAL 2026", status: "done",
        desc: "Silver Medalist — Health Tech. Organized by IYSA & National Partners.",
        media: { type: "image", src: "./images/awards/6.jpg" } },

      { kind: "achievement", date: "FEBRUARY 2026", title: "16TH DRMC INTERNATIONAL SCIENCE CARNIVAL 2026", status: "done",
        desc: "Champion (National Champion) — Mechanical & Hardware Project Display.",
        media: { type: "image", src: "./images/awards/7.jpg" } },

      { kind: "achievement", date: "DECEMBER 2025", title: "17TH APICTA AWARDS 2025 — KAOHSIUNG, TAIWAN", status: "done",
        desc: "Top 6 International Finalist (6th Position) — Inclusion and Community Services.",
        media: { type: "image", src: "./images/awards/4.jpg" } },

      { kind: "achievement", date: "OCTOBER 2025", title: "BANGLADESH ICT AND INNOVATION AWARDS 2025", status: "done",
        desc: "Champion — Inclusion and Community Services.",
        media: { type: "image", src: "./images/awards/8.jpg" } },

      { kind: "achievement", date: "JUNE 2025", title: "46TH NATIONAL SCIENCE AND TECHNOLOGY WEEK (NATIONAL ROUND) 2025", status: "done",
        desc: "Special 3rd Position — Senior Project Display (National Level).",
        media: { type: "image", src: "./images/awards/10.jpg" } },

      { kind: "achievement", date: "MAY 2025", title: "46TH NATIONAL SCIENCE AND TECHNOLOGY WEEK (DISTRICT ROUND) 2025", status: "done",
        desc: "District Champion — Senior Science Project Display.",
        media: { type: "image", src: "./images/awards/11.jpg" } },

      { kind: "achievement", date: "APRIL 2025", title: "TECHNOVATION 2025", status: "done",
        desc: "Champion — Hardware & Assistive Tech Project Exhibition.",
        media: { type: "image", src: "./images/awards/12.jpg" } },

      { kind: "achievement", date: "FEBRUARY 2025", title: "DRMC TECH INTERNATIONAL FEST 2025", status: "done",
        desc: "1st Runner-Up — Tech Project Display (Senior Division).",
        media: { type: "image", src: "./images/awards/13.jpg" } },

      { kind: "achievement", date: "JANUARY 2025", title: "DRMC MATH FEST 2025", status: "done",
        desc: "1st Runner-Up — Applied Math & Engineering Innovation.",
        media: { type: "image", src: "./images/awards/14.jpg" } }
    ]
  }

};
