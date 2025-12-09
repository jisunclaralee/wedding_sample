import Head from 'next/head';
import { weddingData as defaultData } from '@/data/wedding-data';
import MainSection from '@/components/MainSection';
import InfoSection from '@/components/InfoSection';
import GallerySection from '@/components/GallerySection';
import LocationSection from '@/components/LocationSection';
import AccountSection from '@/components/AccountSection';
import InteractiveSection from '@/components/InteractiveSection';
import ConfettiEffect from '@/components/ConfettiEffect';
import { useState, useEffect } from 'react';
import { WeddingData } from '@/types/wedding';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [weddingData, setWeddingData] = useState<WeddingData>(defaultData);
  const [isDownloading, setIsDownloading] = useState(false);

  // 관리자 페이지에서 저장한 데이터 불러오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('wedding-data');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setWeddingData(parsedData);
        } catch (error) {
          console.error('데이터 파싱 오류:', error);
        }
      }
    }
  }, []);

  // PDF 다운로드 기능
  const handleDownloadPDF = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    try {
      const element = document.querySelector('main');
      if (!element) return;

      // 잠시 confetti 효과 숨기기
      const confettiElement = document.querySelector('canvas');
      if (confettiElement) {
        confettiElement.style.display = 'none';
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${weddingData.groom.name}_${weddingData.bride.name}_청첩장.pdf`);

      // confetti 다시 보이기
      if (confettiElement) {
        confettiElement.style.display = 'block';
      }
    } catch (error) {
      console.error('PDF 다운로드 오류:', error);
      alert('PDF 다운로드 중 오류가 발생했습니다.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{`${weddingData.groom.name} ❤️ ${weddingData.bride.name} 결혼합니다`}</title>
        <meta name="description" content="모바일 청첩장" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main 
        className={`theme-${weddingData.theme} font-${weddingData.font} scroll-smooth`}
        style={weddingData.customColors ? {
          '--primary-color': weddingData.customColors.primary,
          '--secondary-color': weddingData.customColors.secondary,
          backgroundColor: weddingData.customColors.background,
        } as any : undefined}
      >
        {weddingData.features.confetti && showConfetti && <ConfettiEffect type={weddingData.confettiType} />}
        
        {/* 배경 음악 */}
        {weddingData.features.music && weddingData.musicUrl && (
          <audio src={weddingData.musicUrl} autoPlay loop />
        )}
        
        <MainSection data={weddingData} onImageLoad={() => setShowConfetti(true)} />
        <InfoSection data={weddingData} />
        
        {weddingData.features.gallery && weddingData.images.gallery && (
          <GallerySection images={weddingData.images.gallery} />
        )}
        
        <LocationSection data={weddingData} />
        
        {weddingData.features.moneyGift && (
          <AccountSection groom={weddingData.groom} bride={weddingData.bride} />
        )}
        
        {/* 방명록, RSVP, 화환 - 통합 섹션 */}
        {(weddingData.features.guestbook || weddingData.features.rsvp || weddingData.features.flower) && (
          <InteractiveSection
            showGuestbook={weddingData.features.guestbook}
            showRSVP={weddingData.features.rsvp}
            showFlower={weddingData.features.flower}
            flowerUrl={weddingData.flowerUrl}
          />
        )}
        
        {/* PDF 다운로드 플로팅 버튼 */}
        {weddingData.features.pdfDownload && (
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="fixed bottom-6 right-6 z-50 px-6 py-3 rounded-full font-bold text-white shadow-2xl transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            {isDownloading ? '📄 다운로드 중...' : '📥 PDF 저장'}
          </button>
        )}
      </main>
    </>
  );
}
