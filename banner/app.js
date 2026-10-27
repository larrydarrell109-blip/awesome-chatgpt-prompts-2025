const DURATION = 6400;

const SLIDES = [
  {
    id: "step",
    file: "media/闪身步.mp4",
    title: "闪身步",
    theme: "残影",
    line: "一拍换位",
    about: "这张卡讲速度：同一个人留下三道残影，人已经到了下一个点。",
    chip: "t-step",
  },
  {
    id: "cash",
    file: "media/小狗撒钞.mov",
    title: "小狗撒钞",
    theme: "暴富",
    line: "钱从它身上炸开",
    about: "这张卡讲反差：先看见小狗，钞票再从它四周飞出去。",
    chip: "t-cash",
  },
  {
    id: "neon",
    file: "media/neon舞蹈.mp4",
    title: "霓虹舞蹈",
    theme: "霓虹",
    line: "灯勾住身体",
    about: "这张卡讲灯光：暗底上只留品红和青色，把舞姿勾出来。",
    chip: "t-neon",
  },
  {
    id: "fan",
    file: "media/风扇变装.mp4",
    title: "风扇变装",
    theme: "换装",
    line: "转开就是另一套",
    about: "这张卡讲切换：左边这一套，扇叶转开，右边已经是下一套。",
    chip: "t-fan",
  },
  {
    id: "cam",
    file: "media/舞蹈运镜.mp4",
    title: "舞蹈运镜",
    theme: "运镜",
    line: "镜头跟着走",
    about: "这张卡讲机位：人在框里跳，取景框和轨迹表示镜头在移动。",
    chip: "t-cam",
  },
];

const ARTS = {
  step: `
    <div class="streaks"></div>
    <svg class="figures" viewBox="0 0 520 220" fill="none" stroke="#f6f3ec" stroke-width="7" stroke-linecap="round">
      <g transform="translate(20 16)" opacity="0.28"><g class="ghost a">
        <circle cx="78" cy="28" r="12" fill="#f6f3ec" stroke="none"/>
        <path d="M78 42 L70 96 M70 96 L36 150 M70 96 L112 146 M74 58 L40 78 M74 58 L118 40"/>
      </g></g>
      <g transform="translate(150 8)" opacity="0.5"><g class="ghost b">
        <circle cx="78" cy="28" r="12" fill="#f6f3ec" stroke="none"/>
        <path d="M78 42 L70 96 M70 96 L36 150 M70 96 L112 146 M74 58 L40 78 M74 58 L118 40"/>
      </g></g>
      <g transform="translate(290 0)"><g class="ghost c">
        <circle cx="78" cy="28" r="12" fill="#f6f3ec" stroke="none"/>
        <path d="M78 42 L70 96 M70 96 L36 150 M70 96 L112 146 M74 58 L40 78 M74 58 L118 40"/>
      </g></g>
    </svg>`,
  cash: `
    <svg class="dog" viewBox="0 0 200 170">
      <ellipse cx="52" cy="52" rx="24" ry="36" fill="#e7b07a" transform="rotate(-24 52 52)"/>
      <ellipse cx="148" cy="52" rx="24" ry="36" fill="#e7b07a" transform="rotate(24 148 52)"/>
      <ellipse cx="46" cy="50" rx="12" ry="22" fill="#f6d7b8" transform="rotate(-24 46 50)"/>
      <ellipse cx="154" cy="50" rx="12" ry="22" fill="#f6d7b8" transform="rotate(24 154 50)"/>
      <ellipse cx="100" cy="86" rx="62" ry="50" fill="#e7b07a"/>
      <ellipse cx="100" cy="98" rx="28" ry="20" fill="#fff6ea"/>
      <ellipse cx="78" cy="80" rx="7" ry="9" fill="#1b1b1b"/>
      <ellipse cx="122" cy="80" rx="7" ry="9" fill="#1b1b1b"/>
      <circle cx="80" cy="78" r="2" fill="#fff"/>
      <circle cx="124" cy="78" r="2" fill="#fff"/>
      <ellipse cx="100" cy="102" rx="8" ry="5" fill="#1b1b1b"/>
      <path d="M90 112 Q100 128 110 112" fill="#e46b6b"/>
    </svg>`,
  neon: `
    <div class="tubes"><i class="h1"></i><i class="h2"></i><i class="v1"></i></div>
    <svg class="dancer" viewBox="0 0 160 200" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round">
      <circle cx="80" cy="28" r="12"/>
      <path d="M80 42 L76 92 M76 92 L40 150 M76 92 L118 146 M78 58 L36 30 M78 58 L128 46"/>
    </svg>`,
  fan: `
    <div class="split">
      <div class="half before"><span>这一套</span><i class="look coat"></i></div>
      <div class="half after"><span>下一套</span><i class="look dress"></i></div>
    </div>
    <svg class="blades" viewBox="0 0 100 100">
      <g class="spin" fill="#f4f4f4">
        <ellipse cx="50" cy="24" rx="9" ry="18"/>
        <ellipse cx="50" cy="24" rx="9" ry="18" transform="rotate(120 50 50)"/>
        <ellipse cx="50" cy="24" rx="9" ry="18" transform="rotate(240 50 50)"/>
      </g>
      <circle cx="50" cy="50" r="7" fill="#111"/>
    </svg>`,
  cam: `
    <div class="letter top"></div>
    <div class="letter bot"></div>
    <div class="finder"><i></i><i></i><i></i><i></i></div>
    <svg class="route" viewBox="0 0 380 110" fill="none">
      <path d="M10 80 C 80 80, 110 10, 180 36 S 320 8, 360 64" stroke="#8fd0c8" stroke-width="2" stroke-dasharray="5 7"/>
      <circle r="7" fill="#f3ecdf">
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M10 80 C 80 80, 110 10, 180 36 S 320 8, 360 64"/>
      </circle>
    </svg>`,
};

