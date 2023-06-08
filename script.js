// Datos de ejemplo para la lista de mascotas
let mascotas = [];

// Función para mostrar la lista de mascotas
function mostrarMascotas() {
  const mascotaList = document.getElementById('mascota-list');
  const busqueda = document.getElementById('busqueda').value.toLowerCase();
  mascotaList.innerHTML = '';

  mascotas.forEach((mascota) => {
    if (mascota.nombre.toLowerCase().includes(busqueda)) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = mascota.nombre;
      span.addEventListener('click', () => mostrarPopup(mascota));
      li.appendChild(span);
      mascotaList.appendChild(li);
    }
  });
}

// Función para mostrar el popup con la imagen y la información de la mascota
function mostrarPopup(mascota) {
  const popup = document.getElementById('popup');
  const popupFoto = document.getElementById('popup-foto');
  const popupNombre = document.getElementById('popup-nombre');
  popupFoto.src = mascota.foto;
  popupNombre.textContent = mascota.nombre;
  popup.classList.add('show');

  const closeBtn = document.getElementsByClassName('close')[0];
  closeBtn.addEventListener('click', () => {
    popup.classList.remove('show');
  });
}

// Evento para mostrar las mascotas al cargar la página
window.addEventListener('DOMContentLoaded', mostrarMascotas);

// Evento para filtrar las mascotas al escribir en la barra de búsqueda
const busquedaInput = document.getElementById('busqueda');
busquedaInput.addEventListener('input', mostrarMascotas);

// Evento para enviar el formulario y crear una nueva mascota
const mascotaForm = document.getElementById('mascota-form');
mascotaForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombreInput = document.getElementById('nombre');
  const fotoInput = document.getElementById('foto');

  const nombre = nombreInput.value;
  const foto = URL.createObjectURL(fotoInput.files[0]);

  if (nombre && foto) {
    const mascota = { nombre, foto };
    mascotas.push(mascota);
    nombreInput.value = '';
    fotoInput.value = '';
    mostrarMascotas();
    actualizarSpreadsheet();
  }
});

// Función para actualizar los datos en el Spreadsheet de Google
function actualizarSpreadsheet() {
  const datos = mascotas.map((mascota) => [mascota.nombre, mascota.foto]);
  const spreadsheetId = '1ci0SzNtJ1oDMK0e6sHNg8T6AOFV1nnHdmODhFV9Zna0';
  const range = 'Data!A2:E2';

  google.script.run.actualizarSpreadsheet(datos, spreadsheetId, range);
}
