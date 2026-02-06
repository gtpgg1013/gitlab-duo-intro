import { Audio } from "@remotion/media";
import { Sequence, staticFile, useVideoConfig, interpolate } from "remotion";

const FPS = 30;

// Scene timings (in seconds)
const SCENES = {
  intro: { start: 0, duration: 6 },
  features: { start: 6, duration: 18 },
  agents: { start: 24, duration: 10 },
  pricing: { start: 34, duration: 5 },
  outro: { start: 39, duration: 6 },
};

export const AudioTrack: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <>
      {/* Intro Narration */}
      <Sequence from={Math.floor(0.5 * fps)} layout="none">
        <Audio
          src={staticFile("audio/narration-intro.wav")}
          volume={1}
        />
      </Sequence>

      {/* Features Narration */}
      <Sequence from={Math.floor(7 * fps)} layout="none">
        <Audio
          src={staticFile("audio/narration-features.wav")}
          volume={1}
        />
      </Sequence>

      {/* Agents Narration */}
      <Sequence from={Math.floor(25 * fps)} layout="none">
        <Audio
          src={staticFile("audio/narration-agents.wav")}
          volume={1}
        />
      </Sequence>

      {/* Pricing Narration */}
      <Sequence from={Math.floor(35 * fps)} layout="none">
        <Audio
          src={staticFile("audio/narration-pricing.wav")}
          volume={1}
        />
      </Sequence>

      {/* Outro Narration */}
      <Sequence from={Math.floor(40 * fps)} layout="none">
        <Audio
          src={staticFile("audio/narration-outro.wav")}
          volume={1}
        />
      </Sequence>

      {/* Transition Sound Effects */}
      {/* Intro to Features transition */}
      <Sequence from={Math.floor(5.5 * fps)} layout="none">
        <Audio
          src={staticFile("audio/whoosh.mp3")}
          volume={0.4}
        />
      </Sequence>

      {/* Features to Agents transition */}
      <Sequence from={Math.floor(23.5 * fps)} layout="none">
        <Audio
          src={staticFile("audio/whoosh.mp3")}
          volume={0.4}
        />
      </Sequence>

      {/* Agents to Pricing transition */}
      <Sequence from={Math.floor(33.5 * fps)} layout="none">
        <Audio
          src={staticFile("audio/whoosh.mp3")}
          volume={0.4}
        />
      </Sequence>

      {/* Pricing to Outro transition */}
      <Sequence from={Math.floor(38.5 * fps)} layout="none">
        <Audio
          src={staticFile("audio/whoosh.mp3")}
          volume={0.4}
        />
      </Sequence>

      {/* Pop sounds for card appearances */}
      {/* Feature cards pop (6 cards) */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Sequence key={`feature-pop-${i}`} from={Math.floor((8 + i * 0.3) * fps)} layout="none">
          <Audio
            src={staticFile("audio/pop.mp3")}
            volume={0.15}
          />
        </Sequence>
      ))}

      {/* Agent cards pop */}
      {[0, 1, 2].map((i) => (
        <Sequence key={`agent-pop-${i}`} from={Math.floor((26 + i * 0.4) * fps)} layout="none">
          <Audio
            src={staticFile("audio/pop.mp3")}
            volume={0.15}
          />
        </Sequence>
      ))}

      {/* Pricing cards pop */}
      {[0, 1, 2].map((i) => (
        <Sequence key={`pricing-pop-${i}`} from={Math.floor((35.5 + i * 0.3) * fps)} layout="none">
          <Audio
            src={staticFile("audio/pop.mp3")}
            volume={0.15}
          />
        </Sequence>
      ))}
    </>
  );
};
