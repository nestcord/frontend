export default function Initialize() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="relative w-[52px] h-[52px]">
          {[0, 1].map((index) => (
            <span
              key={index}
              className="absolute top-0 left-0 w-[10px] h-[10px] bg-[#7289da]"
              style={{
                animation: 'cubeSpinner 1.8s ease-in-out infinite',
                animationDelay: index === 1 ? '-0.9s' : '0s',
              }}
            />
          ))}
        </div>
        <style jsx>{`
          @keyframes cubeSpinner {
            25% {
              transform: translateX(22px) rotate(-90deg) scale(0.5);
            }
            50% {
              transform: translateX(22px) translateY(22px) rotate(-180deg);
            }
            75% {
              transform: translateX(0) translateY(22px) rotate(-270deg) scale(0.5);
            }
            100% {
              transform: rotate(-360deg);
            }
          }
        `}</style>
      </div>
    )
  }