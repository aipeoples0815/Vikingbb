# 하하호호 스튜디오 — Netlify 운영 안내

1. GitHub에 이 폴더를 새 **비공개** 저장소로 업로드한다. 사진, 비밀키 및 개인 데이터를 올리지 않는다.
2. Netlify > Add new project > Import existing project > GitHub 저장소 선택.
3. Build command: `npm run build`, Publish directory: `dist`, Functions directory: `netlify/functions` (netlify.toml에 설정됨).
4. Site configuration > Environment variables에 `OPERATOR_PIN`을 길고 추측 불가능한 값으로 추가한다.
5. 더 안전한 추천 운영: `OPENAI_API_KEY`도 Netlify 환경변수로 설정. 모델은 `OPENAI_IMAGE_MODEL=gpt-image-1` (계정 접근 권한 필요). **절대로 VITE_ 변수에 비밀키 입력 금지.**
6. Deploy. 관리자 화면에서 같은 PIN 입력. Netlify OPENAI_API_KEY가 없으면 관리자 화면에서 API 키를 넣어 브라우저 탭 세션에 보관할 수 있다(현장 공유 PC에서 사용 후 탭을 종료).
7. 사진은 고객 동의하에 업로드하고 촬영 후 [다운로드] 버튼으로 저장한다. Netlify 서버는 PC의 C: 드라이브에 자동 저장할 수 없다.
8. 무료 사용량/계정의 이미지 모델 접근, OpenAI 결제 상태, API 요청/Netlify 실행시간 제한 확인. 실 사진 1장으로 사전 테스트 필수.

주의: 운영자 PIN 방식은 공유 행사 키오스크를 위한 최소 보호장치다. 공개된 링크에 PIN을 노출하지 말고 사용 뒤 변경한다. 이미지 5:7은 원본 1024×1536을 중심 크롭해 1000×1400 JPEG로 돌려준다. **얼굴 동일성은 모델 결과에 따라 달라질 수 있으며 '60%' 수치 보장 불가.**
