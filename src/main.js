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

  // Torklar Console'da gözükür bunun sayesinde
  console.log('Torklar:', leftTorque, rightTorque);

  return { leftTorque, rightTorque, leftWeight, rightWeight };
}

// Tork farkına göre açıyı hesaplar ve ±30° sınırı uygular
function computeAngle(leftTorque, rightTorque) {
  let diff = rightTorque - leftTorque;
  let rawAngle = diff / 10;
  return limitAngle(rawAngle, -30, 30);
}
