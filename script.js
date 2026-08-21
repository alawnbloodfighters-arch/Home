/*
  ==========================================
  AABF HOME SCREEN
  ==========================================
*/


/* =========================
   USER DATA
========================= */

let user = {
  name: "ব্যবহারকারী",
  aabfId: ""
};


/*
  LocalStorage থেকে user data নেওয়া
*/

function loadUser() {

  const savedUser = localStorage.getItem("aabfUser");

  if (savedUser) {

    try {

      user = JSON.parse(savedUser);

    } catch (error) {

      console.log("User data error");

    }

  }

  updateProfile();
}


/* =========================
   PROFILE UPDATE
========================= */

function updateProfile() {

  const nameElement =
    document.getElementById("userName");

  const idElement =
    document.getElementById("aabfId");

  const initialElement =
    document.getElementById("profileInitial");

  const modalName =
    document.getElementById("modalName");

  const modalId =
    document.getElementById("modalAabfId");

  const modalInitial =
    document.getElementById("modalInitial");


  let name = user.name || "ব্যবহারকারী";

  let id = user.aabfId || "Login করুন";


  nameElement.textContent = name;

  idElement.textContent = id;

  modalName.textContent = name;

  modalId.textContent = id;


  let firstLetter = "A";

  if (name && name !== "ব্যবহারকারী") {

    firstLetter = name.charAt(0);

  }


  initialElement.textContent = firstLetter;

  modalInitial.textContent = firstLetter;
}


/* =========================
   PROFILE MODAL
========================= */

function openProfile() {

  const modal =
    document.getElementById("profileModal");

  modal.classList.add("active");
}


function closeProfile() {

  const modal =
    document.getElementById("profileModal");

  modal.classList.remove("active");
}


/* =========================
   LOGIN
========================= */

function loginUser() {

  /*
    এখন temporary login system।

    পরে Firebase Authentication
    দিয়ে এটাকে replace করা যাবে।
  */

  const name = prompt(
    "আপনার নাম লিখুন:"
  );

  if (!name) {
    return;
  }


  const aabfId = prompt(
    "আপনার AABF ID লিখুন:"
  );

  if (!aabfId) {
    return;
  }


  user = {
    name: name.trim(),
    aabfId: aabfId.trim()
  };


  localStorage.setItem(
    "aabfUser",
    JSON.stringify(user)
  );


  updateProfile();

  closeProfile();

}


/* =========================
   OPEN PAGE
========================= */

function openPage(page) {

  /*
    এখানে আপনার GitHub Pages-এর
    আলাদা HTML page-এর নাম বসবে।
  */

  window.location.href = page;
}


/* =========================
   EMERGENCY
========================= */

function emergencyCall() {

  const number = "999";

  const confirmed =
    confirm(
      "আপনি কি Emergency Call করতে চান?"
    );

  if (confirmed) {

    window.location.href =
      "tel:" + number;

  }
}


/* =========================
   MODAL OUTSIDE CLICK
========================= */

document
  .getElementById("profileModal")
  .addEventListener("click", function(event) {

    if (event.target === this) {

      closeProfile();

    }

  });


/* =========================
   START
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadUser();

  }
);
