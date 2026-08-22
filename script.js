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
            initializeApp(firebaseConfig);


        const auth =
            getAuth(app);


        const db =
            getDatabase(app);


        // =====================================
        // GET UID FROM URL
        // =====================================

        const urlParams =
            new URLSearchParams(
                window.location.search
            );


        const urlUID =
            urlParams.get("uid");


        console.log(
            "URL UID:",
            urlUID
        );


        // =====================================
        // LOAD USER PROFILE
        // =====================================

        onAuthStateChanged(
            auth,
            async function (firebaseUser) {

                try {

                    let uid = null;


                    // =================================
                    // FIRST PRIORITY:
                    // FIREBASE AUTH USER
                    // =================================

                    if (firebaseUser) {

                        uid =
                            firebaseUser.uid;

                        console.log(
                            "Firebase Auth UID:",
                            uid
                        );

                    }


                    // =================================
                    // SECOND PRIORITY:
                    // URL UID
                    // =================================

                    else if (urlUID) {

                        uid =
                            urlUID;

                        console.log(
                            "Using URL UID:",
                            uid
                        );

                    }


                    // =================================
                    // NO UID
                    // =================================

                    if (!uid) {

                        console.log(
                            "কোনো Login করা User পাওয়া যায়নি।"
                        );

                        return;

                    }


                    // =================================
                    // GET USER DATA
                    // =================================

                    const userRef =
                        ref(
                            db,
                            "users/" + uid
                        );


                    const snapshot =
                        await get(userRef);


                    console.log(
                        "Profile exists:",
                        snapshot.exists()
                    );


                    // =================================
                    // PROFILE NOT FOUND
                    // =================================

                    if (!snapshot.exists()) {

                        console.error(
                            "এই UID-এর জন্য Firebase Database-এ Profile পাওয়া যায়নি:",
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
                    // SHOW USER NAME
                    // =================================

                    const userName =
                        document.getElementById(
                            "userName"
                        );


                    if (userName) {

                        if (userData.name) {

                            userName.textContent =
                                userData.name;

                        }
                        else {

                            userName.textContent =
                                "ব্যবহারকারী";

                        }

                    }


                    // =================================
                    // SHOW AABF ID
                    // =================================

                    const userAABFID =
                        document.getElementById(
                            "userAABFID"
                        );


                    if (userAABFID) {

                        if (userData.aabfID) {

                            userAABFID.textContent =
                                userData.aabfID;

                        }
                        else {

                            userAABFID.textContent =
                                "AABF ID পাওয়া যায়নি";

                        }

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

                }


                catch (error) {

                    console.error(
                        "Profile Load Error:",
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

    // এখানে আপনার Emergency ফোন নম্বর বসাবেন

    window.location.href =
        "tel:YOUR_NUMBER";

}
