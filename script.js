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
    get,
    onValue
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

    alert(
        "আপনার প্রোফাইল"
    );

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


    try {

        const userRef =
            ref(
                db,
                "users/" + uid
            );


        const snapshot =
            await get(userRef);


        if (!snapshot.exists()) {

            console.error(
                "users/" + uid +
                " এ কোনো profile পাওয়া যায়নি।"
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
// UNREAD COUNT - HOME
// =========================================

let unreadListenerStarted = false;


// =========================================
// CREATE BADGE
// =========================================

function createUnreadBadge(button) {

    if (!button) {

        return null;

    }


    let badge =
        button.querySelector(
            ".home-unread-badge"
        );


    if (!badge) {

        badge =
            document.createElement(
                "span"
            );


        badge.className =
            "home-unread-badge";


        badge.style.position =
            "absolute";


        badge.style.top =
            "-8px";


        badge.style.right =
            "-5px";


        badge.style.minWidth =
            "24px";


        badge.style.height =
            "24px";


        badge.style.padding =
            "0 6px";


        badge.style.borderRadius =
            "50px";


        badge.style.background =
            "#d00000";


        badge.style.color =
            "#ffffff";


        badge.style.fontSize =
            "12px";


        badge.style.fontWeight =
            "bold";


        badge.style.display =
            "none";


        badge.style.alignItems =
            "center";


        badge.style.justifyContent =
            "center";


        badge.style.border =
            "2px solid #ffffff";


        badge.style.lineHeight =
            "1";


        badge.style.zIndex =
            "10";


        button.style.position =
            "relative";


        button.appendChild(
            badge
        );

    }


    return badge;

}


// =========================================
// LOAD HOME UNREAD COUNT
// =========================================

function loadHomeUnreadCount(uid) {

    if (
        !uid ||
        unreadListenerStarted
    ) {

        return;

    }


    unreadListenerStarted =
        true;


    const chatRef =
        ref(
            db,
            "publicChats"
        );


    onValue(

        chatRef,

        function(snapshot) {

            const allChats =
                snapshot.val();


            let totalUnread =
                0;


            if (allChats) {

                Object.values(
                    allChats
                ).forEach(

                    function(chat) {

                        if (!chat) {

                            return;

                        }


                        const messages =
                            chat.messages ||
                            {};


                        const readState =
                            chat.readState ||
                            {};


                        const userReadData =
                            readState[uid] ||
                            {};


                        const lastReadAt =
                            Number(
                                userReadData.lastReadAt ||
                                0
                            );


                        Object.values(
                            messages
                        ).forEach(

                            function(message) {

                                if (!message) {

                                    return;

                                }


                                const messageTime =
                                    Number(
                                        message.createdAt ||
                                        0
                                    );


                                const senderUid =
                                    String(
                                        message.uid ||
                                        ""
                                    );


                                // =================================
                                // অন্য user-এর unread message
                                // =================================

                                if (

                                    senderUid !==
                                    String(uid)

                                    &&

                                    messageTime >
                                    lastReadAt

                                ) {

                                    totalUnread++;

                                }

                            }

                        );

                    }

                );

            }


            updateHomeUnreadBadge(
                totalUnread
            );

        },


        function(error) {

            console.error(
                "Home Unread Count Error:",
                error
            );

        }

    );

}


// =========================================
// UPDATE HOME BADGE
// =========================================

function updateHomeUnreadBadge(
    count
) {

    const buttons =
        document.querySelectorAll(
            ".action-card"
        );


    let targetButton = null;


    buttons.forEach(

        function(button) {

            const text =
                String(
                    button.innerText ||
                    ""
                ).trim();


            if (
                text.includes(
                    "আবেদন"
                )

                &&

                text.includes(
                    "দেখুন"
                )
            ) {

                targetButton =
                    button;

            }

        }

    );


    if (!targetButton) {

        return;

    }


    const badge =
        createUnreadBadge(
            targetButton
        );


    if (!badge) {

        return;

    }


    if (count > 0) {

        badge.style.display =
            "flex";


        badge.innerText =
            count > 99
            ?
            "99+"
            :
            String(count);

    }

    else {

        badge.style.display =
            "none";


        badge.innerText =
            "0";

    }

}


// =========================================
// AUTH STATE
// =========================================

onAuthStateChanged(

    auth,

    function(user) {

        if (urlUID) {

            loadUserProfile(
                urlUID
            );

            loadHomeUnreadCount(
                urlUID
            );

            return;

        }


        if (user) {

            loadUserProfile(
                user.uid
            );

            loadHomeUnreadCount(
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
