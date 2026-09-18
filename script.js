// CONFIGURACIÓN: Pegá acá la URL que te dio Apps Script
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzgzMqFx8cjHqMMS98SKUFIJvkifxbzINIQX7ITluQE22Fi6ALuFD9TMOZxxTSkdxWD/exec';

// Lista de premios
const prizes = [
  '3000 FICHAS',
  '4000 FICHAS',
  '5000 FICHAS',
  '10% CASHBACK',
  '20% CASHBACK',
  '30% CASHBACK'
];

let currentUser = '';

// Elementos del DOM
const stepUser = document.getElementById('step-user');
const stepChest = document.getElementById('step-chest');
const stepReward = document.getElementById('step-reward');

const usernameInput = document.getElementById('username');
const btnStart = document.getElementById('btn-start');

const displayUser = document.getElementById('display-user');
const chestBox = document.getElementById('chest-box');
const chestIcon = document.getElementById('chest-icon');
const glow = document.getElementById('glow');

const prizeText = document.getElementById('prize-text');
const claimUser = document.getElementById('claim-user');
const claimDatetime = document.getElementById('claim-datetime');

// Función para enviar los datos a la planilla
async function saveToSheet(data) {
  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors', // Evita bloqueos de CORS en GitHub Pages
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.error('Error al registrar reclamo:', err);
  }
}

// Paso 1: Ingreso de usuario
btnStart.addEventListener('click', () => {
  const name = usernameInput.value.trim();
  if (!name) {
    alert('Por favor ingresá tu nombre de usuario de Atenea');
    return;
  }
  currentUser = name;
  displayUser.textContent = currentUser;

  stepUser.classList.remove('active');
  stepChest.classList.add('active');
});

// Paso 2: Apertura, asignación y guardado
chestBox.addEventListener('click', () => {
  chestBox.style.pointerEvents = 'none';

  glow.classList.add('open-animation');
  chestIcon.textContent = '✨';

  setTimeout(() => {
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Mostrar en pantalla
    prizeText.textContent = randomPrize;
    claimUser.textContent = currentUser;
    claimDatetime.textContent = `${formattedDate} - ${formattedTime}`;

    // Enviar a la base de datos de Google Sheets
    saveToSheet({
      usuario: currentUser,
      premio: randomPrize,
      fecha: formattedDate,
      hora: formattedTime
    });

    stepChest.classList.remove('active');
    stepReward.classList.add('active');
  }, 700);
});
