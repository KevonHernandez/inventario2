document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user === "admin" && pass === "1234") {
    sessionStorage.setItem("user", user);
    document.getElementById("login-card").classList.add("d-none");
    document.getElementById("region-card").classList.remove("d-none");
    loadRegions();
  } else {
    alert("Credenciales incorrectas.");
  }
});

function loadRegions() {
  const regions = [
    { name: "Global", code: "🌐" },
    { name: "US-Este", code: "🇺🇸" },
    { name: "Europa-Central", code: "🇪🇺" },
    { name: "México-CDMX", code: "🇲🇽" },
    { name: "Red Interna", code: "🛡️" }
  ];

  const list = document.getElementById("region-list");
  regions.forEach(region => {
    const item = document.createElement("button");
    item.className = "list-group-item list-group-item-action";
    item.innerText = `${region.code} ${region.name}`;
    item.addEventListener("click", () => {
      alert(`Has accedido a la región: ${region.name}`);
      // Aquí puedes redirigir a otra página si quieres
    });
    list.appendChild(item);
  });
}
