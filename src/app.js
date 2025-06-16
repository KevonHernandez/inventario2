const loginForm = document.getElementById('loginForm');
const loginSection = document.getElementById('loginSection');
const regionSection = document.getElementById('regionSection');
const inventarioSection = document.getElementById('inventarioSection');
const regionNombre = document.getElementById('regionNombre');
const navbar = document.getElementById('navbar');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user === 'admin' && pass === '1234') {
    loginSection.classList.add('d-none');
    regionSection.classList.remove('d-none');
  } else {
    alert('Credenciales incorrectas');
  }
});

document.getElementById('btnContinuar').addEventListener('click', function () {
  const region = document.getElementById('regionSelect').value;
  if (!region) return alert('Selecciona una región');

  localStorage.setItem('region', region);
  regionNombre.textContent = `Región: ${region}`;
  regionSection.classList.add('d-none');
  inventarioSection.classList.remove('d-none');
  navbar.classList.remove('d-none');

  cargarProductos();
});

function cargarProductos() {
  const productos = [
    { id: 1, nombre: 'Teclado mecánico', categoria: 'Periféricos', stock: 12, precio: 750 },
    { id: 2, nombre: 'Mouse inalámbrico', categoria: 'Periféricos', stock: 30, precio: 320 },
    { id: 3, nombre: 'Laptop Dell', categoria: 'Computadoras', stock: 5, precio: 14500 }
  ];

  const tabla = document.getElementById('tablaProductos');
  tabla.innerHTML = '';
  productos.forEach(p => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>${p.stock}</td>
      <td>$${p.precio}</td>
      <td><button class="btn btn-sm btn-outline-secondary">Editar</button></td>
    `;
    tabla.appendChild(fila);
  });
}
function obtenerProductos() {
  const guardados = localStorage.getItem('productos');
  return guardados ? JSON.parse(guardados) : [];
}

function guardarProductos(productos) {
  localStorage.setItem('productos', JSON.stringify(productos));
}

function cargarProductos() {
  const productos = obtenerProductos();
  const tabla = document.getElementById('tablaProductos');
  tabla.innerHTML = '';
  productos.forEach(p => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>${p.stock}</td>
      <td>$${p.precio}</td>
      <td><button class="btn btn-sm btn-outline-secondary">Editar</button></td>
    `;
    tabla.appendChild(fila);
  });
}


function cerrarSesion() {
  localStorage.removeItem('region');
  location.reload();
}

window.onload = () => {
  const region = localStorage.getItem('region');
  if (region) {
    loginSection.classList.add('d-none');
    regionSection.classList.add('d-none');
    inventarioSection.classList.remove('d-none');
    navbar.classList.remove('d-none');
    regionNombre.textContent = `Región: ${region}`;
    cargarProductos();
  }
};
document.getElementById('formAgregarProducto').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const nombre = document.getElementById('nombreProducto').value.trim();
  const categoria = document.getElementById('categoriaProducto').value.trim();
  const stock = parseInt(document.getElementById('stockProducto').value);
  const precio = parseFloat(document.getElementById('precioProducto').value);

  if (!nombre || !categoria || isNaN(stock) || isNaN(precio)) {
    return alert('Por favor completa todos los campos correctamente');
  }

  const productos = obtenerProductos();
  const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;

  productos.push({ id: nuevoId, nombre, categoria, stock, precio });
  guardarProductos(productos);
  cargarProductos();

  this.reset();
});

