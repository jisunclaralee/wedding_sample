import { WeddingData } from '@/types/wedding';

export const weddingData: WeddingData = {
  groom: {
    name: '김민준',
    phone: '010-1234-5678',
    account: {
      bank: '카카오뱅크',
      accountNumber: '3333-00-0000000',
      holder: '김민준',
    },
  },
  bride: {
    name: '이서연',
    phone: '010-9876-5432',
    account: {
      bank: '신한은행',
      accountNumber: '110-000-000000',
      holder: '이서연',
    },
  },
  wedding: {
    date: '2025-05-24',
    time: '12:30',
    locationName: '아펠가모 선릉',
    locationAddress: '서울 강남구 테헤란로 322',
    message: `두 사람의 사랑이 결실을 맺어
한 곳을 바라보며 걸어가려 합니다.

저희 두 사람의 새로운 시작을
함께 축복해주시면 감사하겠습니다.`,
  },
  images: {
    main: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1522673607200-1645062cd958?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=400&q=80',
    ],
  },
  theme: 'elegant',
  font: 'serif',
  customColors: {
    primary: '#8b7355',
    secondary: '#d4c5b9',
    background: '#faf8f5',
  },
  features: {
    confetti: true,
    guestbook: true,
    rsvp: true,
    gallery: true,
    moneyGift: true,
    pdfDownload: true,
    music: false,
    flower: false,
  },
  confettiType: 'mixed',
  musicUrl: '',
  flowerUrl: '',
  validUntil: '2025-06-30',
};
