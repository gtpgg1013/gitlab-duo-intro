import { Composition } from "remotion";
import { GitLabDuoIntro } from "./GitLabDuoIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GitLabDuoIntro"
        component={GitLabDuoIntro}
        durationInFrames={30 * 45}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
