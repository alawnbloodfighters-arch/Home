/* =========================================
   AABF MAIN SCRIPT
========================================= */


/* =========================================
   LOGIN
========================================= */

function openLogin() {

  const modal = document.getElementById("loginModal");

  modal.classList.add("show");

  setTimeout(() => {

    document.getElementById("loginId").focus();

  }, 100);

}


function closeLogin() {

  document
    .getElementById("loginModal")
    .classList.remove("show");

}


/* =========================================
   USER LOGIN
========================================= */

function loginUser() {

  const id =
    document
      .getElementById("loginId")
      .value
      .trim();

  const name =
    document
      .getElementById("loginName")
      .value
      .trim();


  if (!id) {

    alert("দয়া করে আপনার AABF ID লিখুন।");

    return;

  }


  const finalName =
    name || "AABF সদস্য";


  /* Save user information */

  localStorage.setItem(
    "aabf_id",
    id
  );

  localStorage.setItem(
    "aabf_name",
    finalName
  );


  /* Update screen */

  document
    .getElementById("userId")
    .textContent = id;

  document
    .getElementById("userName")
    .textContent = finalName;


  closeLogin();

}


/* =========================================
   LOAD SAVED USER
========================================= */

function loadUser() {

  const savedId =
    localStorage.getItem("aabf_id");

  const savedName =
    localStorage.getItem("aabf_name");


  if (savedId) {

    document
      .getElementById("userId")
      .textContent = savedId;

  }


  if (savedName) {

    document
      .getElementById("userName")
      .textContent = savedName;

  }

}


/* =========================================
   BUTTON ACTION
========================================= */

function openPage(pageName) {

  /*
    এখানে পরবর্তীতে প্রতিটি অপশনের
    আলাদা GitHub page / HTML page
    অথবা Firebase screen যুক্ত করা যাবে।
  */

  console.log(
    "Selected:",
    pageName
  );


  /*
    আপাতত testing-এর জন্য।
    পরে এই alert সরিয়ে আসল page
    navigation বসানো হবে।
  */

  alert(pageName + " অপশনটি খোলা হবে।");

}


/* =========================================
   EMERGENCY
========================================= */

function openEmergency() {

  /*
    এখানে পরে Emergency screen,
    ফোন কল অথবা Firebase emergency
    system যুক্ত করা যাবে।
  */

  alert(
    "Emergency সহায়তার জন্য পরবর্তী ব্যবস্থা এখানে যুক্ত করা হবে।"
  );

}


/* =========================================
   MODAL OUTSIDE CLICK
========================================= */

document
  .getElementById("loginModal")
  .addEventListener(
    "click",
    function (event) {

      if (event.target === this) {

        closeLogin();

      }

    }
  );


/* =========================================
   START APP
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    loadUser();

  }
);
