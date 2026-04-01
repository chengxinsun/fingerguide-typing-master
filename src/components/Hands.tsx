import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Finger } from '../constants';

interface HandsProps {
  activeFinger: Finger | null;
}

const COLORS = {
  skin: '#F1D2B2',
  shade: '#E5BF96',
  outline: '#9A6A43',
  crease: '#B07A4D',
  nail: '#FAECDD',
  active: '#DCEEFF',
};

const fingerNames: Record<string, string> = {
  pinky: '小指',
  ring: '无名指',
  middle: '中指',
  index: '食指',
  thumb: '大拇指',
};

type FingerKind = 'pinky' | 'ring' | 'middle' | 'index' | 'thumb';

type ZoneSpec = {
  kind: FingerKind;
  path: string;
  nailX: number;
  nailY: number;
  nailWidth: number;
  nailHeight: number;
  nailRotation?: number;
  moveX?: number;
  moveY?: number;
};

const MAIN_HAND_PATH =
  'M35 155 C25 148 18 136 18 123 L18 97 C18 83 24 72 33 66 C42 60 49 65 52 76 L55 101 C56 106 60 110 64 110 C68 110 71 106 71 100 L71 52 C71 34 79 21 91 21 C103 21 111 34 111 51 L111 99 C111 104 115 108 119 108 C123 108 126 104 126 98 L126 35 C126 17 135 4 148 4 C160 4 169 18 169 36 L169 102 C169 107 173 111 177 111 C181 111 184 107 184 101 L184 44 C184 26 193 13 206 13 C218 13 226 26 226 43 L226 106 C226 111 230 115 234 115 C238 115 241 111 241 105 L241 63 C241 48 249 38 260 38 C272 38 280 48 280 62 L280 118 C280 131 275 143 265 151 C254 159 241 163 226 163 L88 163 C69 163 51 160 35 155 Z';

const THUMB_PATH =
  'M177 104 C190 106 202 113 212 122 C219 129 221 137 217 145 C212 152 203 154 193 151 C181 147 171 140 163 132 C157 126 154 118 157 111 C160 106 168 103 177 104 Z';

const FINGER_ZONES: ZoneSpec[] = [
  {
    kind: 'pinky',
    path: 'M31 101 C30 90 30 73 31 58 C32 44 38 36 47 37 C55 39 58 47 58 59 L58 101 C58 109 52 115 44 115 C37 114 32 109 31 101 Z',
    nailX: 39,
    nailY: 41,
    nailWidth: 13,
    nailHeight: 9,
    nailRotation: -6,
    moveX: -1,
    moveY: -6,
  },
  {
    kind: 'ring',
    path: 'M74 104 C73 90 73 69 74 49 C75 31 82 20 92 20 C101 20 106 30 106 48 L106 104 C106 113 100 119 91 119 C82 118 75 113 74 104 Z',
    nailX: 82,
    nailY: 26,
    nailWidth: 15,
    nailHeight: 10,
    nailRotation: -3,
    moveY: -7,
  },
  {
    kind: 'middle',
    path: 'M118 107 C117 91 117 67 118 43 C119 22 126 10 137 10 C147 10 152 22 152 42 L152 107 C152 117 145 124 136 124 C126 123 119 117 118 107 Z',
    nailX: 126,
    nailY: 17,
    nailWidth: 15,
    nailHeight: 10,
    moveY: -8,
  },
  {
    kind: 'index',
    path: 'M162 103 C161 89 161 68 162 48 C163 30 170 19 180 19 C189 19 194 29 194 47 L194 103 C194 112 188 118 179 118 C170 117 163 112 162 103 Z',
    nailX: 170,
    nailY: 25,
    nailWidth: 15,
    nailHeight: 10,
    nailRotation: 3,
    moveX: 1,
    moveY: -7,
  },
  {
    kind: 'thumb',
    path: 'M177 104 C190 106 202 113 212 122 C219 129 221 137 217 145 C212 152 203 154 193 151 C181 147 171 140 163 132 C157 126 154 118 157 111 C160 106 168 103 177 104 Z',
    nailX: 195,
    nailY: 125,
    nailWidth: 14,
    nailHeight: 9,
    nailRotation: 29,
    moveX: 3,
    moveY: -4,
  },
];

const FINGER_CREASES = [
  'M37 67 C43 65 48 65 53 67 M37 84 C43 82 48 82 53 84',
  'M80 58 C87 56 93 56 99 58 M80 78 C87 76 93 76 99 78',
  'M124 56 C131 54 138 54 145 56 M124 77 C131 75 138 75 145 77',
  'M168 58 C175 56 181 56 187 58 M168 79 C175 77 181 77 187 79',
  'M173 121 C179 124 184 128 189 133',
];

