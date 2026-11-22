'use client';

import React, { useRef, useEffect } from 'react';

// --- GEOMETRY & PATHS ---
function makeBlob(cx: number, cy: number, rx: number, ry: number, points: number, wobble: number, startAngle = -Math.PI / 2, tiltDeg = 0) {
  const tiltRad = (tiltDeg * Math.PI) / 180;
  const cosT = Math.cos(tiltRad);
  const sinT = Math.sin(tiltRad);

  const pt = (angle: number, extraR: number) => {
    const x = Math.cos(angle) * (rx + extraR);
    const y = Math.sin(angle) * (ry + (ry / rx) * extraR);
    return `${(cx + x * cosT - y * sinT).toFixed(1)} ${(cy + x * sinT + y * cosT).toFixed(1)}`;
  };

  let d = '';
  for (let i = 0; i < points; i++) {
    const a0 = startAngle + (i / points) * Math.PI * 2;
    const a1 = startAngle + ((i + 1) / points) * Math.PI * 2;
    const mid = (a0 + a1) / 2;
    d += `${i === 0 ? `M${pt(a0, 0)}` : ''}Q${pt(mid, 2.1 * wobble)} ${pt(a1, 0)}`;
  }
  return `${d}Z`;
}

const BODY_PIVOT = [196, 206];
const HEAD_PIVOT = [212, 100];
const SHOULDER_N = [186, 194];
const SHOULDER_F = [168, 192];
const HIP_N = [110, 194];
const HIP_F = [94, 192];
const TAIL_BASE = [84, 150];
const EAR_L_PIVOT = [174, 82];
const EAR_R_PIVOT = [250, 82];

const PATHS = {
  body: makeBlob(140, 170, 64, 36, 15, 3.4, 0.95 * Math.PI),
  chest: makeBlob(192, 166, 30, 32, 9, 3.2, 0.6 * Math.PI),
  tail: makeBlob(70, 126, 17, 16, 9, 3.2),
  tailStem: 'M86 152 C80 146 76 140 74 136',
  haunch: makeBlob(110, 204, 30, 24, 10, 3.2, Math.PI),
  haunchPaw: 'M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z',
  head: makeBlob(212, 100, 51, 46, 16, 3.6),
  topknot: makeBlob(212, 52, 17, 12, 8, 2.9, Math.PI),
  earL: makeBlob(170, 112, 19, 34, 10, 3.2, -Math.PI / 2, 12),
  earR: makeBlob(254, 112, 19, 34, 10, 3.2, -Math.PI / 2, -12),
  muzzle: 'M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z',
  nose: 'M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z',
  mouth: 'M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2',
  mouthOpen: 'M203 126 Q212 122 221 126 Q219 138 212 139 Q205 138 203 126 Z',
  tongue: 'M207.6 127.4 Q212 136.6 216.4 127.4 Z',
  collar: 'M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z',
  tag: 'M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z',
  ledgePaws: 'M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z',
  ledgeToes: 'M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5',
  shadow: { cx: 150, cy: 230, rx: 92, ry: 7 },
};

function makeLegPath(width: number, length: number) {
  const hw = width / 2;
  return `M${-hw} -14 C${-hw} 4 -12 ${length - 18} -12 ${length - 9} C-12 ${length - 2} -7 ${length} 0 ${length} C9 ${length} 13 ${length - 3} 13 ${length - 9} C13 ${length - 18} ${hw} 4 ${hw} -14`;
}

const LEG_PATHS = {
  front: makeLegPath(24, 228 - SHOULDER_N[1]),
  frontFar: makeLegPath(22, 228 - SHOULDER_F[1]),
  back: makeLegPath(30, 228 - HIP_N[1]),
  backFar: makeLegPath(28, 228 - HIP_F[1]),
};

type Pose = {
  bodyRot: number;
  bodyX: number;
  bodyY: number;
  stretch: number;
  headX: number;
  headY: number;
  headRot: number;
  earL: number;
  earR: number;
  tail: number;
  fn: number;
  ff: number;
  bn: number;
  bf: number;
  sit: number;
  eyes: number;
  happy: number;
  tongue: number;
  mouth: number;
  front: number;
};

const BASE_POSE: Pose = {
  bodyRot: 0,
  bodyX: 0,
  bodyY: 0,
  stretch: 1,
  headX: 0,
  headY: 0,
  headRot: 0,
  earL: 0,
  earR: 0,
  tail: 0,
  fn: 0,
  ff: 0,
  bn: 0,
  bf: 0,
  sit: 0,
  eyes: 1,
  happy: 0,
  tongue: 0,
  mouth: 0,
  front: 0,
};

