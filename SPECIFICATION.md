# 모바일 청첩장 프로젝트 - 기능명세서

## 📋 프로젝트 개요
Next.js 기반의 반응형 모바일 청첩장 웹 애플리케이션

**배포 URL**: https://wedding-sample-tan.vercel.app/  
**관리자 URL**: https://wedding-sample-tan.vercel.app/admin  
**기술 스택**: Next.js 14, React 18, TypeScript, Tailwind CSS, Swiper

---

## 🎯 핵심 기능

### 1. 청첩장 메인 페이지 (`/`)
#### 1.1 메인 섹션 (MainSection)
- 신랑/신부 이름 표시
- 메인 이미지 (큰 사진)
- 예식 날짜, 시간, 장소 정보
- 인사말 표시
- **테마별 스타일 적용** (우아한/로맨틱/모던)

#### 1.2 정보 섹션 (InfoSection)
- 신랑/신부 정보 카드
- 전화번호 클릭 시 전화 걸기

#### 1.3 갤러리 섹션 (GallerySection)
- **Swiper 슬라이더**로 사진 좌우 슬라이드
- 자동 재생 (3초 간격)
- 반응형 레이아웃 (모바일 1장, 태블릿 2장, PC 3장)
- 이미지 클릭 시 전체화면 모달

#### 1.4 오시는 길 (LocationSection)
- 장소명 및 주소 표시
- 카카오맵 열기 버튼
- 주소 복사 버튼
- 교통 정보 (지하철, 주차)

#### 1.5 계좌번호 (AccountSection)
- 신랑/신부 계좌 정보
- 계좌번호 복사 기능

#### 1.6 참여하기 (InteractiveSection)
- **모달 팝업 방식**의 3가지 버튼:
  - 📝 방명록: 축하 메시지 작성
  - ✅ 참석 여부: RSVP 설문
  - 💐 화환 보내기: 외부 링크 연결

#### 1.7 특수 효과
- **컨페티 효과** (페이지 로드 시 7초간)
  - 타입 선택: 하트/꽃잎/반짝이/혼합
  - 입자 수와 색상 커스터마이징
- **배경 음악** (자동 재생, 반복)
- **PDF 다운로드** (플로팅 버튼)

---

### 2. 관리자 페이지 (`/admin`)
데이터 입력 및 설정을 위한 관리자 인터페이스

#### 2.1 신랑/신부 정보 입력
- 이름, 전화번호
- 은행명, 계좌번호, 예금주

#### 2.2 예식 정보 입력
- 날짜, 시간
- 장소명, 주소
- 인사말 (멀티라인)

#### 2.3 이미지 관리
- 메인 이미지 URL
- 갤러리 이미지 URL 목록 (추가/삭제)

#### 2.4 디자인 설정
- 테마 선택 (우아한/로맨틱/모던)
- 폰트 선택 (명조체/고딕체)
- **커스텀 색상** (Color Picker)
  - 메인 색상
  - 서브 색상
  - 배경 색상

#### 2.5 추가 기능 설정
- 컨페티 효과 타입 선택
- 배경 음악 URL 입력
- 화환 보내기 URL 입력

#### 2.6 기능 토글
- 🎊 꽃가루 효과
- 📝 방명록
- ✅ 참석 설문
- 📸 갤러리
- 💰 계좌번호
- 📄 PDF 저장
- 🎵 배경 음악
- 💐 화환 보내기

#### 2.7 데이터 관리
- **👁️ 미리보기**: localStorage 저장 + 새 창 열기
- **💾 데이터 저장**: localStorage에 저장
- **📥 파일 다운로드**: `wedding-data.ts` 파일 생성
- **📂 데이터 불러오기**: 기존 파일 업로드

---

## 📁 폴더 구조 및 파일 설명

### `/pages` - Next.js 페이지
```
pages/
├── _app.tsx          # Next.js 앱 래퍼 (전역 설정)
├── _document.tsx     # HTML 문서 구조
├── index.tsx         # 메인 청첩장 페이지
└── admin.tsx         # 관리자 페이지
```

**index.tsx** (132줄)
- 메인 청첩장 페이지
- localStorage에서 데이터 로드
- 커스텀 색상 적용
- PDF 다운로드 기능
- 모든 섹션 컴포넌트 렌더링

**admin.tsx** (509줄)
- 관리자 데이터 입력 폼
- 모든 설정 옵션 포함
- 파일 다운로드/업로드 기능

---

### `/components` - React 컴포넌트
```
components/
├── MainSection.tsx           # 메인 히어로 섹션
├── InfoSection.tsx           # 신랑신부 정보
├── GallerySection.tsx        # 사진 갤러리 (Swiper)
├── LocationSection.tsx       # 오시는 길
├── AccountSection.tsx        # 계좌번호
├── InteractiveSection.tsx    # 참여하기 버튼
├── GuestbookSection.tsx      # 방명록
├── RSVPSection.tsx           # 참석 의사
├── ConfettiEffect.tsx        # 컨페티 효과
└── Modal.tsx                 # 모달 팝업
```

**주요 컴포넌트 상세:**

1. **MainSection.tsx** (60줄)
   - 메인 이미지, 이름, 날짜 표시
   - 테마별 클래스 적용 (main-section, main-image, main-title)

2. **GallerySection.tsx** (75줄)
   - Swiper 슬라이더 통합
   - 자동 재생, 네비게이션, 페이지네이션
   - 전체화면 모달

