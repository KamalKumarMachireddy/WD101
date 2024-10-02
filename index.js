document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const userDataTable = document.getElementById("userData");

  // Load saved data from localStorage
  loadData();

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    // Validate age (between 18 and 55)
    const dob = new Date(document.getElementById("dob").value);
    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
      alert("You must be between 18 and 55 years old.");
      return;
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    // Save to localStorage
    const userData = {
      name,
      email,
      password,
      dob: dob.toISOString().split("T")[0],
      acceptTerms,
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    addUserToTable(userData);
    form.reset();
  });

  function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  function addUserToTable(userData) {
    const row = userDataTable.insertRow();
    row.insertCell(0).innerText = userData.name;
    row.insertCell(1).innerText = userData.email;
    row.insertCell(2).innerText = userData.password;
    row.insertCell(3).innerText = userData.dob;
    row.insertCell(4).innerText = userData.acceptTerms ? "true" : "false";
  }

  function loadData() {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      addUserToTable(userData);
    }
  }
});