const POSES: Record<string, Pose> = {
  stand: BASE_POSE,
  walk: { ...BASE_POSE, tail: -6, tongue: 1 },
  sit: { ...BASE_POSE, bodyRot: -24, bodyY: -2, headX: -10, headY: -6, tail: 34, sit: 1, tongue: 1 },
  peek: { ...BASE_POSE, headY: 4, earL: -6, earR: 6, tail: -20, front: 1, tongue: 1 },
  snug: { ...BASE_POSE, headY: 9, headRot: 4, earL: 3, earR: -3, tail: -20, front: 1, tongue: 0 },
  lie: { ...BASE_POSE, bodyRot: -5, bodyY: 22, headX: 12, headY: 40, headRot: 3, fn: -84, ff: -80, sit: 1, tail: 58, tongue: 0 },
  sleep: { ...BASE_POSE, bodyRot: -5, bodyY: 22, headX: 14, headY: 44, headRot: -8, fn: -84, ff: -80, sit: 1, tail: 64, eyes: 0, earL: 4, earR: -4 },
  settle: { ...BASE_POSE, bodyRot: -5, bodyY: 22, headX: 10, headY: 16, fn: -84, ff: -80, sit: 1, tail: 40, tongue: 1 },
  hop: { ...BASE_POSE, bodyRot: -9, stretch: 1.06, headY: -6, fn: -42, ff: -32, bn: 40, bf: 30, earL: -26, earR: 26, tail: -24, tongue: 1 },
  sniff: { ...BASE_POSE, bodyRot: 7, headX: 16, headY: 32, headRot: 9, tail: -14, fn: 6, ff: 4 },
  bow: { ...BASE_POSE, bodyRot: 15, bodyY: 2, headX: 14, headY: 30, fn: -73, ff: -67, tail: -32, happy: 1, tongue: 1 },
  play: { ...BASE_POSE, bodyRot: 15, bodyY: 2, headX: 14, headY: 30, fn: -73, ff: -67, tail: -32, happy: 1, tongue: 1 },
  beg: { ...BASE_POSE, bodyRot: -36, bodyY: -6, headX: -18, headY: -18, sit: 1, fn: -70, ff: -64, tail: 30, happy: 1, tongue: 1 },
};

const POSE_KEYS = Object.keys(BASE_POSE) as (keyof Pose)[];

const DEFAULT_MOTION = {
  phase: 0,
  stride: 0,
  time: 0,
  wag: 0,
  gazeX: 0,
  gazeY: 0,
  blink: 0,
  ear: 0,
};

const round2 = (v: number) => Math.round(100 * v) / 100;
const rotateStr = (deg: number, [px, py]: number[]) => `rotate(${round2(deg)} ${px} ${py})`;
const clamp = (val: number, min = -1, max = 1) => Math.max(min, Math.min(max, val));
const lerpFactor = (dt: number, speed: number) => 1 - Math.exp(-dt / speed);

function interpolatePose(current: Pose, target: Pose, factor: number): Pose {
  const result = { ...current };
  for (const k of POSE_KEYS) {
    result[k] = current[k] + (target[k] - current[k]) * factor;
  }
  return result;
}

