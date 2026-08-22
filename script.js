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


    // =====================================
    // FIREBASE AUTH + DATABASE SDK
    // =====================================

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
    // FIREBASE CONFIGURATION
    // =====================================

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
    // CHECK LOGGED-IN USER
    // =====================================

    onAuthStateChanged(
        auth,
        async function(user) {


            // =================================
            // USER LOGIN করা নেই
            // =================================

            if (!user) {

                console.log(
                    "কোনো User Login করা নেই।"
                );

                return;

            }


            // =================================
            // FIREBASE AUTH UID
            // =================================

            const uid =
                user.uid;


            console.log(
                "Logged-in User UID:",
                uid
            );


            // =================================
            // USER PROFILE LOAD
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
                // PROFILE পাওয়া যায়নি
                // =================================

                if (!snapshot.exists()) {

                    console.error(
                        "Firebase-এ User Profile পাওয়া যায়নি।"
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
                // USER NAME
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
                // USER CARD
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
                    "User Profile Load Error:",
                    error
                );

            }

        }
    );

});


// =========================================
// EMERGENCY
// =========================================

function emergency() {

    // এখানে আপনার Emergency ফোন নম্বর বসাবেন

    window.location.href =
        "tel:YOUR_NUMBER";

}
