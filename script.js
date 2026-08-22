// =========================================
// AABF HOME - PAGE NAVIGATION
// =========================================

function goTo(page) {

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

function openProfile(userData) {

    if (!userData) {

        alert(
            "প্রোফাইল তথ্য পাওয়া যায়নি।"
        );

        return;

    }


    const name =
        userData.name ||
        "নাম পাওয়া যায়নি";


    const aabfID =
        userData.aabfID ||
        "AABF ID পাওয়া যায়নি";


    const phone =
        userData.phone ||
        "মোবাইল নম্বর পাওয়া যায়নি";


    alert(

        "AABF Profile\n\n" +

        "নাম: " +
        name +

        "\n\nAABF ID: " +
        aabfID +

        "\n\nমোবাইল: " +
        phone

    );

}


// =========================================
// FIREBASE USER PROFILE
// =========================================

(async function () {

    try {


        // =====================================
        // FIREBASE APP
        // =====================================

        const {
            initializeApp
        } = await import(
            "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
        );


        // =====================================
        // FIREBASE AUTH
        // =====================================

        const {
            getAuth,
            onAuthStateChanged
        } = await import(
            "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
        );


        // =====================================
        // FIREBASE DATABASE
        // =====================================

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
            initializeApp(
                firebaseConfig
            );


        const auth =
            getAuth(app);


        const db =
            getDatabase(app);


        // =====================================
        // GET UID FROM URL
        // =====================================

        const params =
            new URLSearchParams(
                window.location.search
            );


        const urlUID =
            params.get("uid");


        console.log(
            "Home URL UID:",
            urlUID
        );


        // =====================================
        // AUTH STATE
        // =====================================

        onAuthStateChanged(
            auth,
            async function(firebaseUser) {

                try {


                    // =================================
                    // DETERMINE UID
                    // =================================

                    let uid = null;


                    if (firebaseUser) {

                        uid =
                            firebaseUser.uid;

                        console.log(
                            "Firebase Auth UID:",
                            uid
                        );

                    }

                    else if (urlUID) {

                        uid =
                            urlUID;

                        console.log(
                            "Using URL UID:",
                            uid
                        );

                    }


                    // =================================
                    // NO USER
                    // =================================

                    if (!uid) {

                        console.log(
                            "User Login করা নেই।"
                        );

                        return;

                    }


                    // =================================
                    // DATABASE USER PATH
                    // =================================

                    const userRef =
                        ref(
                            db,
                            "users/" + uid
                        );


                    const snapshot =
                        await get(userRef);


                    console.log(
                        "Database profile exists:",
                        snapshot.exists()
                    );


                    // =================================
                    // PROFILE NOT FOUND
                    // =================================

                    if (!snapshot.exists()) {

                        console.error(
                            "Firebase Database-এ এই UID-এর Profile নেই:",
                            uid
                        );

                        return;

                    }


                    // =================================
                    // USER DATA
                    // =================================

                    const userData =
                        snapshot.val();


                    console.log(
                        "AABF User Data:",
                        userData
                    );


                    // =================================
                    // USER NAME
                    // =================================

                    const userName =
                        document.getElementById(
                            "userName"
                        );


                    if (userName) {

                        userName.textContent =
                            userData.name ||
                            "ব্যবহারকারী";

                    }


                    // =================================
                    // AABF ID
                    // =================================

                    const userAABFID =
                        document.getElementById(
                            "userAABFID"
                        );


                    if (userAABFID) {

                        userAABFID.textContent =
                            userData.aabfID ||
                            "Login করুন";

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
                            function() {

                                openProfile(
                                    userData
                                );

                            };

                    }

                }


                catch (error) {

                    console.error(
                        "Firebase Profile Load Error:",
                        error
                    );

                }

            }
        );

    }


    catch (error) {

        console.error(
            "Firebase Initialization Error:",
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
