const musicBtn = document.getElementById("musicToggle");
const audio = document.getElementById("bgm");

let musicOn = false;
musicBtn.addEventListener("click", () => {
  if (!musicOn) { audio.play().catch(() => {}); fadeAudio(0.6); musicOn = true; }
  else { fadeAudio(0); setTimeout(() => audio.pause(), 1200); musicOn = false; }
});

function fadeAudio(target, ms = 1200) {
  const start = audio.volume;
  const step = 0.04 * (target > start ? 1 : -1);
  const interval = setInterval(() => {
    const next = +(audio.volume + step).toFixed(2);
    if ((step > 0 && next >= target) || (step < 0 && next <= target)) {
      audio.volume = target; clearInterval(interval);
    } else audio.volume = Math.min(1, Math.max(0, next));
  }, ms / (Math.abs(target - start) / Math.abs(step)));
}

/* Bokeh background */
const bokeh = document.getElementById("bokeh");
const ctx = bokeh.getContext("2d");
function resizeCanvas() { bokeh.width = window.innerWidth; bokeh.height = window.innerHeight; }
resizeCanvas(); window.addEventListener("resize", resizeCanvas);

const circles = Array.from({ length: 24 }).map(() => ({
  x: Math.random() * bokeh.width,
  y: Math.random() * bokeh.height,
  r: 20 + Math.random() * 60,
  a: 0.05 + Math.random() * 0.15,
  v: 0.2 + Math.random() * 0.6
}));

function drawBokeh() {
  ctx.clearRect(0, 0, bokeh.width, bokeh.height);
  circles.forEach(c => {
    c.y += c.v * 0.2;
    if (c.y - c.r > bokeh.height) c.y = -c.r;
    const grd = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
    grd.addColorStop(0, `rgba(255,255,255,${c.a})`);
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grd;
    ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2); ctx.fill();
  });
  requestAnimationFrame(drawBokeh);
}
drawBokeh();
