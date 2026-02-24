let stage = 0;
const envelopeWrapper = document.getElementById("envelopeWrapper");
const letter = document.getElementById("letter");
const stageIndicator = document.getElementById("stageIndicator");
const envelope = document.getElementById("envelope");
const bgAnimation = document.getElementById("bgAnimation");

function createFallingPetals() {
  const petals = ["🌸", "🌺", "🌼", "💮", "🏵️"]; // 5 loại hoa

  for (let i = 0; i < 15; i++) {
    // Tạo 15 bông hoa
    const petal = document.createElement("div");
    petal.className = "falling-petal";
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];

    // Random vị trí ngang (0-100%)
    petal.style.left = Math.random() * 100 + "%";

    // Random tốc độ rơi (5-10 giây)
    petal.style.animationDuration = 5 + Math.random() * 5 + "s";

    // Random thời gian bắt đầu (0-5 giây)
    petal.style.animationDelay = Math.random() * 5 + "s";

    // Random kích thước (1.5-2.5rem)
    petal.style.fontSize = 1.5 + Math.random() * 1 + "rem";

    bgAnimation.appendChild(petal); // Thêm vào container
  }
}

function createLightBubbles() {
  for (let i = 0; i < 8; i++) {
    // Tạo 8 bong bóng
    const bubble = document.createElement("div");
    bubble.className = "light-bubble";

    // Vị trí X random
    bubble.style.left = Math.random() * 100 + "%";

    // Bắt đầu từ dưới màn hình
    bubble.style.bottom = "-100px";

    // Kích thước random (50-150px)
    bubble.style.width = 50 + Math.random() * 100 + "px";
    bubble.style.height = bubble.style.width; // Hình tròn

    // Tốc độ bay lên (8-12 giây)
    bubble.style.animationDuration = 8 + Math.random() * 4 + "s";

    // Delay bắt đầu (0-3 giây)
    bubble.style.animationDelay = Math.random() * 3 + "s";

    bgAnimation.appendChild(bubble);
  }
}

function createRotatingCircles() {
  const positions = [
    { top: "10%", left: "10%", size: 150 }, // Góc trên trái
    { top: "20%", right: "15%", size: 200 }, // Góc trên phải
    { bottom: "15%", left: "20%", size: 180 }, // Góc dưới trái
    { bottom: "25%", right: "10%", size: 120 }, // Góc dưới phải
  ];

  positions.forEach((pos, index) => {
    const circle = document.createElement("div");
    circle.className = "rotating-circle";

    // Set kích thước
    circle.style.width = pos.size + "px";
    circle.style.height = pos.size + "px";

    // Set vị trí
    if (pos.top) circle.style.top = pos.top;
    if (pos.bottom) circle.style.bottom = pos.bottom;
    if (pos.left) circle.style.left = pos.left;
    if (pos.right) circle.style.right = pos.right;

    // Tốc độ xoay khác nhau (15s, 20s, 25s, 30s)
    circle.style.animationDuration = 15 + index * 5 + "s";

    // Đổi chiều xoay (vòng chẵn thuận, lẻ nghịch)
    circle.style.animationDirection = index % 2 === 0 ? "normal" : "reverse";

    bgAnimation.appendChild(circle);
  });
}

function createTwinkleStars() {
  for (let i = 0; i < 30; i++) {
    // 30 ngôi sao
    const star = document.createElement("div");
    star.className = "twinkle-star";

    // Vị trí random toàn màn hình
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    // Delay random (0-2 giây)
    star.style.animationDelay = Math.random() * 2 + "s";

    // Chu kỳ nhấp nháy (1.5-2.5 giây)
    star.style.animationDuration = 1.5 + Math.random() * 1 + "s";

    bgAnimation.appendChild(star);
  }
}