function computeTransforms(pose: Pose, motion = DEFAULT_MOTION) {
  const sinP = Math.sin(motion.phase);
  const sinPOff = Math.sin(motion.phase + Math.PI);
  const strideAmp = 20 + 10 * motion.stride;
  const strideCycle = (1 - Math.cos(2 * motion.phase)) / 2;
  const isMoving = +(motion.stride > 0.01);
  const breathe = Math.sin(2.4 * motion.time) * (1 - isMoving);

  const bodyY = pose.bodyY - strideCycle * (2.5 + 4 * motion.stride) * isMoving + 0.6 * breathe;
  const bodyRot = pose.bodyRot + 1.6 * Math.sin(motion.phase) * isMoving;
  const invBodyRot = -pose.bodyRot;

  const wagAmp = 5 + 17 * motion.wag;
  const wagFreq = 1.2 + 2.6 * motion.wag;
  const tailAngle = pose.tail + Math.sin(motion.time * wagFreq * Math.PI * 2) * wagAmp;

  const headBreathe = -((1 - Math.cos(2 * motion.phase - 0.7)) / 2) * (2 + 3 * motion.stride) * isMoving + 0.9 * breathe;

  return {
    body: `translate(${round2(pose.bodyX)} ${round2(bodyY)}) ${rotateStr(bodyRot, BODY_PIVOT)} translate(${BODY_PIVOT[0]} 0) scale(${round2(pose.stretch)} 1) translate(${-BODY_PIVOT[0]} 0)`,
    fn: `translate(${SHOULDER_N[0]} ${SHOULDER_N[1]}) rotate(${round2(pose.fn + invBodyRot + sinP * strideAmp * isMoving)})`,
    ff: `translate(${SHOULDER_F[0]} ${SHOULDER_F[1]}) rotate(${round2(pose.ff + invBodyRot + sinPOff * strideAmp * isMoving)})`,
    bn: `translate(${HIP_N[0]} ${HIP_N[1]}) rotate(${round2(pose.bn + sinPOff * strideAmp * isMoving)})`,
    bf: `translate(${HIP_F[0]} ${HIP_F[1]}) rotate(${round2(pose.bf + sinP * strideAmp * isMoving)})`,
    tail: rotateStr(tailAngle, TAIL_BASE),
    haunch: `translate(0 ${round2(-0.06 * pose.bodyRot)})`,
    head: `translate(${round2(pose.headX)} ${round2(pose.headY + headBreathe)}) ${rotateStr(pose.headRot + 1.4 * Math.sin(motion.phase) * isMoving, HEAD_PIVOT)}`,
    earL: rotateStr(pose.earL + motion.ear + 4 * Math.sin(2 * motion.phase) * isMoving, EAR_L_PIVOT),
    earR: rotateStr(pose.earR - motion.ear - 4 * Math.sin(2 * motion.phase) * isMoving, EAR_R_PIVOT),
    eyes: `translate(${round2(3.4 * motion.gazeX)} ${round2(2.6 * motion.gazeY)})`,
    blink: `translate(0 ${round2(98 * motion.blink * 0.92)}) scale(1 ${round2(1 - 0.92 * motion.blink)})`,
    openEyes: round2(Math.max(0, pose.eyes - pose.happy)),
    happyEyes: round2(Math.min(pose.happy, pose.eyes)),
    shutEyes: round2(1 - pose.eyes),
    tongue: round2(pose.tongue * (1 - pose.mouth)),
    mouth: round2(pose.mouth),
    backLegs: round2(1 - pose.sit),
    haunchOpacity: round2(pose.sit * (1 - pose.front)),
    side: round2(1 - pose.front),
    ledge: round2(pose.front),
    shadow: `translate(${round2(0.6 * pose.bodyX)} 0) scale(${round2(1 - 0.05 * strideCycle * isMoving)} 1)`,
    shadowOpacity: round2(0.12 * (1 - pose.front)),
  };
}

const PROP_MAP: [string, string, keyof ReturnType<typeof computeTransforms> | 'root'][] = [
  ['root', 'transform', 'root'],
  ['shadow', 'transform', 'shadow'],
  ['shadow', 'opacity', 'shadowOpacity'],
  ['body', 'transform', 'body'],
  ['body', 'opacity', 'side'],
  ['bf', 'transform', 'bf'],
  ['bf', 'opacity', 'backLegs'],
  ['bn', 'transform', 'bn'],
  ['bn', 'opacity', 'backLegs'],
  ['ff', 'transform', 'ff'],
  ['fn', 'transform', 'fn'],
  ['tail', 'transform', 'tail'],
  ['haunch', 'transform', 'haunch'],
  ['haunch', 'opacity', 'haunchOpacity'],
  ['head', 'transform', 'head'],
  ['earL', 'transform', 'earL'],
  ['earR', 'transform', 'earR'],
  ['eyes', 'transform', 'eyes'],
  ['open', 'opacity', 'openEyes'],
  ['blink', 'transform', 'blink'],
  ['happy', 'opacity', 'happyEyes'],
  ['shut', 'opacity', 'shutEyes'],
  ['tongue', 'opacity', 'tongue'],
  ['mouth', 'opacity', 'mouth'],
  ['ledge', 'opacity', 'ledge'],
];

