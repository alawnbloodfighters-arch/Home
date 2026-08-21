import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getDatabase,
  ref,
  get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/* ================================
   FIREBASE CONFIG
   ================================ */

const firebaseConfig = {

  apiKey: "YOUR_API_KEY",

  authDomain:
    "YOUR_PROJECT.firebaseapp.com",

  databaseURL:
    "https://YOUR_PROJECT-default-rtdb.firebaseio.com",

  projectId:
    "YOUR_PROJECT_ID",

  storageBucket:
    "YOUR_PROJECT.appspot.com",

  messagingSenderId:
    "YOUR_SENDER_ID",

  appId:
    "YOUR_APP_ID"

};


/* Firebase শুরু */

const app =
  initializeApp(firebaseConfig);

const auth =
  getAuth(app);

const database =
  getDatabase(app);


/* HTML elements */

const aabfID =
  document.getElementById("aabfID");

const profileAABFID =
  document.getElementById("profileAABFID");

const status =
  document.getElementById("status");


/* ================================
   LOGIN USER
   ================================ */

onAuthStateChanged(
  auth,
  async (user) => {

    /* Login করা নেই */

    if (!user) {

      aabfID.innerText =
        "Login করুন";

      profileAABFID.innerText =
        "Login করুন";

      status.innerText =
        "User login করা নেই";

      return;
    }


    /* ================================
       UID দিয়ে AABF ID খোঁজা
       
       users
          UID
             aabfid
       ================================ */

    try {

      const snapshot =
        await get(
          ref(
            database,
            "users/" +
            user.uid +
            "/aabfid"
          )
        );


      if (snapshot.exists()) {

        const id =
          snapshot.val();


        /* Main screen */

        aabfID.innerText =
          id;


        /* Profile */

        profileAABFID.innerText =
          id;


        status.innerText =
          "";

      }

      else {

        aabfID.innerText =
          "পাওয়া যায়নি";

        profileAABFID.innerText =
          "পাওয়া যায়নি";

        status.innerText =
          "Database-এ AABF ID নেই";

      }

    }

    catch(error) {

      console.error(error);

      aabfID.innerText =
        "Error";

      status.innerText =
        "Firebase থেকে তথ্য পাওয়া যায়নি";

    }

  }
);


/* ================================
   PROFILE MENU
   ================================ */

const profileButton =
  document.getElementById(
    "profileButton"
  );

const profileBox =
  document.getElementById(
    "profileBox"
  );


profileButton.addEventListener(
  "click",
  function(event) {

    event.stopPropagation();

    profileBox
      .classList
      .toggle("show");

  }
);


document.addEventListener(
  "click",
  function() {

    profileBox
      .classList
      .remove("show");

  }
);


/* ================================
   LOGOUT
   ================================ */

document
  .getElementById("logoutButton")
  .addEventListener(
    "click",
    async () => {

      await signOut(auth);

    }
  );


/* ================================
   OTHER PAGES
   ================================ */

window.openPage =
  function(page) {

    const pages = {

      porichiti:
        "porichiti.html",

      "blood-request":
        "blood-request.html",

      "member-registration":
        "member-registration.html",

      relief:
        "relief.html"

    };


    if (pages[page]) {

      window.location.href =
        pages[page];

    }

  };


/* ================================
   EMERGENCY
   ================================ */

document
  .getElementById("emergencyButton")
  .addEventListener(
    "click",
    function() {

      window.location.href =
        "emergency.html";

    }
  );
