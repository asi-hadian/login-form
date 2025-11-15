const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const age =Number( document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  let newUser = null;
  const userCount=await getUserLength()
  console.log("📊 Number of users:", length);

  if (userCount == 0) {
    newUser = {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      role: "admin",
    };
  } else {
     newUser = {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      role: "user",
    };
  }

  try {
    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-type": "application/json",
      },
    });

    if (res.ok) {
      // alert("Registration successful!");
      window.location.href = "/login.html";
    } else {
      alert("somthing went wrong please try again");
    }
  } catch (error) {
    alert("an error occured during registration plase try again");
  }
});

window.addEventListener("load", () => {
  const user = localStorage.getItem("user");
  if (user) {
    window.location.href = "/profile.html";
  }
});

async function getUserLength() {
  const res = await fetch("http://localhost:5000/users");
  const users = await res.json();
  return users.length;
}
