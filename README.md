# 🎊 모바일 청첩장 프로젝트

Next.js 기반의 커스터마이징 가능한 모바일 청첩장 웹사이트

## 🌐 배포 링크

- **청첩장**: https://wedding-sample-tan.vercel.app/
- **관리자**: https://wedding-sample-tan.vercel.app/admin

## ✨ 주요 기능

- 📱 **반응형 디자인** (모바일/태블릿/데스크톱)
- 🎨 **3가지 테마** (우아한/로맨틱/모던) + 커스텀 색상
- 🖼️ **Swiper 갤러리** 슬라이더 (자동 재생, 네비게이션)
- 🎉 **4가지 컨페티 효과** (하트/꽃잎/반짝이/혼합)
- 📝 **방명록 & 참석의사** (모달 팝업)
- 📥 **PDF 다운로드**
- 🎵 **배경 음악**
- 💐 **화환 보내기** 링크
- 💰 **계좌번호 복사** 기능
- 🗺️ **오시는 길** (카카오맵 연동)

## 🚀 빠른 시작

### 1. 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 http://localhost:3000 열기

### 3. 관리자 페이지에서 데이터 입력
http://localhost:3000/admin 접속하여:
- 신랑/신부 정보 입력
- 예식 정보 및 이미지 URL 설정
- 테마 및 색상 선택
- 기능 on/off 설정

### 4. 미리보기
"💾 데이터 저장" → "👁️ 미리보기" 클릭

## 📦 배포하기

### 방법 1: 로컬 미리보기 (localStorage)
관리자 페이지에서 "데이터 저장" 버튼만 클릭하면 즉시 반영됨

### 방법 2: 실제 배포 (Vercel)
1. 관리자 페이지에서 "📥 파일 다운로드" 클릭
2. 다운로드한 `wedding-data.ts`를 `data/` 폴더에 복사
3. Git 커밋 & 푸시:
```bash
git add data/wedding-data.ts
git commit -m "Update wedding data"
git push origin master:main
```
4. Vercel 자동 배포 완료! (1-2분 소요)

## 📂 프로젝트 구조

```
wedding-sample/
├── pages/
│   ├── index.tsx          # 메인 청첩장 페이지
│   ├── admin.tsx          # 관리자 페이지
│   ├── _app.tsx           # App 래퍼
│   └── _document.tsx      # HTML 문서
├── components/
│   ├── MainSection.tsx           # 메인 섹션
│   ├── InfoSection.tsx           # 신랑신부 정보
│   ├── GallerySection.tsx        # 사진 갤러리
│   ├── LocationSection.tsx       # 오시는 길
│   ├── AccountSection.tsx        # 계좌번호
│   ├── InteractiveSection.tsx    # 참여하기 버튼
│   ├── GuestbookSection.tsx      # 방명록
│   ├── RSVPSection.tsx           # 참석의사
│   ├── ConfettiEffect.tsx        # 컨페티 효과
│   └── Modal.tsx                 # 모달 팝업
├── data/
│   └── wedding-data.ts    # 청첩장 데이터
├── types/
│   └── wedding.ts         # TypeScript 타입
├── styles/
│   └── globals.css        # 전역 스타일
└── public/                # 정적 파일
```

## 🎨 커스터마이징

### 테마 변경
관리자 페이지 → "디자인 & 기능" → 테마 드롭다운
- **우아한 (elegant)**: 클래식, 세리프, 베이지 톤
- **로맨틱 (romantic)**: 핑크, 그라데이션, 부드러운 느낌
- **모던 (modern)**: 대담한 폰트, 그림자, 선명한 색상

### 색상 변경
관리자 페이지 → "커스텀 색상" → Color Picker
- 메인 색상 (Primary)
- 서브 색상 (Secondary)
- 배경 색상 (Background)

### 컨페티 효과 변경
관리자 페이지 → "추가 기능" → 컨페티 효과 타입
- 하트 ❤️
- 꽃잎 🌸
- 반짝이 ✨
- 혼합 🎊

## 🛠 기술 스택

- **프레임워크**: Next.js 14 (Pages Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **라이브러리**:
  - Swiper (갤러리 슬라이더)
  - react-confetti (컨페티 효과)
  - html2canvas + jsPDF (PDF 생성)
  - framer-motion (애니메이션)
- **배포**: Vercel
- **저장소**: GitHub

## 📖 상세 문서

전체 기능 명세 및 폴더 구조는 [SPECIFICATION.md](./SPECIFICATION.md) 참고

## 📝 라이선스

MIT License

---

Made with ❤️ by Next.js & TypeScript
