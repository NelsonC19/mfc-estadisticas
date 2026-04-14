export default function FuturisticHeader({ title, className = "" }) {
  return (
    <div className={`relative mb-8 overflow-hidden rounded-xl w-fit mx-auto ${className}`}>

      <div
        className="relative bg-[#1e3a8a]/80 backdrop-blur-md 
        border-2 border-cyan-400/60
        rounded-xl px-6 py-3 text-center
        shadow-[0_0_15px_rgba(0,255,255,0.4)]"
      >

        {/* BRILLO */}
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          <div
            className="absolute top-0 left-[-100%] w-[60%] h-full
            bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent
            skew-x-[-20deg]"
            style={{
              animation: "shimmer 4s infinite"
            }}
          />
        </div>

        {/* TEXTO */}
        <span className="relative z-10 text-cyan-300 font-extrabold text-2xl md:text-3xl tracking-wide whitespace-nowrap">
          {title}
        </span>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-20 h-[2px] bg-cyan-400 blur-sm opacity-70"></div>

    </div>
  );
}