function createLightWaves() {
  const waves = [
    { top: "5%", left: "5%" }, // Trên trái
    { top: "60%", right: "10%" }, // Giữa phải
    { bottom: "10%", left: "15%" }, // Dưới trái
  ];

  waves.forEach((pos, index) => {
    const wave = document.createElement("div");
    wave.className = "light-wave";

    // Set vị trí
    if (pos.top) wave.style.top = pos.top;
    if (pos.bottom) wave.style.bottom = pos.bottom;
    if (pos.left) wave.style.left = pos.left;
    if (pos.right) wave.style.right = pos.right;

    // Delay khác nhau (0s, 1.3s, 2.6s)
    wave.style.animationDelay = index * 1.3 + "s";

    bgAnimation.appendChild(wave);
  });
}

// Khởi tạo tất cả background animations
createFallingPetals();
createLightBubbles();
createRotatingCircles();
createTwinkleStars();
createLightWaves();

// Giai đoạn 1: Hiện phong bì từ dưới lên bằng GSAP
gsap.to(envelopeWrapper, {
  opacity: 1,
  y: 0,
  duration: 1.5,
  ease: "power3.out",
  delay: 0.5,
});

// Tạo hiệu ứng hoa và trái tim
function createParticles(type, count) {
  const symbols =
    type === "flower"
      ? ["🌸", "🌺", "🌼", "🌻", "🌷"]
      : ["❤️", "💕", "💖", "💗", "💝"];

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const particle = document.createElement("div");
      particle.className = `particle ${type}`;
      particle.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];
      particle.style.left = Math.random() * window.innerWidth + "px";
      particle.style.top = window.innerHeight + "px";
      document.body.appendChild(particle);

      setTimeout(() => particle.remove(), 3000);
    }, i * 100);
  }
}

// Tạo hiệu ứng lấp lánh
function createSparkles(x, y) {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = x + (Math.random() - 0.5) * 100 + "px";
      sparkle.style.top = y + (Math.random() - 0.5) * 100 + "px";
      document.body.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), 1000);
    }, i * 50);
  }
}

// Xử lý sự kiện click
envelopeWrapper.addEventListener("click", function (e) {
  if (stage === 0) {
    openEnvelope();
    createParticles("flower", 8);
    createSparkles(
      e.clientX || window.innerWidth / 2,
      e.clientY || window.innerHeight / 2,
    );
    stageIndicator.textContent = "Nhấn tiếp để đọc thư...";

    stage = 1;
  } else if (stage === 1) {
    // Giai đoạn 3: Hiện toàn bộ nội dung lá thư
    letter.classList.remove("open");

    // BƯỚC SỬA: Di chuyển lá thư ra khỏi phong bì, làm con của <body>
    document.body.appendChild(letter);

    letter.classList.add("full");
    createParticles("heart", 12);
    createSparkles(
      e.clientX || window.innerWidth / 2,
      e.clientY || window.innerHeight / 2,
    );
    gsap.set(letter, {
      scale: 0.6,
      y: 200,
      opacity: 0,
      zIndex: 100,
    });
    gsap.to(letter, {
      scale: 1,
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
    });

    // Hiệu ứng xuất hiện nội dung
    gsap.from(".letter-content h1", {
      y: -30,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
    });

    gsap.from(".letter-content p", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      delay: 0.6,
    });

    gsap.to(stageIndicator, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        stageIndicator.style.display = "none";
      },
    });

    stage = 2;
  }
  // } else if (stage === 2) {
  //     envelope.classList.remove('open');
  //     envelope.classList.add('close');
  //     letter.classList.remove('full');
  //     stageIndicator.style.display = 'block';
  //     stageIndicator.textContent = 'Nhấn vào lá thư để mở...';
  //     gsap.to(stageIndicator, { opacity: 1, duration: 0.5 });
  //     stage = 0;

  // }
});

// Tạo hiệu ứng hoa rơi ngẫu nhiên
setInterval(() => {
  if (stage > 0) {
    const particle = document.createElement("div");
    particle.className = "particle flower";
    particle.textContent = ["🌸", "🌺", "✨"][Math.floor(Math.random() * 3)];
    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = "-50px";
    document.body.appendChild(particle);

    gsap.to(particle, {
      y: window.innerHeight + 100,
      rotation: Math.random() * 360,
      duration: 3 + Math.random() * 2,
      ease: "none",
      onComplete: () => particle.remove(),
    });
  }
}, 1500);
function openEnvelope() {
  envelope.classList.add("open");
  envelope.classList.remove("close");
}

