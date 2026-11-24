import { initHearts } from "./bg-hearts.js";
import { initBurger } from "./burger.js";
import { swiper } from "./slider-camera.js";
import { initLetterFuture } from "./letter-future.js";
import { loveFacts } from "./love-facts.js";

initHearts();
initBurger();
initLetterFuture();
loveFacts();
// ─────────────────────────────────────────────


import L from "leaflet";
// Данные воспоминаний
const BASE = import.meta.env.BASE_URL;
// ─────────────────────────────────────────────
const memories = [
  {
    id: 1,
    title: "Место с которого все началось",
    date: "25 марта 2024",
    lat: 56.757789,
    lng: 48.479497,
    story:
      "Я немного волновался, но после нашего поцелуя этот вечер я вспоминаю каждый день)",
       photos: [
        "./images/map/id1/id1.1.jpg",
    ],
  },
  {
    id: 2,
    title: "Первое видео вместе",
    date: "26 апреля 2024",
    lat: 56.761372,
    lng: 48.491384,
    story:
      "Мы гуляли без маршрута, разговаривали обо всём и никуда не торопились. Один из тех дней, которые остаются прямо в сердечке",
      cover: ["./images/map/id2/id1.1.jpg"],
    videos: ["./video/first-dance.mp4"],
    photos: [
        "./images/map/id2/id1.1.jpg",
        "./images/map/id2/id1.2.jpg",
      ],
  },
  {
    id: 3,
    title: "Наш последний звонок",
    date: "25 мая 2024",
    lat: 56.757374,
    lng: 48.462870,
    story:
      "Наш самый прекрасный и незабываемый, засчёт твоей красоты последний звонок",
    videos: ["./images/map/id3/id3.video.mp4"],
    photos: [
      "./images/map/id3/id.3.1.jpg",
    ],
  },
  {
    id: 4,
    title: "Наш последний звонок",
    date: "25 мая 2024",
    lat: 56.760850,
    lng: 48.473956, 
    story:
      "Тот же самый звонок, только у фонтана)))",
    photos: [
      "./images/map/id4/id4.2.jpg",
      "./images/map/id4/id4.1.jpg",
      "./images/map/id3/id3.3.jpg",
    ],
  },
  {
    id: 5,
    title: "Наш Выпускной",
    date: "25 мая 2024",
    lat: 56.756942,
    lng: 48.463292, 
    story:
      "Наш выпускной, на котором, моя звёздочка сияла ярчке свех (звёздочка - ты, если что)",
    photos: [
      "./images/map/id5/id5.1.jpg",
      "./images/map/id5/id5.2.jpg",
      "./images/map/id5/id5.3.jpg",
      "./images/map/id5/id5.4.jpg",
      "./images/map/id5/id5.5.jpg",
    ],
  },
  {
    id: 6,
    title: "Неделя Кундуштурского озера",
    date: "4 июля 2024",
    lat: 56.623304,
    lng: 48.484905, 
    story:
      "Была неделя невыносимой жары, но после купания с любимой, становилось очень хорошо",
    videos: [
      "./images/map/id6/id6.1.mp4",
      "./images/map/id6/id6.2.mp4",
      "./images/map/id6/id6.3.mp4",
      ],
    // photos: [],
  },
 
  {
    id: 7,
    title: "Видео, которое мне понравилось",
    date: "3 июня 2024",
    lat: 56.755329,
    lng:  48.439919, 
    story:
      "Одно из первых видео, которое ты сделала и я безумно гордился им)))",
    videos: [
      "./images/map/id7/id7.1.mp4",
      ],
  },
  {
    id: 8,
    title: "Весеной расцветаешь и ты",
    date: "весна 2025",
    lat: 51.522923, 
    lng: 46.040107, 
    story:
      "Небольшая фотоссесия для моего распускающегося цветочка",
    photos: [
        "./images/map/id8/id8.1.jpg",
        "./images/map/id8/id8.2.jpg",
        "./images/map/id8/id8.3.jpg",
        "./images/map/id8/id8.4.jpg",
        "./images/map/id8/id8.5.jpg",
      ],
  },
  {
    id: 9,
    title: "Наши первые шашлычки",
    date: "весна 2024",
    lat: 56.820708, 
    lng: 48.459310, 
    story:
      "Было безумно вайбово, от поездки, до поедания самого шашлыка",
    videos: [
      "./images/map/id9/id9.1video.mp4",
      "./images/map/id9/id9.2video.mp4",
    ],
    photos: [
        "./images/map/id9/id9.1.jpg",
        "./images/map/id9/id9.2.jpg",
      ],
  },
  {
    id: 10,
    title: "День купания",
    date: "весна 2025",
    lat: 51.515919, 
    lng: 46.073033, 
    story:
      "Здесь я смешно переключился с клубники на свою любовь всей жизни ♡. День был +вайб",
    videos: [
      "./images/map/id10/id10.video.mp4",
    ],
    photos: [
        "./images/map/id10/id10.1.jpg",
        "./images/map/id10/id10.2.jpg",
      ],
  },
  {
    id: 11,
    title: "Изучение парка - Семхоз",
    date: "лето 2025",
    lat: 51.599111, 
    lng: 46.019270, 
    story:
      "Мне очень нравиться изучать новые места с тобой, моё солнышко",
    photos: [
        "./images/map/id11/id11.1.jpg",
        "./images/map/id11/id11.2.jpg",
        "./images/map/id11/id11.3.jpg",
        "./images/map/id11/id11.4.jpg",
        "./images/map/id11/id11.5.jpg",
        "./images/map/id11/id11.6.jpg",
        "./images/map/id11/id11.7.jpg",
        "./images/map/id11/id11.8.jpg",
        "./images/map/id11/id11.9.jpg",
      ],
  },
  {
    id: 12,
    title: "Клуб в котором мы ходим на концерты",
    date: "Вайбовое время",
    lat:  51.601493, 
    lng:  45.925848, 
    story:
      "Мне очень нравиться изучать новые места с тобой, моё солнышко",
      videos: [
      "./images/map/id12/id12.1.mp4",
      "./images/map/id12/id12.2.mp4",
      "./images/map/id12/id12.3.mp4",
      "./images/map/id12/id12.4.mp4",
    ],
  },
  {
    id: 13,
    title: "Наша вторая годовщина",
    date: "25 марта 2025",
    lat:  51.533123, 
    lng:  46.021537, 
    story:
      "Было очень приятно так посидеть с тобой, вкусно покушать",
      photos: [
        "./images/map/id13/id13.1.jpg",
        "./images/map/id13/id13.2.jpg",
        "./images/map/id13/id13.3.jpg",
      ],
  },
  {
    id: 14,
    title: "Просто одно из первых мили видео",
    date: "лето 2024",
    lat:  56.759053, 
    lng:  48.481919, 
    story:
      "Одно из мили видео, в мое неуклюжем исполнении)",
      videos: [
      "./images/map/id14/id14.video.mp4",
    ],
  },
  {
    id: 15,
    title: "Любимая кофейня",
    date: "зима 2025",
    lat:  51.532016, 
    lng:  46.025819, 
    story:
      "Прекрасное место, для того чтобы выпить настолько же горячего кофе как ты)",
      photos: [
        "./images/map/id15/id15.1.jpg",
      ],
  },
  {
    id: 16,
    title: "Домик на 14 февраля",
    date: "зима 2026",
    lat:  51.567704, 
    lng:  46.106717, 
    story:
      "В этот день, мы очень классно поболтали и провели вечер вместе",
      photos: [
        "./images/map/id16/id16.1.jpg",
        "./images/map/id16/id16.2.jpg",
        "./images/map/id16/id16.3.jpg",
        "./images/map/id16/id16.4.jpg",
        "./images/map/id16/id16.5.jpg",
      ],
  },
  {
    id: 17,
    title: "Прогулка по Йошкар-Оле",
    date: "лето 2026",
    lat:  56.6339, 
    lng:  47.9047, 
    story:
      "Было очень классно, жаде в учет того, что ничего особенного не было, ведь весь вайб задаешь ты. Главное, чтобы ты была и тогда день получиться на все 100%",
      photos: [
        "./images/map/id17/id17.1.jpg",
        "./images/map/id17/id17.2.jpg",
        "./images/map/id17/id17.3.jpg",
      ],
  },
  {
    id: 18,
    title: "Катамаран",
    date: "лето 2026",
    lat:  56.633043, 
    lng:  47.907637, 
    story:
      "Безумно вайбовые покатушки с любимой на катамаранах",
      photos: [
        "./images/map/id18/id18.1.jpg",
        "./images/map/id18/id18.2.jpg",
      ],
  },
  {
    id: 19,
    title: "Фонтанчик любви",
    date: "лето 2025",
    lat:  51.523459,
    lng:  46.042581, 
    story:
      "Под этими прожекторами я влюбился в тебя снова и даже сочитать не могу, в который раз",
      videos: [
      "./images/map/id19/id19.video.mp4",
      ],
  },
  {
    id: 20,
    title: "Любимое место",
    date: "Навсегда в сердечке",
    lat:  51.531374, 
    lng:  46.020064, 
    story:
      "Наша Любимая хинкальня",
      photos: [
        "./images/map/id20/id20.1.jpg",
      ],
      videos: [
      "./images/map/id20/id20.video.mp4",
      ],
  },
  {
    id: 21,
    title: "Фотоссесия искренней любви",
    date: "30 сентября 2025",
    lat:  51.529222, 
    lng:  46.019518, 
    story:
      "Фотосессия, на которой я показывал всю свою любовь к тебе одним лишь взглядом",
      photos: [
        "./images/map/id21/id21.1.jpg",
        "./images/map/id21/id21.2.jpg",
        "./images/map/id21/id21.3.jpg",
        "./images/map/id21/id21.4.jpg",
        "./images/map/id21/id21.5.jpg",
      ],
  },
  {
    id: 22,
    title: "Прогулка с Ленивой Юмбой",
    date: "27 июня 2026",
    lat:  51.526601, 
    lng:  46.020441, 
    story:
      "Я каждый раз влюблялся в тебя, после того как видел как ты обращаешься с Юми, ведь добрый человек также по доброму относиться к животным",
      photos: [
        "./images/map/id22/id22.jpg",
      ],
  },
  {
    id: 23,
    title: "Небольшая фотоссесия",
    date: "2 июля 2026",
    lat:  56.765878, 
    lng:  48.457192, 
    story:
      "Здесь я снова убедился, что ты у меня самая красивая и нет никого, ктобы был красивей тебя. Целую)",
      photos: [
        "./images/map/id23/id23.1.jpg",
        "./images/map/id23/id23.2.jpg",
        "./images/map/id23/id23.3.jpg",
        "./images/map/id23/id23.4.jpg",
        "./images/map/id23/id23.5.jpg",
      ],
      videos: [
      "./images/map/id23/id23video.mp4",
      ],
  },
  {
    id: 24,
    title: "Наша Лесная сказка",
    date: "август 2026",
    lat:  56.426125, 
    lng:  48.075691, 
    story:
      "Это была самая замечательная неделя отдыха вместе",
      photos: [
        "./images/map/id24/id24.1.jpg",
        "./images/map/id24/id24.2.jpg",
        "./images/map/id24/id24.3.jpg",
        "./images/map/id24/id24.4.jpg",
      ],
  },
  {
    id: 25,
    title: "Волгоград",
    date: "2025-2026",
    lat:  48.7423, 
    lng:  44.5370, 
    story:
      "Это мини-путишествия остануться у меня в памяти навсегда",
      photos: [
        "./images/map/id25/id25.1.jpg",
        "./images/map/id25/id25.2.jpg",
        "./images/map/id25/id25.3.jpg",
        
      ],
  },
];