// --- PUP ENGINE CLASS ---
class PupEngine {
  svg: SVGSVGElement;
  els = new Map<string, Element>();
  written = new Map<string, string>();
  pose: Pose;
  target: Pose;
  m = { ...DEFAULT_MOTION };
  facing: number;
  facingTarget: number;
  strideTarget = 0;
  wagTarget = 0.35;
  gazeTarget = { x: 0, y: 0 };
  tilt = 0;
  tiltTarget = 0;
  earV = 0;
  nextBlink = 1.2;
  blinkAt = -1;
  woofUntil = 0;
  bounce = 0;
  bounceV = 0;
  offset = 0;
  offsetTarget = 0;
  pet = 0;
  petTarget = 0;
  turn = 0.07;
  lean = 0;

  constructor(svg: SVGSVGElement, poseName = 'sit', facing = 1) {
    this.svg = svg;
    this.pose = { ...(POSES[poseName] || POSES.sit) };
    this.target = this.pose;
    this.facing = facing;
    this.facingTarget = facing;

    svg.querySelectorAll('[data-p]').forEach((el) => {
      const p = el.getAttribute('data-p');
      if (p) this.els.set(p, el);
    });
  }

  setPose(p: string | Pose) {
    this.target = typeof p === 'string' ? (POSES[p] || POSES.sit) : p;
  }

  face(dir: number, turnSpeed = 0.07) {
    this.facingTarget = dir;
    this.turn = turnSpeed;
  }

  wag(val: number) {
    this.wagTarget = clamp(val, 0, 1);
  }

  cock(deg: number) {
    this.tiltTarget = deg;
  }

  lookAt(point: { x: number; y: number } | null) {
    if (!point) {
      this.gazeTarget = { x: 0, y: 0 };
      return;
    }
    const rect = this.svg.getBoundingClientRect();
    const pivotX = this.facingTarget > 0 ? HEAD_PIVOT[0] : 300 - HEAD_PIVOT[0];
    const screenPivotX = rect.left + (pivotX / 300) * rect.width;
    const screenPivotY = rect.top + (98 / 240) * rect.height;

    const dx = point.x - screenPivotX;
    const dy = point.y - screenPivotY;
    const dist = Math.hypot(dx, dy) || 1;
    const factor = Math.min(1, dist / 160);

    this.gazeTarget = {
      x: (dx / dist) * factor * this.facingTarget,
      y: (dy / dist) * factor,
    };
  }

  woof(time: number) {
    this.woofUntil = time + 0.34;
    this.bounceV = -150;
    this.earV += 260;
  }

  jolt(f = 1) {
    this.earV += 220 * f;
  }

  hop(f = 1) {
    this.bounceV = -230 * f;
    this.earV += 200 * f;
  }

  yawn(time: number, dur = 0.9) {
    this.woofUntil = time + dur;
  }

  dash(off: number) {
    this.offsetTarget = off;
  }

  petting(isPet: boolean) {
    this.petTarget = isPet ? 1 : 0;
  }

  reset() {
    this.offsetTarget = 0;
    this.tiltTarget = 0;
    this.petTarget = 0;
  }