// // Danhoi
// document.addEventListener("DOMContentLoaded", () => {
//   const cloudcontainer1 = document.getElementById("Cloud-Card1");
//   // const cloudcontainer2 = document.getElementById("Cloud-Card2");
//   const lanyard1 = document.querySelector("#soiday1 line");
//   // const lanyard2 = document.getElementById("soiday2 line");
//   const ngiuCard1 = document.getElementById("ngiu-card1");
//   // const ngiuCard2 = document.getElementById("ngiu-card2");

//   // Dammay 1
//   // các biến thể vật lí
//   let isGiuThe1 = false;

//   //Vị trí neo của sợi dây(phần đầu cố định ở trên cùng)
//   const VitriX = cloudcontainer1.offsetWidth / 2;
//   const VitriY = 0;

//   // VỊ TRÍ NGHỈ: Đây là vị trí cân bằng mà thẻ sẽ luôn tìm cách quay về.
//   // Thay đổi giá trị Y ở đây để thẻ treo cao hay thấp.
//   const VitriNghiX = cloudcontainer1.offsetWidth / 2;
//   const VitriNghiY = 150;

//   //Vị trí ban đầu của thẻ được đặt bằng vị trí nghỉ
//   let VitriBanDauX = VitriNghiX;
//   let VitriBanDauY = VitriNghiY;

//   //Vận tốc
//   let vX = 0;
//   let vY = 0;

//   //Các hằng số vật lí
//   const hangsoK = 0.03;
//   const hesomasat = 0.92;
//   const khoiluong = 5;

//   //Sự kiện khi nhấn chuột xuống thẻ
//   ngiuCard1.addEventListener("mousedown", (e) => {
//     isGiuThe1 = true;
//     ngiuCard1.style.transition = "none";
//   });

//   //Sự kiện khi thả chuột ra
//   window.addEventListener("mouseup", () => {
//     isGiuThe1 = false;
//     animate();
//   });

//   //Sự kiện khi di chuyển chuột
//   window.addEventListener("mousemove", (e) => {
//     if (!isGiuThe1) return;
//     const rect = cloudcontainer1.getBoundingClientRect();
//     // getBoundingClientRect(); //lấy tọa độ container so với viewport.
//     VitriBanDauX = e.clientX - rect.left;
//     VitriBanDauY = e.clientY - rect.top;

//     updateCursorPosition();
//   });
//   function updateCursorPosition() {
//     // Cập nhật vị trí CSS của thẻ
//     ngiuCard1.style.left = `${VitriBanDauX - ngiuCard1.offsetWidth / 2}px`;
//     ngiuCard1.style.top = `${VitriBanDauY - 20}px`;

//     //Cập nhật sợi dây: dây vẫn nối từ ĐIỂM NEO CỐ ĐỊNH ở trên cùng
//     lanyard1.setAttribute("x1", VitriX);
//     lanyard1.setAttribute("y1", VitriY);
//     lanyard1.setAttribute("x2", VitriBanDauX);
//     lanyard1.setAttribute("y2", VitriBanDauY);
//   }
//   function animate() {
//     if (isGiuThe1) return;
//     // Tính toán dựa trên khoảng cách tới vị trí nghỉ

//     const dx = VitriBanDauX - VitriNghiX;
//     const dy = VitriBanDauY - VitriNghiY;

//     const LucX = -hangsoK * dx;
//     const LucY = -hangsoK * dy;

//     const giatocX = LucX / khoiluong;
//     const giatocY = LucY / khoiluong;

//     vX += giatocX;
//     vY += giatocY;

//     vX *= hesomasat;
//     vY *= hesomasat;

//     VitriBanDauX += vX;
//     VitriBanDauY += vY;

//     updateCursorPosition();

//     if (
//       Math.abs(vX) < 0.1 &&
//       Math.abs(vY) < 0.1 &&
//       Math.abs(dx) < 0.1 &&
//       Math.abs(dy) < 0.1
//     ) {
//       return;
//     }
//     requestAnimationFrame(animate);
//   }
//   //Khởi tạo vị trí ban đầu
//   updateCursorPosition();
// });

