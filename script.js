// =========================================
// AABF HOME - FIREBASE PROFILE + NAVIGATION
// =========================================


import {
    initializeApp
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {
    getAuth,
    onAuthStateChanged
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


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
        "AIzaSyAR3uyMlvGNWZaG_w1zs6IKQ2lXB_Y_9M0",

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
    initializeApp(firebaseConfig);


const auth =
    getAuth(app);


const db =
    getDatabase(app);



// =========================================
// PAGE NAVIGATION
// =========================================

window.goTo = function(page) {

    const pages = {

        "porichiti.html":
            "https://sites.google.com/view/alawnbloodfighters/home",

        "blood-request.html":
            "https://alawnbloodfighters-arch.github.io/Blood-Request-/",

        "blood-requests.html":
            "https://alawnbloodfighters-arch.github.io/Blood-Request-/requests.html",

        "registration.html":
            "https://alawnbloodfighters-arch.github.io/Registration/"

    };


    const url =
        pages[page];


    if (url) {

        window.location.href =
            url;

    }

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

    alert("আপনার প্রোফাইল");

};



// =========================================
// GET UID FROM URL
// =========================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const urlUID =
    urlParams.get("uid");



// =========================================
// LOAD USER PROFILE
// =========================================

async function loadUserProfile(uid) {

    if (!uid) {

        console.log(
            "UID পাওয়া যায়নি।"
        );

        return;

    }


    console.log(
        "Profile UID:",
        uid
    );


    try {

        const userRef =
            ref(
                db,
                "users/" + uid
            );


        const snapshot =
            await get(userRef);


        // =================================
        // PROFILE NOT FOUND
        // =================================

        if (!snapshot.exists()) {

            console.error(
                "Firebase-এ users/" +
                uid +
                " পাওয়া যায়নি।"
            );

            return;

        }


        const user =
            snapshot.val();


        console.log(
            "Firebase User:",
            user
        );



        // =================================
        // NAME
        // =================================

        const userName =
            document.getElementById(
                "userName"
            );


        if (userName) {

            if (user.name) {

                userName.textContent =
                    user.name;

            } else {

                userName.textContent =
                    "ব্যবহারকারী";

            }

        }



        // =================================
        // AABF ID
        // =================================

        const userAABFID =
            document.getElementById(
                "userAABFID"
            );


        if (userAABFID) {

            if (user.aabfID) {

                userAABFID.textContent =
                    user.aabfID;

            } else {

                userAABFID.textContent =
                    "ID পাওয়া যায়নি";

            }

        }



        // =================================
        // PROFILE CARD CLICK
        // =================================

        const userCard =
            document.getElementById(
                "userCard"
            );


        if (userCard) {

            userCard.onclick =
                function() {

                    openProfile();

                };

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
// FIRST: URL UID
// =========================================

if (urlUID) {

    console.log(
        "Login থেকে UID পাওয়া গেছে:",
        urlUID
    );


    // URL-এর UID দিয়েই সরাসরি profile load
    loadUserProfile(
        urlUID
    );

}



// =========================================
// FALLBACK: FIREBASE AUTH USER
// =========================================

onAuthStateChanged(
    auth,
    function(user) {

        // URL থেকে UID থাকলে
        // আবার load করার দরকার নেই
        if (urlUID) {

            return;

        }


        // Firebase login user
        if (user) {

            console.log(
                "Firebase Auth UID:",
                user.uid
            );


            loadUserProfile(
                user.uid
            );


            return;

        }


        console.log(
            "কোনো logged-in user পাওয়া যায়নি।"
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
