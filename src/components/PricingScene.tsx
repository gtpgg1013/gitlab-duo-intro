import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

const plans = [
  {
    name: "Duo Core",
    price: "무료",
    description: "Premium/Ultimate 포함",
    color: "#3fb950",
    features: ["Code Suggestions", "Duo Chat", "Code Explanation"],
    recommended: false,
  },
  {
    name: "Duo Pro",
    price: "$19",
    period: "/월",
    description: "개발자를 위한 고급 기능",
    color: "#58a6ff",
    features: ["Core 기능 전체", "Test Generation", "Root Cause Analysis"],
    recommended: false,
  },
  {
    name: "Duo Enterprise",
    price: "맞춤",
    description: "대규모 조직 솔루션",
    color: "#a371f7",
    features: ["Pro 기능 전체", "Agent Platform", "AI Governance"],
    recommended: true,
  },
];

export const PricingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0d1117 0%, #161b22 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(63, 185, 80, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(163, 113, 247, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 80,
          textAlign: "center",
          opacity: headerProgress,
          transform: `translateY(${(1 - headerProgress) * 20}px)`,
        }}
      >
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
          심플한{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #3fb950, #58a6ff, #a371f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            가격 정책
          </span>
        </h2>
      </div>

      {/* Pricing Cards */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 60,
        }}
      >
        {plans.map((plan, index) => {
          const delay = fps * 0.3 + index * fps * 0.15;
          const cardProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 15, stiffness: 80 },
          });

          const isRecommended = plan.recommended;

          return (
            <div
              key={plan.name}
              style={{
                width: 380,
                padding: isRecommended ? 3 : 0,
                background: isRecommended
                  ? `linear-gradient(135deg, ${plan.color}, ${plan.color}80)`
                  : "transparent",
                borderRadius: 28,
                transform: `scale(${cardProgress}) ${isRecommended ? "translateY(-10px)" : ""}`,
                opacity: cardProgress,
              }}
            >
              <div
                style={{
                  background: "rgba(22, 27, 34, 0.95)",
                  borderRadius: isRecommended ? 25 : 28,
                  padding: "40px 36px",
                  border: isRecommended ? "none" : `1px solid ${plan.color}40`,
                  height: "100%",
                  boxSizing: "border-box",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Recommended badge */}
                {isRecommended && (
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      padding: "6px 16px",
                      background: plan.color,
                      borderRadius: 100,
                      fontSize: 12,
                      fontWeight: 700,
                      color: "white",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    추천
                  </div>
                )}

                {/* Plan name */}
                <h3
                  style={{
                    fontSize: 28,
                    color: plan.color,
                    margin: 0,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div
                  style={{
                    marginTop: 24,
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 56,
                      fontWeight: 800,
                      color: "white",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      style={{
                        fontSize: 20,
                        color: "rgba(255, 255, 255, 0.5)",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: 16,
                    color: "rgba(255, 255, 255, 0.6)",
                    margin: "12px 0 0 0",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  {plan.description}
                </p>

                {/* Divider */}
                <div
                  style={{
                    height: 1,
                    background: "rgba(255, 255, 255, 0.1)",
                    margin: "28px 0",
                  }}
                />

                {/* Features */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: `${plan.color}20`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          color: plan.color,
                        }}
                      >
                        ✓
                      </div>
                      <span
                        style={{
                          fontSize: 16,
                          color: "rgba(255, 255, 255, 0.8)",
                          fontFamily: "system-ui, -apple-system, sans-serif",
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom note */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: interpolate(frame, [fps * 2.5, fps * 3], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 32px",
            background: "rgba(252, 109, 38, 0.1)",
            borderRadius: 100,
            border: "1px solid rgba(252, 109, 38, 0.3)",
          }}
        >
          <span style={{ fontSize: 20 }}>✨</span>
          <span
            style={{
              fontSize: 18,
              color: "#FCA326",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 600,
            }}
          >
            GitLab 18.0부터 Duo Core가 Premium/Ultimate에 기본 포함!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