// Карта
const map = L.map("loveMap", {
  zoomControl: true,
  scrollWheelZoom: false,
}).setView([56.757789, 48.479497], 15);

L.tileLayer(
  `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=ef6d1c92-cd2f-48b6-bf43-31f61a4567e8`,
  { attribution: "&copy; Stadia Maps" },
).addTo(map);

// Иконка-сердечко
const heartIcon = L.divIcon({
  className: "",
  html: '<div class="heart-pin">♥</div>',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

// Модалка, экран и галерея
const modal = document.getElementById("memoryModal");
const screen = document.getElementById("screen");
const display = document.getElementById("display");
const gallery = document.getElementById("gallery");

const screenVideo = document.createElement("video");
screenVideo.controls = true;
screenVideo.playsInline = true;
screenVideo.preload = "metadata";
screenVideo.style.maxWidth = "100%";
screenVideo.style.maxHeight = "60vh";
screenVideo.style.display = "none";
screen.appendChild(screenVideo);

// Показать фото на экране
function showPhoto(src) {
  screenVideo.pause();
  screenVideo.style.display = "none";
  display.hidden = false;
  display.src = src;
}

function showVideo(src) {
  display.hidden = true;
  screenVideo.style.display = "block";
  screenVideo.src = src;
  createVideoThumb(src, (thumb) => {
    screenVideo.poster = thumb || src.replace(/\.mp4$/i, ".jpg");
  });
}

// --- Генерация первого кадра локальных видео ---
const videoThumbs = new Map(); // кэш: src -> dataURL

function createVideoThumb(src, callback) {
  if (videoThumbs.has(src)) { callback(videoThumbs.get(src)); return; }

  const v = document.createElement("video");
  v.muted = true;
  v.playsInline = true;
  v.preload = "metadata";
  v.src = src;

  const grab = () => {
    v.removeEventListener("seeked", grab);
    v.removeEventListener("error", onError);
    try {
      const c = document.createElement("canvas");
      c.width = 320; // ширина превью, на качество экрана не влияет
      c.height = v.videoWidth ? Math.round(320 * (v.videoHeight / v.videoWidth)) : 180;
      c.getContext("2d").drawImage(v, 0, 0, c.width, c.height);
      const url = c.toDataURL("image/jpeg", 0.7);
      videoThumbs.set(src, url);
      callback(url);
    } catch (e) {
      callback(null); // canvas испорчен — вернём заглушку
    }
    v.removeAttribute("src");
  };

  const onError = () => {
    v.removeEventListener("seeked", grab);
    callback(null);
  };

  v.addEventListener("loadeddata", () => { v.currentTime = 0.1; });
  v.addEventListener("seeked", grab);
  v.addEventListener("error", onError);
}


function stopScreenVideo() {
  screenVideo.pause();
}
function getItems(m) {
  return [
    ...(m.photos || []).map((src) => ({ type: "photo", src })),
    ...(m.videos || []).map((src) => ({ type: "video", src })),
  ];
}

// Открыть воспоминание
function openMemory(m) {
  document.getElementById("cover").style.backgroundImage = `url('${m.cover}')`;
  document.getElementById("date").textContent = m.date;
  document.getElementById("title").textContent = m.title;
  document.getElementById("story").textContent = m.story;

  const items = getItems(m);

  items
  .filter((it) => it.type === "video" && !getYouTubeId(it.src))
  .forEach((it) => createVideoThumb(it.src, () => {}));


  function getYouTubeId(src) {
    const m = src.match(
      /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/,
    );
    return m ? m[1] : null;
  }

  // --- Внутри функции openMemory, блок создания галереи ---
  gallery.innerHTML = "";
  items.forEach((item, i) => {
    let el;
    let srcForDisplay = item.src;

    if (item.type === "photo") {
      el = document.createElement("img");
      el.src = srcForDisplay;
      el.loading = "lazy";
      el.decoding = "async"; 
      el.alt = m.title;
    } else {
      const ytId = getYouTubeId(item.src);

      if (ytId) {
        // YouTube: берем готовый постер с серверов Google
        el = document.createElement("img");
        el.src = `https://img.youtube.com/vi/\${ytId}/hqdefault.jpg`;
          el.loading = "lazy";
      } else {
  el = document.createElement("img");
  el.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M8 5v14l11-7z'/%3E%3C/svg%3E`;
  el.style.background = "#333";
  el.style.objectFit = "contain";
  el.style.padding = "10px";
  createVideoThumb(item.src, (thumb) => {
    if (thumb) {
      el.src = thumb;
      el.style.background = "";
      el.style.objectFit = "";
      el.style.padding = "";
    }
  });
}

    }

    el.dataset.src = item.src;
    el.dataset.type = item.type;
    el.classList.add("thumb");
    if (i === 0) el.classList.add("active");
    gallery.appendChild(el);
  });

  // На экране изначально — первый элемент (фото или видео)
  if (items.length) {
    if (items[0].type === "video") {
      showVideo(items[0].src);
    } else {
      showPhoto(items[0].src);
    }
  } else {
    showPhoto("");
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

// Закрыть модалку
function closeMemory() {
  stopScreenVideo();
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

// Метки на карте
memories.forEach((m) =>
  L.marker([m.lat, m.lng], { icon: heartIcon })
    .addTo(map)
    .on("click", () => openMemory(m)),
);

// Закрытие по крестику и по фону
document
  .querySelectorAll("[data-close]")
  .forEach((el) => el.addEventListener("click", closeMemory));

// Закрытие по Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMemory();
});

// Клик по любой миниатюре (фото или видео) — показываем её на экране
gallery.addEventListener("click", (e) => {
  const item = e.target.closest("[data-src]");
  if (!item) return;

  gallery
    .querySelectorAll("[data-src]")
    .forEach((t) => t.classList.remove("active"));
  item.classList.add("active");

  if (item.dataset.type === "video") {
    showVideo(item.dataset.src);
  } else {
    showPhoto(item.dataset.src);
  }
});
