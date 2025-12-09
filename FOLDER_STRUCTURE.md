# 📂 폴더 및 파일 구조 상세 설명

## 전체 구조 개요

```
wedding-sample/
├── 📁 pages/              # Next.js 페이지 라우팅
├── 📁 components/         # React 컴포넌트
├── 📁 data/              # 데이터 파일
├── 📁 types/             # TypeScript 타입 정의
├── 📁 styles/            # 스타일 시트
├── 📁 public/            # 정적 파일
├── 📄 설정 파일들
└── 📄 문서 파일들
```

---

## 📁 `/pages` - Next.js 페이지 라우터

### `index.tsx` (132줄)
**역할**: 메인 청첩장 페이지 (홈페이지)

**주요 기능**:
- localStorage에서 관리자 설정 데이터 로드
- 커스텀 색상 CSS 변수 적용
- 모든 섹션 컴포넌트 조합 및 렌더링
- PDF 다운로드 기능
- 배경 음악 재생

**의존성**:
- `@/data/wedding-data` - 기본 청첩장 데이터
- `@/components/*` - 모든 섹션 컴포넌트
- `html2canvas`, `jspdf` - PDF 생성

**상태 관리**:
- `showConfetti`: 컨페티 표시 여부
- `weddingData`: 청첩장 데이터 객체
- `isDownloading`: PDF 다운로드 진행 상태

**핵심 로직**:
```typescript
// localStorage 데이터 동기화
useEffect(() => {
  const savedData = localStorage.getItem('wedding-data');
  if (savedData) {
    setWeddingData(JSON.parse(savedData));
  }
}, []);

// PDF 생성
const handleDownloadPDF = async () => {
  // canvas로 화면 캡처 → PDF 변환
};
```

---

### `admin.tsx` (545줄)
**역할**: 관리자 데이터 입력 페이지

**주요 기능**:
- 청첩장 정보 입력 폼 (신랑/신부/예식/이미지)
- 테마 및 색상 커스터마이징
- 기능 on/off 토글
- 데이터 저장/다운로드/업로드

**섹션 구성**:
1. **신랑 정보**: 이름, 전화, 계좌
2. **신부 정보**: 이름, 전화, 계좌
3. **예식 정보**: 날짜, 시간, 장소, 인사말
4. **이미지**: 메인 이미지, 갤러리 이미지 목록
5. **디자인 & 기능**: 테마, 폰트, 기능 토글
6. **커스텀 색상**: Primary, Secondary, Background
7. **추가 기능**: 컨페티 타입, 음악 URL, 화환 URL

**핵심 함수**:
- `handleSaveData()`: localStorage 저장
- `handleDownloadFile()`: wedding-data.ts 파일 생성
- `handleFileUpload()`: 기존 파일 불러오기
- `handlePreview()`: 새 창으로 미리보기

**데이터 흐름**:
```
입력 폼 → formData 상태 → localStorage/파일
              ↓
         index.tsx에서 읽기
```

---

### `_app.tsx` (7줄)
**역할**: Next.js 애플리케이션 래퍼

**기능**:
- 전역 CSS 적용 (`globals.css`)
- 모든 페이지 공통 설정

```typescript
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

---

### `_document.tsx` (13줄)
**역할**: HTML 문서 구조 정의

**기능**:
- `<html>`, `<head>`, `<body>` 태그 커스터마이징
- 폰트, 메타 태그 등 전역 설정

```typescript
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

---

## 📁 `/components` - React 컴포넌트

### `MainSection.tsx` (60줄)
**역할**: 메인 히어로 섹션

**표시 내용**:
- 메인 이미지 (Next.js Image 최적화)
- 신랑/신부 이름
- 예식 날짜, 시간, 장소
- 인사말

**테마별 스타일**:
- `.main-section`: 섹션 배경
- `.main-image`: 이미지 형태 (사각/원형)
- `.main-title`: 타이틀 폰트 및 장식

**Props**:
```typescript
interface MainSectionProps {
  data: WeddingData;
  onImageLoad?: () => void;  // 이미지 로드 시 컨페티 트리거
}
```

---

