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
// FIREBASE USER PROFILE
// =========================================

(async function loadUserProfile() {

    try {

        // =====================================
        // FIREBASE IMPORT
        // =====================================

        const {
            initializeApp
        } = await import(
            "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
        );


        const {
            getAuth,
            onAuthStateChanged
        } = await import(
            "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
        );


        const {
            getDatabase,
            ref,
            get
        } = await import(
            "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"
        );


        // =====================================
        // FIREBASE CONFIG
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
        // CHECK LOGIN USER
        // =====================================

        onAuthStateChanged(
            auth,
            async function(user) {

                // =================================
                // LOGIN করা নেই
                // =================================

                if (!user) {

                    console.log(
                        "কোনো Firebase user login করা নেই।"
                    );

                    return;

                }


                // =================================
                // CURRENT USER UID
                // =================================

                const uid =
                    user.uid;


                console.log(
                    "Logged in UID:",
                    uid
                );


                // =================================
                // FIREBASE DATABASE
                // users / UID
                // =================================

                try {

                    const userRef =
                        ref(
                            db,
                            "users/" + uid
                        );


                    const snapshot =
                        await get(userRef);


                    // =================================
                    // USER DATA পাওয়া যায়নি
                    // =================================

                    if (!snapshot.exists()) {

                        console.error(
                            "users/" + uid +
                            " এ কোনো profile পাওয়া যায়নি।"
                        );

                        return;

                    }


                    const userData =
                        snapshot.val();


                    console.log(
                        "AABF User Profile:",
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
                            function() {

                                openProfile(
                                    userData
                                );

                            };

                    }

                }

                catch (error) {

                    console.error(
                        "Firebase Database Error:",
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
// EMERGENCY
// =========================================

function emergency() {

    // এখানে Emergency নম্বর বসাও

    window.location.href =
        "tel:YOUR_NUMBER";

}
