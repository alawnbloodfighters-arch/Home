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

    window.location.href = "login.html";

}


// =========================================
// PROFILE
// =========================================

function openProfile() {

    alert("প্রোফাইল");

}


// =========================================
// EMERGENCY
// =========================================

function emergency() {

    // এখানে আপনার Emergency ফোন নম্বর বসাবেন
    window.location.href = "tel:YOUR_NUMBER";

}
