// ─── BACKGROUND STARS ───
(function () {
    const c = document.getElementById('bgc'), ctx = c.getContext('2d');
    let W, H, stars = [];
    function rs() { W = c.width = innerWidth; H = c.height = innerHeight }
    function is() { stars = []; for (let i = 0; i < 280; i++) { const r = Math.random(); stars.push({ x: Math.random() * W, y: Math.random() * H, r: r < .65 ? Math.random() * .7 + .15 : Math.random() * 1.9 + .7, a: Math.random(), da: (.002 + Math.random() * .009) * (Math.random() < .5 ? 1 : -1), g: r < .3 }) } }
    function dr() {
        ctx.clearRect(0, 0, W, H);
        const gb = ctx.createLinearGradient(0, 0, 0, H); gb.addColorStop(0, '#04010e'); gb.addColorStop(.45, '#08031a'); gb.addColorStop(1, '#06020f'); ctx.fillStyle = gb; ctx.fillRect(0, 0, W, H);
        stars.forEach(s => {
            s.a += s.da; if (s.a > 1 || s.a < 0) s.da *= -1;
            const col = s.g ? `rgba(201,168,76,` : `rgba(255,${155 + ~~(Math.random() * 80)},${195 + ~~(Math.random() * 55)},`;
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = col + Math.max(0, s.a) + ')'; ctx.fill();
        });
        requestAnimationFrame(dr);
    }
    window.addEventListener('resize', () => { rs(); is() }); rs(); is(); dr();
})();

// ─── FLOATING MOTES ───
(function () {
    const c = document.getElementById('ptc'), ctx = c.getContext('2d');
    let W, H, ms = [];
    function rs() { W = c.width = innerWidth; H = c.height = innerHeight }
    function im() { ms = []; for (let i = 0; i < 55; i++)ms.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .28, vy: -Math.random() * .38 - .08, r: Math.random() * 2.2 + .4, a: Math.random() * .55 + .08, life: Math.random(), col: Math.random() < .6 ? '201,168,76' : '255,95,155' }) }
    function dr() { ctx.clearRect(0, 0, W, H); ms.forEach(m => { m.x += m.vx; m.y += m.vy; m.life += .0028; if (m.life > 1) { m.life = 0; m.x = Math.random() * W; m.y = H + 8 } const a = Math.sin(m.life * Math.PI) * m.a; const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 3.5); g.addColorStop(0, `rgba(${m.col},${a})`); g.addColorStop(1, `rgba(${m.col},0)`); ctx.beginPath(); ctx.arc(m.x, m.y, m.r * 3.5, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill() }); requestAnimationFrame(dr) }
    window.addEventListener('resize', () => { rs(); im() }); rs(); im(); dr();
})();

