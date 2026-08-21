/* =========================================
   AABF HOME SCREEN
========================================= */


/* -----------------------------------------
   Login data
----------------------------------------- */

function loadUser() {

    const savedUser = localStorage.getItem("aabfUser");

    if (savedUser) {

        try {

            const user = JSON.parse(savedUser);

            if (user.name) {
                document.getElementById("userName").textContent = user.name;
            }

            if (user.aabfId) {

                const idElement = document.getElementById("aabfId");

                idElement.textContent = user.aabfId;
                idElement.style.color = "#b91638";

            }

        } catch (error) {

            console.log("User data error:", error);

        }

    }

}


/* -----------------------------------------
   Login
----------------------------------------- */

function login() {

    /*
       এখন Login screen-এর URL তোমার project
       অনুযায়ী পরিবর্তন করবে।

       যেমন:

       window.location.href = "login.html";
    */

    window.location.href = "login.html";
}


/* -----------------------------------------
   Profile
----------------------------------------- */

function openProfile() {

    /*
       Profile page তৈরি করলে:

       window.location.href = "profile.html";
    */

    window.location.href = "profile.html";
}


/* -----------------------------------------
   Main buttons
----------------------------------------- */

function openPage(page) {

    const pages = {

        "profile": "profile.html",

        "blood-request": "blood-request.html",

        "blood-list": "blood-list.html",

        "registration": "registration.html",

        "relief": "relief.html"

    };

    if (pages[page]) {

        window.location.href = pages[page];

    } else {

        console.log("Page not found:", page);

    }

}


/* -----------------------------------------
   Emergency
----------------------------------------- */

function emergencyCall() {

    /*
       এখানে তোমার Emergency number বসাবে।

       উদাহরণ:

       window.location.href = "tel:01XXXXXXXXX";
    */

    const emergencyNumber = "";

    if (emergencyNumber !== "") {

        window.location.href = "tel:" + emergencyNumber;

    } else {

        alert("জরুরি সহায়তার জন্য Emergency নম্বরে যোগাযোগ করুন।");

    }

}


/* -----------------------------------------
   Load user when page opens
----------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {

    loadUser();

});
