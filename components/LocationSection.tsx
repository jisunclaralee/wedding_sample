import { WeddingData } from '@/types/wedding';

interface LocationSectionProps {
  data: WeddingData;
}

export default function LocationSection({ data }: LocationSectionProps) {
  const openMap = () => {
    const query = encodeURIComponent(data.wedding.locationAddress);
    window.open(`https://map.kakao.com/link/search/${query}`, '_blank');
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(data.wedding.locationAddress);
    alert('주소가 복사되었습니다.');
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--primary-color)' }}>
          오시는 길
        </h2>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">{data.wedding.locationName}</h3>
            <p className="text-gray-600">{data.wedding.locationAddress}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={openMap}
              className="flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-colors"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              🗺️ 지도 보기
            </button>
            <button
              onClick={copyAddress}
              className="flex-1 py-3 px-4 bg-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-300 transition-colors"
            >
              📋 주소 복사
            </button>
          </div>

          <div className="pt-4 text-sm text-gray-600 space-y-2">
            <p>🚇 지하철: 2호선 선릉역 1번 출구 도보 5분</p>
            <p>🚗 주차: 건물 내 주차장 이용 가능</p>
          </div>
        </div>
      </div>
    </section>
  );
}
