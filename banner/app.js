const DURATION = 7000;

const SLIDES = [
  {
    file: "media/闪身步.mp4",
    title: "Flash Step",
    zh: "闪身步",
    fileName: "闪身步.mp4",
    copy: "侧身一闪，落点干净，适合当作舞蹈视频的第一拍。",
    pos: "center",
    motif: "step",
    poster: "media/posters/flash.jpg",
  },
  {
    file: "media/小狗撒钞.mov",
    title: "Cash Pup",
    zh: "小狗撒钞",
    fileName: "小狗撒钞.mov",
    copy: "镜头对着小狗，钞票从上方落下，轻松、亮、好记。",
    pos: "center 42%",
    motif: "cash",
    poster: "media/posters/pup.jpg",
  },
  {
    file: "media/neon舞蹈.mp4",
    title: "Neon Dance",
    zh: "霓虹舞蹈",
    fileName: "neon舞蹈.mp4",
    copy: "霓虹灯管和雾气包住舞步，适合夜店和舞台气氛。",
    pos: "center",
    motif: "neon",
    poster: "media/posters/neon.jpg",
  },
  {
    file: "media/风扇变装.mp4",
    title: "Fan Reveal",
    zh: "风扇变装",
    fileName: "风扇变装.mp4",
    copy: "扇叶转开，造型换好。适合变装和穿搭模板。",
    pos: "center",
    motif: "fan",
    poster: "media/posters/fan.jpg",
  },
  {
    file: "media/舞蹈运镜.mp4",
    title: "Dance Cam",
    zh: "舞蹈运镜",
    fileName: "舞蹈运镜.mp4",
    copy: "人在大厅里转开，镜头跟着空间一起呼吸。",
    pos: "center 42%",
    motif: "cam",
    poster: "media/posters/cam.jpg",
  },
];

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const views = [];
const state = {
  index: 0,
  paused: false,
  muted: true,
  remaining: DURATION,
  stamp: 0,
  timer: 0,
};

function held() {
  return views.some((view) => view.open);
}

function arm() {
  if (state.paused || held() || reduced) return;
  clearTimeout(state.timer);
  state.stamp = performance.now();
  state.timer = window.setTimeout(() => {
    state.timer = 0;
    goTo(state.index + 1);
  }, state.remaining);
}

function disarm() {
  if (!state.timer) return;
  clearTimeout(state.timer);
  state.timer = 0;
  state.remaining = Math.max(0, state.remaining - (performance.now() - state.stamp));
}

function bannerMarkup() {
  const dots = SLIDES.map((_, i) => {
    return `<button class="dot" type="button" role="tab" aria-label="第 ${i + 1} 支" data-index="${i}"><span></span></button>`;
  }).join("");
  return `
    <section class="banner" style="--dur:${DURATION}ms" aria-roledescription="carousel" aria-label="视频 Banner">
      <img class="fallback" alt="">
      <div class="media">
        <video class="vid a" playsinline muted loop preload="auto"></video>
        <video class="vid b" playsinline muted loop preload="auto"></video>
      </div>
      <div class="shade"></div>
      <div class="money" aria-hidden="true"></div>
      <div class="fan" aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <g fill="rgba(255,255,255,.94)">
            <ellipse cx="50" cy="22" rx="9" ry="18"/>
            <ellipse cx="50" cy="22" rx="9" ry="18" transform="rotate(60 50 50)"/>
            <ellipse cx="50" cy="22" rx="9" ry="18" transform="rotate(120 50 50)"/>
            <ellipse cx="50" cy="22" rx="9" ry="18" transform="rotate(180 50 50)"/>
            <ellipse cx="50" cy="22" rx="9" ry="18" transform="rotate(240 50 50)"/>
            <ellipse cx="50" cy="22" rx="9" ry="18" transform="rotate(300 50 50)"/>
          </g>
          <circle cx="50" cy="50" r="7" fill="#fff"/>
          <circle cx="50" cy="50" r="3" fill="#f4a261"/>
        </svg>
      </div>
      <div class="vf" aria-hidden="true"><i></i><i></i><i></i><i></i><b>CAM</b></div>
      <div class="stack">
        <button class="pol back" type="button"><img alt=""></button>
        <button class="pol front" type="button"><img alt=""></button>
      </div>
      <svg class="arrow" viewBox="0 0 150 100" fill="none" aria-hidden="true">
        <path d="M26 78c2-16 12-26 16-28 7 9 8 22 2 30-9 7-20-5-15-18 7-20 34-36 62-44 20-6 38-5 48-2" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
        <path d="M140 12c3 7 5 12 9 16" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
        <path d="M134 30c7-2 14-7 20-11" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      </svg>
      <button class="mute" type="button" aria-label="声音">
        <svg class="ic-on" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 10h3l5-4v12l-5-4H4z"/><path d="M16 10l4 4M20 10l-4 4"/></svg>
        <svg class="ic-off" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 10h3l5-4v12l-5-4H4z"/><path d="M16 9.5a4.5 4.5 0 0 1 0 5"/><path d="M18.5 7a8 8 0 0 1 0 10"/></svg>
      </button>
      <button class="play" type="button" aria-label="播放">
        <svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>
      </button>
      <div class="foot">
        <div class="caption">
          <p class="sub"></p>
          <h2 class="title"></h2>
        </div>
        <div class="dots" role="tablist">${dots}</div>
        <button class="cta" type="button">Try Now</button>
      </div>
      <button class="dim" type="button" aria-label="关闭"></button>
      <div class="sheet">
        <p class="eyebrow">视频模板</p>
        <h3 class="sheet-title"></h3>
        <p class="sheet-copy"></p>
        <button class="use" type="button">使用此模板</button>
      </div>
    </section>`;
}

