const MONSTERS = [
  "1\ Pink_Monster/Pink_Monster_Run_6.png",
  "2\ Owlet_Monster/Owlet_Monster_Run_6.png",
  "3\ Dude_Monster/Dude_Monster_Run_6.png",
];

const ALL_PHOTOS = [
  "DMHB4051.JPG",
  "FQHJ9991.JPG",
  "IIGA7105.JPG",
  "JKHH1502.JPG",
  "MDZO4774.JPG",
  "PSAO0595.JPG",
  "QEGN2905.JPG",
  "QRBN5339.JPG",
  "QWZW0045.JPG",
  "RHFB7796.JPG",
  "UIPO8918.JPG",
  "VDYM2166.JPG",
  "XGHW4666.JPG",
  "XXBD6179.JPG",
];

const TOTAL_SCENES = 18;

function randBetween(min, max) {
  return min + Math.random() * (max - min);
}

function randItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Tạo các làn không quá gần nhau
function generateLanes(count) {
  const MIN_GAP = 52; // px tối thiểu giữa 2 làn
  const TOP_PAD = 60; // px tránh mép trên
  const BOT_PAD = 60; // px tránh mép dưới
  const maxH = window.innerHeight - TOP_PAD - BOT_PAD;

  const lanes = [];
  let attempts = 0;

  while (lanes.length < count && attempts < 2000) {
    attempts++;
    const candidate = TOP_PAD + Math.random() * maxH;
    const tooClose = lanes.some((l) => Math.abs(l - candidate) < MIN_GAP);
    if (!tooClose) lanes.push(candidate);
  }

  // Nếu không đủ làn (màn nhỏ), nới lỏng khoảng cách
  if (lanes.length < count) {
    const step = maxH / count;
    while (lanes.length < count) {
      lanes.push(TOP_PAD + lanes.length * step);
    }
  }

  return lanes;
}

function createScene({
  spriteSrc,
  photoSrc,
  topPx,
  goRight,
  speed,
  delay,
  scale,
}) {
  const scene = document.createElement("div");
  scene.className = "scene";
  scene.style.top = `${topPx}px`;
  // Căn đáy theo làn
  scene.style.transform = "translateY(-100%)";

  // ── Nhân vật ──
  const char = document.createElement("div");
  char.className = "character";
  char.style.backgroundImage = `url('${spriteSrc}')`;
  char.style.transform = `scale(${scale}) scaleX(${goRight ? 1 : -1})`;
  char.style.transformOrigin = goRight ? "bottom right" : "bottom left";

  // ── Ảnh bị đẩy ──
  const frame = document.createElement("div");
  frame.className = "pushed-image";

  if (!goRight) {
    // Lật wobble và origin cho hướng ngược
    frame.style.transformOrigin = "bottom right";
    frame.style.animation = "wobble-left 0.5s ease-in-out infinite alternate";
    frame.style.marginLeft = "0";
    frame.style.marginRight = "-4px";
  }

  const img = document.createElement("img");
  img.src = photoSrc;
  img.alt = "";
  frame.appendChild(img);

  // Ảnh luôn phía TRƯỚC hướng chạy
  if (goRight) {
    scene.appendChild(char);
    scene.appendChild(frame);
  } else {
    scene.appendChild(frame);
    scene.appendChild(char);
  }

  // Ẩn ra ngoài màn trong lúc chờ delay
  scene.style.left = goRight ? "-380px" : "110%";
  scene.style.visibility = "hidden";

  // Animation di chuyển
  scene.style.animation = `${goRight ? "ltr" : "rtl"} ${speed}s linear ${delay}s infinite`;

  // Hiện lại đúng lúc animation bắt đầu
  scene.addEventListener(
    "animationstart",
    () => {
      scene.style.visibility = "visible";
    },
    { once: true },
  );

  // Đổi ảnh random sau mỗi vòng lặp
  // scene.addEventListener('animationiteration', () => {
  //     img.src = randItem(ALL_PHOTOS);
  // });

  return scene;
}

function init() {
  const lanes = generateLanes(TOTAL_SCENES);

  let ltrCount = 0;
  let rtlCount = 0;

  lanes.forEach((topPx, i) => {
    const goRight = i % 2 === 0; // xen kẽ đều 2 hướng
    const speed = randBetween(8, 18); // 8–18s mỗi vòng
    // Mỗi hướng delay riêng, trải đều để không xuất hiện cùng lúc
    const delay = goRight
      ? ltrCount++ * randBetween(0.4, 1.0)
      : rtlCount++ * randBetween(0.4, 1.0);
    const scale = randBetween(1.6, 2.6); // kích thước hơi khác nhau

    const scene = createScene({
      spriteSrc: randItem(MONSTERS), // random TỰ DO, trùng cũng được
      photoSrc: randItem(ALL_PHOTOS), // random TỰ DO, trùng cũng được
      topPx,
      goRight,
      speed,
      delay,
      scale,
    });

    document.body.appendChild(scene);
  });
}

init();
