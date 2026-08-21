/* ================================
   AABF HOME SCREEN
================================ */


/* LOGIN / PROFILE */

function openProfile() {

  /*
    পরে এখানে Firebase login/profile page
    connect করা যাবে।
  */

  window.location.href = "login.html";
}


/* MENU NAVIGATION */

function openPage(page) {

  window.location.href = page;

}


/* EMERGENCY */

function emergencyCall() {

  /*
    এখানে AABF-এর Emergency Number বসাবে।
    
    উদাহরণ:
    window.location.href = "tel:01XXXXXXXXX";
  */

  const emergencyNumber = "01XXXXXXXXX";

  if (emergencyNumber !== "01XXXXXXXXX") {

    window.location.href = "tel:" + emergencyNumber;

  } else {

    alert("জরুরি সহায়তার নম্বর এখনো সেট করা হয়নি।");

  }

}


/* ================================
   AABF ID
================================ */

function setAABFID(id) {

  const element = document.getElementById("aabfId");

  if (element && id) {

    element.textContent = id;

  }

}


/*
   আপাতত Demo:

   পরে Firebase থেকে login করা
   user's AABF ID এখানে বসবে।

   উদাহরণ:

   setAABFID("AABF-1025");
*/


/* ================================
   PAGE LOAD
================================ */

document.addEventListener("DOMContentLoaded", function () {

  /*
    Firebase login system connect করার
    পর এখানে current user's AABF ID
    automatically বসবে।
  */

});