  tick(dt: number, time: number) {
    dt = Math.min(dt, 0.05);
    const m = this.m;
    m.time = time;

    this.pose = interpolatePose(this.pose, this.target, lerpFactor(dt, 0.16));
    this.facing += (this.facingTarget - this.facing) * lerpFactor(dt, this.turn);

    m.stride += (this.strideTarget - m.stride) * lerpFactor(dt, 0.12);
    if (m.stride < 0.012 && this.strideTarget === 0) m.stride = 0;

    m.wag += (this.wagTarget - m.wag) * lerpFactor(dt, 0.4);
    m.gazeX += (this.gazeTarget.x - m.gazeX) * lerpFactor(dt, 0.07);
    m.gazeY += (this.gazeTarget.y - m.gazeY) * lerpFactor(dt, 0.07);

    this.tilt += (this.tiltTarget + 3 * m.gazeX - this.tilt) * lerpFactor(dt, 0.18);
    this.earV += (-150 * m.ear - 10 * this.earV) * dt;
    m.ear = clamp(m.ear + this.earV * dt, -28, 28);

    this.bounceV += (-260 * this.bounce - 16 * this.bounceV) * dt;
    this.bounce += this.bounceV * dt;

    const prevOffset = this.offset;
    this.offset += (this.offsetTarget - this.offset) * lerpFactor(dt, 0.2);
    if (Math.abs(this.offsetTarget - this.offset) < 0.05) this.offset = this.offsetTarget;
    const moved = Math.abs(this.offset - prevOffset);
    if (moved) m.phase += (moved / 46) * Math.PI;

    this.pet += (this.petTarget - this.pet) * lerpFactor(dt, 0.15);

    if (time > this.nextBlink && this.pose.eyes > 0.6) {
      this.blinkAt = time;
      this.nextBlink = time + 2.2 + 3.8 * Math.random();
      if (Math.random() < 0.18) this.nextBlink = time + 0.32;
    }
    const blinkPhase = (time - this.blinkAt) / 0.15;
    m.blink = blinkPhase >= 0 && blinkPhase <= 1 ? Math.sin(blinkPhase * Math.PI) : 0;

    const activePose: Pose = {
      ...this.pose,
      headRot: this.pose.headRot + this.tilt,
      bodyRot: this.pose.bodyRot + this.lean,
      bodyY: this.pose.bodyY + this.bounce,
      headY: this.pose.headY + 1.15 * this.bounce,
      mouth: time < this.woofUntil ? 1 : this.pose.mouth,
      happy: Math.max(this.pose.happy, this.pet),
    };

    const isMoving = +(m.stride > 0.01);
    const computed = computeTransforms(activePose, m);
    const facingVal = Math.abs(this.facing) < 0.02 ? 0.02 * Math.sign(this.facing || 1) : this.facing;
    const rootTransform = `translate(${this.offset.toFixed(1)} 0) translate(150 0) scale(${facingVal.toFixed(3)} 1) translate(-150 0)`;

    for (const [elKey, attr, propKey] of PROP_MAP) {
      const el = this.els.get(elKey);
      if (!el) continue;
      const val = propKey === 'root' ? rootTransform : String(computed[propKey]);
      const cacheKey = `${elKey}:${attr}`;
      if (this.written.get(cacheKey) !== val) {
        el.setAttribute(attr, val);
        this.written.set(cacheKey, val);
      }
    }
  }
}

// --- HEARTS SPAWN HELPER ---
function spawnHearts(container: HTMLElement, x: number, y: number) {
  for (let r = 0; r < 6; r++) {
    const s = document.createElement('span');
    s.className = 'pup-heart z-40';
    s.textContent = '♥';
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    container.append(s);

    const driftX = (Math.random() - 0.5) * 90;
    const driftY = -70 - 60 * Math.random();

    if (typeof s.animate === 'function') {
      const anim = s.animate(
        [
          { transform: 'translate(-50%, 0) scale(0.4)', opacity: 0 },
          { opacity: 1, offset: 0.2 },
          {
            transform: `translate(calc(-50% + ${driftX.toFixed(0)}px), ${driftY.toFixed(0)}px) scale(1.15)`,
            opacity: 0,
          },
        ],
        {
          duration: 1150 + 110 * r,
          delay: 80 * r,
          easing: 'cubic-bezier(.2,.7,.3,1)',
          fill: 'backwards',
        }
      );
      anim.finished.then(
        () => s.remove(),
        () => s.remove()
      );
    } else {
      setTimeout(() => s.remove(), 1500);
    }
  }
}

// --- TRICKS & TRICK SELECTION ---
type TrickCtx = {
  d: PupEngine;
  rest: Pose;
  facing: number;
  say: (text: string, dur?: number) => void;
  hearts: () => void;
};

type TrickStep = [number, (time: number) => void];

