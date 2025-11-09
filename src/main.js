// === SIK KULLANILAN DOM ELEMANLARI ===
let plank = document.getElementById('plank');
let objectsLayer = document.getElementById('objects');

// Tüm objelerin (kütlelerin) bilgilerini saklayan dizi
let objects = [];

// Belirli bir değeri min ve max arasında sınırlar (açıyı kontrol etmek için)
function limitAngle(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// 1–10 kg arasında rastgele bir kütle oluşturur
function randomWeight() {
  return Math.floor(Math.random() * 10) + 1;
}

// Sağ ve sol taraftaki toplam torkları ve ağırlıkları hesaplar
function computeTorques() {
  let leftTorque = 0;
  let rightTorque = 0;
  let leftWeight = 0;
  let rightWeight = 0;

  for (let obj of objects) {
    let distance = Math.abs(obj.x);
    if (obj.x < 0) {
      leftTorque += obj.weight * distance;
      leftWeight += obj.weight;
    } else {
      rightTorque += obj.weight * distance;
      rightWeight += obj.weight;
    }
  }

  console.log('Torklar:', leftTorque, rightTorque);
  return { leftTorque, rightTorque, leftWeight, rightWeight };
}

// Tork farkına göre açıyı hesaplar ve ±30° sınırı uygular
function computeAngle(leftTorque, rightTorque) {
  let diff = rightTorque - leftTorque;
  let rawAngle = diff / 10;
  return limitAngle(rawAngle, -30, 30);
}

// Objeleri tahtanın üstüne çizer
function renderObjects() {
  // Eski objeleri temizle
  objectsLayer.innerHTML = '';

  // Tahtanın genişliğini al
  let rect = plank.getBoundingClientRect();
  let half = rect.width / 2;

  // Her obje için bir “mass” div’i oluştur
  for (let obj of objects) {
    let massDiv = document.createElement('div');
    massDiv.className = 'mass';
    massDiv.textContent = obj.weight;

    // 🔵 Ağırlığa göre renk skalası (1 = açık mavi, 10 = koyu mavi)
    let lightness = 80 - (obj.weight - 1) * 6; 
    massDiv.style.backgroundColor = `hsl(210, 90%, ${lightness}%)`;

    // Objeyi tıklanan konuma göre yerleştir
    let percent = 50 + (obj.x / half) * 50;
    massDiv.style.left = percent + '%';

    // Katmana ekle
    objectsLayer.appendChild(massDiv);
  }
}

// Hesaplanan açıyı tahtaya uygular
function applyAngle(angle) {
  let angleText = document.getElementById('angleText');
  plank.style.transform = `translateX(-50%) rotate(${angle}deg)`;
  angleText.textContent = angle.toFixed(1);
}

// Her değişiklikte sahneyi günceller
function update() {
  let leftWeightEl = document.getElementById('leftWeight');
  let rightWeightEl = document.getElementById('rightWeight');

  let torques = computeTorques();
  let leftTorque = torques.leftTorque;
  let rightTorque = torques.rightTorque;
  let leftWeight = torques.leftWeight;
  let rightWeight = torques.rightWeight;

  let angle = computeAngle(leftTorque, rightTorque);

  leftWeightEl.textContent = leftWeight;
  rightWeightEl.textContent = rightWeight;

  renderObjects();
  applyAngle(angle);

  // Güncel veriyi kaydet
  localStorage.setItem('seesawState', JSON.stringify(objects));
}

// Plank'e tıklanınca yeni obje ekle
plank.addEventListener('click', function (e) {
  let rect = plank.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let fromCenter = x - rect.width / 2;
  let weight = randomWeight();

  objects.push({ x: fromCenter, weight });
  update();
});

// Reset butonuna tıklanınca sıfırla
let resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', function () {
  objects = [];
  update();
});

// === BAŞLANGIÇ ===
let saved = localStorage.getItem('seesawState');
if (saved) {
  objects = JSON.parse(saved);
}

// İlk kez çalıştır
update();
