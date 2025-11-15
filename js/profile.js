window.addEventListener("load", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (window.location.href = "/login.html");
  }

  const userName = document.getElementById("user-name");
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const age = document.getElementById("age");
  const gender = document.getElementById("gender");

  userName.textContent = user.firstName + " " + user.lastName;
  firstName.textContent = user.firstName;
  lastName.textContent = user.lastName;
  email.textContent = user.email;
  age.textContent = user.age;
  gender.textContent = user.gender;
});

const logOut = document.getElementById("logout-btn");

logOut.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/login.html";
});

const changeModulePassword = document.getElementById("change-password-modal");
const closeModuleBtn = document.querySelector(".close-btn");
const changePasswordBtn = document.getElementById("change-password-btn");

changePasswordBtn.addEventListener("click", () => {
  changeModulePassword.style.display = "block";
});

closeModuleBtn.addEventListener("click", () => {
  changeModulePassword.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == changeModulePassword) {
    changeModulePassword.style.display = "none";
  }
});

const changePasswordForm = document.getElementById("change-password-form");
const changModuleBtn = document.querySelector(".change-pasword-btn");

changePasswordForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const currrentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  const user = JSON.parse(localStorage.getItem("user"));
  if (user.password != currrentPassword) {
    return alert("current password is incorrect");
  }
  if (newPassword != confirmPassword) {
    return alert("newpassword and confirm password are not equal");
  }

  try {
    user.password = newPassword;
    const res = await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    });

    if (res.ok == true) {
      alert("password changes successfully");
      changeModulePassword.style.display='none'
      localStorage.setItem('user',JSON.stringify(user))
    } else {
      alert("failed to change pasword");
    }
  } catch (error) {
    alert("server issue");
  }
});