### `InfoSection.tsx` (38줄)
**역할**: 신랑/신부 정보 카드

**표시 내용**:
- 신랑/신부 이름
- 전화번호 (클릭 시 전화 걸기)

**레이아웃**:
- 2열 그리드 (모바일: 1열)
- 각 카드에 전화 아이콘 + 링크

---

### `GallerySection.tsx` (78줄)
**역할**: 사진 갤러리 슬라이더

**주요 기능**:
- **Swiper 라이브러리** 통합
- 자동 재생 (3초 간격)
- 네비게이션 버튼 (좌우 화살표)
- 페이지네이션 (하단 점)
- 이미지 클릭 시 전체화면 모달

**반응형 설정**:
```typescript
breakpoints={{
  640: { slidesPerView: 2 },  // 태블릿
  768: { slidesPerView: 3 },  // PC
}}
```

**의존성**:
- `swiper/react`
- `swiper/modules` - Navigation, Pagination, Autoplay
- `swiper/css/*` - 스타일시트

**상태**:
- `selectedImage`: 모달에 표시할 이미지 URL

---

### `LocationSection.tsx` (56줄)
**역할**: 오시는 길 정보

**주요 기능**:
- 장소명, 주소 표시
- 카카오맵 열기 버튼
- 주소 복사 버튼

**함수**:
```typescript
const openMap = () => {
  window.open(`https://map.kakao.com/link/search/${address}`);
};

const copyAddress = () => {
  navigator.clipboard.writeText(address);
  alert('주소가 복사되었습니다');
};
```

---

### `AccountSection.tsx` (67줄)
**역할**: 계좌번호 표시

**표시 내용**:
- 신랑 측 계좌 (은행, 계좌번호, 예금주)
- 신부 측 계좌

**기능**:
- 계좌번호 복사 버튼
- 클립보드 API 사용

**Props**:
```typescript
interface AccountSectionProps {
  groom: PersonInfo;
  bride: PersonInfo;
}
```

---

### `InteractiveSection.tsx` (92줄)
**역할**: 참여하기 버튼 섹션 (방명록/RSVP/화환)

**주요 기능**:
- 3개 버튼 그리드 레이아웃
- 각 버튼 클릭 시 모달 열기
- 화환은 외부 링크

**상태 관리**:
- `isGuestbookOpen`: 방명록 모달 상태
- `isRSVPOpen`: RSVP 모달 상태

**조건부 렌더링**:
```typescript
{showGuestbook && <방명록 버튼>}
{showRSVP && <RSVP 버튼>}
{showFlower && flowerUrl && <화환 링크>}
```

---

### `GuestbookSection.tsx` (101줄)
**역할**: 방명록 작성 및 표시

**주요 기능**:
- 이름, 비밀번호, 메시지 입력
- localStorage에 저장
- 방명록 목록 표시

**Props**:
```typescript
interface GuestbookSectionProps {
  isModal?: boolean;  // 모달 모드 (패딩/배경 제거)
}
```

**데이터 구조**:
```typescript
interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  password: string;
  createdAt: string;
}
```

---

### `RSVPSection.tsx` (148줄)
**역할**: 참석 의사 설문

**입력 필드**:
- 이름
- 참석 여부 (예/아니오/미정)
- 참석 인원
- 메시지

**Props**:
```typescript
interface RSVPSectionProps {
  isModal?: boolean;
}
```

**제출 후 상태**:
- 제출 완료 메시지 표시
- localStorage에 저장

---

### `ConfettiEffect.tsx` (108줄)
**역할**: 꽃가루 애니메이션 효과

**주요 기능**:
- 4가지 타입 지원 (hearts, flowers, sparkles, mixed)
- 타입별 색상 및 입자 수 설정
- 커스텀 입자 모양 (하트, 별)
- 7초 후 자동 중지

**Props**:
```typescript
interface ConfettiEffectProps {
  type?: 'hearts' | 'flowers' | 'sparkles' | 'mixed';
}
```

**핵심 로직**:
```typescript
const getColors = () => {
  // 타입별 색상 배열 반환
};

const getPiecesCount = () => {
  // 타입별 입자 수 반환
};

