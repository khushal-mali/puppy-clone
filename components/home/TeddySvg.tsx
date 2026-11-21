'use client';

import React from 'react';

export interface PoseParams {
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
}

export const STAND_POSE: PoseParams = {
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

export const POSES: Record<string, PoseParams> = {
  stand: STAND_POSE,
  walk: { ...STAND_POSE, tail: -6, tongue: 1 },
  sit: { ...STAND_POSE, bodyRot: -24, bodyY: -2, headX: -10, headY: -6, tail: 34, sit: 1, tongue: 1 },
  peek: { ...STAND_POSE, headY: 4, earL: -6, earR: 6, tail: -20, front: 1, tongue: 1 },
  snug: { ...STAND_POSE, headY: 9, headRot: 4, earL: 3, earR: -3, tail: -20, front: 1, tongue: 0 },
  hop: { ...STAND_POSE, bodyRot: -9, stretch: 1.06, headY: -6, fn: -42, ff: -32, bn: 40, bf: 30, earL: -26, earR: 26, tail: -24, tongue: 1 },
  bow: { ...STAND_POSE, bodyRot: 15, bodyY: 2, headX: 14, headY: 30, fn: -58, ff: -52, tail: -32, happy: 1, tongue: 1 },
  beg: { ...STAND_POSE, bodyRot: -36, bodyY: -6, headX: -18, headY: -18, sit: 1, fn: -70, ff: -64, tail: 30, happy: 1, tongue: 1 },
};

export function lerpPose(from: PoseParams, to: PoseParams, alpha: number): PoseParams {
  const result = { ...from };
  const keys = Object.keys(from) as (keyof PoseParams)[];
  for (const k of keys) {
    result[k] = from[k] + (to[k] - from[k]) * alpha;
  }
  return result;
}

export interface TeddySvgProps {
  pose?: 'peek' | 'walk' | 'sit' | 'bow' | 'snug' | 'hop';
  poseParams?: PoseParams;
  facing?: 'left' | 'right';
  facingScale?: number;
  cockAngle?: number;
  walkPhase?: number;
  wagPhase?: number;
  isBlinking?: boolean;
  isHappy?: boolean;
  isHolding?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function TeddySvg({
  pose = 'peek',
  poseParams,
  facing = 'right',
  facingScale,
  cockAngle,
  walkPhase = 0,
  wagPhase,
  isBlinking = false,
  isHappy = false,
  isHolding = true,
  className = '',
  onClick,
}: TeddySvgProps) {
  const e = poseParams || POSES[pose] || POSES.stand;
  const isLeft = facing === 'left';
  const effectiveFacingScale = facingScale !== undefined ? facingScale : isLeft ? -1 : 1;
  const rootTransform = `translate(150 0) scale(${effectiveFacingScale} 1) translate(-150 0)`;

  // Natural motion kinematics from original TeddyPups engine (modules 1063 & 89681)
  const time =
    wagPhase !== undefined
      ? wagPhase
      : typeof performance !== 'undefined'
      ? performance.now() / 1000
      : 0;

  const phase = walkPhase;
  const stride = pose === 'walk' || (!isHolding && e.sit < 0.5) ? 1 : 0;
  const isMoving = stride > 0.01 ? 1 : 0;
  const h_sin = Math.sin(phase);
  const f_sin = Math.sin(phase + Math.PI);
  const u_swing = 20 + 10 * stride;
  const p_step = (1 - Math.cos(2 * phase)) / 2;
  const idleBreathe = Math.sin(2.4 * time) * (1 - isMoving);

  const bodyBobY =
    e.bodyY - p_step * (2.5 + 4 * stride) * isMoving + 0.6 * idleBreathe;
  const bodyRotWithWalk = e.bodyRot + 1.6 * Math.sin(phase) * isMoving;
  // j_counterRot ensures that when body tilts backwards by -24deg upon sitting,
  // the front legs rotate forward by +24deg to remain planted vertically on the ground
  const j_counterRot = -e.bodyRot;

  const wagAmount = isHappy ? 1 : isHolding ? 0.35 : 0.7;
  const tailWagFreq = 1.2 + 2.6 * wagAmount;
  const tailWagAmp = 5 + 17 * wagAmount;
  const tailRot = e.tail + Math.sin(time * tailWagFreq * Math.PI * 2) * tailWagAmp;

  const headBobY =
    -((1 - Math.cos(2 * phase - 0.7)) / 2) * (2 + 3 * stride) * isMoving + 0.9 * idleBreathe;
  const headRotTotal =
    (cockAngle !== undefined ? cockAngle : e.headRot) + 1.4 * Math.sin(phase) * isMoving;

  return (
    <svg
      aria-label="Teddy, the TeddyPups mascot puppy"
      focusable="false"
      role="img"
      style={{ overflow: 'visible' }}
      viewBox="0 0 300 240"
      className={className}
      onClick={onClick}
    >
      <g data-p="root" transform={rootTransform}>
        {/* Shadow */}
        <ellipse
          cx="150"
          cy="230"
          data-p="shadow"
          fill="#2a170e"
          opacity={Math.max(0, 0.12 * (1 - e.front)).toFixed(2)}
          rx="92"
          ry="7"
          style={{ transformBox: 'fill-box', transformOrigin: 'center center' }}
          transform={`translate(${(0.6 * e.bodyX).toFixed(1)} 0) scale(${(
            1 -
            0.05 * p_step * isMoving
          ).toFixed(2)} 1)`}
        />

        {/* Body and Limbs */}
        <g
          data-p="body"
          opacity={Math.max(0, 1 - e.front).toFixed(2)}
          transform={`translate(${e.bodyX.toFixed(2)} ${bodyBobY.toFixed(2)}) rotate(${bodyRotWithWalk.toFixed(
            2
          )} 196 206) translate(196 0) scale(${e.stretch.toFixed(2)} 1) translate(-196 0)`}
        >
          {/* Back Far Leg - fades out smoothly as dog sits into haunch */}
          <g
            data-p="bf"
            opacity={Math.max(0, 1 - e.sit).toFixed(2)}
            transform={`translate(94 192) rotate(${(e.bf + h_sin * u_swing * isMoving).toFixed(2)})`}
          >
            <path
              d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14Z"
              fill="#e4a352"
            />
            <path
              d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14"
              fill="none"
              stroke="#2a170e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.4"
            />
            <path
              d="M-3.5 29 v5 M4.5 29 v5"
              fill="none"
              stroke="#2a170e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.4"
            />
          </g>

          {/* Front Far Leg - compensates body angle when sitting */}
          <g
            data-p="ff"
            transform={`translate(168 192) rotate(${(
              e.ff +
              j_counterRot +
              f_sin * u_swing * isMoving
            ).toFixed(2)})`}
          >
            <path
              d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z"
              fill="#e4a352"
            />
            <path
              d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14"
              fill="none"
              stroke="#2a170e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.4"
            />
            <path
              d="M-3.5 29 v5 M4.5 29 v5"
              fill="none"
              stroke="#2a170e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.4"
            />
          </g>

          {/* Tail */}
          <g data-p="tail" transform={`rotate(${tailRot.toFixed(2)} 84 150)`}>
            <path
              d="M86 152 C80 146 76 140 74 136"
              fill="none"
              stroke="#2a170e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="9"
            />
            <path
              d="M86 152 C80 146 76 140 74 136"
              fill="none"
              stroke="#f2be6b"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <path
              d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z"
              fill="#f2be6b"
              stroke="#2a170e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.4"
            />
          </g>

          {/* Back Near Leg - fades out smoothly as dog sits into haunch */}
          <g
            data-p="bn"
            opacity={Math.max(0, 1 - e.sit).toFixed(2)}
            transform={`translate(110 194) rotate(${(e.bn + f_sin * u_swing * isMoving).toFixed(2)})`}
          >
            <path
              d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z"
              fill="#f2be6b"
            />
            <path
              d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14"
              fill="none"
              stroke="#2a170e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.4"
            />
            <path
              d="M-3.5 27 v5 M4.5 27 v5"
              fill="none"
              stroke="#2a170e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.4"
            />
          </g>

          {/* Torso Cloud */}
          <path
            d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z"
            fill="#f2be6b"
            stroke="#2a170e"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.4"
          />
          {/* Chest Cloud */}
          <path
            d="M182.7 196.4Q169.4 196.9 166.6 183.0Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191.0 134.0Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181.0Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z"
            fill="#f2be6b"
            stroke="#2a170e"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.4"
          />

          {/* Front Near Leg */}
          <g
            data-p="fn"
            transform={`translate(186 194) rotate(${(
              e.fn +
              j_counterRot +
              h_sin * u_swing * isMoving
            ).toFixed(2)})`}
          >
            <path
              d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z"
              fill="#f2be6b"
            />
            <path
              d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14"
              fill="none"
              stroke="#2a170e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.4"
            />
            <path
              d="M-3.5 27 v5 M4.5 27 v5"
              fill="none"
              stroke="#2a170e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.4"
            />
          </g>
        </g>

        {/* Haunches - smoothly fades in as dog sits */}
        <g
          data-p="haunch"
          opacity={Math.max(0, e.sit * (1 - e.front)).toFixed(2)}
          transform={`translate(0 ${(-0.06 * e.bodyRot).toFixed(2)})`}
        >
          <path
            d="M80.0 204.0Q75.1 194.9 85.7 189.9Q88.4 180.2 100.7 181.2Q110.0 174.6 119.3 181.2Q131.6 180.2 134.3 189.9Q144.9 194.9 140.0 204.0Q144.9 213.1 134.3 218.1Q131.6 227.8 119.3 226.8Q110.0 233.4 100.7 226.8Q88.4 227.8 85.7 218.1Q75.1 213.1 80.0 204.0Z"
            fill="#f2be6b"
            stroke="#2a170e"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.4"
          />
          <path
            d="M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z"
            fill="#f2be6b"
            stroke="#2a170e"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.4"
          />
          <path
            d="M132 222v5M139 222v5"
            fill="none"
            stroke="#2a170e"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.4"
          />
        </g>

        {/* Head */}
        <g
          data-p="head"
          transform={`translate(${e.headX.toFixed(2)} ${(e.headY + headBobY).toFixed(
            2
          )}) rotate(${headRotTotal.toFixed(2)} 212 100)`}
        >
          {/* Collar */}
          <path
            d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z"
            fill="#a24a1a"
            stroke="#2a170e"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <path
            d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z"
            fill="#fbe3b4"
            stroke="#2a170e"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.4"
          />

          {/* Left Ear */}
          <path
            d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
            data-p="earL"
            fill="#e4a352"
            stroke="#2a170e"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.4"
            transform={`rotate(${(e.earL + 4 * Math.sin(2 * phase) * isMoving).toFixed(2)} 174 82)`}
          />

          {/* Right Ear */}
          <path
            d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
            data-p="earR"
            fill="#e4a352"
            stroke="#2a170e"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.4"
            transform={`rotate(${(e.earR - 4 * Math.sin(2 * phase) * isMoving).toFixed(2)} 250 82)`}
          />

          {/* Head Cloud */}
          <path
            d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
            fill="#f2be6b"
            stroke="#2a170e"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.4"
          />

          {/* Topknot Tuft */}
          <path
            d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z"
            fill="#f2be6b"
            stroke="#2a170e"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />

          {/* Snout */}
          <path
            d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z"
            fill="#fbe3b4"
          />
          <circle cx="181" cy="116" fill="#f9b9a6" opacity="0.85" r="7" />
          <circle cx="243" cy="116" fill="#f9b9a6" opacity="0.85" r="7" />

          {/* Eyes */}
          <g data-p="eyes">
            {!isHappy && (
              <g data-p="open" opacity={Math.max(0, e.eyes - e.happy).toFixed(2)}>
                <g
                  data-p="blink"
                  transform={
                    isBlinking
                      ? 'translate(0 90) scale(1 0.08)'
                      : 'translate(0 0) scale(1 1)'
                  }
                >
                  <ellipse cx="194" cy="98" fill="#2a170e" rx="7.4" ry="8.6" />
                  <ellipse cx="230" cy="98" fill="#2a170e" rx="7.4" ry="8.6" />
                  <circle cx="196.6" cy="94.6" fill="#fff" r="2.7" />
                  <circle cx="232.6" cy="94.6" fill="#fff" r="2.7" />
                  <circle cx="192" cy="101.2" fill="#fff" r="1.2" />
                  <circle cx="228" cy="101.2" fill="#fff" r="1.2" />
                </g>
              </g>
            )}

            {/* Happy eyes when petted */}
            {(isHappy || e.happy > 0.01) && (
              <path
                d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101"
                data-p="happy"
                fill="none"
                opacity={isHappy ? '1' : e.happy.toFixed(2)}
                stroke="#2a170e"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3.4"
              />
            )}
          </g>

          {/* Nose */}
          <path
            d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z"
            fill="#2a170e"
          />
          <path
            d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2"
            fill="none"
            stroke="#2a170e"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />

          {/* Tongue */}
          <path
            d="M207.6 127.4 Q212 136.6 216.4 127.4 Z"
            data-p="tongue"
            fill="#e98c8c"
            opacity={(e.tongue * (1 - e.mouth)).toFixed(2)}
            stroke="#2a170e"
            strokeLinejoin="round"
            strokeWidth="2.2"
          />
        </g>

        {/* Ledge (Paws peeking over quilt or basket rim) */}
        <g data-p="ledge" opacity={e.front.toFixed(2)}>
          <path
            d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z"
            fill="#f2be6b"
            stroke="#2a170e"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.4"
          />
          <path
            d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5"
            fill="none"
            stroke="#2a170e"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.4"
          />
        </g>
      </g>
    </svg>
  );
}
