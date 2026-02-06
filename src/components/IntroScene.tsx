import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated background gradient position
  const gradientPos = interpolate(frame, [0, fps * 6], [0, 100]);

  // Logo animations - smoother entrance
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80, mass: 0.5 },
  });

  const logoY = interpolate(frame, [0, fps * 0.8], [80, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Ring animations around logo
  const ring1Scale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 60 },
  });

  const ring2Scale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15, stiffness: 60 },
  });

  const ringRotation = interpolate(frame, [0, fps * 6], [0, 360]);

  // Title animation - letter by letter feel
  const titleProgress = interpolate(frame, [fps * 0.6, fps * 1.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // "Duo" special animation
  const duoScale = spring({
    frame: frame - fps * 1,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const duoGlow = interpolate(frame, [fps * 1.2, fps * 1.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle animation
  const subtitleOpacity = interpolate(frame, [fps * 1.8, fps * 2.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(frame, [fps * 1.8, fps * 2.3], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Tagline with typing effect simulation
  const taglineProgress = interpolate(frame, [fps * 3, fps * 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating orbs
  const orbs = [
    { x: 15, y: 20, size: 300, color: "rgba(252, 109, 38, 0.08)", speed: 0.3 },
    { x: 80, y: 70, size: 400, color: "rgba(252, 163, 38, 0.06)", speed: 0.2 },
    { x: 60, y: 30, size: 250, color: "rgba(88, 166, 255, 0.05)", speed: 0.4 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(ellipse at ${50 + Math.sin(gradientPos * 0.02) * 10}% ${50 + Math.cos(gradientPos * 0.02) * 10}%,
            rgba(252, 109, 38, 0.1) 0%,
            transparent 50%),
          linear-gradient(135deg, #0f0f1a 0%, #0d1117 40%, #111827 100%)
        `,
      }}
    >
      {/* Animated floating orbs */}
      {orbs.map((orb, i) => {
        const yOffset = Math.sin((frame * orb.speed + i * 100) * 0.05) * 20;
        const xOffset = Math.cos((frame * orb.speed + i * 50) * 0.03) * 15;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${orb.x + xOffset * 0.5}%`,
              top: `${orb.y + yOffset * 0.5}%`,
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              filter: "blur(40px)",
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* Main content container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 0,
        }}
      >
        {/* Logo with rings */}
        <div
          style={{
            position: "relative",
            marginBottom: 50,
            transform: `translateY(${logoY}px)`,
          }}
        >
          {/* Outer ring */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 280,
              height: 280,
              borderRadius: "50%",
              border: "1px solid rgba(252, 109, 38, 0.2)",
              transform: `translate(-50%, -50%) scale(${ring2Scale}) rotate(${ringRotation}deg)`,
              opacity: ring2Scale > 0 ? 0.6 : 0,
            }}
          />

          {/* Inner ring */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 220,
              height: 220,
              borderRadius: "50%",
              border: "1px solid rgba(252, 163, 38, 0.3)",
              transform: `translate(-50%, -50%) scale(${ring1Scale}) rotate(${-ringRotation * 0.5}deg)`,
              opacity: ring1Scale > 0 ? 0.8 : 0,
            }}
          />

          {/* Logo glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(252, 109, 38, 0.4) 0%, transparent 70%)",
              filter: "blur(30px)",
              transform: `translate(-50%, -50%) scale(${logoScale})`,
            }}
          />

          {/* GitLab Logo */}
          <div style={{ transform: `scale(${logoScale})` }}>
            <svg width="150" height="150" viewBox="0 0 380 380">
              <defs>
                <filter id="logoGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g filter="url(#logoGlow)">
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
        </div>

        {/* Title */}
        <div
          style={{
            overflow: "hidden",
            marginBottom: 16,
          }}
        >
          <h1
            style={{
              fontSize: 120,
              fontWeight: 800,
              color: "white",
              margin: 0,
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: -4,
              transform: `translateY(${(1 - titleProgress) * 100}%)`,
              display: "flex",
              alignItems: "baseline",
              gap: 20,
            }}
          >
            <span>GitLab</span>
            <span
              style={{
                background: "linear-gradient(135deg, #FC6D26 0%, #FCA326 50%, #FC6D26 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                transform: `scale(${Math.max(0, duoScale)})`,
                display: "inline-block",
                filter: `drop-shadow(0 0 ${duoGlow * 30}px rgba(252, 109, 38, 0.5))`,
              }}
            >
              Duo
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 42,
            color: "rgba(255, 255, 255, 0.7)",
            margin: 0,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 400,
            letterSpacing: 2,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          AI-Native Development Assistant
        </p>

        {/* Tagline with animated underline */}
        <div
          style={{
            marginTop: 60,
            position: "relative",
            opacity: taglineProgress,
          }}
        >
          <p
            style={{
              fontSize: 28,
              color: "rgba(255, 255, 255, 0.9)",
              margin: 0,
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 500,
              padding: "20px 50px",
              background: "rgba(255, 255, 255, 0.03)",
              borderRadius: 16,
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            소프트웨어 개발의 모든 단계를 AI로 가속화
          </p>

          {/* Animated bottom accent */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              height: 2,
              background: "linear-gradient(90deg, transparent, #FC6D26, #FCA326, transparent)",
              width: `${taglineProgress * 80}%`,
              transform: "translateX(-50%)",
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: "linear-gradient(to top, rgba(13, 17, 23, 0.8) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
