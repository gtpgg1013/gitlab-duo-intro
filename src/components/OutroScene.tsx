import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Breathing animation for logo glow
  const breathe = interpolate(
    frame % (fps * 3),
    [0, fps * 1.5, fps * 3],
    [1, 1.15, 1],
    { easing: Easing.inOut(Easing.sin) }
  );

  // Text animations
  const mainTextProgress = interpolate(frame, [fps * 0.5, fps * 1.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const ctaProgress = spring({
    frame: frame - fps * 1.5,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const urlProgress = interpolate(frame, [fps * 2.5, fps * 3.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animated particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    x: (i * 97 + 13) % 100,
    y: (i * 73 + 7) % 100,
    size: 1 + (i % 4),
    speed: 0.1 + (i % 5) * 0.05,
    delay: i * 3,
  }));

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #0d1117 40%, #1a1a2e 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "20%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(252, 109, 38, 0.15) 0%, transparent 60%)",
          filter: "blur(80px)",
          transform: `scale(${breathe})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163, 113, 247, 0.1) 0%, transparent 60%)",
          filter: "blur(80px)",
          transform: `scale(${breathe * 0.9 + 0.1})`,
        }}
      />

      {/* Floating particles */}
      {particles.map((particle, i) => {
        const yOffset = Math.sin((frame * particle.speed + particle.delay) * 0.08) * 40;
        const opacity = interpolate(
          frame,
          [particle.delay, particle.delay + fps],
          [0, 0.3 + (i % 3) * 0.2],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              background: i % 2 === 0 ? "#FC6D26" : "#a371f7",
              opacity,
              transform: `translateY(${yOffset}px)`,
            }}
          />
        );
      })}

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* GitLab Logo */}
        <div
          style={{
            position: "relative",
            transform: `scale(${logoScale})`,
          }}
        >
          {/* Logo glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(252, 109, 38, 0.5) 0%, transparent 70%)",
              filter: "blur(40px)",
              transform: `translate(-50%, -50%) scale(${breathe})`,
            }}
          />

          {/* Rotating ring */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: "1px solid rgba(252, 109, 38, 0.3)",
              transform: `translate(-50%, -50%) rotate(${frame * 0.5}deg)`,
            }}
          />

          <svg width="120" height="120" viewBox="0 0 380 380">
            <defs>
              <filter id="outroGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#outroGlow)">
              <path
                fill="#E24329"
                d="M282.83,170.73l-.27-.69-26.14-68.22a6.81,6.81,0,0,0-2.69-3.24,7,7,0,0,0-8,.43,7,7,0,0,0-2.32,3.52l-17.65,54H154.29l-17.65-54A6.86,6.86,0,0,0,134.32,99a7,7,0,0,0-8-.43,6.87,6.87,0,0,0-2.69,3.24L97.44,170l-.26.69a48.54,48.54,0,0,0,16.1,56.1l.09.07.24.17,39.82,29.82,19.7,14.91,12,9.06a8.07,8.07,0,0,0,9.76,0l12-9.06,19.7-14.91,40.06-30,.1-.08A48.56,48.56,0,0,0,282.83,170.73Z"
              />
              <path
                fill="#FC6D26"
                d="M282.83,170.73l-.27-.69a88.3,88.3,0,0,0-35.15,15.8L190,229.25c19.55,14.79,36.57,27.64,36.57,27.64l40.06-30,.1-.08A48.56,48.56,0,0,0,282.83,170.73Z"
              />
              <path
                fill="#FCA326"
                d="M153.43,256.89l19.7,14.91,12,9.06a8.07,8.07,0,0,0,9.76,0l12-9.06,19.7-14.91S209.55,244,190,229.25C170.45,244,153.43,256.89,153.43,256.89Z"
              />
              <path
                fill="#FC6D26"
                d="M132.58,185.84A88.19,88.19,0,0,0,97.44,170l-.26.69a48.54,48.54,0,0,0,16.1,56.1l.09.07.24.17,39.82,29.82s17-12.85,36.57-27.64Z"
              />
            </g>
          </svg>
        </div>

        {/* Main text */}
        <div
          style={{
            textAlign: "center",
            opacity: mainTextProgress,
            transform: `translateY(${(1 - mainTextProgress) * 30}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              margin: 0,
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: -2,
              lineHeight: 1.2,
            }}
          >
            AI와 함께하는
          </h1>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              margin: 0,
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: -2,
              background: "linear-gradient(90deg, #FC6D26, #FCA326, #a371f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DevSecOps의 미래
          </h1>
        </div>

        {/* CTA Button */}
        <div
          style={{
            transform: `scale(${Math.max(0, ctaProgress)})`,
            opacity: ctaProgress > 0 ? 1 : 0,
          }}
        >
          <div
            style={{
              position: "relative",
              padding: 3,
              background: "linear-gradient(135deg, #FC6D26, #FCA326)",
              borderRadius: 100,
              boxShadow: "0 10px 50px rgba(252, 109, 38, 0.4)",
            }}
          >
            <div
              style={{
                padding: "20px 50px",
                background: "linear-gradient(135deg, #FC6D26, #FCA326)",
                borderRadius: 97,
              }}
            >
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "white",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                지금 시작하기
              </span>
            </div>
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            opacity: urlProgress,
            marginTop: 20,
          }}
        >
          <p
            style={{
              fontSize: 24,
              color: "rgba(255, 255, 255, 0.6)",
              margin: 0,
              fontFamily: "monospace",
              letterSpacing: 1,
            }}
          >
            about.gitlab.com/gitlab-duo
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          opacity: interpolate(frame, [fps * 4, fps * 4.5], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <p
          style={{
            fontSize: 16,
            color: "rgba(255, 255, 255, 0.5)",
            margin: 0,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          GitLab Duo - 소프트웨어 개발의 모든 단계를 AI로 가속화
        </p>
      </div>
    </AbsoluteFill>
  );
};
