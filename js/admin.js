window.addEventListener("load", async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (window.location.href = "/login.html");
  }
  if (user.role != "admin") {
    return (window.location.href = "/login.html");
  }

  const res = await fetch("http://localhost:5000/users");
  const users = await res.json();

  const usersTableBody = document.querySelector("tbody");
  users.forEach((user) => {
    usersTableBody.innerHTML += `
            <tr>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
              <button class="edit-btn" onClick="editUserById(${user.id})" ><i class="fa-solid fa-pen-to-square"></i>Edit</button>
              <button class="delete-btn" onClick="deleteUserById(${user.id})"><i class="fa-solid fa-trash"></i>Delete</button>
            </td>
          </tr>
        `;
  });
});

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/login.html";
});
async function deleteUserById(userId) {
  const confirmResult = confirm("Are you sure you want delete this user?");
  if (confirmResult) {
    try {
      const res = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert(`✅ User with id ${userId} deleted successfully.`);
      } else {
        alert(`❌ Failed to delete user. Status: ${res.status}`);
      }
    } catch (error) {
      alert("🚨 Error deleting user:", error);
    }
  }
}

async function editUserById(userId) {
  editUserModal.style.display = "block";
  const res = await fetch(`http://localhost:5000/users/${userId}`);
  const user = await res.json();

  document.getElementById("edit-first-name").value = user.firstName;
  document.getElementById("edit-last-name").value = user.lastName;
  document.getElementById("edit-age").value = user.age;
  document.getElementById("edit-email").value = user.email;
  document.getElementById("edit-password").value = user.password;
  document.getElementById("edit-role").value = user.role;

  const editUserBtn = document.querySelector(".edit-user-btn");
  editUserBtn.addEventListener("click", async(e) => {
    e.preventDefault();

    const editedUserInfo = {
      firstName: document.getElementById("edit-first-name").value,
      lastName: document.getElementById("edit-last-name").value,
      email: document.getElementById("edit-email").value,
      age:Number( document.getElementById("edit-age").value),
      password: document.getElementById("edit-password").value,
      role: document.getElementById("edit-role").value,
    };
    try {
      const res= await fetch(`http://localhost:5000/users/${userId}`,{
      method:'PUT',
      body:JSON.stringify(editedUserInfo),
      headers:{
        "content-type":"application/json",
      },
    })
    console.log(res)
    if(res.ok){
      alert('edit user succsssfully')
    }else{
      alert('failed to edit user')
    }
    } 
    
    catch (error) {
       alert("an error occured during registration plase try again");
    }
   
  });
}

const closeEditBtnModal = document.querySelector(".close-btn");
const editUserModal = document.getElementById("edit-user-modal");
closeEditBtnModal.addEventListener("click", () => {
  editUserModal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target == editUserModal) {
    editUserModal.style.display = "none";
  }
});