const PALM_LINES = [
  'M70 87 C91 80 116 79 156 87',
  'M67 115 C82 123 101 126 117 126 C135 126 151 123 166 116',
];

const Hand = ({ side, activeFinger }: { side: 'left' | 'right'; activeFinger: Finger | null }) => {
  const isRight = side === 'right';
  const clipId = `hand-clip-${side}`;
  const activeKind = activeFinger?.startsWith(side) ? activeFinger.split('-')[1] as FingerKind : null;
  const activeZone = activeKind ? FINGER_ZONES.find((zone) => zone.kind === activeKind) : null;

  return (
    <div className="flex items-center justify-center">
      <svg width="232" height="170" viewBox="0 0 300 170" className="overflow-visible">
        <defs>
          <clipPath id={clipId}>
            <path d={MAIN_HAND_PATH} />
            <path d={THUMB_PATH} />
          </clipPath>
        </defs>

        <g transform={isRight ? 'translate(300 0) scale(-1 1)' : undefined}>
          {activeZone && (
            <motion.g
              initial={false}
              animate={{
                x: activeZone.moveX ?? 0,
                y: activeZone.moveY ?? -6,
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              clipPath={`url(#${clipId})`}
            >
              <path d={activeZone.path} fill={COLORS.active} opacity="0.95" />
            </motion.g>
          )}

          <path
            d={MAIN_HAND_PATH}
            fill={COLORS.skin}
            stroke={COLORS.outline}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d={THUMB_PATH}
            fill={COLORS.skin}
            stroke={COLORS.outline}
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {PALM_LINES.map((line, index) => (
            <path
              key={`${side}-${line}`}
              d={line}
              stroke={index === 0 ? COLORS.crease : COLORS.shade}
              strokeWidth={index === 0 ? 3 : 10}
              strokeLinecap="round"
              opacity={index === 0 ? 0.22 : 0.5}
              fill="none"
            />
          ))}

          <path d="M66 56 C67 73 67 88 66 104" stroke={COLORS.crease} strokeWidth="2" opacity="0.2" fill="none" />
          <path d="M110 48 C111 67 111 85 110 102" stroke={COLORS.crease} strokeWidth="2" opacity="0.2" fill="none" />
          <path d="M154 41 C155 62 155 84 154 105" stroke={COLORS.crease} strokeWidth="2" opacity="0.2" fill="none" />
          <path d="M198 47 C199 67 199 88 198 107" stroke={COLORS.crease} strokeWidth="2" opacity="0.2" fill="none" />

          {FINGER_CREASES.map((line) => (
            <path
              key={`${side}-crease-${line}`}
              d={line}
              stroke={COLORS.crease}
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.16"
              fill="none"
            />
          ))}

          {FINGER_ZONES.map((zone) => (
            <rect
              key={`${side}-nail-${zone.kind}`}
              x={zone.nailX}
              y={zone.nailY}
              width={zone.nailWidth}
              height={zone.nailHeight}
              rx={zone.nailHeight / 2}
              transform={
                zone.nailRotation
                  ? `rotate(${zone.nailRotation} ${zone.nailX + zone.nailWidth / 2} ${zone.nailY + zone.nailHeight / 2})`
                  : undefined
              }
              fill={COLORS.nail}
              opacity="0.96"
            />
          ))}
        </g>

        <text x="150" y="166" textAnchor="middle" className="fill-gray-400 text-[10px] font-black">
          {side === 'left' ? '左手' : '右手'}
        </text>
      </svg>
    </div>
  );
};

export const Hands: React.FC<HandsProps> = ({ activeFinger }) => {
  const activeLabel = activeFinger
    ? `${activeFinger.startsWith('left') ? '左手' : '右手'}${fingerNames[activeFinger.split('-')[1]]}`
    : '';

  return (
    <div className="relative flex items-start justify-center gap-0 sm:gap-2 w-full mb-1 scale-[0.68] sm:scale-[0.8] lg:scale-[0.88] origin-top">
      <Hand side="left" activeFinger={activeFinger} />
      <Hand side="right" activeFinger={activeFinger} />

      <AnimatePresence>
        {activeFinger && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/95 px-4 py-2 rounded-full border border-blue-100 shadow-sm flex items-center gap-2 whitespace-nowrap"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-bold text-gray-600">
              当前指法：
              <span className="text-blue-600">{activeLabel}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
