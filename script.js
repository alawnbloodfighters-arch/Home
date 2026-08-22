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

(async function () {


    // =====================================
    // FIREBASE SDK
    // =====================================

    const {
        initializeApp
    } = await import(
        "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
    );


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
            "AIzaSyAR3uyMlvGNWzaG_w1zs6IKQ2lXB_Y_9M0",

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
    // GET UID FROM URL
    // =====================================

    const params =
        new URLSearchParams(
            window.location.search
        );


    const uid =
        params.get("uid");


    console.log(
        "Home UID:",
        uid
    );


    // =====================================
    // UID না থাকলে
    // =====================================

    if (!uid) {

        console.log(
            "Home URL-এ UID পাওয়া যায়নি।"
        );

        return;

    }


    // =====================================
    // LOAD USER PROFILE
    // =====================================

    try {


        const userRef =
            ref(
                db,
                "users/" + uid
            );


        const snapshot =
            await get(userRef);


        console.log(
            "Profile Snapshot Exists:",
            snapshot.exists()
        );


        // =================================
        // PROFILE পাওয়া যায়নি
        // =================================

        if (!snapshot.exists()) {

            console.error(
                "users/" + uid +
                " এ কোনো Profile পাওয়া যায়নি।"
            );

            return;

        }


        // =================================
        // USER DATA
        // =================================

        const userData =
            snapshot.val();


        console.log(
            "User Data:",
            userData
        );


        // =================================
        // NAME
        // =================================

        const userName =
            document.getElementById(
                "userName"
            );


        if (
            userName &&
            userData.name
        ) {

            userName.textContent =
                userData.name;

        }


        // =================================
        // AABF ID
        // =================================

        const userAABFID =
            document.getElementById(
                "userAABFID"
            );


        if (
            userAABFID &&
            userData.aabfID
        ) {

            userAABFID.textContent =
                userData.aabfID;

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
                function () {

                    openProfile();

                };

        }


    }


    catch (error) {

        console.error(
            "Firebase Profile Error:",
            error
        );

    }


})();


// =========================================
// EMERGENCY
// =========================================

function emergency() {

    window.location.href =
        "tel:YOUR_NUMBER";

}
