/* =====================================================
   AABF APPLICATION SCRIPT
   ===================================================== */


/* ================= LOGIN ================= */

function login() {

    const currentId = localStorage.getItem("aabfID");

    if (currentId) {
        document.getElementById("userAabfId").textContent = currentId;
        return;
    }

    const aabfId = prompt("আপনার AABF ID লিখুন:");

    if (!aabfId) {
        return;
    }

    localStorage.setItem("aabfID", aabfId.trim());

    document.getElementById("userAabfId").textContent = aabfId.trim();
}


/* ================= PROFILE ================= */

function openProfile() {

    const currentId = localStorage.getItem("aabfID");

    if (!currentId) {
        login();
        return;
    }

    alert(
        "AABF ID: " +
        currentId +
        "\n\nপ্রোফাইল অপশন শীঘ্রই যুক্ত করা হবে।"
    );
}


/* ================= MAIN MENU ================= */

function openPage(page) {

    switch (page) {

        case "profile":
            alert("পরিচিতি পেজ");
            break;

        case "blood-request":
            alert("রক্তের আবেদন করুন");
            break;

        case "blood-list":
            alert("রক্তের আবেদনগুলি দেখুন");
            break;

        case "register":
            alert("সদস্য নিবন্ধন");
            break;

        case "relief":
            alert("ত্রাণ সহায়তা");
            break;

        default:
            console.log("Unknown page:", page);
    }
}


/* ================= EMERGENCY ================= */

function emergency() {

    const confirmed = confirm(
        "আপনি কি জরুরি সহায়তা নিতে চান?"
    );

    if (!confirmed) {
        return;
    }

    /*
      এখানে পরে Emergency নম্বর
      যুক্ত করা যাবে।
    */

    window.location.href = "tel:999";
}


/* ================= LOAD USER ================= */

document.addEventListener("DOMContentLoaded", function () {

    const savedId = localStorage.getItem("aabfID");

    if (savedId) {
        const idElement =
            document.getElementById("userAabfId");

        if (idElement) {
            idElement.textContent = savedId;
        }
    }

});