// ─── FIREFLIES ───
(function () {
    for (let i = 0; i < 16; i++) {
        const f = document.createElement('div');
        f.className = 'ff';
        const sz = 2 + Math.random() * 3.5;
        f.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}vw;top:${Math.random() * 100}vh;animation-duration:${9 + Math.random() * 13}s;animation-delay:${Math.random() * 9}s;opacity:0`;
        document.body.appendChild(f)
    }
})();

// ─── TULIP GARDEN ─── 
const GCV = document.getElementById('gc');
const gctx = GCV.getContext('2d');
let GW, GH, tulipProg = 0;
const TDATA = [{ x: .04, mh: .68, c1: '#b00e5a', c2: '#ee3a96', c3: '#ff7ebc', L: 'R', s: .72 },
{ x: .12, mh: .78, c1: '#980a50', c2: '#df3090', c3: '#ff80c0', L: 'L', s: .88 },
{ x: .20, mh: .86, c1: '#cc1868', c2: '#ff4da8', c3: '#ffaad8', L: 'R', s: .98 },
{ x: .28, mh: .74, c1: '#a80e58', c2: '#e02882', c3: '#ff72b4', L: 'L', s: .83 },
{ x: .36, mh: .92, c1: '#c8166a', c2: '#ff4aa4', c3: '#ff9ed0', L: 'R', s: 1.08 },
{ x: .44, mh: .97, c1: '#dc1e6c', c2: '#ff5aaa', c3: '#ffadd8', L: 'L', s: 1.18 },
{ x: .52, mh: .90, c1: '#b41664', c2: '#ed4898', c3: '#ffa8ca', L: 'R', s: 1.04 },
{ x: .60, mh: .84, c1: '#c01e6e', c2: '#ff52a6', c3: '#ffaadc', L: 'L', s: .93 },
{ x: .68, mh: .77, c1: '#a80e5e', c2: '#e03e90', c3: '#ff82ba', L: 'R', s: .86 },
{ x: .76, mh: .72, c1: '#cc1668', c2: '#ff3e9e', c3: '#ff82bc', L: 'L', s: .80 },
{ x: .84, mh: .65, c1: '#b21060', c2: '#e02a88', c3: '#ff6eb0', L: 'R', s: .76 },
{ x: .92, mh: .58, c1: '#980850', c2: '#cc2078', c3: '#ff60ac', L: 'L', s: .70 },
{ x: .08, mh: .50, c1: '#780840', c2: '#c01e68', c3: '#f850a8', L: 'R', s: .58, bg: 1 },
{ x: .24, mh: .47, c1: '#860a46', c2: '#c82270', c3: '#ff72b6', L: 'L', s: .56, bg: 1 },
{ x: .42, mh: .54, c1: '#7a0840', c2: '#be1e66', c3: '#f870b0', L: 'R', s: .60, bg: 1 },
{ x: .58, mh: .48, c1: '#840a48', c2: '#c0206a', c3: '#ff60ae', L: 'L', s: .57, bg: 1 },
{ x: .74, mh: .51, c1: '#800840', c2: '#ba1a62', c3: '#f05aaa', L: 'R', s: .59, bg: 1 },
{ x: .90, mh: .44, c1: '#7a0838', c2: '#be1860', c3: '#f060a8', L: 'L', s: .55, bg: 1 },];

function drawLeaf(sx, sy, ex, cy2, alpha, right, s) {
    gctx.save();
    gctx.globalAlpha = alpha;
    const lg = gctx.createLinearGradient(sx, sy, ex, cy2);
    lg.addColorStop(0, '#286030');
    lg.addColorStop(.45, '#58a855');
    lg.addColorStop(1, '#38803a');
    gctx.beginPath();
    gctx.moveTo(sx, sy);
    gctx.quadraticCurveTo(ex, cy2, ex, sy + (sy - cy2) * .08);
    gctx.quadraticCurveTo((sx + ex) / 2, sy + 14 * s, sx, sy);
    gctx.fillStyle = lg;
    gctx.fill(); gctx.beginPath();
    gctx.moveTo(sx, sy);
    gctx.quadraticCurveTo(ex, cy2, ex, sy + (sy - cy2) * .08);
    gctx.strokeStyle = 'rgba(38,90,38,0.4)';
    gctx.lineWidth = .9;
    gctx.stroke();
    gctx.restore();
}

function drawFlower(cx, cy, c1, c2, c3, fp, s) {
    const pw = 27 * s, ph = 46 * s, spr = fp;
    gctx.save();
    gctx.globalAlpha = fp * .28;

    for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + Math.PI * .1;
        const ox = Math.sin(a) * pw * .55 * spr + 2, oy = -Math.abs(Math.cos(a)) * ph * .26 * spr + 5;
        gctx.beginPath();
        gctx.ellipse(cx + ox, cy + oy - ph * .44 * spr, pw * .5, ph * .62 * spr + ph * .09, a, 0, Math.PI * 2);
        gctx.fillStyle = 'rgba(0,0,0,.4)';
        gctx.fill()
    }

    gctx.globalAlpha = 1;

    for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 + Math.PI * .14;
        const ox = Math.sin(a) * pw * .66 * spr, oy = -Math.abs(Math.cos(a)) * ph * .29 * spr;
        const pg = gctx.createRadialGradient(cx + ox * .28, cy + oy - ph * .32 * spr, 0, cx + ox, cy + oy - ph * .46 * spr, ph * .72);
        pg.addColorStop(0, c3);
        pg.addColorStop(.48, c2);
        pg.addColorStop(1, c1);
        gctx.beginPath();
        gctx.ellipse(cx + ox, cy + oy - ph * .43 * spr, pw * .49, ph * .66 * spr + ph * .08, a, 0, Math.PI * 2);
        gctx.fillStyle = pg;
        gctx.fill(); gctx.strokeStyle = 'rgba(0,0,0,.13)'; gctx.lineWidth = .7;
        gctx.stroke()
    }

    for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2 + Math.PI * (.14 + 0.5 / 3);
        const ox = Math.sin(a) * pw * .58 * spr, oy = -Math.abs(Math.cos(a)) * ph * .22 * spr;
        const pg = gctx.createRadialGradient(cx + ox * .2, cy + oy - ph * .28 * spr, 0, cx + ox, cy + oy - ph * .43 * spr, ph * .65);
        pg.addColorStop(0, c3);
        pg.addColorStop(.38, c2);
        pg.addColorStop(1, c1 + 'cc');
        gctx.beginPath();
        gctx.ellipse(cx + ox, cy + oy - ph * .38 * spr, pw * .52, ph * .68 * spr + ph * .08, a, 0, Math.PI * 2);
        gctx.fillStyle = pg;
        gctx.fill();
        gctx.strokeStyle = 'rgba(0,0,0,.1)';
        gctx.lineWidth = .7;
        gctx.stroke();
        gctx.save();
        gctx.globalAlpha = fp * .22;
        gctx.beginPath();
        gctx.ellipse(cx + ox * .3, cy + oy - ph * .52 * spr, pw * .18, ph * .3 * spr, a, 0, Math.PI * 2);
        gctx.fillStyle = 'rgba(255,255,255,.65)';
        gctx.fill();
        gctx.restore()
    }

    const cg = gctx.createRadialGradient(cx, cy - ph * .19 * spr, 0, cx, cy - ph * .16 * spr, pw * .38);
    cg.addColorStop(0, '#fff8b0');
    cg.addColorStop(.4, '#f0c038');
    cg.addColorStop(.7, '#d48c08');
    cg.addColorStop(1, '#a05806');
    gctx.beginPath();
    gctx.ellipse(cx, cy - ph * .16 * spr, pw * .36, pw * .27, 0, 0, Math.PI * 2);
    gctx.fillStyle = cg;
    gctx.fill();

    for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2, sr = pw * .22, sx = cx + Math.cos(a) * sr * fp, sy2 = cy - ph * .16 * spr + Math.sin(a) * sr * .6 * fp - 9 * fp * s;
        gctx.beginPath();
        gctx.moveTo(cx + Math.cos(a) * sr * .28, cy - ph * .14 * spr + Math.sin(a) * 2);
        gctx.lineTo(sx, sy2);
        gctx.strokeStyle = 'rgba(195,145,0,.7)';
        gctx.lineWidth = .75;
        gctx.stroke();
        gctx.beginPath();
        gctx.arc(sx, sy2, 1.8 * s * fp, 0, Math.PI * 2);
        gctx.fillStyle = '#ffcc00';
        gctx.fill()
    }

    if (fp > .82 && s > .82) {
        gctx.save();
        gctx.globalAlpha = (fp - .82) / .18 * .65;
        gctx.beginPath();
        gctx.arc(cx + pw * .32 * spr, cy - ph * .57 * spr, 2.8 * s, 0, Math.PI * 2);
        const dg = gctx.createRadialGradient(cx + pw * .32 * spr - 1, cy - ph * .57 * spr - 1, 0, cx + pw * .32 * spr, cy - ph * .57 * spr, 2.8 * s);
        dg.addColorStop(0, 'rgba(255,255,255,.92)');
        dg.addColorStop(.5, 'rgba(180,220,255,.5)');
        dg.addColorStop(1, 'rgba(100,160,220,.28)');
        gctx.fillStyle = dg;
        gctx.fill();
        gctx.restore();
    }

    gctx.restore();

}

function drawTulip(t, p) {
    if (p < .005) return;
    const bx = t.x * GW, byG = GH, maxH = t.mh * GH, curH = maxH * p, topY = byG - curH;
    const lean = (t.L === 'R' ? .022 : -.022) * GW, lx = bx + lean * p;
    const cpx = bx + lean * .35, cpy = byG - curH * .45, cp2x = lx - lean * .12, cp2y = topY + curH * .22;
    const s = t.s;
    gctx.beginPath();
    gctx.moveTo(bx + 3, byG);
    gctx.bezierCurveTo(cpx + 4, cpy, cp2x + 3, cp2y, lx + 3, topY);
    gctx.strokeStyle = 'rgba(0,0,0,.28)';
    gctx.lineWidth = 6 * s;
    gctx.lineCap = 'round';
    gctx.stroke();
    const sg = gctx.createLinearGradient(bx - 7 * s, 0, bx + 7 * s, 0);
    sg.addColorStop(0, '#285c2e');
    sg.addColorStop(.32, '#489848');
    sg.addColorStop(.6, '#387c3c');
    sg.addColorStop(1, '#1e4824');
    gctx.beginPath();
    gctx.moveTo(bx, byG);
    gctx.bezierCurveTo(cpx, cpy, cp2x, cp2y, lx, topY);
    gctx.strokeStyle = sg;
    gctx.lineWidth = 5 * s;
    gctx.lineCap = 'round';
    gctx.stroke();
    gctx.beginPath();
    gctx.moveTo(bx - 1.2 * s, byG);
    gctx.bezierCurveTo(cpx - 1.2 * s, cpy, cp2x - 1.2 * s, cp2y, lx - 1.2 * s, topY);
    gctx.strokeStyle = 'rgba(110,195,110,.28)';
    gctx.lineWidth = 1.4 * s;
    gctx.stroke();

    if (p > .24) {
        const lp = Math.min(1, (p - .24) / .36), l1y = byG - curH * .38, l1bx = lx + (t.L === 'R' ? 1 : -1) * 68 * s * lp; drawLeaf(bx, l1y, l1bx, l1y - 22 * s * lp, lp, t.L === 'R', s);
    }

    if (p > .45) {
        const lp2 = Math.min(1, (p - .45) / .3), l2y = byG - curH * .62, l2bx = lx + (t.L === 'R' ? -1 : 1) * 52 * s * lp2; drawLeaf(bx, l2y, l2bx, l2y - 16 * s * lp2, lp2 * .82, t.L !== 'R', s * .84);
    }

    if (p > .70) {
        const fp = Math.min(1, (p - .70) / .30); drawFlower(lx, topY, t.c1, t.c2, t.c3, fp, s);
    }

}

function drawGround() {
    const soil = gctx.createLinearGradient(0, GH * .87, 0, GH);
    soil.addColorStop(0, '#183a0a');
    soil.addColorStop(.45, '#0e2005');
    soil.addColorStop(1, '#050e02');
    gctx.fillStyle = soil;
    gctx.beginPath();
    gctx.moveTo(0, GH);

    for (let x = 0; x <= GW; x += 30)

        gctx.lineTo(x, GH * .895 + Math.sin(x * .018) * 6 + Math.sin(x * .065) * 2.5);
    gctx.lineTo(GW, GH);
    gctx.closePath();
    gctx.fill();

    for (let i = 0; i < 90; i++) {
        const gx = i * (GW / 90) + Math.sin(i * 6.3) * 12, gy = GH * .895 + Math.sin(gx * .018) * 6 + Math.sin(gx * .065) * 2.5, gh = 9 + Math.sin(i * 3.5) * 7, gc2 = gx + (Math.sin(i * 2.2) - .5) * 18;
        gctx.beginPath();
        gctx.moveTo(gx, gy);
        gctx.quadraticCurveTo(gc2, gy - gh * .62, gx + (Math.sin(i * 1.85) - .5) * 11, gy - gh);
        gctx.strokeStyle = `rgba(${38 + ~~(Math.sin(i) * 13)}, ${95 + ~~(Math.sin(i * 2) * 28)}, ${38 + ~~(Math.sin(i * 3) * 10)}, .68)`; gctx.lineWidth = 1.1;
        gctx.stroke()
    }

    const mist = gctx.createLinearGradient(0, GH * .81, 0, GH * .95);
    mist.addColorStop(0, 'rgba(8,3,18,0)');
    mist.addColorStop(1, 'rgba(6,2,16,.55)');
    gctx.fillStyle = mist;
    gctx.fillRect(0, GH * .81, GW, GH * .14);

}

function gardenFrame() {
    GCV.width = GW = GCV.offsetWidth || innerWidth; GCV.height = GH = GCV.offsetHeight || innerHeight; gctx.clearRect(0, 0, GW, GH);

    const ml = gctx.createRadialGradient(GW * .5, 0, 0, GW * .5, 0, GH * .82);
    ml.addColorStop(0, 'rgba(170,155,255,.038)');
    ml.addColorStop(.3, 'rgba(90,75,195,.018)');
    ml.addColorStop(1, 'transparent');
    gctx.fillStyle = ml;
    gctx.fillRect(0, 0, GW, GH);

    TDATA.filter(t => t.bg).forEach((t, i) => {
        const stg = i * .022, tp = Math.max(0, Math.min(1, (tulipProg - stg) / (1 - stg)));
        gctx.save();
        gctx.globalAlpha = .52;
        drawTulip(t, tp);
        gctx.restore()
    });

    TDATA.filter(t => !t.bg).forEach((t, i) => { const stg = i * .028, tp = Math.max(0, Math.min(1, (tulipProg - stg) / (1 - stg))); drawTulip(t, tp) });

    drawGround();
    requestAnimationFrame(gardenFrame);
}

let rawFrac = 0;
let lastProgress = 0;
let overlayShown = false;
const MAX_SCROLL_FRAC = 0.92;

function spawnPetals(qtd) {
    for (let i = 0; i < qtd; i++) {
        const p = document.createElement('div');
        p.style.position = 'fixed';
        p.style.width = '6px';
        p.style.height = '6px';
        p.style.background = 'pink';
        p.style.borderRadius = '50%';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = '-10px';
        p.style.zIndex = 999;

        document.body.appendChild(p);

        const dur = Math.random() * 3000 + 2000;

        p.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 50}px)`, opacity: 0 }
        ], {
            duration: dur,
            easing: 'linear'
        });

        setTimeout(() => p.remove(), dur);
    }
}

