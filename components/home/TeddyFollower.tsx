'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import TeddySvg, { PoseParams, POSES, lerpPose } from './TeddySvg';

function getEllipsePath(cx: number, cy: number, rx: number, ry: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const pt = (x: number, y: number) =>
    `${(cx + x * cos - y * sin).toFixed(2)} ${(cy + x * sin + y * cos).toFixed(2)}`;
  return `M${pt(rx, 0)}C${pt(rx, 0.5523 * ry)} ${pt(0.5523 * rx, ry)} ${pt(0, ry)}C${pt(-0.5523 * rx, ry)} ${pt(-rx, 0.5523 * ry)} ${pt(-rx, 0)}C${pt(-rx, -0.5523 * ry)} ${pt(-0.5523 * rx, -ry)} ${pt(0, -ry)}C${pt(0.5523 * rx, -ry)} ${pt(rx, -0.5523 * ry)} ${pt(rx, 0)}Z`;
}

// Exact 2D paw SVG path from original TeddyPups website
const PAW_PATH =
  'M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z' +
  getEllipsePath(14.6, 29.2, 5.3, 6.9, -28) +
  getEllipsePath(24.2, 16.6, 5.5, 7.3, -10) +
  getEllipsePath(39.8, 16.6, 5.5, 7.3, 10) +
  getEllipsePath(49.4, 29.2, 5.3, 6.9, 28);

const BARK_PHRASES = [
  'Woof! 🐾',
  'Welcome to TeddyPups! 🧸',
  'Pet me again! ❤️',
  'Ready to cuddle? ✨',
  'Best puppies in Dubai! 🌴',
  'Every puppy is family! 🏡',
];

// Mathematical constants and helpers from original 1wa3jfz4v5w2v.js engine
const d = { x: 150, y: 228 };
const c_box = [48, 30, 288, 236];
const POSE_BOXES: Record<string, number[]> = {
  sit: [50, 26, 284, 234],
  peek: [148, 34, 280, 163],
  snug: [148, 40, 280, 163],
  bow: [58, 56, 292, 236],
};
const getBox = (pose: string) => POSE_BOXES[pose] ?? c_box;

const clamp01 = (e: number) => Math.min(1, Math.max(0, e));
const smoothstep = (e: number) => {
  const c = clamp01(e);
  return c * c * (3 - 2 * c);
};
const remapSmooth = (e: number, t: number, a: number) =>
  t === e ? (a >= t ? 1 : 0) : smoothstep(clamp01((a - e) / (t - e)));
const lerp = (e: number, t: number, a: number) => e + (t - e) * a;

const quintic = (v: number) => v * v * v * (v * (6 * v - 15) + 10);

function bezierPt(
  p0: { x: number; y: number },
  c1: { x: number; y: number },
  c2: { x: number; y: number },
  p1: { x: number; y: number },
  n: number
) {
  const l = 1 - n;
  const r = l * l * l;
  const i = 3 * l * l * n;
  const o = 3 * l * n * n;
  const d_ = n * n * n;
  return {
    x: r * p0.x + i * c1.x + o * c2.x + d_ * p1.x,
    y: r * p0.y + i * c1.y + o * c2.y + d_ * p1.y,
  };
}

const g_smooth = (e: number, t: number, a: number) => {
  const s = (e - t) / a;
  return s > 20 ? e : t + a * Math.log1p(Math.exp(s));
};
const v_smooth = (e: number, t: number, a: number) => -g_smooth(-e, -t, a);

function clampViewport(
  e: number,
  t: number,
  scale: number,
  box: number[],
  safe: { left: number; top: number; right: number; bottom: number },
  l = 8
) {
  const r = (d.x - box[0]) * scale;
  const i = (box[2] - d.x) * scale;
  const o = (d.y - box[1]) * scale;
  const c_ = (box[3] - d.y) * scale;
  let h_ = e;
  return {
    x: (h_ =
      safe.right - safe.left > r + i
        ? v_smooth(g_smooth(e, safe.left + r, l), safe.right - i, l)
        : (safe.left + safe.right) / 2 - (i - r) / 2),
    y:
      safe.bottom - safe.top > o + c_
        ? v_smooth(g_smooth(t, safe.top + o, l), safe.bottom - c_, l)
        : safe.bottom - c_,
  };
}

