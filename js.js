var firebaseConfig = {
    apiKey: "AIzaSyDbYt1lg5SzMo34HDBemJMMECED9P5YlCI",
    authDomain: "osmatix-b0a30.firebaseapp.com",
    projectId: "osmatix-b0a30",
    storageBucket: "osmatix-b0a30.appspot.com",
    messagingSenderId: "582398907755",
    appId: "1:582398907755:web:184074c66a3c724eec682e",
    measurementId: "G-Z6XBS8TR59"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();

const signoutButtons = document.querySelectorAll(".signout-button");

firebase.auth().onAuthStateChanged(user => {
    const profileIcon = document.querySelector(".profile-icon");
    const signupButton = document.getElementById("signup-button");
    const userEmails = document.querySelectorAll(".user-email");
    const allowedEmail = "sanchitguptakorea@gmail.com";
    const formContainer = document.querySelector(".form-container");
  
    if (user) {
      // User is signed in, display their email and the profile icon
      userEmails.forEach(userEmail => {
        userEmail.innerHTML = user.email;
      });
      profileIcon.style.display = "block";
      signupButton.style.display = "none";
  
      if (user.email === allowedEmail) {
        formContainer.style.display = "block";
      } else {
        formContainer.style.display = "none";
      }
  
      signoutButtons.forEach(signoutButton => {
        signoutButton.style.display = "block";
        signoutButton.addEventListener("click", () => {
          auth.signOut().then(() => {
            alert("Sign out successful.");
            // Redirect to login page or other page
            window.location.href = "signup.html";
          }).catch((error) => {
            alert(error.message);
          });
        });
      });
    } else {
      // User is signed out, clear the email display and hide the profile icon
      userEmails.forEach(userEmail => {
        userEmail.innerHTML = "";
      });
      profileIcon.style.display = "none";
      signupButton.style.display = "inline-block";
      formContainer.style.display = "none";
      signoutButtons.forEach(signoutButton => {
        signoutButton.style.display = "none";
        signoutButton.removeEventListener("click", () => {});
      });
      
      // Restrict access to all pages except index.html and signup.html
      if (restrictedPages.includes(currentPage)) {
        window.location.href = 'signup.html';
      }
    }
  });
  
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      // Redirect to login page if user signs out while on a restricted page
      const currentPage = window.location.pathname.split('/').pop();
      const restrictedPages = ['about.html', 'whyus.html', 'rules.html', 'top-products.html', 'spin.html', 'movies.html', 'luckydraw.html'];
      if (restrictedPages.includes(currentPage)) {
        window.location.href = 'signup.html';
      }
    }
  });
  
  
  

// Select the profile icon element
const profileIcon = document.querySelector('.profile-icon');

// Add a click event listener to it
profileIcon.addEventListener('click', () => {
  // Select the dialog element
  const profileDialog = document.querySelector('.profile-dialog');

  // Set the user email in the dialog box
  const userEmail = document.querySelector('.user-email');
  userEmail.textContent = firebase.auth().currentUser.email;
  const emailLabel = document.querySelector('.email-label');
  emailLabel.textContent = 'Your e-Mail:';

  // Add a click event listener to the signout button in the dialog box
  const signoutButton = document.querySelector('.signout-button');
  signoutButton.addEventListener('click', () => {
    firebase.auth().signOut();
    profileDialog.close();
  });

  // Add a click event listener to the close button in the dialog box
  const closeDialogButton = profileDialog.querySelector('.close-dialog-button');
  closeDialogButton.addEventListener('click', () => {
    profileDialog.close();
  });

  // Show the dialog box
  profileDialog.showModal();
});



var input = document.getElementById("myInput");
input.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchProducts();
  }
});
function searchProducts() {
  // Declare variables
  var input, filter, container, cards, card, title, i, matchFound;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  container = document.getElementById("products");
  cards = container.getElementsByClassName("product-card");
  matchFound = false;
  noResults = document.getElementById("no-results");

  // Loop through all product cards, and hide those that don't match the search query
  for (i = 0; i < cards.length; i++) {
    card = cards[i];
    title = card.querySelector(".visually-hidden").textContent.toUpperCase();
    if (title.indexOf(filter) > -1) {
      card.style.display = "";
      matchFound = true;
    } else {
      card.style.display = "none";
    }
  }

  // Display message if no matching results were found
  var message = document.getElementById("noResultsMessage");
  if (!matchFound) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
}
$(document).ready(function () {
  $('form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/process-form.php',
      data: $('form').serialize(),
      success: function () {
        alert('Form submitted successfully!');
      },
      error: function () {
        alert('An error occurred while submitting the form!');
      }
    });
  });
});


