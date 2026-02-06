# GitLab Duo Introduction Video

GitLab Duo의 기능을 소개하는 45초 영상 프로젝트입니다. [Remotion](https://remotion.dev)으로 제작되었습니다.

## 영상 구성

| 씬 | 시간 | 내용 |
|----|------|------|
| Intro | 0-6초 | GitLab Duo 로고 및 타이틀 |
| Features | 6-24초 | 6가지 핵심 기능 소개 |
| Agent Platform | 24-34초 | 2025년 신기능 에이전트 플랫폼 |
| Pricing | 34-39초 | 가격 플랜 (Core/Pro/Enterprise) |
| Outro | 39-45초 | CTA 및 마무리 |

## 기술 스택

- **Remotion** - React 기반 비디오 제작
- **TypeScript** - 타입 안전성
- **@remotion/transitions** - 장면 전환 효과
- **@remotion/media** - 오디오 처리

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (미리보기)
npm start

# 영상 렌더링
npm run build
```

## 프로젝트 구조

```
src/
├── index.ts              # 엔트리 포인트
├── Root.tsx              # Composition 등록
├── GitLabDuoIntro.tsx    # 메인 영상 컴포넌트
└── components/
    ├── IntroScene.tsx    # 인트로 씬
    ├── FeatureScene.tsx  # 기능 소개 씬
    ├── AgentScene.tsx    # 에이전트 플랫폼 씬
    ├── PricingScene.tsx  # 가격 플랜 씬
    ├── OutroScene.tsx    # 아웃트로 씬
    └── AudioTrack.tsx    # 오디오 트랙

public/audio/
├── narration-*.wav       # 한국어 나레이션 (TTS)
├── whoosh.mp3            # 전환 효과음
└── pop.mp3               # 카드 등장 효과음
```

## 오디오

- **나레이션**: macOS TTS (Yuna 한국어 음성)
- **효과음**: Whoosh (전환), Pop (카드 등장)
- **BGM**: 선택적 추가 가능 (`public/audio/bgm.mp3`)

## 출력

렌더링 후 `out/video.mp4` 파일이 생성됩니다.

- 해상도: 1920x1080
- FPS: 30
- 길이: 45초

## 라이선스

MIT