// Đàn hồi mây 1
document.addEventListener("DOMContentLoaded", () => {
  const cloudcontainer1 = document.getElementById("Cloud-Card1");
  const lanyard1 = document.querySelector("#soiday1 line");
  const ngiuCard1 = document.getElementById("ngiu-card1");

  let isGiuThe1 = false;
  let animFrameId = null;

  const VitriX = cloudcontainer1.offsetWidth / 2;
  const VitriY = 0; // Đáy SVG

  const VitriNghiX = cloudcontainer1.offsetWidth / 2;
  const VitriNghiY = 150;

  let VitriBanDauX = VitriNghiX;
  let VitriBanDauY = VitriNghiY;

  let vX = 0;
  let vY = 0;

  const hangsoK = 0.03;
  const hesomasat = 0.92;
  const khoiluong = 5;

  ngiuCard1.addEventListener("mousedown", (e) => {
    isGiuThe1 = true;
    vX = 0;
    vY = 0;
    // Dừng animation cũ nếu đang chạy
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    ngiuCard1.style.cursor = "grabbing";
    e.preventDefault();
  });

  window.addEventListener("mouseup", () => {
    if (!isGiuThe1) return;
    isGiuThe1 = false;
    ngiuCard1.style.cursor = "grab";
    // Bắt đầu đàn hồi
    animate();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isGiuThe1) return;
    const rect = cloudcontainer1.getBoundingClientRect();
    VitriBanDauX = e.clientX - rect.left;
    VitriBanDauY = e.clientY - rect.top;
    updatePosition();
  });

  function updatePosition() {
    ngiuCard1.style.left = `${VitriBanDauX - ngiuCard1.offsetWidth / 2}px`;
    ngiuCard1.style.top = `${VitriBanDauY - 20}px`;

    if (lanyard1) {
      lanyard1.setAttribute("x1", VitriX);
      lanyard1.setAttribute("y1", VitriY);
      lanyard1.setAttribute("x2", VitriBanDauX);
      lanyard1.setAttribute("y2", VitriBanDauY);
    }
  }

  function animate() {
    if (isGiuThe1) return;

    const dx = VitriBanDauX - VitriNghiX;
    const dy = VitriBanDauY - VitriNghiY;

    const LucX = -hangsoK * dx;
    const LucY = -hangsoK * dy;

    vX += LucX / khoiluong;
    vY += LucY / khoiluong;

    vX *= hesomasat;
    vY *= hesomasat;

    VitriBanDauX += vX;
    VitriBanDauY += vY;

    updatePosition();

    if (
      Math.abs(vX) < 0.1 &&
      Math.abs(vY) < 0.1 &&
      Math.abs(dx) < 0.1 &&
      Math.abs(dy) < 0.1
    ) {
      animFrameId = null;
      return;
    }

    animFrameId = requestAnimationFrame(animate);
  }

  updatePosition();
  animate();
});

