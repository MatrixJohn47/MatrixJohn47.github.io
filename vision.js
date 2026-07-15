const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const grid = document.getElementById('pixelGrid');
const SIZE = 17;
function buildSmiley(){
  const cells = Array.from({length:SIZE*SIZE}, ()=>false);
  const mark = (x,y)=>{ x=Math.round(x); y=Math.round(y); if(x>=0&&x<SIZE&&y>=0&&y<SIZE) cells[y*SIZE+x]=true; };
  const center = (SIZE-1)/2;
  for(let a=0;a<360;a+=2.5){
    const rad = a*Math.PI/180;
    mark(center+7.4*Math.cos(rad), center+7.4*Math.sin(rad));
  }
  [-3.2,3.2].forEach(dx=>{
    for(let a=0;a<360;a+=45){
      const rad = a*Math.PI/180;
      mark(center+dx+0.8*Math.cos(rad), center-2.2+0.8*Math.sin(rad));
      mark(center+dx, center-2.2);
    }
  });
  for(let a=25;a<=155;a+=3){
    const rad = a*Math.PI/180;
    mark(center+4.1*Math.cos(rad), center+2.6+4.1*Math.sin(rad));
    mark(center+3.7*Math.cos(rad), center+2.6+3.7*Math.sin(rad));
  }
  return cells;
}
const pattern = buildSmiley();
pattern.forEach(v=>{ const s=document.createElement('span'); if(v) s.classList.add('on'); grid.appendChild(s); });

const sections = document.querySelectorAll('section');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold:0.25});
sections.forEach(s=>io.observe(s));

function sectionProgress(section){
  const rect = section.getBoundingClientRect();
  const total = rect.height - window.innerHeight;
  if(total <= 0) return 1;
  const p = -rect.top / total;
  return Math.min(1, Math.max(0, p));
}

const bigbangSection = document.querySelector('.bigbang');
const canvas = document.getElementById('bigbangCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function sizeCanvas(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
function makeParticles(n){
  particles = [];
  for(let i=0;i<n;i++){
    const angle = Math.random()*Math.PI*2;
    const dist = Math.random();
    particles.push({angle, dist, size: 0.6+Math.random()*1.8, tw: Math.random()*Math.PI*2});
  }
}
sizeCanvas();
makeParticles(180);
window.addEventListener('resize', sizeCanvas);

function drawBigBang(p){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const cx = canvas.width/2, cy = canvas.height*0.42;
  const maxR = Math.hypot(canvas.width,canvas.height)*0.6;
  const coreR = Math.max(2, 14*(1-p*0.6));
  ctx.beginPath();
  ctx.fillStyle = '#F4EEFF';
  ctx.arc(cx,cy,coreR,0,Math.PI*2);
  ctx.fill();
  if(p > 0.02){
    particles.forEach(pt=>{
      const r = pt.dist * maxR * p;
      const x = cx + Math.cos(pt.angle)*r;
      const y = cy + Math.sin(pt.angle)*r;
      const alpha = Math.min(1, p*2) * (0.5+0.5*Math.sin(pt.tw + p*10));
      ctx.beginPath();
      ctx.fillStyle = `rgba(228,223,240,${Math.max(0,alpha)})`;
      ctx.arc(x,y,pt.size,0,Math.PI*2);
      ctx.fill();
    });
  }
}

const starDot = document.getElementById('starDot');
const starSection = document.querySelector('.star');
const pixelGridEl = document.getElementById('pixelGrid');
const pixelSection = document.querySelector('.pixel');

function onScroll(){
  if(!reduceMotion){
    const bbRect = bigbangSection.getBoundingClientRect();
    if(bbRect.bottom > 0 && bbRect.top < window.innerHeight){
      drawBigBang(sectionProgress(bigbangSection));
    }
    const starP = sectionProgress(starSection);
    const glow = 4 + starP*46;
    const scale = 1 + starP*0.6;
    starDot.style.boxShadow = `0 0 ${glow}px ${6+starP*8}px rgba(168,255,184,${0.25+starP*0.35})`;
    starDot.style.transform = `scale(${scale})`;

    const pixP = sectionProgress(pixelSection);
    const zoomScale = 3.2 - pixP*2.2;
    const blurAmt = 5 * (1 - pixP);
    pixelGridEl.style.transform = `scale(${zoomScale})`;
    pixelGridEl.style.filter = `blur(${blurAmt.toFixed(2)}px)`;
  }
}
document.addEventListener('scroll', ()=>requestAnimationFrame(onScroll), {passive:true});
onScroll();
