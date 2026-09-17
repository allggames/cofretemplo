// Lista de premios configurables
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

// Paso 2: Animación y revelación del premio
chestBox.addEventListener('click', () => {
  // Prevenir clics repetidos
  chestBox.style.pointerEvents = 'none';

  // Animación del destello y cambio de ícono
  glow.classList.add('open-animation');
  chestIcon.textContent = '✨';

  // Revelación luego del destello
  setTimeout(() => {
    // Selección aleatoria de premio
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    
    // Obtención de fecha y hora local formateada
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

    // Inyectar datos en la vista de reclamo
    prizeText.textContent = randomPrize;
    claimUser.textContent = currentUser;
    claimDatetime.textContent = `${formattedDate} - ${formattedTime}`;

    stepChest.classList.remove('active');
    stepReward.classList.add('active');
  }, 700);
});
