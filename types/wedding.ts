export interface WeddingData {
  // 신랑신부 정보
  groom: {
    name: string;
    phone: string;
    account?: {
      bank: string;
      accountNumber: string;
      holder: string;
    };
  };
  bride: {
    name: string;
    phone: string;
    account?: {
      bank: string;
      accountNumber: string;
      holder: string;
    };
  };

  // 예식 정보
  wedding: {
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    locationName: string;
    locationAddress: string;
    message: string;
  };

  // 이미지
  images: {
    main: string; // 메인 이미지 URL
    gallery?: string[]; // 갤러리 이미지 URLs
  };

  // 테마 & 스타일
  theme: 'elegant' | 'romantic' | 'modern';
  font: 'serif' | 'sans';
  
  // 커스텀 색상 및 폰트
  customColors?: {
    primary: string;
    secondary: string;
    background: string;
  };
  customFont?: string;

  // 기능 옵션
  features: {
    confetti: boolean; // 꽃가루 효과
    guestbook: boolean; // 방명록
    rsvp: boolean; // 참석 의사 설문
    gallery: boolean; // 갤러리
    moneyGift: boolean; // 계좌번호 표시
    pdfDownload: boolean; // PDF 저장
    music: boolean; // 배경 음악
    flower: boolean; // 화환 링크
  };

  // 콘텐츠 설정
  confettiType?: 'hearts' | 'flowers' | 'sparkles' | 'mixed';
  musicUrl?: string;
  flowerUrl?: string;

  // 사용 기간
  validUntil?: string; // YYYY-MM-DD
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface RSVPResponse {
  id: string;
  name: string;
  attendance: 'yes' | 'no' | 'maybe';
  guestCount: number;
  message?: string;
  createdAt: string;
}