function mount(el, size) {
  el.innerHTML = bannerMarkup();
  const root = el.querySelector(".banner");
  root.classList.add(size);
  const view = {
    root,
    open: false,
    shown: -1,
    front: 0,
    token: 0,
    vids: [...root.querySelectorAll(".vid")],
  };
  const money = root.querySelector(".money");
  for (let i = 0; i < 11; i += 1) {
    const bill = document.createElement("i");
    const edge = Math.random() < 0.72
      ? (Math.random() < 0.5 ? Math.random() * 26 : 68 + Math.random() * 26)
      : 20 + Math.random() * 60;
    bill.style.left = `${edge}%`;
    bill.style.setProperty("--spin", `${Math.round(Math.random() * 70 - 20)}deg`);
    bill.style.animationDuration = `${(2.5 + Math.random() * 1.8).toFixed(2)}s`;
    bill.style.animationDelay = `${(-Math.random() * 3).toFixed(2)}s`;
    money.appendChild(bill);
  }

  view.applyMute = () => {
    view.vids.forEach((video) => {
      video.muted = state.muted || !video.classList.contains("on");
    });
    root.classList.toggle("is-muted", state.muted);
  };

  view.spinFan = () => {
    const fan = root.querySelector(".fan");
    fan.classList.remove("show");
    void fan.offsetWidth;
    fan.classList.add("show");
  };

  view.paint = (changed) => {
    const slide = SLIDES[state.index];
    const n = SLIDES.length;
    root.classList.toggle("is-paused", state.paused);
    root.classList.toggle("is-light", slide.motif === "step" || slide.motif === "cash");
    root.classList.toggle("is-cash", slide.motif === "cash");
    root.classList.toggle("is-cam", slide.motif === "cam");
    root.classList.toggle("is-open", view.open);
    root.classList.toggle("is-held", held());
    root.querySelector(".fallback").src = slide.poster;
    view.vids.forEach((video) => {
      video.style.objectPosition = slide.pos;
    });

    const pairs = [
      [root.querySelector(".pol.front"), (state.index + 1) % n],
      [root.querySelector(".pol.back"), (state.index + 2) % n],
    ];
    pairs.forEach(([button, index]) => {
      const next = SLIDES[index];
      button.dataset.index = String(index);
      button.querySelector("img").src = next.poster;
      button.querySelector("img").alt = next.zh;
      button.setAttribute("aria-label", `播放${next.zh}`);
    });

    root.querySelectorAll(".dot").forEach((dot, index) => {
      dot.setAttribute("aria-selected", index === state.index ? "true" : "false");
    });
    if (changed) {
      const caption = root.querySelector(".caption");
      view.captionToken = (view.captionToken || 0) + 1;
      const captionToken = view.captionToken;
      caption.classList.add("swap");
      window.setTimeout(() => {
        if (captionToken !== view.captionToken) return;
        root.querySelector(".title").textContent = slide.title;
        root.querySelector(".sub").textContent = slide.zh;
        caption.classList.remove("swap");
      }, 140);
      const fill = root.querySelector('.dot[aria-selected="true"] span');
      if (fill) {
        fill.style.animation = "none";
        void fill.offsetWidth;
        fill.style.animation = "";
      }
    }
    view.applyMute();
  };

  view.crossfade = () => {
    const slide = SLIDES[state.index];
    const incoming = view.vids[1 - view.front];
    const outgoing = view.vids[view.front];
    const url = encodeURI(slide.file);
    view.token += 1;
    const token = view.token;
    const finish = () => {
      if (token !== view.token) return;
      incoming.classList.add("on");
      outgoing.classList.remove("on");
      view.front = 1 - view.front;
      view.applyMute();
      if (!state.paused) incoming.play().catch(() => {});
      window.setTimeout(() => {
        if (!outgoing.classList.contains("on")) outgoing.pause();
      }, 480);
    };
    incoming.poster = slide.poster;
    if (incoming.getAttribute("src") !== url) {
      incoming.addEventListener("loadeddata", finish, { once: true });
      incoming.src = url;
    } else {
      try { incoming.currentTime = 0; } catch (_) { /* not ready yet */ }
      finish();
    }
    if (slide.motif === "fan") view.spinFan();
  };

  view.sync = () => {
    const changed = view.shown !== state.index;
    view.shown = state.index;
    view.paint(changed);
    if (changed) view.crossfade();
  };

  view.setOpen = (value) => {
    view.open = value;
    root.classList.toggle("is-open", value);
    views.forEach((item) => item.root.classList.toggle("is-held", held()));
    if (value) {
      const slide = SLIDES[state.index];
      root.querySelector(".sheet-title").textContent = slide.zh;
      root.querySelector(".sheet-copy").textContent = slide.copy;
      const use = root.querySelector(".use");
      use.textContent = "使用此模板";
      use.classList.remove("done");
      disarm();
    } else if (!state.paused) {
      arm();
    }
  };

  let tracking = false;
  let startX = 0;
  let startY = 0;
  root.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    tracking = true;
    startX = event.clientX;
    startY = event.clientY;
  });
  root.addEventListener("pointerup", (event) => {
    if (!tracking) return;
    tracking = false;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) {
      goTo(state.index + (dx < 0 ? 1 : -1));
      return;
    }
    if (Math.hypot(dx, dy) < 8) togglePause();
  });
  root.addEventListener("pointercancel", () => { tracking = false; });

  root.querySelectorAll(".pol").forEach((button) => {
    button.addEventListener("click", () => goTo(Number(button.dataset.index)));
  });
  root.querySelectorAll(".dot").forEach((dot) => {
    dot.addEventListener("click", () => goTo(Number(dot.dataset.index)));
  });
  root.querySelector(".cta").addEventListener("click", () => view.setOpen(true));
  root.querySelector(".dim").addEventListener("click", () => view.setOpen(false));
  root.querySelector(".play").addEventListener("click", () => togglePause());
  root.querySelector(".mute").addEventListener("click", () => {
    state.muted = !state.muted;
    views.forEach((item) => item.applyMute());
    if (!state.muted) {
      const active = root.querySelector(".vid.on");
      if (active) active.play().catch(() => {});
      window.setTimeout(() => {
        const bytes = active && active.webkitAudioDecodedByteCount;
        if (!bytes) toast("这段预览没有音轨，换成原片后可以开声");
      }, 500);
    }
  });
  root.querySelector(".use").addEventListener("click", () => {
    const use = root.querySelector(".use");
    use.textContent = "已加入创作";
    use.classList.add("done");
    window.setTimeout(() => view.setOpen(false), 850);
  });

  views.push(view);
}

