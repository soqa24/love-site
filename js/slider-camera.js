import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.slider-camera .swiper', {
  modules: [Navigation, Pagination, Autoplay],
   loop: true,
  loopAdditionalSlides: 2,   // больше клонов — плавнее склейка
  slidesPerView: 2.2,
  centeredSlides: true,
  spaceBetween: 32,
  speed: 1600,                // фиксированная скорость анимации
  autoplay: { delay: 3000, disableOnInteraction: false },
  navigation: {
    nextEl: '.slider-camera-next',
    prevEl: '.slider-camera-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    // от 0 до 576px включительно
    576: {
      slidesPerView: 2.5,
      spaceBetween: 28,
      centeredSlides: true,
    },
    320: {
      slidesPerView: 1.5,
      spaceBetween: 24,
      centeredSlides: true,
    },
  },
});

const btnStop = document.querySelector('.btn-stop');
const btnPlay = document.querySelector('.btn-play');

btnStop.addEventListener('click', () => {
  swiper.autoplay.stop();
});

btnPlay.addEventListener('click', () => {
  swiper.autoplay.start();
});

// пластинка с музыкой
const song = document.getElementById('slider-camera-song');
const plate = document.querySelector('.slider-camera-plate');
const section = document.querySelector('.slider-camera'); // блок, к которому долистали

let hasPlayed = false;      // «первый раз»: после первого старта не restart-им принудительно
let fadeInterval = null;
let isPausedByClick = false; // пользователь остановил сам — не возобновляем при скролле

// Плавное изменение громкости
function fadeTo(targetVolume, duration = 2000, onDone = null) {
  clearInterval(fadeInterval);
  const stepTime = 50;
  const steps = duration / stepTime;
  const startVolume = song.volume;
  let step = 0;

  fadeInterval = setInterval(() => {
    step++;
    const progress = step / steps;
    song.volume = Math.max(0, Math.min(1, startVolume + (targetVolume - startVolume) * progress));

    if (step >= steps) {
      clearInterval(fadeInterval);
      if (onDone) onDone();
    }
  }, stepTime);
}

// Появление блока в зоне видимости
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Долистали до блока
      if (!isPausedByClick) {
        if (!hasPlayed) {
          // Первый запуск
          song.volume = 0;
          song.play().catch(() => {}); // браузер может заблокировать autoplay
          fadeTo(0.01, 5000);
          hasPlayed = true;
        } else {
          // Вернулись к блоку — плавно наращиваем
          song.play().catch(() => {});
          fadeTo(0.01, 5000);
        }
      }
    } else {
      // Ушли от блока — плавное отдаление и глушение
      fadeTo(0, 1500, () => {
        if (!entry.isIntersecting) song.pause();
      });
    }
  });
}, { threshold: 0.4 }); // музыка стартует, когда блок виден на 40%

observer.observe(section);

// Клик по пластинке — пауза / продолжить
plate.addEventListener('click', () => {
  if (isPausedByClick) {
    isPausedByClick = false;
    song.play().catch(() => {});
    fadeTo(1, 800);
  } else {
    isPausedByClick = true;
    fadeTo(0, 600, () => song.pause());
  }
});



export { swiper };