3. **InteractiveSection.tsx** (92줄)
   - 3개 버튼 (방명록/RSVP/화환)
   - 모달 관리
   - 조건부 렌더링

4. **ConfettiEffect.tsx** (108줄)
   - 4가지 타입 지원
   - 커스텀 drawShape 함수
   - 타입별 색상 및 입자 수 설정

5. **Modal.tsx** (44줄)
   - 재사용 가능한 모달
   - 오버레이 + 컨텐츠
   - 닫기 버튼

6. **GuestbookSection.tsx** (101줄)
   - 모달/페이지 모드 지원
   - 방명록 작성 폼
   - 방명록 목록 표시

7. **RSVPSection.tsx** (148줄)
   - 모달/페이지 모드 지원
   - 참석 여부 선택
   - 인원 수 입력

---

### `/data` - 데이터
```
data/
└── wedding-data.ts   # 청첩장 데이터 (WeddingData 타입)
```

**wedding-data.ts**
- 모든 청첩장 정보를 포함하는 단일 객체
- Admin에서 다운로드한 파일로 대체하여 배포

---

### `/types` - TypeScript 타입
```
types/
└── wedding.ts        # 타입 정의
```

**WeddingData 인터페이스:**
```typescript
{
  groom: { name, phone, account }
  bride: { name, phone, account }
  wedding: { date, time, locationName, locationAddress, message }
  images: { main, gallery[] }
  theme: 'elegant' | 'romantic' | 'modern'
  font: 'serif' | 'sans'
  customColors: { primary, secondary, background }
  features: { confetti, guestbook, rsvp, gallery, moneyGift, pdfDownload, music, flower }
  confettiType: 'hearts' | 'flowers' | 'sparkles' | 'mixed'
  musicUrl: string
  flowerUrl: string
  validUntil: string
}
```

---

### `/styles` - 스타일
```
styles/
└── globals.css       # 전역 스타일 + 테마 정의
```

**테마 클래스:**
- `.theme-elegant`: 클래식, 세리프, 베이지
- `.theme-romantic`: 로맨틱, 핑크, 그라데이션, 원형
- `.theme-modern`: 모던, 굵은 폰트, 그림자, 사각형

**테마별 메인 섹션 스타일:**
- 이미지 형태 (사각/원형)
- 타이틀 폰트 및 장식
- 배경 및 액센트

---

### 설정 파일
```
├── next.config.js       # Next.js 설정
├── tsconfig.json        # TypeScript 설정
├── tailwind.config.js   # Tailwind CSS 설정
├── postcss.config.js    # PostCSS 설정
├── vercel.json          # Vercel 배포 설정
├── package.json         # 의존성 및 스크립트
└── .gitignore          # Git 제외 파일
```

---

## 🔄 데이터 흐름

### 로컬 미리보기
```
Admin 입력 → localStorage 저장 → index.tsx에서 읽기 → 화면 렌더링
```

### 실제 배포
```
Admin 입력 → 파일 다운로드 → data/wedding-data.ts 교체 → Git 푸시 → Vercel 자동 배포
```

---

## 📦 의존성

### 프로덕션
- `next`: 14.0.4
- `react`: 18.2.0
- `react-dom`: 18.2.0
- `framer-motion`: 10.16.16
- `react-confetti`: 6.1.0
- `react-calendar`: 4.7.0
- `html2canvas`: 1.4.1
- `jspdf`: 2.5.1
- `swiper`: 11.1.15

### 개발
- `typescript`: 5.3.3
- `tailwindcss`: 3.4.0
- `autoprefixer`: 10.4.16
- `postcss`: 8.4.32

---

## 🚀 사용 방법

### 개발
```bash
npm install
npm run dev
# http://localhost:3000
```

### 배포
1. Admin에서 데이터 입력
2. "파일 다운로드" 클릭
3. `wedding-data.ts`를 `data/` 폴더에 복사
4. Git 커밋 & 푸시
5. Vercel 자동 배포 (1-2분)

---

## 🎨 커스터마이징

### 색상 변경
Admin → "커스텀 색상" 섹션 → Color Picker로 선택

### 테마 변경
Admin → "디자인 & 기능" → 테마 드롭다운

### 컨페티 효과 변경
Admin → "추가 기능" → 컨페티 효과 타입 선택

---

## 📝 개발 노트

### 주요 기술 결정
1. **localStorage 사용**: 로컬 미리보기를 위해 브라우저 저장소 활용
2. **Swiper 라이브러리**: 부드러운 갤러리 슬라이드 경험
3. **모달 팝업**: 방명록/RSVP를 모달로 구현하여 UX 개선
4. **커스텀 컨페티**: drawShape로 하트/별 모양 직접 구현
5. **타입 안정성**: TypeScript로 전체 프로젝트 타입 정의

### 성능 최적화
- 이미지 최적화 (Next.js Image 컴포넌트)
- 조건부 렌더링 (features 플래그)
- CSS 변수 사용 (테마 색상)
- Swiper lazy loading

---

## 🐛 알려진 제한사항
1. 방명록/RSVP 데이터는 localStorage에만 저장 (백엔드 없음)
2. PDF 다운로드 시 컨페티 효과는 제외됨
3. 배경 음악은 브라우저 자동재생 정책에 따라 제한될 수 있음

---

## 📄 라이선스
MIT License