const lerpBox = (e: number[], t: number[], a: number) => [
  lerp(e[0], t[0], a),
  lerp(e[1], t[1], a),
  lerp(e[2], t[2], a),
  lerp(e[3], t[3], a),
];

// Screen coordinate of a stop anchor at scroll position t
function getStopScreenAnchor(stop: any, scrollY: number) {
  const track = stop.track;
  const screenY =
    track.kind === 'page'
      ? track.top - scrollY
      : track.kind === 'screen'
      ? track.top
      : scrollY < track.from
      ? track.top - (scrollY - track.from)
      : scrollY > track.to
      ? track.top - (scrollY - track.to)
      : track.top;
  return {
    x: stop.x + d.x * stop.s,
    y: screenY + d.y * stop.s,
  };
}

// Find active stop index k and transition progress t (0 to 1) from holds array
function getActiveStopIndex(holds: number[][], scrollY: number) {
  if (!holds.length || scrollY <= holds[0][1]) return { k: 0, t: 0 };
  for (let a = 0; a < holds.length - 1; a++) {
    const s = holds[a][1];
    const n = holds[a + 1][0];
    if (scrollY < n) return { k: a, t: clamp01((scrollY - s) / Math.max(1, n - s)) };
    if (scrollY <= holds[a + 1][1]) return { k: a + 1, t: 0 };
  }
  return { k: holds.length - 1, t: 0 };
}

interface StopData {
  x: number;
  track: { kind: 'page' | 'pin' | 'screen'; top: number; from?: number; to?: number };
  s: number;
  behind: boolean;
  sink: number;
  box: number[];
}

interface MetaData {
  el: HTMLElement;
  elClassName: string;
  pose: 'peek' | 'walk' | 'sit' | 'bow' | 'snug';
  facing: number; // 1 or -1
  act: string;
  scene?: HTMLElement | null;
}

