import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

const agents = [
  {
    name: "Planner",
    desc: "백로그 분석 및 우선순위 지정",
    icon: "📋",
    color: "#58a6ff",
  },
  {
    name: "Security Analyst",
    desc: "취약점 분류 및 해결 가이드",
    icon: "🔒",
    color: "#f85149",
  },
  {
    name: "Data Analyst",
    desc: "데이터 분석 및 인사이트",
    icon: "📊",
    color: "#3fb950",
  },
];

const workflows = [
  { name: "Issue → MR", icon: "📝" },
  { name: "CI/CD 마이그레이션", icon: "🔄" },
  { name: "Pipeline 오류 수정", icon: "🔧" },
  { name: "Code Review", icon: "👀" },
];

export const AgentScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Animated connection lines
  const connectionProgress = interpolate(frame, [fps * 2, fps * 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0d1117 100%)",
      }}
    >
      {/* Animated background particles */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = (i * 37) % 100;
        const y = (i * 53) % 100;
        const size = 2 + (i % 3);
        const speed = 0.2 + (i % 5) * 0.1;
        const yOffset = Math.sin((frame * speed + i * 20) * 0.05) * 30;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: `rgba(163, 113, 247, ${0.1 + (i % 3) * 0.1})`,
              transform: `translateY(${yOffset}px)`,
            }}
          />
        );
      })}

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 80,
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
            background: "rgba(163, 113, 247, 0.1)",
            borderRadius: 100,
            border: "1px solid rgba(163, 113, 247, 0.3)",
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 24 }}>🤖</span>
          <span
            style={{
              fontSize: 18,
              color: "#a371f7",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            2025 New Feature
          </span>
        </div>

        <h2
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            margin: 0,
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: -2,
          }}
        >
          Agent{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #a371f7, #8957e5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Platform
          </span>
        </h2>
        <p
          style={{
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.6)",
            margin: "16px 0 0 0",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          자율적으로 작업을 수행하는 AI 에이전트
        </p>
      </div>

      {/* Main content - Two columns */}
      <div
        style={{
          position: "absolute",
          top: 340,
          left: 100,
          right: 100,
          display: "flex",
          gap: 60,
        }}
      >
        {/* Left: Agents */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 30,
              opacity: interpolate(frame, [fps * 0.5, fps * 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                width: 4,
                height: 28,
                background: "linear-gradient(180deg, #58a6ff, #1f6feb)",
                borderRadius: 2,
              }}
            />
            <h3
              style={{
                fontSize: 28,
                color: "white",
                margin: 0,
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 600,
              }}
            >
              기본 제공 에이전트
            </h3>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {agents.map((agent, index) => {
              const delay = fps * 1 + index * fps * 0.2;
              const cardProgress = spring({
                frame: frame - delay,
                fps,
                config: { damping: 15, stiffness: 80 },
              });

              return (
                <div
                  key={agent.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    padding: 24,
                    background: "rgba(255, 255, 255, 0.03)",
                    borderRadius: 20,
                    border: `1px solid ${agent.color}30`,
                    transform: `translateX(${(1 - cardProgress) * -50}px)`,
                    opacity: cardProgress,
                  }}
                >
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 18,
                      background: `linear-gradient(135deg, ${agent.color}30, ${agent.color}10)`,
                      border: `1px solid ${agent.color}50`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 36,
                    }}
                  >
                    {agent.icon}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: 26,
                        color: "white",
                        margin: 0,
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {agent.name}
                    </h4>
                    <p
                      style={{
                        fontSize: 18,
                        color: "rgba(255, 255, 255, 0.6)",
                        margin: "6px 0 0 0",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {agent.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Workflows */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 30,
              opacity: interpolate(frame, [fps * 1.5, fps * 2], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                width: 4,
                height: 28,
                background: "linear-gradient(180deg, #a371f7, #8957e5)",
                borderRadius: 2,
              }}
            />
            <h3
              style={{
                fontSize: 28,
                color: "white",
                margin: 0,
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 600,
              }}
            >
              자동화 워크플로우
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            }}
          >
            {workflows.map((workflow, index) => {
              const delay = fps * 2 + index * fps * 0.15;
              const cardProgress = spring({
                frame: frame - delay,
                fps,
                config: { damping: 15, stiffness: 80 },
              });

              return (
                <div
                  key={workflow.name}
                  style={{
                    padding: 28,
                    background: "rgba(163, 113, 247, 0.08)",
                    borderRadius: 20,
                    border: "1px solid rgba(163, 113, 247, 0.2)",
                    textAlign: "center",
                    transform: `scale(${cardProgress})`,
                    opacity: cardProgress,
                  }}
                >
                  <div style={{ fontSize: 40, marginBottom: 12 }}>
                    {workflow.icon}
                  </div>
                  <p
                    style={{
                      fontSize: 18,
                      color: "white",
                      margin: 0,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {workflow.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom: External Integration */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 100,
          right: 100,
          opacity: interpolate(frame, [fps * 6, fps * 7], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${interpolate(frame, [fps * 6, fps * 7], [30, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
            padding: "28px 60px",
            background: "linear-gradient(90deg, rgba(252, 109, 38, 0.1), rgba(163, 113, 247, 0.1))",
            borderRadius: 24,
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <span
            style={{
              fontSize: 20,
              color: "rgba(255, 255, 255, 0.5)",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 500,
            }}
          >
            외부 통합
          </span>
          <div style={{ width: 1, height: 30, background: "rgba(255, 255, 255, 0.1)" }} />
          <span
            style={{
              fontSize: 22,
              color: "white",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 600,
            }}
          >
            Claude Code
          </span>
          <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>•</span>
          <span
            style={{
              fontSize: 22,
              color: "white",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 600,
            }}
          >
            Codex CLI
          </span>
          <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>•</span>
          <span
            style={{
              fontSize: 22,
              color: "white",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 600,
            }}
          >
            MCP 서버
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
