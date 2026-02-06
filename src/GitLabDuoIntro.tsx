import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { IntroScene } from "./components/IntroScene";
import { FeatureScene } from "./components/FeatureScene";
import { AgentScene } from "./components/AgentScene";
import { PricingScene } from "./components/PricingScene";
import { OutroScene } from "./components/OutroScene";
import { AudioTrack } from "./components/AudioTrack";

const FPS = 30;

export const GitLabDuoIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
      {/* Audio Layer */}
      <AudioTrack />

      <TransitionSeries>
        {/* Intro - 6 seconds */}
        <TransitionSeries.Sequence durationInFrames={6 * FPS}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />

        {/* Features Overview - 18 seconds */}
        <TransitionSeries.Sequence durationInFrames={18 * FPS}>
          <FeatureScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        {/* Agent Platform - 10 seconds */}
        <TransitionSeries.Sequence durationInFrames={10 * FPS}>
          <AgentScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />

        {/* Pricing - 5 seconds */}
        <TransitionSeries.Sequence durationInFrames={5 * FPS}>
          <PricingScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        {/* Outro - 6 seconds */}
        <TransitionSeries.Sequence durationInFrames={6 * FPS}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
