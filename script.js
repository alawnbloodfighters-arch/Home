// =========================================
// AABF HOME - PAGE NAVIGATION
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


    const url = pages[page];


    if (url) {

        window.location.href = url;

    }

}


// =========================================
// LOGIN
// =========================================

function login() {

    window.location.href =
        "https://alawnbloodfighters-arch.github.io/App-sing-up/login.html";

}


// =========================================
// PROFILE
// =========================================

function openProfile() {

    alert("প্রোফাইল");

}


// =========================================
// FIREBASE USER PROFILE
// =========================================

import(
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
)
.then(async ({ initializeApp }) => {


    // Firebase Database SDK

    const {
        getDatabase,
        ref,
        get
    } = await import(
        "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"
    );


    // =====================================
    // FIREBASE CONFIGURATION
    // =====================================

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


    // =====================================
    // INITIALIZE FIREBASE
    // =====================================

    const app =
        initializeApp(firebaseConfig);


    const db =
        getDatabase(app);


    // =====================================
    // GET UID FROM HOME URL
    // =====================================

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const uid =
        urlParams.get("uid");


    // =====================================
    // UID না থাকলে কিছু করবে না
    // =====================================

    if (!uid) {

        console.log(
            "Login করা user-এর UID পাওয়া যায়নি।"
        );

        return;

    }


    // =====================================
    // FIREBASE থেকে USER DATA আনবে
    // =====================================

    try {

        const userRef =
            ref(
                db,
                "users/" + uid
            );


        const snapshot =
            await get(userRef);


        // User পাওয়া যায়নি

        if (!snapshot.exists()) {

            console.error(
                "Firebase-এ User Profile পাওয়া যায়নি।"
            );

            return;

        }


        const user =
            snapshot.val();


        // =================================
        // USER NAME দেখানো
        // =================================

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


        // =================================
        // AABF ID দেখানো
        // =================================

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


        // =================================
        // PROFILE CARD
        // =================================

        const userCard =
            document.getElementById(
                "userCard"
            );


        if (userCard) {

            userCard.onclick =
                function () {

                    openProfile();

                };

        }


        console.log(
            "AABF User Profile:",
            user
        );

    }


    catch (error) {

        console.error(
            "User Profile Load Error:",
            error
        );

    }

});


// =========================================
// EMERGENCY
// =========================================

function emergency() {

    // এখানে আপনার Emergency ফোন নম্বর বসাবেন

    window.location.href =
        "tel:YOUR_NUMBER";

}
