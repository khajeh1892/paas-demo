const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
window.addEventListener("resize", resize);
resize();

const W = () => window.innerWidth;
const H = () => window.innerHeight;

let stars = [];
function initStars(){
  stars = Array.from({length: 220}, () => ({
    x: Math.random()*W(),
    y: Math.random()*H(),
    z: 0.5 + Math.random()*2.5, // speed factor
    r: Math.random()*1.8 + 0.2
  }));
}
initStars();

function tick(){
  ctx.clearRect(0,0,W(),H());

  // subtle vignette glow
  const g = ctx.createRadialGradient(W()/2, H()/2, 50, W()/2, H()/2, Math.max(W(),H()));
  g.addColorStop(0, "rgba(0,255,255,0.06)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0,0,W(),H());

  ctx.fillStyle = "white";
  for(const s of stars){
    s.y += 1.2 * s.z;
    s.x += 0.25 * s.z; // slight drift
    if(s.y > H()+10){ s.y = -10; s.x = Math.random()*W(); }
    if(s.x > W()+10){ s.x = -10; s.y = Math.random()*H(); }

    ctx.globalAlpha = Math.min(1, 0.35 + s.z/3);
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  requestAnimationFrame(tick);
}
tick();

// sound: browsers require user gesture
const startBtn = document.getElementById("startBtn");
const sfx = document.getElementById("sfx");

startBtn?.addEventListener("click", async () => {
  try{
    sfx.currentTime = 0;
    await sfx.play();
    startBtn.textContent = "Sound ON";
  }catch(e){
    startBtn.textContent = "Sound blocked";
  }
});
