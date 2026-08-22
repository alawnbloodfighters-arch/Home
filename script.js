// =========================================
// FIREBASE
// =========================================

import {
    initializeApp
} from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {
    getDatabase,
    ref,
    get
} from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// =========================================
// FIREBASE CONFIGURATION
// =========================================

const firebaseConfig = {

    apiKey:
        "AIzaSyAR3uyMlvGNwZaG_w1zs6IKQ2lXB_Y_9M0",

    authDomain:
        "al-awn-blood-fighters.firebaseapp.com",

    projectId:
        "al-awn-blood-fighters",

    storageBucket:
        "al-awn-blood-fighters.firebasestorage.app",

    messagingSenderId:
        "299061496611",

    appId:
        "1:299061496611:web:4762f74dbf311cd57f1a96",

    measurementId:
        "G-D31EXKJWQ3"

};


// =========================================
// INITIALIZE FIREBASE
// =========================================

const app =
    initializeApp(
        firebaseConfig
    );


const db =
    getDatabase(app);


// =========================================
// LOAD USER PROFILE
// =========================================

async function loadUserProfile() {

    try {

        /*
         * Login page থেকে UID URL-এর মাধ্যমে আসে
         *
         * Example:
         * Home/?uid=xxxxxxxx
         */

        const params =
            new URLSearchParams(
                window.location.search
            );


        const uid =
            params.get("uid");


        // UID না থাকলে Login করুন দেখাবে

        if (!uid) {

            return;

        }


        // Firebase Database থেকে User profile

        const userRef =
            ref(
                db,
                "users/" + uid
            );


        const snapshot =
            await get(userRef);


        if (!snapshot.exists()) {

            console.error(
                "User profile পাওয়া যায়নি।"
            );

            return;

        }


        const user =
            snapshot.val();


        // ==================================
        // NAME
        // ==================================

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


        // ==================================
        // AABF ID
        // ==================================

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


        // ==================================
        // LOGIN STATE SAVE
        // ==================================

        localStorage.setItem(
            "aabf_uid",
            uid
        );


    }

    catch (error) {

        console.error(
            "Profile Load Error:",
            error
        );

    }

}


// =========================================
// CHECK SAVED USER
// =========================================

async function checkSavedUser() {

    /*
     * যদি URL-এ UID থাকে,
     * আগে সেটাই ব্যবহার হবে।
     */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const urlUID =
        params.get("uid");


    /*
     * URL UID থাকলে profile load
     */

    if (urlUID) {

        await loadUserProfile();

        return;

    }


    /*
     * URL UID না থাকলে
     * আগে Login থেকে save করা UID
     * আছে কিনা দেখা হবে।
     */

    const savedUID =
        localStorage.getItem(
            "aabf_uid"
        );


    if (!savedUID) {

        return;

    }


    try {

        const userRef =
            ref(
                db,
                "users/" + savedUID
            );


        const snapshot =
            await get(userRef);


        if (!snapshot.exists()) {

            return;

        }


        const user =
            snapshot.val();


        const userName =
            document.getElementById(
                "userName"
            );


        const userAABFID =
            document.getElementById(
                "userAABFID"
            );


        if (
            userName &&
            user.name
        ) {

            userName.textContent =
                user.name;

        }


        if (
            userAABFID &&
            user.aabfID
        ) {

            userAABFID.textContent =
                user.aabfID;

        }

    }

    catch (error) {

        console.error(
            "Saved Profile Error:",
            error
        );

    }

}


// =========================================
// PAGE NAVIGATION
// =========================================

function goTo(page) {

    const pages = {

        // পরিচিতি
        "porichiti.html":
            "https://sites.google.com/view/alawnbloodfighters/home",

        // রক্তের আবেদন
        "blood-request.html":
            "https://alawnbloodfighters-arch.github.io/Blood-Request-/",

        // আবেদন দেখুন
        "blood-requests.html":
            "https://alawnbloodfighters-arch.github.io/Blood-Request-/requests.html",

        // সদস্য নিবন্ধন
        "registration.html":
            "https://alawnbloodfighters-arch.github.io/Registration/"

    };


    const url =
        pages[page];


    if (url) {

        window.location.href =
            url;

    }

}


// =========================================
// LOGIN
// =========================================

function login() {

    /*
     * Login page
     */

    window.location.href =
        "https://alawnbloodfighters-arch.github.io/Registration/login.html";

}


// =========================================
// PROFILE
// =========================================

function openProfile() {

    const uid =
        localStorage.getItem(
            "aabf_uid"
        );


    if (!uid) {

        login();

        return;

    }


    alert(
        "আপনার Profile\n\n" +
        "AABF ID: " +
        (
            document.getElementById(
                "userAABFID"
            )?.textContent ||
            ""
        )
    );

}


// =========================================
// EMERGENCY
// =========================================

function emergency() {

    // এখানে আপনার Emergency ফোন নম্বর বসাবেন

    window.location.href =
        "tel:YOUR_NUMBER";

}


// =========================================
// MAKE FUNCTIONS AVAILABLE
// =========================================

window.goTo =
    goTo;


window.login =
    login;


window.openProfile =
    openProfile;


window.emergency =
    emergency;


// =========================================
// LOAD PROFILE ON PAGE LOAD
// =========================================

checkSavedUser();
