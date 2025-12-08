import Head from 'next/head';
import { weddingData as defaultData } from '@/data/wedding-data';
import MainSection from '@/components/MainSection';
import InfoSection from '@/components/InfoSection';
import GallerySection from '@/components/GallerySection';
import LocationSection from '@/components/LocationSection';
import AccountSection from '@/components/AccountSection';
import GuestbookSection from '@/components/GuestbookSection';
import RSVPSection from '@/components/RSVPSection';
import ConfettiEffect from '@/components/ConfettiEffect';
import { useState, useEffect } from 'react';
import { WeddingData } from '@/types/wedding';

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [weddingData, setWeddingData] = useState<WeddingData>(defaultData);

  // 관리자 페이지에서 저장한 데이터 불러오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('wedding-data');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setWeddingData(parsedData);
          console.log('✅ 관리자 페이지에서 저장한 데이터를 불러왔습니다.');
        } catch (error) {
          console.error('데이터 파싱 오류:', error);
        }
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>{`${weddingData.groom.name} ❤️ ${weddingData.bride.name} 결혼합니다`}</title>
        <meta name="description" content="모바일 청첩장" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={`theme-${weddingData.theme} font-${weddingData.font} scroll-smooth`}>
        {weddingData.features.confetti && showConfetti && <ConfettiEffect />}
        
        <MainSection data={weddingData} onImageLoad={() => setShowConfetti(true)} />
        <InfoSection data={weddingData} />
        
        {weddingData.features.gallery && weddingData.images.gallery && (
          <GallerySection images={weddingData.images.gallery} />
        )}
        
        <LocationSection data={weddingData} />
        
        {weddingData.features.moneyGift && (
          <AccountSection groom={weddingData.groom} bride={weddingData.bride} />
        )}
        
        {weddingData.features.rsvp && <RSVPSection />}
        
        {weddingData.features.guestbook && <GuestbookSection />}
      </main>
    </>
  );
}
