import Head from 'next/head';
import { weddingData } from '@/data/wedding-data';
import MainSection from '@/components/MainSection';
import InfoSection from '@/components/InfoSection';
import GallerySection from '@/components/GallerySection';
import LocationSection from '@/components/LocationSection';
import AccountSection from '@/components/AccountSection';
import GuestbookSection from '@/components/GuestbookSection';
import RSVPSection from '@/components/RSVPSection';
import ConfettiEffect from '@/components/ConfettiEffect';
import { useState } from 'react';

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);

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
