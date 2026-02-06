import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

const features = [
  {
    icon: "✨",
    title: "Code Suggestions",
    description: "실시간 코드 자동완성",
    detail: "20+ 프로그래밍 언어 지원",
    color: "#58a6ff",
    gradient: "linear-gradient(135deg, #58a6ff 0%, #1f6feb 100%)",
  },
  {
    icon: "📖",
    title: "Code Explanation",
    description: "복잡한 코드를 자연어로 설명",
    detail: "IDE & GitLab UI에서 바로 사용",
    color: "#a371f7",
    gradient: "linear-gradient(135deg, #a371f7 0%, #8957e5 100%)",
  },
  {
    icon: "🧪",
    title: "Test Generation",
    description: "자동 테스트 코드 생성",
    detail: "유닛 & 통합 테스트 자동화",
    color: "#3fb950",
    gradient: "linear-gradient(135deg, #3fb950 0%, #238636 100%)",
  },
  {
    icon: "🔍",
    title: "Code Review",
    description: "AI 기반 코드 리뷰",
    detail: "MR 자동 요약 & 리뷰어 추천",
    color: "#f778ba",
    gradient: "linear-gradient(135deg, #f778ba 0%, #db61a2 100%)",
  },
  {
    icon: "🛡️",
    title: "Security Analysis",
    description: "취약점 탐지 및 자동 수정",
    detail: "False Positive 자동 감지",
    color: "#d29922",
    gradient: "linear-gradient(135deg, #d29922 0%, #bb8009 100%)",
  },
  {
    icon: "🔧",
    title: "Root Cause Analysis",
    description: "CI/CD 실패 원인 분석",
    detail: "로그 분석 & 해결책 제안",
    color: "#f85149",
    gradient: "linear-gradient(135deg, #f85149 0%, #da3633 100%)",
  },
];

export const FeatureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerProgress = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Calculate which features should be visible
  const featureStartFrame = fps * 0.8;
  const featureDuration = fps * 2.5; // Each feature visible for 2.5 seconds
  const staggerDelay = fps * 0.15; // Stagger between cards

  // Current active feature index (for highlighting)
  const activeIndex = Math.min(
    5,
    Math.max(0, Math.floor((frame - featureStartFrame) / (featureDuration / 3)))
  );

  // Duo Chat banner
  const chatBannerProgress = interpolate(
    frame,
    [fps * 14, fps * 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0d1117 0%, #161b22 50%, #0d1117 100%)",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: headerProgress,
          transform: `translateY(${(1 - headerProgress) * 30}px)`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            padding: "12px 32px",
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: 100,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 28 }}>🚀</span>
          <span
            style={{
              fontSize: 20,
              color: "rgba(255, 255, 255, 0.6)",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 500,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Core Features
          </span>
        </div>

        <h2
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "white",
            margin: 0,
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: -1,
          }}
        >
          개발 라이프사이클을 위한{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #FC6D26, #FCA326)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI 기능
          </span>
        </h2>
      </div>

      {/* Feature Grid - 3x2 layout */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 80,
          right: 80,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 30,
        }}
      >
        {features.map((feature, index) => {
          const cardDelay = featureStartFrame + index * staggerDelay;

          const cardProgress = spring({
            frame: frame - cardDelay,
            fps,
            config: { damping: 15, stiffness: 80 },
          });

          const cardOpacity = interpolate(
            frame,
            [cardDelay, cardDelay + fps * 0.3],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Highlight effect for active card
          const isHighlighted = index === activeIndex && frame > featureStartFrame + fps * 2;
          const highlightGlow = isHighlighted
            ? interpolate(
                (frame - featureStartFrame) % (fps * 0.5),
                [0, fps * 0.25, fps * 0.5],
                [0.3, 0.5, 0.3]
              )
            : 0;

          return (
            <div
              key={feature.title}
              style={{
                background: "rgba(22, 27, 34, 0.8)",
                borderRadius: 24,
                padding: 32,
                border: `1px solid ${isHighlighted ? feature.color : "rgba(255, 255, 255, 0.08)"}`,
                opacity: cardOpacity,
                transform: `scale(${cardProgress}) ${isHighlighted ? "scale(1.02)" : ""}`,
                boxShadow: isHighlighted
                  ? `0 0 60px ${feature.color}${Math.round(highlightGlow * 255).toString(16).padStart(2, "0")}`
                  : "0 4px 24px rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* Icon with gradient background */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: feature.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  boxShadow: `0 8px 24px ${feature.color}40`,
                }}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "white",
                  margin: 0,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 20,
                  color: "rgba(255, 255, 255, 0.8)",
                  margin: 0,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  lineHeight: 1.4,
                }}
              >
                {feature.description}
              </p>

              {/* Detail tag */}
              <div
                style={{
                  marginTop: "auto",
                  padding: "8px 16px",
                  background: `${feature.color}15`,
                  borderRadius: 8,
                  alignSelf: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: feature.color,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {feature.detail}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Duo Chat Banner */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - chatBannerProgress) * 50}px)`,
          opacity: chatBannerProgress,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "20px 48px",
            background: "linear-gradient(135deg, rgba(252, 109, 38, 0.15) 0%, rgba(252, 163, 38, 0.15) 100%)",
            borderRadius: 100,
            border: "1px solid rgba(252, 109, 38, 0.3)",
            boxShadow: "0 8px 32px rgba(252, 109, 38, 0.2)",
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FC6D26, #FCA326)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            💬
          </div>
          <div>
            <p
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "white",
                margin: 0,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Duo Chat
            </p>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255, 255, 255, 0.7)",
                margin: 0,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              자연어로 대화하는 AI 어시스턴트
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