const TRICKS: Record<string, (ctx: TrickCtx, startTime: number) => TrickStep[]> = {
  woof: ({ d, say }, t0) => [
    [t0, (t) => { d.woof(t); say('woof!'); }],
    [t0 + 0.42, (t) => { d.woof(t); say('woof woof!'); }],
  ],
  spin: ({ d, rest, facing, say }, t0) => [
    [t0, () => { d.setPose('stand'); d.hop(0.5); }],
    [t0 + 0.14, () => d.face(-facing)],
    [t0 + 0.38, () => d.face(facing)],
    [t0 + 0.62, () => d.face(-facing)],
    [t0 + 0.86, () => { d.face(facing); say('wheee!'); }],
    [t0 + 1.3, () => d.setPose(rest)],
  ],
  beg: ({ d, rest, say }, t0) => [
    [t0, () => { d.setPose('beg'); d.wag(1); say('treat, please?', 1.7); }],
    [t0 + 1.9, () => { d.setPose(rest); d.wag(0.7); }],
  ],
  bow: ({ d, rest, say }, t0) => [
    [t0, () => { d.setPose('bow'); d.wag(1); say('play with me!'); }],
    [t0 + 0.55, () => d.hop(0.45)],
    [t0 + 1.7, () => { d.setPose(rest); d.wag(0.7); }],
  ],
  hop: ({ d, rest, say }, t0) => [
    [t0, () => { d.setPose('hop'); d.hop(1.1); say('boing!'); }],
    [t0 + 0.36, () => d.setPose(rest)],
    [t0 + 0.62, () => { d.setPose('hop'); d.hop(0.8); }],
    [t0 + 0.98, () => d.setPose(rest)],
  ],
  love: ({ d, rest, say, hearts }, t0) => [
    [t0, () => { d.setPose({ ...rest, happy: 1, tongue: 1 }); d.wag(1); hearts(); say('I like you!', 1.5); }],
    [t0 + 1.9, () => { d.setPose(rest); d.wag(0.7); }],
  ],
  tilt: ({ d, say }, t0) => [
    [t0, () => { d.cock(-14); say('hm?'); }],
    [t0 + 0.8, () => d.cock(12)],
    [t0 + 1.6, () => d.cock(0)],
  ],
  sneeze: ({ d, say }, t0) => [
    [t0, () => d.cock(-8)],
    [t0 + 0.32, (t) => { d.cock(10); d.jolt(1.4); d.hop(0.35); d.yawn(t, 0.22); say('achoo!'); }],
    [t0 + 0.8, () => d.cock(0)],
  ],
  zoomies: ({ d, rest, facing, say }, t0) => [
    [t0, () => { d.setPose('walk'); d.wag(1); say('zoomies!', 2); }],
    [t0 + 0.05, () => { d.face(1); d.dash(70); }],
    [t0 + 0.5, () => { d.face(-1); d.dash(-70); }],
    [t0 + 0.98, () => { d.face(1); d.dash(50); }],
    [t0 + 1.4, () => { d.face(-1); d.dash(-30); }],
    [t0 + 1.78, () => { d.face(1); d.dash(0); }],
    [t0 + 2.25, () => { d.face(facing); d.setPose(rest); d.wag(0.7); }],
  ],
  peekaboo: ({ d, say }, t0) => [
    [t0, () => d.setPose({ ...POSES.peek, headY: 120 })],
    [t0 + 0.55, () => { d.setPose('peek'); d.jolt(1.2); say('peekaboo!'); }],
  ],
};

const TRICK_LIST = ['woof', 'spin', 'beg', 'bow', 'hop', 'love', 'tilt', 'sneeze'];
let trickBag: string[] = [];

function selectTrick(lastTrick: string | null, streak: number): string {
  if (streak >= 3) return 'love';
  if (!trickBag.length) {
    trickBag = TRICK_LIST.filter((t) => t !== lastTrick).sort(() => Math.random() - 0.5);
  }
  return trickBag.pop() || 'woof';
}

