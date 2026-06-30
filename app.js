window.PPT_SLIDES = [{"src": "slides/slide-01.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-02.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-03.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-04.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-05.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-06.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-07.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-08.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-09.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-10.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-11.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-12.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-13.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-14.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-15.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-16.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-17.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-18.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-19.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-20.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-21.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-22.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-23.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-24.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-25.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-26.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-27.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-28.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-29.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-30.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-31.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-32.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-33.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-34.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-35.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-36.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-37.webp", "width": 1920, "height": 1080}, {"src": "slides/slide-38.webp", "width": 1920, "height": 1080}];

const slidesData = window.PPT_SLIDES;
const deck = document.getElementById("deck");
const pageNow = document.getElementById("pageNow");
const pageTotal = document.getElementById("pageTotal");
const progress = document.getElementById("progress");
let current = 0;

deck.innerHTML = slidesData.map((slide, index) =>
  `<section class="slide"><img src="${slide.src}" alt="第 ${index + 1} 页" draggable="false"></section>`
).join("");

const slides = [...document.querySelectorAll(".slide")];
pageTotal.textContent = slides.length;

function preload(index) {
  [index - 1, index, index + 1].forEach(i => {
    const src = slidesData[i]?.src;
    if (src) {
      const img = new Image();
      img.src = src;
    }
  });
}

function go(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
  pageNow.textContent = current + 1;
  progress.style.width = `${((current + 1) / slides.length) * 100}%`;
  preload(current);
}
window.go = go;

document.getElementById("prev").addEventListener("click", () => go(current - 1));
document.getElementById("next").addEventListener("click", () => go(current + 1));
window.addEventListener("keydown", e => {
  if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) go(current + 1);
  if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) go(current - 1);
});

let startX = 0, startY = 0;
deck.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}, { passive: true });
deck.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;
  if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) go(current + (dx < 0 ? 1 : -1));
}, { passive: true });

go(0);
