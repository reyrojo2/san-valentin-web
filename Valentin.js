document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-music');
  audio.volume = 0.2; // Volumen al 20%
});

// Permitir al usuario activar el audio si está silenciado
document.body.addEventListener('click', () => {
  const audio = document.getElementById('bg-music');
  if (audio.muted) {
    audio.muted = false;
    audio.play();
  }
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const imagePaths = [
  'img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png',
  'img6.png', 'img7.png', 'img8.png', 'img9.png', 'img10.png',
  'img11.png', 'img12.png', 'img13.png', 'img14.png'
];

let currentImageIndex = 0;
const backgroundImage = new Image();
backgroundImage.src = imagePaths[currentImageIndex];

function changeBackgroundImage() {
  currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
  backgroundImage.src = imagePaths[currentImageIndex];
}

// Iniciar el cambio de fondo cada 5 segundos (5000ms)
setInterval(changeBackgroundImage, 5000);

const hearts = [];
const numHearts = 225;
let heartPulse = 0;
let pulseDirection = 1;

// Crear corazones en órbitas
for (let i = 0; i < numHearts; i++) {
  const radius = Math.random() * 800 + 50;
  const angle = Math.random() * Math.PI * 2;
  hearts.push({
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: radius,
    angle: angle,
    speed: (Math.random() * 0.001 + 0.01) * (i % 2 === 0 ? 1 : -1),
    size: Math.random() * 25 + 2
  });
}

function drawBackground() {
  const imgWidth = backgroundImage.width;
  const imgHeight = backgroundImage.height;
  const scale = canvas.height / imgHeight;
  const scaledWidth = imgWidth * scale;

  // Imagen central con poca difuminación
  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.drawImage(backgroundImage, (canvas.width - scaledWidth) / 2, 0, scaledWidth, canvas.height);
  ctx.restore();

  // Imágenes laterales con más difuminación
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.drawImage(backgroundImage, (canvas.width - scaledWidth) / 2 - scaledWidth, 0, scaledWidth, canvas.height);
  ctx.drawImage(backgroundImage, (canvas.width - scaledWidth) / 2 + scaledWidth, 0, scaledWidth, canvas.height);
  ctx.restore();

  // Capa de gradiente lineal
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawHeart(x, y, size, color = 'rgb(255, 20, 118)', borderColor = 'rgba(255, 255, 255, 0.8)') {
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 15;

  // Dibujar el corazón
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  ctx.closePath();

  // Relleno
  ctx.fillStyle = color;
  ctx.fill();

  // Borde del corazón
  ctx.lineWidth = 3;
  ctx.strokeStyle = borderColor;
  ctx.stroke();

  ctx.restore();
}

function drawText(text, x, y) {
  ctx.save();
  ctx.font = '50px Arial black';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgb(255, 64, 96)';

  // Sombra del texto
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 10;

  // Dibujar texto
  ctx.fillText(text, x, y);

  // Borde del texto
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = 'white';
  ctx.strokeText(text, x, y);

  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar fondo personalizado
  drawBackground();

  // Dibujar corazones en órbitas
  hearts.forEach(heart => {
    heart.angle += heart.speed;
    const orbitX = heart.x + Math.cos(heart.angle) * heart.radius;
    const orbitY = heart.y + Math.sin(heart.angle) * heart.radius;
    drawHeart(orbitX, orbitY, heart.size);
  });

  // Actualizar el tamaño del corazón central para que palpite
  heartPulse += pulseDirection * 0.2;
  if (heartPulse > 10 || heartPulse < -8) {
    pulseDirection *= -1;
  }
  const heartSize = 80 + heartPulse;

  // Dibujar corazón central
  drawHeart(canvas.width / 2, canvas.height / 2.15, heartSize, 'rgb(255, 64, 129)', 'rgba(255, 255, 255, 1)');

  // Dibujar texto
  drawText('Mi hermosa Angie', canvas.width / 2, canvas.height / 2.3 + 200);
  drawText('Te amo, feliz San Valentín ❤️', canvas.width / 2, canvas.height / 1.8 + 200);
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