export default function TeddyFollower() {
  const [actorState, setActorState] = useState({
    x: 648,
    y: 567,
    scale: 1.43,
    pose: 'peek' as 'peek' | 'walk' | 'sit' | 'bow' | 'snug' | 'hop',
    facing: 'right' as 'left' | 'right',
    facingScale: 1,
    cockAngle: 0,
    front: false,
    isHolding: true,
  });

  const [walkPhase, setWalkPhase] = useState(0);
  const [wagPhase, setWagPhase] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [bubbleText, setBubbleText] = useState('hm?');

  const currentPoseRef = useRef<PoseParams>({ ...POSES.peek });
  const [currentPose, setCurrentPose] = useState<PoseParams>({ ...POSES.peek });

  const printsRef = useRef<HTMLDivElement | null>(null);
  const printIndexRef = useRef(0);
  const lastStepIndexRef = useRef(-1);
  const lastStopIndexRef = useRef(-1);

  const prevXRef = useRef<number | null>(null);
  const prevYRef = useRef<number | null>(null);
  const facingDirRef = useRef(1);
  const lastScrollYRef = useRef(0);
  const walkStrideRef = useRef(0);
  const stillTimerRef = useRef(0);

  // Handle petting / clicking Teddy
  const handlePet = useCallback(() => {
    setIsHappy(true);
    const phrase = BARK_PHRASES[Math.floor(Math.random() * BARK_PHRASES.length)];
    setBubbleText(phrase);
    setShowBubble(true);

    setTimeout(() => {
      setIsHappy(false);
    }, 2000);

    setTimeout(() => {
      setShowBubble(false);
    }, 2800);
  }, []);

  // Listen for 'pup:cue' events from Journey section or interactive elements
  useEffect(() => {
    const handlePupCue = (e: Event) => {
      const customEvt = e as CustomEvent<{ look?: HTMLElement; secs?: number; say?: string }>;
      const detail = customEvt.detail;
      if (!detail) return;
      if (detail.say) {
        setBubbleText(detail.say);
        setShowBubble(true);
        setTimeout(() => {
          setShowBubble(false);
        }, (detail.secs ?? 1.6) * 1000);
      }
    };
    window.addEventListener('pup:cue', handlePupCue);
    return () => window.removeEventListener('pup:cue', handlePupCue);
  }, []);

  // Natural blinking loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3600);
    return () => clearInterval(blinkInterval);
  }, []);

  // Main animation frame loop powered by original T & eb mathematics
  useEffect(() => {
    document.documentElement.setAttribute('data-pup', 'live');
    let animId: number;
    let lastTime = performance.now() / 1000;

    const buildPlan = () => {
      const aWidth = document.documentElement.clientWidth;
      const sHeight = window.innerHeight;
      const nHeader = document.getElementById('site-header')?.offsetHeight ?? 76;
      const rSafe = { left: 10, top: nHeader + 10, right: aWidth - 10, bottom: sHeight - 10 };
      const E_range = [0.42, 0.78];

      const stopElements = Array.from(
        document.querySelectorAll<HTMLElement>('[data-pup-stop]')
      ).filter((e) => e.getClientRects().length > 0);

      if (stopElements.length === 0) return null;

      const stops: StopData[] = [];
      const meta: MetaData[] = [];
      const holdsRaw: number[][] = [];

      stopElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const pose = (el.dataset.pose || 'sit') as 'peek' | 'walk' | 'sit' | 'bow' | 'snug';
        const act = el.dataset.act ?? '';
        const l = rect.width / 300;
        const s = act === 'basket' ? l : 1.12 * l;
        const anchorP = pose === 'peek' ? { x: d.x, y: 159 } : d;

        // Sticky parent check (for Meet, Journey, etc.)
        let stickyParent: HTMLElement | null = null;
        for (let t = el.parentElement; t && t !== document.body; t = t.parentElement) {
          if (getComputedStyle(t).position === 'sticky') {
            stickyParent = t as HTMLElement;
            break;
          }
        }

        let track: { kind: 'page' | 'pin' | 'screen'; top: number; from?: number; to?: number };
        if (!stickyParent) {
          track = { kind: 'page', top: rect.top + window.scrollY };
        } else {
          const stickyTop = parseFloat(getComputedStyle(stickyParent).top) || 0;
          const n = rect.top - stickyParent.getBoundingClientRect().top;
          const origPos = stickyParent.style.position;
          stickyParent.style.position = 'relative';
          const pRect = stickyParent.getBoundingClientRect();
          const parentEl = stickyParent.parentElement as HTMLElement;
          const pBottom =
            parentEl.getBoundingClientRect().bottom -
            (parseFloat(getComputedStyle(parentEl).paddingBottom) || 0);
          stickyParent.style.position = origPos;
          const fromY = pRect.top + window.scrollY - stickyTop;
          const toY = pBottom + window.scrollY - pRect.height - stickyTop;
          if (toY <= fromY) {
            track = { kind: 'page', top: pRect.top + window.scrollY + n };
          } else {
            track = { kind: 'pin', top: stickyTop + n, from: fromY, to: toY };
          }
        }

        if (track.kind !== 'screen') {
          track.top += anchorP.y * (l - s);
        }

        const stopObj: StopData = {
          x: rect.left + anchorP.x * (l - s),
          track: track,
          s: s,
          behind: el.dataset.behind === 'true',
          sink: 0,
          box: getBox(pose),
        };

        stops.push(stopObj);
        const scene = el.closest<HTMLElement>('[data-pup-scene]');
        meta.push({
          el,
          elClassName: el.className,
          pose,
          facing: el.dataset.facing === 'left' ? -1 : 1,
          act,
          scene,
        });

        // Hold calculation
        let hold: number[];
        if (track.kind === 'pin' && track.from !== undefined && track.to !== undefined) {
          hold = [track.from, track.to];
        } else {
          const top = track.top;
          const nTop = top + stopObj.box[1] * stopObj.s;
          const lBot = top + stopObj.box[3] * stopObj.s;
          const rMid = (nTop + lBot) / 2;
          const iH = rSafe.bottom - rSafe.top;
          let o = rMid - (rSafe.top + E_range[1] * iH);
          let dH = rMid - (rSafe.top + E_range[0] * iH);
          o = Math.max(o, lBot - rSafe.bottom);
          dH = Math.min(dH, nTop - rSafe.top);
          if (o > dH) o = dH = rMid - (rSafe.top + iH / 2);
          hold = [o, dH];
        }
        holdsRaw.push(hold);
      });

      // Redistribution of holds
      const holds = (function (e: number[][], t: number[], a: number) {
        const s_fn = (idx: number) => (typeof t === 'number' ? t : t[idx] ?? 0);
        const n = e.map((item) =>
          item[0] <= item[1] ? [item[0], item[1]] : [(item[0] + item[1]) / 2, (item[0] + item[1]) / 2]
        );
        if (!n.length) return n;
        n[0][0] = -Infinity;
        const l = n[n.length - 1];
        l[1] = Infinity;
        l[0] = Math.min(l[0], a - 1);
        for (let i = 0; i < n.length - 1; i++) {
          const curr = n[i],
            next = n[i + 1];
          if (next[0] < curr[1]) {
            const mid = (curr[1] + next[0]) / 2;
            curr[1] = Math.max(curr[0], mid);
            next[0] = Math.min(next[1], mid);
            if (next[0] < curr[1]) next[0] = curr[1];
          }
          let l_gap = s_fn(i) - (next[0] - curr[1]);
          if (l_gap > 0) {
            const e_dec = Math.min(l_gap / 2, curr[1] - curr[0]);
            const s_inc = Math.min(l_gap / 2, next[1] - next[0]);
            curr[1] -= e_dec;
            next[0] += s_inc;
            const n_inc = Math.min((l_gap -= e_dec + s_inc), next[1] - next[0]);
            next[0] += n_inc;
            if ((l_gap -= n_inc) > 0) curr[1] -= Math.min(l_gap, curr[1] - curr[0]);
          }
        }
        for (const i of n) {
          if (i[1] < i[0]) i[1] = i[0];
        }
        return n;
      })(
        holdsRaw,
        stops.slice(1).map((s, idx) => {
          const prev = stops[idx];
          const l = (E_range[1] - E_range[0]) * sHeight;
          const r = 0.5 * sHeight;
          return Math.min(
            1.4 * sHeight,
            Math.max(
              r,
              1.15 * Math.hypot(Math.abs(s.x + d.x * s.s - (prev.x + d.x * prev.s)), l)
            )
          );
        }),
        document.documentElement.scrollHeight - window.innerHeight
      );

      return { stops, meta, holds, rSafe, sHeight };
    };

    let plan = buildPlan();

    const handleResize = () => {
      plan = buildPlan();
    };
    window.addEventListener('resize', handleResize);

    // Ensure plan is recomputed as layout, fonts, and images settle
    const settleTimers = [50, 150, 300, 600, 1200].map((delay) =>
      setTimeout(() => {
        plan = buildPlan();
      }, delay)
    );

    const resizeObserver = new ResizeObserver(() => {
      plan = buildPlan();
    });
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    const updateFrame = () => {
      const now = performance.now() / 1000;
      const dt = Math.min(0.05, now - lastTime);
      lastTime = now;

      if (!plan) {
        plan = buildPlan();
        if (!plan) {
          animId = requestAnimationFrame(updateFrame);
          return;
        }
      }

      const scrollY = window.scrollY;
      const { stops, meta, holds, rSafe, sHeight } = plan;
      const { k: P, t: v } = getActiveStopIndex(holds, scrollY);

      let anchorX: number;
      let anchorY: number;
      let scale: number;
      let isFront: boolean;
      let isAirborne: boolean;
      let isHolding = false;
      let walkedDist = 0;

      if (v <= 0 || P >= stops.length - 1) {
        // Stop holding state
        const stop = stops[P];
        const screenAnchor = getStopScreenAnchor(stop, scrollY);
        const clamped = clampViewport(screenAnchor.x, screenAnchor.y, stop.s, stop.box, rSafe);
        anchorX = clamped.x;
        anchorY = clamped.y;
        scale = stop.s;
        isFront = !stop.behind;
        isAirborne = false;
        isHolding = true;
      } else {
        // In-transit between stop P and stop P + 1
        const rStop = stops[P];
        const iStop = stops[P + 1];
        const o_exit = holds[P][1];
        const d_enter = holds[P + 1][0];
        const g_dist = Math.max(1, d_enter - o_exit);
        const k_exitAnchor = getStopScreenAnchor(rStop, o_exit);
        const _enterAnchor = getStopScreenAnchor(iStop, d_enter);

        // Cubic bezier control points calculation
        const N_bez = (function (e, t, a) {
          const s_dx = t.x - e.x;
          const n_w = a.right - a.left;
          const l_reach = Math.max(0.45 * Math.abs(s_dx), 0);
          const r_dir = s_dx >= 0 ? 1 : -1;
          let i_pt = { x: e.x + r_dir * l_reach, y: e.y };
          let o_pt = { x: t.x - r_dir * l_reach, y: t.y };
          const d_min = 0.14 * n_w;
          if (Math.abs(s_dx) < d_min) {
            const n_off =
              ((e.x + t.x) / 2 < (a.left + a.right) / 2 ? 1 : -1) * (d_min - Math.abs(s_dx)) * 0.9;
            i_pt = { x: i_pt.x + n_off, y: lerp(e.y, t.y, 0.2) };
            o_pt = { x: o_pt.x + n_off, y: lerp(e.y, t.y, 0.8) };
          }
          const c_clip = (pt: { x: number; y: number }) => ({
            x: Math.min(a.right, Math.max(a.left, pt.x)),
            y: Math.min(a.bottom, Math.max(a.top, pt.y)),
          });
          return { p0: e, c1: c_clip(i_pt), c2: c_clip(o_pt), p1: t };
        })(
          { x: k_exitAnchor.x, y: k_exitAnchor.y - rStop.sink * rStop.s },
          { x: _enterAnchor.x, y: _enterAnchor.y - iStop.sink * iStop.s },
          rSafe
        );

        const w = quintic(v);
        const M_pt = bezierPt(N_bez.p0, N_bez.c1, N_bez.c2, N_bez.p1, w);
        scale = lerp(rStop.s, iStop.s, smoothstep(clamp01(v / 0.65)));

        const R_blend = Math.min(0.3, Math.max(0.06, (0.12 * sHeight) / g_dist));
        const S_blend = 1 - remapSmooth(0, R_blend, v);
        const T_blend = remapSmooth(1 - R_blend, 1, v);

        let L_y =
          M_pt.y +
          S_blend * (getStopScreenAnchor(rStop, scrollY).y - k_exitAnchor.y) +
          T_blend * (getStopScreenAnchor(iStop, scrollY).y - _enterAnchor.y);
        const C_x = M_pt.x;

        isAirborne = false;
        // Hero arch scallop hop
        if (rStop.behind && v < 0.36) {
          L_y -= Math.sin((v / 0.36) * Math.PI) * Math.min(64 * rStop.s, 72);
          isAirborne = v < 0.32;
        }
        if (iStop.behind && v > 0.68) {
          L_y -= Math.sin(((v - 0.68) / 0.32) * Math.PI) * Math.min(56 * iStop.s, 60);
          isAirborne = true;
        }

        isFront = !(rStop.behind && v < 0.12 || (iStop.behind && v > 0.92));
        const box =
          v < 0.5
            ? lerpBox(rStop.box, c_box, remapSmooth(0, rStop.behind ? 0.36 : 0.06, v))
            : lerpBox(c_box, iStop.box, remapSmooth(iStop.behind ? 0.68 : 0.94, 1, v));

        const clamped = clampViewport(C_x, L_y, scale, box, rSafe);
        anchorX = clamped.x;
        anchorY = clamped.y;
        isHolding = false;

        // Compute walked distance along the bezier curve
        let dist = 0;
        let prevPt = N_bez.p0;
        const steps = Math.max(1, Math.ceil(32 * clamp01(w)));
        for (let l = 1; l <= steps; l++) {
          const pt = bezierPt(N_bez.p0, N_bez.c1, N_bez.c2, N_bez.p1, (l / steps) * clamp01(w));
          dist += Math.hypot(pt.x - prevPt.x, pt.y - prevPt.y);
          prevPt = pt;
        }
        walkedDist = dist;
      }

      // Convert anchor coordinates to .pup-actor top-left translation
      const actorLeft = anchorX - d.x * scale;
      const actorTop = anchorY - d.y * scale;

      // Update scene states (here and visited) for all stops
      meta.forEach((item, idx) => {
        if (item.scene) {
          const isHere = isHolding && idx === P;
          const isVisited = idx <= P || (idx === P + 1 && v > 0.92);
          item.scene.dataset.here = String(isHere);
          item.scene.dataset.visited = String(isVisited);
        }
      });

      // Update facing direction based on horizontal movement
      if (prevXRef.current !== null && prevYRef.current !== null) {
        const dx = anchorX - prevXRef.current;
        const dy = anchorY - prevYRef.current;
        const moveDist = Math.hypot(dx, dy);

        if (moveDist > 0.25) {
          stillTimerRef.current = 0;
          walkStrideRef.current += moveDist;
        } else {
          stillTimerRef.current += dt;
        }

        if (Math.abs(dx) > 0.6 && Math.abs(dx) > 0.35 * Math.abs(dy)) {
          facingDirRef.current = dx > 0 ? 1 : -1;
        }
      }
      prevXRef.current = anchorX;
      prevYRef.current = anchorY;

      // Treadmill in-place walk when holding at stop 1 (Meet section)
      const isAtMeet = isHolding && P === 1 && meta[1]?.act === 'treadmill';
      if (isAtMeet) {
        const scrollDelta = Math.abs(scrollY - lastScrollYRef.current);
        if (scrollDelta > 0.2) {
          walkStrideRef.current += scrollDelta * 1.2;
          stillTimerRef.current = 0;
        }
      }

      // Determine active pose
      let targetPose: 'peek' | 'walk' | 'sit' | 'bow' | 'snug' | 'hop' = 'walk';
      let targetFacingDir = facingDirRef.current;

      if (isHolding) {
        targetPose = meta[P]?.pose ?? 'sit';
        targetFacingDir = meta[P]?.facing ?? 1;
        facingDirRef.current = targetFacingDir;
      } else {
        if (isAirborne) {
          targetPose = 'hop';
        } else if (stillTimerRef.current > 0.3) {
          targetPose = 'walk';
        } else {
          targetPose = 'walk';
        }
      }

      // Smooth interpolation of pose parameters for seamless transitions between walk, sit, hop, peek
      const targetPoseObj = POSES[targetPose] ?? POSES.walk;
      const lerpAlpha = 1 - Math.exp(-dt / 0.16);
      currentPoseRef.current = lerpPose(currentPoseRef.current, targetPoseObj, lerpAlpha);
      setCurrentPose({ ...currentPoseRef.current });

      // Paw print trails generation
      if (!isHolding && !isAirborne && prevXRef.current !== null && prevYRef.current !== null) {
        const stepIndex = Math.floor(walkedDist / (34 * scale));
        if (lastStopIndexRef.current === P && stepIndex !== lastStepIndexRef.current && printsRef.current) {
          const isOdd = (stepIndex & 1) === 1;
          const lateralPaw = isOdd ? 186 : 110;
          const pawLocalX = (targetFacingDir > 0 ? lateralPaw : 300 - lateralPaw) * scale;
          const pawPageX = actorLeft + pawLocalX;
          const pawPageY = actorTop + 226 * scale + scrollY + (isOdd ? -4 : 4) * scale;

          const dx = anchorX - (prevXRef.current ?? anchorX);
          const dy = anchorY - (prevYRef.current ?? anchorY);
          const angle = Math.atan2(dy, dx) + Math.PI / 2;
          const pawSize = 14 * Math.max(0.75, 1.5 * scale);

          const printSvgs = printsRef.current.children;
          if (printSvgs.length > 0) {
            const printEl = printSvgs[printIndexRef.current % printSvgs.length] as HTMLElement;
            printIndexRef.current++;

            printEl.style.transform = `translate(${(pawPageX - pawSize / 2).toFixed(1)}px, ${(
              pawPageY -
              pawSize / 2
            ).toFixed(1)}px) rotate(${angle.toFixed(3)}rad)`;
            printEl.style.width = `${pawSize.toFixed(1)}px`;
            printEl.style.height = `${pawSize.toFixed(1)}px`;

            printEl.animate(
              [
                { opacity: 0 },
                { opacity: 0.45, offset: 0.08 },
                { opacity: 0.45, offset: 0.5 },
                { opacity: 0 },
              ],
              { duration: 2600, easing: 'ease-out' }
            );
          }
        }
        lastStopIndexRef.current = P;
        lastStepIndexRef.current = stepIndex;
      }

      // Speech bubble at hero rest
      const showHeroHm = isHolding && P === 0 && scrollY < 120;
      setShowBubble(showHeroHm || isHappy);
      if (showHeroHm && !isHappy) {
        setBubbleText('hm?');
      }

      // Advance walk phase & wag phase
      const phase = (walkStrideRef.current / (36 * scale)) * Math.PI * 2;
      setWalkPhase(phase);
      setWagPhase(now * 3.5);

      setActorState({
        x: actorLeft,
        y: actorTop,
        scale: scale,
        pose: targetPose,
        facing: targetFacingDir > 0 ? 'right' : 'left',
        facingScale: targetFacingDir,
        cockAngle: 0,
        front: isFront,
        isHolding: isHolding,
      });

      lastScrollYRef.current = scrollY;
      animId = requestAnimationFrame(updateFrame);
    };

    animId = requestAnimationFrame(updateFrame);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      settleTimers.forEach(clearTimeout);
      resizeObserver.disconnect();
      document.documentElement.removeAttribute('data-pup');
    };
  }, [isHappy]);

  const facingDir = actorState.facingScale >= 0 ? 1 : -1;
  const bubbleAtX = (facingDir > 0 ? 214 : 300 - 214) * actorState.scale;
  const bubbleAtY = 30 * actorState.scale;

  return (
    <>
      <div aria-hidden="true" className="pup-probe" />

      {/* 48-element SVG paw footprint pool for walking trails */}
      <div ref={printsRef} aria-hidden="true" className="pup-prints">
        {Array.from({ length: 48 }).map((_, i) => (
          <svg key={i} viewBox="0 0 64 64">
            <path d={PAW_PATH} />
          </svg>
        ))}
      </div>

      {/* Main floating puppy mascot layer */}
      <div
        aria-hidden="true"
        className="pup-layer"
        data-front={actorState.front ? 'true' : 'false'}
        data-anchor="top"
      >
        <div
          className="pup-actor"
          style={{
            transform: `translate3d(${actorState.x.toFixed(2)}px, ${actorState.y.toFixed(2)}px, 0px)`,
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
          data-holding={actorState.isHolding ? 'true' : 'false'}
          onClick={handlePet}
          title="Click Teddy to pet him!"
        >
          <div
            className="pup-actor__body"
            style={{ transform: `scale(${actorState.scale.toFixed(4)})` }}
          >
            <TeddySvg
              pose={actorState.pose}
              poseParams={currentPose}
              facing={actorState.facing}
              facingScale={actorState.facingScale}
              cockAngle={actorState.cockAngle}
              walkPhase={walkPhase}
              wagPhase={wagPhase}
              isBlinking={isBlinking}
              isHappy={isHappy}
              isHolding={actorState.isHolding}
            />
          </div>

          <span
            className="pup-bubble-at"
            style={{
              transform: `translate(${bubbleAtX.toFixed(1)}px, ${bubbleAtY.toFixed(1)}px)`,
            }}
          >
            <span
              aria-hidden="true"
              className="pup-bubble"
              data-show={showBubble ? 'true' : 'false'}
            >
              {bubbleText}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