// --- PUP BUDDY REACT COMPONENT ---
export interface PupBuddyProps {
  pose?: string;
  facing?: 'left' | 'right';
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function PupBuddy({
  pose = 'sit',
  facing = 'right',
  label = 'Teddy, the TeddyPups puppy',
  className = '',
  style,
}: PupBuddyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const engineRef = useRef<PupEngine | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bubble = bubbleRef.current;
    if (!container || !bubble) return;

    const svg = container.querySelector('svg');
    if (!svg) return;

    const facingNum = facing === 'left' ? -1 : 1;
    const engine = new PupEngine(svg, pose, facingNum);
    engineRef.current = engine;
    engine.wag(0.6);

    let queue: TrickStep[] = [];
    let lastTime = performance.now() / 1000;
    let idleTimer = lastTime;
    let bubbleUntil = 0;
    let mousePos: { x: number; y: number; t: number } | null = null;
    let lastTrick: string | null = null;
    let clickStreak = 0;
    let lastClickTime = 0;
    let isPlaying = false;
    let animId: number | null = null;
    let isIntersecting = false;

    const say = (text: string, duration = 1.4) => {
      bubble.textContent = text;
      bubble.dataset.show = 'true';
      bubbleUntil = performance.now() / 1000 + duration;
    };

    const hearts = () => {
      const headX = container.clientWidth * (facingNum > 0 ? 0.71 : 0.29);
      const headY = 0.32 * container.clientHeight;
      spawnHearts(container, headX, headY);
    };

    const ctx: TrickCtx = {
      d: engine,
      rest: POSES[pose] || POSES.sit,
      facing: facingNum,
      say,
      hearts,
    };

    let trickEndTime = 0;

    const onFrame = (nowMs: number) => {
      const now = nowMs / 1000;
      const dt = Math.min(0.05, now - lastTime);
      lastTime = now;

      // Run queued trick keyframes
      while (queue.length && queue[0][0] <= now) {
        queue.shift()![1](now);
      }

      const playingNow = now < trickEndTime;
      if (isPlaying !== playingNow) {
        isPlaying = playingNow;
        container.toggleAttribute('data-playing', isPlaying);
      }

      // Mouse gaze
      engine.lookAt(mousePos && now - mousePos.t < 3 ? mousePos : null);

      // Random idle wags/tilts every 9s if no trick is playing
      if (!queue.length && now - idleTimer > 9) {
        idleTimer = now;
        if (Math.random() < 0.5) {
          queue = TRICKS.tilt(ctx, now);
        } else {
          queue = [
            [now, () => engine.wag(1)],
            [now + 2.2, () => engine.wag(0.6)],
          ];
        }
      }

      // Bubble dismiss timeout
      if (bubble.dataset.show === 'true' && now > bubbleUntil) {
        bubble.dataset.show = 'false';
      }

      engine.tick(dt, now);

      if (isIntersecting) {
        animId = requestAnimationFrame(onFrame);
      }
    };

    const startLoop = () => {
      if (!animId) {
        lastTime = performance.now() / 1000;
        animId = requestAnimationFrame(onFrame);
      }
    };

    const stopLoop = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting) {
        startLoop();
      } else {
        stopLoop();
      }
    });
    observer.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        mousePos = { x: e.clientX, y: e.clientY, t: performance.now() / 1000 };
      }
    };

    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        engine.petting(true);
        engine.wag(1);
      }
    };

    const onPointerLeave = () => {
      engine.petting(false);
      engine.wag(0.6);
    };

    const onClick = () => {
      const now = performance.now() / 1000;
      clickStreak = now - lastClickTime < 0.85 ? clickStreak + 1 : 1;
      lastClickTime = now;

      const trickName = selectTrick(lastTrick, clickStreak);
      lastTrick = trickName;

      engine.reset();
      const trickSteps = TRICKS[trickName](ctx, now);
      queue = trickSteps;
      trickEndTime = trickSteps[trickSteps.length - 1][0] + 0.4;
      idleTimer = now;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('click', onClick);
    container.addEventListener('pointerenter', onPointerEnter);
    container.addEventListener('pointerleave', onPointerLeave);

    return () => {
      stopLoop();
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('click', onClick);
      container.removeEventListener('pointerenter', onPointerEnter);
      container.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [pose, facing]);

  const facingNum = facing === 'left' ? -1 : 1;
  const initialComputed = computeTransforms(POSES[pose] || POSES.sit, DEFAULT_MOTION);
  const rootTransform = `translate(0.0 0) translate(150 0) scale(${facingNum.toFixed(3)} 1) translate(-150 0)`;

  return (
    <div
      ref={containerRef}
      className={`pup-buddy cursor-pointer ${className.includes('absolute') ? '' : 'relative'} ${className}`.trim()}
      data-facing={facing}
      data-live=""
      style={{ visibility: 'visible', opacity: 1, pointerEvents: 'auto', ...style }}
    >
      <svg
        aria-label={label}
        focusable="false"
        role="img"
        style={{ overflow: 'visible', display: 'block', width: '100%', height: 'auto' }}
        viewBox="0 0 300 240"
      >
        <g data-p="root" transform={rootTransform}>
          <ellipse
            cx={PATHS.shadow.cx}
            cy={PATHS.shadow.cy}
            data-p="shadow"
            fill="#2a170e"
            opacity={initialComputed.shadowOpacity}
            rx={PATHS.shadow.rx}
            ry={PATHS.shadow.ry}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            transform={initialComputed.shadow}
          />
          <g data-p="body" opacity={initialComputed.side} transform={initialComputed.body}>
            <g data-p="bf" opacity={initialComputed.backLegs} transform={initialComputed.bf}>
              <path d={`${LEG_PATHS.backFar}Z`} fill="#e4a352" />
              <path d={LEG_PATHS.backFar} fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
              <path d="M-3.5 29 v5 M4.5 29 v5" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
            </g>
            <g data-p="ff" transform={initialComputed.ff}>
              <path d={`${LEG_PATHS.frontFar}Z`} fill="#e4a352" />
              <path d={LEG_PATHS.frontFar} fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
              <path d="M-3.5 29 v5 M4.5 29 v5" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
            </g>
            <g data-p="tail" transform={initialComputed.tail}>
              <path d={PATHS.tailStem} fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="9" />
              <path d={PATHS.tailStem} fill="none" stroke="#f2be6b" strokeLinecap="round" strokeWidth="4" />
              <path d={PATHS.tail} fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
            </g>
            <g data-p="bn" opacity={initialComputed.backLegs} transform={initialComputed.bn}>
              <path d={`${LEG_PATHS.back}Z`} fill="#f2be6b" />
              <path d={LEG_PATHS.back} fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
              <path d="M-3.5 27 v5 M4.5 27 v5" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
            </g>
            <path d={PATHS.body} fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
            <path d={PATHS.chest} fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
            <g data-p="fn" transform={initialComputed.fn}>
              <path d={`${LEG_PATHS.front}Z`} fill="#f2be6b" />
              <path d={LEG_PATHS.front} fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
              <path d="M-3.5 27 v5 M4.5 27 v5" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
            </g>
          </g>
          <g data-p="haunch" opacity={initialComputed.haunchOpacity} transform={initialComputed.haunch}>
            <path d={PATHS.haunch} fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
            <path d={PATHS.haunchPaw} fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
            <path d="M132 222v5M139 222v5" fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
          </g>
          <g data-p="head" transform={initialComputed.head}>
            <path d={PATHS.collar} fill="#a24a1a" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            <path d={PATHS.tag} fill="#fbe3b4" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
            <path d={PATHS.earL} data-p="earL" fill="#e4a352" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" transform={initialComputed.earL} />
            <path d={PATHS.earR} data-p="earR" fill="#e4a352" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" transform={initialComputed.earR} />
            <path d={PATHS.head} fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
            <path d={PATHS.topknot} fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            <path d={PATHS.muzzle} fill="#fbe3b4" />
            <circle cx="181" cy="116" fill="#f9b9a6" opacity="0.85" r="7" />
            <circle cx="243" cy="116" fill="#f9b9a6" opacity="0.85" r="7" />
            <g data-p="eyes" transform={initialComputed.eyes}>
              <g data-p="open" opacity={initialComputed.openEyes}>
                <g data-p="blink" transform={initialComputed.blink}>
                  <ellipse cx="194" cy="98" fill="#2a170e" rx="7.4" ry="8.6" />
                  <ellipse cx="230" cy="98" fill="#2a170e" rx="7.4" ry="8.6" />
                  <circle cx="196.6" cy="94.6" fill="#fff" r="2.7" />
                  <circle cx="232.6" cy="94.6" fill="#fff" r="2.7" />
                  <circle cx="192" cy="101.2" fill="#fff" r="1.2" />
                  <circle cx="228" cy="101.2" fill="#fff" r="1.2" />
                </g>
              </g>
            </g>
            <path d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101" data-p="happy" fill="none" opacity={initialComputed.happyEyes} stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
            <path d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97" data-p="shut" fill="none" opacity={initialComputed.shutEyes} stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
            <path d={PATHS.nose} fill="#2a170e" />
            <path d={PATHS.mouth} fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            <path d={PATHS.tongue} data-p="tongue" fill="#e98c8c" opacity={initialComputed.tongue} stroke="#2a170e" strokeLinejoin="round" strokeWidth="2.2" />
            <g data-p="mouth" opacity={initialComputed.mouth}>
              <path d={PATHS.mouthOpen} fill="#6b2a1c" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
              <path d="M206.5 133.5 Q212 130 217.5 133.5 Q215 138 212 138 Q209 138 206.5 133.5 Z" fill="#e98c8c" />
            </g>
          </g>
          <g data-p="ledge" opacity={initialComputed.ledge}>
            <path d={PATHS.ledgePaws} fill="#f2be6b" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.4" />
            <path d={PATHS.ledgeToes} fill="none" stroke="#2a170e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
          </g>
        </g>
      </svg>
      <span
        ref={bubbleRef}
        aria-hidden="true"
        className="pup-bubble pointer-events-none select-none z-30"
        data-show="false"
      />
    </div>
  );
}
