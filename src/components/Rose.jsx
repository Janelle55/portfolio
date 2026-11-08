export default function Rose() {
  return (
    <svg className="rose-svg" role="img" aria-label="A red-pink rose with green leaves" viewBox="0 0 320 420">
      <defs>
        <radialGradient id="pOut" cx="50%" cy="70%" r="70%">
          <stop offset="0%" stopColor="#F7A1C0" />
          <stop offset="55%" stopColor="#D8436F" />
          <stop offset="100%" stopColor="#8E1538" />
        </radialGradient>
        <radialGradient id="pMid" cx="50%" cy="80%" r="75%">
          <stop offset="0%" stopColor="#FFC3D8" />
          <stop offset="50%" stopColor="#E0517E" />
          <stop offset="100%" stopColor="#9E1F44" />
        </radialGradient>
        <radialGradient id="pIn" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="#B8264F" />
          <stop offset="100%" stopColor="#6E0F2C" />
        </radialGradient>
        <linearGradient id="stem" x1="0" x2="1">
          <stop offset="0%" stopColor="#2E5A2A" />
          <stop offset="50%" stopColor="#4F8A3C" />
          <stop offset="100%" stopColor="#26471F" />
        </linearGradient>
        <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6FA34E" />
          <stop offset="100%" stopColor="#2B5626" />
        </linearGradient>
      </defs>
      <path d="M158 200 C150 260 168 320 156 410" fill="none" stroke="url(#stem)" strokeWidth="9" strokeLinecap="round" />
      <path d="M160 268 l14 -8 l-10 14 Z M154 330 l-14 -6 l12 12 Z M161 370 l13 -7 l-9 13 Z" fill="#2E5A2A" />
      <path d="M162 300 C200 270 246 272 270 250 C240 300 200 312 162 300 Z" fill="url(#leaf)" />
      <path d="M166 298 C200 286 230 276 262 256" fill="none" stroke="#A9D18B" strokeWidth="1.5" strokeOpacity="0.7" />
      <path d="M154 250 C116 226 74 234 48 214 C80 262 120 268 154 250 Z" fill="url(#leaf)" />
      <path d="M150 248 C118 240 88 230 56 218" fill="none" stroke="#A9D18B" strokeWidth="1.5" strokeOpacity="0.7" />
      <path d="M120 196 C100 190 92 176 100 166 C112 180 128 184 150 186 Z" fill="#3F7A36" />
      <path d="M196 196 C216 190 224 176 216 166 C204 180 188 184 166 186 Z" fill="#3F7A36" />
      <path d="M158 206 C96 210 58 160 70 112 C82 76 112 70 128 90 C110 120 124 168 158 182 Z" fill="url(#pOut)" />
      <path d="M158 206 C220 210 258 160 246 112 C234 76 204 70 188 90 C206 120 192 168 158 182 Z" fill="url(#pOut)" />
      <path d="M158 196 C112 196 86 150 96 104 C110 64 160 52 160 52 C160 52 208 64 222 104 C232 150 204 196 158 196 Z" fill="url(#pMid)" />
      <path d="M100 112 C120 86 150 92 160 112 C170 92 200 86 218 112 C210 160 180 184 158 186 C136 184 108 160 100 112 Z" fill="url(#pOut)" />
      <path d="M124 108 C130 78 150 66 160 66 C176 66 192 80 194 106 C186 92 170 88 160 96 C150 88 134 92 124 108 Z" fill="url(#pIn)" />
      <path d="M134 118 C138 100 150 92 162 94 C176 96 184 108 182 122 C176 112 166 108 158 112 C150 108 140 110 134 118 Z" fill="#8E1538" />
      <path d="M146 124 C150 112 162 108 170 116 C164 116 158 120 156 128 Z" fill="#5C0A24" />
      <path d="M104 116 C116 150 136 172 158 180" fill="none" stroke="#FFD3E2" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M214 116 C202 150 182 172 160 180" fill="none" stroke="#FFD3E2" strokeOpacity="0.45" strokeWidth="2" />
      <path d="M126 106 C134 84 148 74 160 72" fill="none" stroke="#FFB3CC" strokeOpacity="0.6" strokeWidth="1.5" />
      <circle cx="212" cy="140" r="3" fill="#FFFFFF" fillOpacity="0.7" />
    </svg>
  );
}