drawShape={(ctx) => {
  // 커스텀 모양 그리기 (하트, 별)
}}
```

**물리 설정**:
- `gravity`: 0.08 (낙하 속도)
- `wind`: 0.005 (바람 효과)
- `opacity`: 0.7 (투명도)

---

### `Modal.tsx` (44줄)
**역할**: 재사용 가능한 모달 팝업

**기능**:
- 오버레이 배경 (클릭 시 닫기)
- 스크롤 가능한 컨텐츠 영역
- 닫기 버튼 (X)

**Props**:
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}
```

**스타일**:
- `fixed inset-0`: 전체 화면 오버레이
- `max-h-[80vh]`: 최대 높이 제한
- `overflow-y-auto`: 세로 스크롤

---

## 📁 `/data` - 데이터

### `wedding-data.ts` (54줄)
**역할**: 청첩장 기본 데이터

**포함 내용**:
- 신랑/신부 정보
- 예식 정보
- 이미지 URLs
- 테마 설정
- 커스텀 색상
- 기능 플래그
- 컨페티 타입
- 음악/화환 URL

**타입**:
```typescript
export const weddingData: WeddingData = {
  groom: { ... },
  bride: { ... },
  wedding: { ... },
  images: { ... },
  theme: 'elegant',
  font: 'serif',
  customColors: { ... },
  features: { ... },
  confettiType: 'mixed',
  musicUrl: '',
  flowerUrl: '',
  validUntil: '2024-12-31',
};
```

**업데이트 방법**:
1. Admin에서 파일 다운로드
2. 이 파일을 덮어쓰기
3. Git 커밋 & 푸시

---

## 📁 `/types` - TypeScript 타입

### `wedding.ts` (70줄)
**역할**: 전체 타입 정의

**주요 인터페이스**:

#### `WeddingData`
```typescript
interface WeddingData {
  groom: PersonInfo;
  bride: PersonInfo;
  wedding: WeddingInfo;
  images: ImageInfo;
  theme: 'elegant' | 'romantic' | 'modern';
  font: 'serif' | 'sans';
  customColors?: ColorScheme;
  features: Features;
  confettiType: ConfettiType;
  musicUrl?: string;
  flowerUrl?: string;
  validUntil: string;
}
```

#### `PersonInfo`
```typescript
interface PersonInfo {
  name: string;
  phone: string;
  account?: {
    bank: string;
    accountNumber: string;
    holder: string;
  };
}
```

#### `Features`
```typescript
interface Features {
  confetti: boolean;
  guestbook: boolean;
  rsvp: boolean;
  gallery: boolean;
  moneyGift: boolean;
  pdfDownload: boolean;
  music: boolean;
  flower: boolean;
}
```

#### `GuestbookEntry`
```typescript
interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  password: string;
  createdAt: string;
}
```

#### `RSVPResponse`
```typescript
interface RSVPResponse {
  name: string;
  attendance: 'yes' | 'no' | 'maybe';
  guestCount: number;
  message: string;
}
```

---

## 📁 `/styles` - 스타일

### `globals.css` (188줄)
**역할**: 전역 스타일 및 테마 정의

**구조**:
1. **Tailwind 지시어** (`@tailwind`)
2. **Google Fonts 임포트**
3. **CSS 변수 정의**
4. **3가지 테마 클래스**
5. **테마별 메인 섹션 스타일**
6. **애니메이션**

**테마 클래스**:

#### `.theme-elegant`
- 배경: 베이지/크림
- 폰트: Noto Serif KR (명조)
- 이미지: 사각형
- 장식: 밑줄 액센트

#### `.theme-romantic`
- 배경: 핑크 그라데이션
- 폰트: Noto Sans KR (고딕)
- 이미지: 원형
- 장식: 하트 아이콘

#### `.theme-modern`
- 배경: 그레이/화이트
- 폰트: 굵은 고딕
- 이미지: 사각형 + 그림자
- 장식: 세로 액센트 바

**CSS 변수**:
```css
--primary-color: #8b7355;
--secondary-color: #d4c5b9;
```

**애니메이션**:
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 📁 `/public` - 정적 파일