// Đàn hồi mây 2
document.addEventListener("DOMContentLoaded", () => {
  const cloudcontainer2 = document.getElementById("Cloud-Card2");
  const lanyard2 = document.querySelector("#soiday2 line");
  const ngiuCard2 = document.getElementById("ngiu-card2");

  let isGiuThe2 = false;
  let animFrameId = null;

  const VitriX = cloudcontainer2.offsetWidth / 2;
  const VitriY = 0; // Đáy SVG

  const VitriNghiX = cloudcontainer2.offsetWidth / 2;
  const VitriNghiY = 150;

  let VitriBanDauX = VitriNghiX;
  let VitriBanDauY = VitriNghiY;

  let vX = 0;
  let vY = 0;

  const hangsoK = 0.03;
  const hesomasat = 0.92;
  const khoiluong = 5;

  ngiuCard2.addEventListener("mousedown", (e) => {
    isGiuThe2 = true;
    vX = 0;
    vY = 0;
    // Dừng animation cũ nếu đang chạy
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    ngiuCard2.style.cursor = "grabbing";
    e.preventDefault();
  });

  window.addEventListener("mouseup", () => {
    if (!isGiuThe2) return;
    isGiuThe2 = false;
    ngiuCard2.style.cursor = "grab";
    // Bắt đầu đàn hồi
    animate();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isGiuThe2) return;
    const rect = cloudcontainer2.getBoundingClientRect();
    VitriBanDauX = e.clientX - rect.left;
    VitriBanDauY = e.clientY - rect.top;
    updatePosition();
  });

  function updatePosition() {
    ngiuCard2.style.left = `${VitriBanDauX - ngiuCard2.offsetWidth / 2}px`;
    ngiuCard2.style.top = `${VitriBanDauY - 20}px`;

    if (lanyard2) {
      lanyard2.setAttribute("x1", VitriX);
      lanyard2.setAttribute("y1", VitriY);
      lanyard2.setAttribute("x2", VitriBanDauX);
      lanyard2.setAttribute("y2", VitriBanDauY);
    }
  }

  function animate() {
    if (isGiuThe2) return;

    const dx = VitriBanDauX - VitriNghiX;
    const dy = VitriBanDauY - VitriNghiY;

    const LucX = -hangsoK * dx;
    const LucY = -hangsoK * dy;

    vX += LucX / khoiluong;
    vY += LucY / khoiluong;

    vX *= hesomasat;
    vY *= hesomasat;

    VitriBanDauX += vX;
    VitriBanDauY += vY;

    updatePosition();

    if (
      Math.abs(vX) < 0.1 &&
      Math.abs(vY) < 0.1 &&
      Math.abs(dx) < 0.1 &&
      Math.abs(dy) < 0.1
    ) {
      animFrameId = null;
      return;
    }

    animFrameId = requestAnimationFrame(animate);
  }

  updatePosition();
  animate();
});

// Hiệu ứng GSAP
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  ".cloud-image-tn .anh3",
  { y: -1000, x: -100, opacity: 0 },
  {
    x: 0,
    y: 0,
    opacity: 1,
    duration: 2,
    ease: "power2.out",
  },
);
gsap.fromTo(
  ".cloud-image-tn .anh4",
  { x: 100000000000, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 2,
    delay: 1,
    ease: "power2.out",
  },
);
gsap.fromTo(
  ".cloud-image-tn .anh5",
  { y: 1000, x: 100, opacity: 0 },
  {
    y: 0,
    x: 0,
    opacity: 1,
    duration: 2,
    delay: 0.5,
    ease: "power2.out",
  },
);
gsap.fromTo(
  "#Cloud-Card1",
  {
    y: -300, // bắt đầu ở trên cao
    rotation: -30, // nghiêng sang trái một chút
    transformOrigin: "50% 0%", // tâm xoay trên đầu (giống treo dây)
    opacity: 0,
  },
  {
    y: 0, // rơi xuống đúng chỗ
    rotation: 0, // trở về cân bằng
    opacity: 1,
    duration: 1.5,
    ease: "bounce.out", // hiệu ứng bật nảy
    onComplete: () => {
      // sau khi rơi xong thì cho nó đung đưa
      gsap.to("#Cloud-Card1", {
        rotation: 5,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
  },
);
gsap.fromTo(
  "#Cloud-Card2",
  {
    y: -300, // bắt đầu ở trên cao
    rotation: 30, // nghiêng sang trái một chút
    transformOrigin: "50% 0%", // tâm xoay trên đầu (giống treo dây)
    opacity: 0,
  },
  {
    y: 0, // rơi xuống đúng chỗ
    rotation: 0, // trở về cân bằng
    opacity: 1,
    duration: 1.5,
    delay: 0.5,
    ease: "bounce.out", // hiệu ứng bật nảy
    onComplete: () => {
      // sau khi rơi xong thì cho nó đung đưa
      gsap.to("#Cloud-Card2", {
        keyframes: [
          { rotation: 5, duration: 1 },
          { rotation: -5, duration: 1 },
        ],
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
  },
);