function paintChips() {
  document.querySelectorAll(".chip").forEach((chip, index) => {
    chip.classList.toggle("on", index === state.index);
  });
  const now = document.querySelector("#now");
  if (now) now.textContent = `正在播放 ${SLIDES[state.index].zh}`;
}

function publish() {
  paintChips();
  views.forEach((view) => view.sync());
}

function goTo(index) {
  const next = (index + SLIDES.length) % SLIDES.length;
  if (next === state.index) return;
  state.index = next;
  state.remaining = DURATION;
  clearTimeout(state.timer);
  state.timer = 0;
  views.forEach((view) => {
    if (view.open) view.setOpen(false);
  });
  publish();
  arm();
}

function togglePause() {
  state.paused = !state.paused;
  if (state.paused) {
    disarm();
    views.forEach((view) => view.vids.forEach((video) => video.pause()));
  } else {
    views.forEach((view) => {
      const active = view.root.querySelector(".vid.on");
      if (active) active.play().catch(() => {});
    });
    arm();
  }
  views.forEach((view) => view.root.classList.toggle("is-paused", state.paused));
}

let toastTimer = 0;
function toast(message) {
  const el = document.querySelector("#toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.classList.remove("show"), 1600);
}

function tickClock() {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
  document.querySelectorAll(".clock").forEach((el) => {
    el.textContent = time;
  });
}

const chips = document.querySelector("#chips");
SLIDES.forEach((slide, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "chip";
  button.innerHTML = `<img alt="" src="${slide.poster}"><span><b>${slide.zh}</b><small>${slide.fileName}</small></span>`;
  button.addEventListener("click", () => goTo(index));
  chips.appendChild(button);
});

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => toast(button.dataset.toast));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") goTo(state.index + 1);
  if (event.key === "ArrowLeft") goTo(state.index - 1);
  if (event.key === "Escape") views.forEach((view) => view.open && view.setOpen(false));
  if (event.key === " ") {
    event.preventDefault();
    togglePause();
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    if (!state.paused) disarm();
    views.forEach((view) => view.vids.forEach((video) => video.pause()));
    return;
  }
  if (!state.paused) {
    views.forEach((view) => {
      const active = view.root.querySelector(".vid.on");
      if (active) active.play().catch(() => {});
    });
    arm();
  }
});

tickClock();
window.setInterval(tickClock, 10000);
mount(document.querySelector("#hero-mount"), "lg");
mount(document.querySelector("#phone-mount"), "sm");
publish();
arm();
