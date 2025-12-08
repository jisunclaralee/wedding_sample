# 📱 모바일 청첩장 생성기

Next.js와 TypeScript로 만든 모바일 청첩장 웹 애플리케이션입니다.

## ✨ 주요 기능

- 🎨 **3가지 테마**: 우아한(Elegant), 로맨틱(Romantic), 모던(Modern)
- 🌸 **꽃가루 효과**: 페이지 로드 시 아름다운 꽃가루 애니메이션
- 📸 **갤러리**: 사진 갤러리 및 전체화면 보기
- 📍 **위치 정보**: 카카오맵 연동 및 주소 복사
- 💰 **계좌번호**: 축의금 계좌 정보 표시 및 복사
- 📝 **방명록**: 실시간 방명록 작성
- ✅ **참석 설문**: 참석 의사 및 인원 조사
- 📄 **PDF 저장**: 청첩장을 PDF로 다운로드

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드 테스트

배포 전에 로컬에서 빌드 테스트:

```bash
npm run build
npm start
```

## 📝 청첩장 데이터 수정하기

### 방법 1: 관리자 페이지 사용 (추천)

1. 개발 서버를 실행합니다
2. [http://localhost:3000/admin](http://localhost:3000/admin)에 접속합니다
3. 폼에 청첩장 정보를 입력합니다
4. "데이터 생성" 버튼을 클릭합니다
5. 브라우저 콘솔(F12)에서 출력된 JSON을 복사합니다
6. `data/wedding-data.ts` 파일을 열고 데이터를 붙여넣습니다

### 방법 2: 직접 수정

`data/wedding-data.ts` 파일을 직접 수정하세요:

```typescript
export const weddingData: WeddingData = {
  groom: {
    name: '신랑 이름',
    phone: '010-1234-5678',
    account: {
      bank: '은행명',
      accountNumber: '계좌번호',
      holder: '예금주',
    },
  },
  bride: {
    name: '신부 이름',
    phone: '010-9876-5432',
    // ...
  },
  // ...
};
```

## 🌐 배포하기

### Vercel 배포

1. GitHub에 코드를 푸시합니다
2. [Vercel](https://vercel.com)에 가입하고 로그인합니다
3. "New Project" 클릭
4. GitHub 저장소를 선택합니다
5. "Deploy" 클릭

배포 시 메인 페이지(`/`)만 표시되고, 관리자 페이지(`/admin`)는 URL을 직접 입력해야 접근할 수 있습니다.

### 환경 변수 (선택사항)

Vercel 대시보드에서 환경 변수를 설정할 수 있습니다:

- `NEXT_PUBLIC_ADMIN_PASSWORD`: 관리자 페이지 보호용 비밀번호 (구현 필요)

## 📁 프로젝트 구조

```
├── components/          # React 컴포넌트
│   ├── MainSection.tsx
│   ├── InfoSection.tsx
│   ├── GallerySection.tsx
│   ├── LocationSection.tsx
│   ├── AccountSection.tsx
│   ├── GuestbookSection.tsx
│   ├── RSVPSection.tsx
│   └── ConfettiEffect.tsx
├── data/
│   └── wedding-data.ts  # 청첩장 데이터
├── pages/
│   ├── index.tsx        # 메인 청첩장 페이지
│   └── admin.tsx        # 관리자 입력 페이지
├── styles/
│   └── globals.css      # 전역 스타일
├── types/
│   └── wedding.ts       # TypeScript 타입 정의
└── public/              # 정적 파일
```

## 🎨 커스터마이징

### 테마 변경

`data/wedding-data.ts`에서 `theme` 속성을 변경:

```typescript
theme: 'elegant' | 'romantic' | 'modern'
```

### 색상 변경

`styles/globals.css`에서 CSS 변수를 수정:

```css
:root {
  --elegant-primary: #8b7355;
  --romantic-primary: #ff9ecd;
  --modern-primary: #2c3e50;
}
```

## 🛠️ 기술 스택

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion, React Confetti
- **Image Optimization**: Next.js Image

## 📱 반응형 디자인

모든 화면 크기에서 최적화되어 있습니다:
- 모바일 (320px~)
- 태블릿 (768px~)
- 데스크톱 (1024px~)

## 🔒 보안 참고사항

- `/admin` 페이지는 개발 환경에서만 사용하세요
- 프로덕션 배포 시 민감한 정보(계좌번호 등)를 주의하세요
- 필요시 관리자 페이지에 인증을 추가하세요

## 📄 라이선스

MIT License

## 🤝 기여

이슈와 PR은 언제나 환영합니다!

## 💬 문의

문제가 있으시면 GitHub Issues를 이용해주세요.