const viewport = document.querySelector("#viewport");
const themes = document.querySelector("#themes");
const themeLine = document.querySelector("#theme-line");
const indexEl = document.querySelector("#index");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

let index = 0;
let paused = false;
let timer = 0;

function slideHTML(slide, i) {
  return `
    <article class="slide ${slide.id}" data-i="${i}" aria-hidden="true">
      <video playsinline muted loop preload="none"></video>
      <div class="art">${ARTS[slide.id]}</div>
      <div class="meta">
        <p class="kicker">${slide.theme}</p>
        <h2>${slide.title}</h2>
        <p class="line">${slide.line}</p>
      </div>
      <i class="bar"></i>
    </article>`;
}

viewport.innerHTML = SLIDES.map(slideHTML).join("");

SLIDES.forEach((slide, i) => {
  const article = viewport.querySelector(`.slide[data-i="${i}"]`);
  const video = article.querySelector("video");
  video.src = encodeURI(slide.file);
  video.addEventListener("loadeddata", () => {
    article.classList.add("has-video");
    if (i === index && !paused) video.play().catch(() => {});
  });
  if (slide.id === "cash") {
    const art = article.querySelector(".art");
    for (let n = 0; n < 10; n += 1) {
      const bill = document.createElement("i");
      bill.className = "bill";
      const angle = (Math.PI * 2 * n) / 10;
      const dist = 90 + (n % 3) * 28;
      bill.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      bill.style.setProperty("--dy", `${Math.sin(angle) * dist - 10}px`);
      bill.style.setProperty("--rot", `${Math.round((n - 5) * 18)}deg`);
      bill.style.animationDelay = `${(n * 0.12).toFixed(2)}s`;
      art.appendChild(bill);
    }
  }
});

SLIDES.forEach((slide, i) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `theme ${slide.chip}`;
  button.innerHTML = `<b>${slide.title}</b><small>${slide.theme}</small>`;
  button.addEventListener("click", () => go(i));
  themes.appendChild(button);
});

function show(next) {
  index = (next + SLIDES.length) % SLIDES.length;
  const slide = SLIDES[index];
  viewport.querySelectorAll(".slide").forEach((article, i) => {
    const on = i === index;
    article.classList.toggle("on", on);
    article.setAttribute("aria-hidden", on ? "false" : "true");
    const video = article.querySelector("video");
    if (on && article.classList.contains("has-video") && !paused) video.play().catch(() => {});
    else video.pause();
    const bar = article.querySelector(".bar");
    if (on) {
      bar.style.animation = "none";
      void bar.offsetWidth;
      bar.style.animation = "";
    }
  });
  themes.querySelectorAll(".theme").forEach((button, i) => button.classList.toggle("on", i === index));
  themeLine.textContent = slide.about;
  indexEl.textContent = `${String(index + 1).padStart(2, "0")} / 05`;
  arm();
}

function arm() {
  clearTimeout(timer);
  if (paused || reduced) return;
  timer = setTimeout(() => show(index + 1), DURATION);
}

function go(next) {
  if (next === index) return;
  show(next);
}

let startX = 0;
let tracking = false;
viewport.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button")) return;
  tracking = true;
  startX = event.clientX;
});
viewport.addEventListener("pointerup", (event) => {
  if (!tracking) return;
  tracking = false;
  const dx = event.clientX - startX;
  if (dx > 40) show(index - 1);
  else if (dx < -40) show(index + 1);
  else {
    paused = !paused;
    viewport.classList.toggle("is-paused", paused);
    const video = viewport.querySelector(".slide.on video");
    if (paused) video.pause();
    else if (video.closest(".slide").classList.contains("has-video")) video.play().catch(() => {});
    arm();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") show(index + 1);
  if (event.key === "ArrowLeft") show(index - 1);
});

const params = new URLSearchParams(location.search);
show(Number(params.get("n") || 1) - 1);