현재는 `.gitkeep` 파일만 존재

**용도**:
- 파비콘, 로고 등 정적 이미지
- robots.txt, sitemap.xml 등

---

## 📄 설정 파일

### `next.config.js`
**Next.js 빌드 설정**
- `swcMinify: true` - 빠른 번들링
- `images.unoptimized: true` - 외부 이미지 최적화 비활성화
- `eslint.ignoreDuringBuilds: true` - 빌드 중 ESLint 무시
- `typescript.ignoreBuildErrors: true` - 빌드 중 타입 에러 무시

### `vercel.json`
**Vercel 배포 설정**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### `tsconfig.json`
**TypeScript 설정**
- `strict: false` - 엄격 모드 비활성화
- `moduleResolution: bundler` - 최신 모듈 해석
- `paths: { "@/*": ["./*"] }` - 절대 경로 alias

### `tailwind.config.js`
**Tailwind CSS 설정**
- `content`: 스캔할 파일 경로
- `theme`: 커스텀 테마 설정
- `plugins`: 추가 플러그인

### `package.json`
**프로젝트 메타데이터**
- `scripts`: 빌드/개발 명령어
- `dependencies`: 프로덕션 의존성
- `devDependencies`: 개발 의존성

**주요 의존성**:
```json
{
  "next": "14.0.4",
  "react": "18.2.0",
  "typescript": "5.3.3",
  "tailwindcss": "3.4.0",
  "swiper": "11.1.15",
  "react-confetti": "6.1.0",
  "html2canvas": "1.4.1",
  "jspdf": "2.5.1"
}
```

---

## 📄 문서 파일

### `README.md`
**프로젝트 소개 및 사용 가이드**
- 기능 소개
- 설치 방법
- 배포 방법
- 프로젝트 구조

### `SPECIFICATION.md`
**기능 명세서**
- 전체 기능 목록
- 각 기능 상세 설명
- 데이터 흐름
- 기술 스택

### `FOLDER_STRUCTURE.md` (현재 파일)
**폴더 및 파일 구조 상세 설명**

---

## 🔄 데이터 흐름 다이어그램

```
┌─────────────────┐
│  Admin Page     │
│  (입력 폼)       │
└────────┬────────┘
         │
         ├─→ "데이터 저장" → localStorage
         │                      ↓
         │              ┌───────────────┐
         │              │  Index Page   │
         │              │  (useEffect)  │
         │              └───────────────┘
         │
         └─→ "파일 다운로드" → wedding-data.ts
                                   ↓
                            data/ 폴더에 복사
                                   ↓
                              Git Push
                                   ↓
                            Vercel 배포
```

---

## 🛠 개발 워크플로우

### 로컬 개발
```bash
1. npm install
2. npm run dev
3. http://localhost:3000/admin에서 데이터 입력
4. "데이터 저장" 클릭
5. http://localhost:3000에서 확인
```

### 실제 배포
```bash
1. Admin에서 "파일 다운로드"
2. wedding-data.ts를 data/ 폴더에 복사
3. git add data/wedding-data.ts
4. git commit -m "Update wedding data"
5. git push origin master:main
6. Vercel 자동 배포 (1-2분)
```

---

## 📊 파일 통계

| 폴더/파일       | 파일 수 | 총 줄 수 (예상) |
|-----------------|--------|------------------|
| pages/          | 4      | ~700            |
| components/     | 10     | ~750            |
| data/           | 1      | ~50             |
| types/          | 1      | ~70             |
| styles/         | 1      | ~190            |
| **합계**        | **17** | **~1,760**      |

---

## 🎯 핵심 파일 우선순위

### 필수 (변경 빈도 높음)
1. `data/wedding-data.ts` - 청첩장 정보
2. `pages/admin.tsx` - 데이터 입력
3. `pages/index.tsx` - 메인 화면

### 중요 (가끔 수정)
4. `styles/globals.css` - 테마/색상
5. `types/wedding.ts` - 타입 정의

### 보조 (거의 수정 안 함)
6. `components/*` - UI 컴포넌트
7. 설정 파일들

---

Made with 📝 by Next.js & TypeScript