// ─── SCROLL ENGINE (LIMPO) ───
function onScroll() {

    // ─── PROGRESSO GLOBAL DA PÁGINA ───
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    rawFrac = scrollTop / docHeight;

    // ─── CONTROLE DAS TULIPAS (SEÇÃO GARDEN) ───
    const gEl = document.getElementById('sg');
    const gr = gEl.getBoundingClientRect();

    if (gr.top < innerHeight && gr.bottom > 0) {
        const totalH = gEl.offsetHeight - innerHeight;
        const scrolled = Math.max(0, -gr.top);

        tulipProg = Math.min(1, scrolled / totalH);

        const gt = document.getElementById('gtxt');
        (tulipProg > .44 && tulipProg < .86)
            ? gt.classList.add('show')
            : gt.classList.remove('show');
    }

    // ─── CAIXA APARECE SOMENTE NO FINAL ───
    const boxFrac = Math.max(0, (rawFrac - MAX_SCROLL_FRAC) / (1 - MAX_SCROLL_FRAC));

    if (boxFrac > 0 && !overlayShown) {
        overlayShown = true;

        document.getElementById('ring-box-overlay').classList.add('visible');

        setTimeout(() => {
            document.getElementById('box-lid').classList.add('open');
        }, 600);

        setTimeout(() => {
            document.getElementById('slot-men').classList.add('revealed');
        }, 1400);

        setTimeout(() => {
            document.getElementById('slot-women').classList.add('revealed');
        }, 1700);

        setTimeout(() => {
            document.getElementById('proposal-text').classList.add('visible');
        }, 1800);

        setTimeout(() => {
            document.getElementById('proposal-btns').classList.add('visible');
        }, 2200);

    } else if (boxFrac <= 0 && overlayShown) {
        overlayShown = false;

        document.getElementById('ring-box-overlay').classList.remove('visible');
        document.getElementById('box-lid').classList.remove('open');
        document.getElementById('slot-men').classList.remove('revealed');
        document.getElementById('slot-women').classList.remove('revealed');
        document.getElementById('proposal-text').classList.remove('visible');
        document.getElementById('proposal-btns').classList.remove('visible');
    }

    lastProgress = rawFrac;
}

