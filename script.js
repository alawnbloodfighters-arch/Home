// =========================================
// AABF HOME
// FIREBASE AUTH + PROFILE + NAVIGATION
// =========================================

import {
    auth,
    db
} from "./firebase-config.js";

import {
    onAuthStateChanged
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    ref,
    get
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// =========================================
// PAGE NAVIGATION
// =========================================

window.goTo = function(page) {

    const pages = {

        "porichiti.html":
            "https://sites.google.com/view/alawnbloodfighters/home",

        "blood-request.html":
            "https://alawnbloodfighters-arch.github.io/Blood-Request/",

        "blood-requests.html":
            "https://alawnbloodfighters-arch.github.io/Blood-Request-/requests.html",

        "registration.html":
            "https://alawnbloodfighters-arch.github.io/Registration/"

    };


    const url = pages[page];


    if (!url) {

        console.error(
            "Page URL পাওয়া যায়নি:",
            page
        );

        return;

    }


    // =====================================
    // IMPORTANT
    // =====================================
    // URL-এর uid নয়,
    // Firebase Auth session-ই আসল।

    if (!auth.currentUser) {

        alert(
            "⚠️ আপনার Login session পাওয়া যায়নি। আবার Login করুন।"
        );

        window.location.href =
            "https://alawnbloodfighters-arch.github.io/App-sing-up/login.html";

        return;

    }


    window.location.href = url;

};


// =========================================
// LOGIN
// =========================================

window.login = function() {

    window.location.href =
        "https://alawnbloodfighters-arch.github.io/App-sing-up/login.html";

};


// =========================================
// PROFILE
// =========================================

window.openProfile = function() {

    alert(
        "আপনার প্রোফাইল"
    );

};


// =========================================
// LOAD USER PROFILE
// =========================================

async function loadUserProfile(uid) {

    if (!uid) {

        return;

    }


    try {

        const userRef =
            ref(
                db,
                "users/" + uid
            );


        const snapshot =
            await get(userRef);


        if (!snapshot.exists()) {

            console.log(
                "Profile পাওয়া যায়নি:",
                uid
            );

            return;

        }


        const user =
            snapshot.val();


        console.log(
            "Firebase User:",
            user
        );


        const userName =
            document.getElementById(
                "userName"
            );


        if (
            userName &&
            user.name
        ) {

            userName.textContent =
                user.name;

        }


        const userAABFID =
            document.getElementById(
                "userAABFID"
            );


        if (
            userAABFID &&
            user.aabfID
        ) {

            userAABFID.textContent =
                user.aabfID;

        }

    }

    catch(error) {

        console.error(
            "Profile Load Error:",
            error
        );

    }

}


// =========================================
// AUTH STATE
// =========================================

onAuthStateChanged(

    auth,

    function(user) {

        console.log(
            "HOME AUTH USER:",
            user
        );


        if (!user) {

            console.log(
                "Home-এ Firebase Login পাওয়া যায়নি।"
            );

            return;

        }


        console.log(
            "Home Login OK. UID:",
            user.uid
        );


        loadUserProfile(
            user.uid
        );

    }

);


// =========================================
// EMERGENCY
// =========================================

window.emergency = function() {

    window.location.href =
        "emergency.html";

};
