const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch(`http://localhost:5000/users?email=${email}`);
    const users = await res.json();
    console.log(users);

    if (users.length > 0) {
      const user = users[0];

      if (user.password == password) {
        alert("successfully login");
        localStorage.setItem("user", JSON.stringify(user));
        if (user.role == "admin") {
          window.location.href = "/admin.html";
        } else {
          window.location.href = "/profile.html";
        }
      } else {
        alert("email or password is not valid");
      }
    } else {
      alert("user not found");
    }
  } catch (error) {
    alert("Server Error ,please try it again");
  }
});

window.addEventListener("load", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if(!user) return
  if (user.role=='user') {
    window.location.href = "/profile.html";
  }
  if(user.role=='admin'){
    window.location.href='/admin.html'
  }
});
