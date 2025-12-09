import { useState } from 'react';
import Modal from './Modal';
import GuestbookSection from './GuestbookSection';
import RSVPSection from './RSVPSection';

interface InteractiveSectionProps {
  showGuestbook: boolean;
  showRSVP: boolean;
  showFlower: boolean;
  flowerUrl?: string;
}

export default function InteractiveSection({ showGuestbook, showRSVP, showFlower, flowerUrl }: InteractiveSectionProps) {
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--primary-color)' }}>
          참여하기
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {showGuestbook && (
            <button
              onClick={() => setIsGuestbookOpen(true)}
              className="py-6 px-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-current"
              style={{ color: 'var(--primary-color)' }}
            >
              <div className="text-4xl mb-2">📝</div>
              <div className="font-bold text-lg">방명록</div>
              <div className="text-sm text-gray-600 mt-1">축하 메시지 남기기</div>
            </button>
          )}

          {showRSVP && (
            <button
              onClick={() => setIsRSVPOpen(true)}
              className="py-6 px-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-current"
              style={{ color: 'var(--primary-color)' }}
            >
              <div className="text-4xl mb-2">✅</div>
              <div className="font-bold text-lg">참석 여부</div>
              <div className="text-sm text-gray-600 mt-1">참석 의사 전달하기</div>
            </button>
          )}

          {showFlower && flowerUrl && (
            <a
              href={flowerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-6 px-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-current"
              style={{ color: 'var(--primary-color)' }}
            >
              <div className="text-4xl mb-2">💐</div>
              <div className="font-bold text-lg">화환 보내기</div>
              <div className="text-sm text-gray-600 mt-1">축하 화환 전달하기</div>
            </a>
          )}
        </div>

        {/* 방명록 모달 */}
        <Modal
          isOpen={isGuestbookOpen}
          onClose={() => setIsGuestbookOpen(false)}
          title="방명록"
        >
          <GuestbookSection isModal />
        </Modal>

        {/* RSVP 모달 */}
        <Modal
          isOpen={isRSVPOpen}
          onClose={() => setIsRSVPOpen(false)}
          title="참석 여부"
        >
          <RSVPSection isModal />
        </Modal>
      </div>
    </section>
  );
}