// ─── INIT ───
gardenFrame();
window.addEventListener('scroll', onScroll, { passive: true });
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const ldr = document.getElementById('ldr');
        if (ldr) ldr.classList.add('gone');
    }, 800);
});

/* ─── BUTTON INTERACTIONS ─── */
let noMoves = 0;

function runAway(btn) {
    noMoves++;
    if (noMoves > 5) {
        btn.textContent = 'Certo... Sim! 💜';
        btn.onclick = sayYes;
        return;
    }
    const vw = window.innerWidth - 140;
    const vh = window.innerHeight - 50;
    const x = Math.floor(Math.random() * vw);
    const y = Math.floor(Math.random() * vh);
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    btn.style.zIndex = 300;
    const msgs = ['Hmm…', 'Pense novamente', 'Tem certeza?', 'Realmente?', 'Vamos!'];
    btn.textContent = msgs[noMoves - 1] || 'Certo... Sim!';
}

function sayYes() {
    spawnPetals(60);
    const ov = document.getElementById('response-overlay');
    const msg = document.getElementById('response-message');
    const sub = document.getElementById('response-sub');
    msg.textContent = '♥ Sim! ♥';
    sub.textContent = 'Vamos ser felizes para sempre!';
    ov.classList.add('show');
    setTimeout(() => spawnPetals(80), 800);
    setTimeout(() => spawnPetals(80), 1600);
}

/* click response to close */
document.getElementById('response-overlay').addEventListener('click', function () {
    this.style.opacity = '0';
    setTimeout(() => this.classList.remove('show'), 1000);
});