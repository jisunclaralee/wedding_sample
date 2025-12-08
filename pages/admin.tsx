import { useState } from 'react';
import Head from 'next/head';
import { WeddingData } from '@/types/wedding';

export default function AdminPage() {
  const [formData, setFormData] = useState<WeddingData>({
    groom: {
      name: '',
      phone: '',
      account: { bank: '', accountNumber: '', holder: '' },
    },
    bride: {
      name: '',
      phone: '',
      account: { bank: '', accountNumber: '', holder: '' },
    },
    wedding: {
      date: '',
      time: '',
      locationName: '',
      locationAddress: '',
      message: '',
    },
    images: {
      main: '',
      gallery: [],
    },
    theme: 'elegant',
    font: 'serif',
    features: {
      confetti: true,
      guestbook: true,
      rsvp: true,
      gallery: true,
      moneyGift: true,
      pdfDownload: true,
    },
    validUntil: '',
  });

  const [galleryInput, setGalleryInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Wedding Data:', JSON.stringify(formData, null, 2));
    alert('데이터가 콘솔에 출력되었습니다. 이 JSON을 data/wedding-data.ts 파일에 복사하세요.');
  };

  const addGalleryImage = () => {
    if (galleryInput.trim()) {
      setFormData({
        ...formData,
        images: {
          ...formData.images,
          gallery: [...(formData.images.gallery || []), galleryInput.trim()],
        },
      });
      setGalleryInput('');
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      images: {
        ...formData.images,
        gallery: formData.images.gallery?.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <>
      <Head>
        <title>청첩장 관리자 페이지</title>
      </Head>

      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">청첩장 데이터 입력</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 신랑 정보 */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-bold mb-4">신랑 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">이름 *</label>
                  <input
                    type="text"
                    value={formData.groom.name}
                    onChange={(e) => setFormData({...formData, groom: {...formData.groom, name: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">전화번호 *</label>
                  <input
                    type="tel"
                    value={formData.groom.phone}
                    onChange={(e) => setFormData({...formData, groom: {...formData.groom, phone: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">은행명</label>
                  <input
                    type="text"
                    value={formData.groom.account?.bank}
                    onChange={(e) => setFormData({...formData, groom: {...formData.groom, account: {...formData.groom.account!, bank: e.target.value}}})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">계좌번호</label>
                  <input
                    type="text"
                    value={formData.groom.account?.accountNumber}
                    onChange={(e) => setFormData({...formData, groom: {...formData.groom, account: {...formData.groom.account!, accountNumber: e.target.value}}})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </section>

            {/* 신부 정보 */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-bold mb-4">신부 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">이름 *</label>
                  <input
                    type="text"
                    value={formData.bride.name}
                    onChange={(e) => setFormData({...formData, bride: {...formData.bride, name: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">전화번호 *</label>
                  <input
                    type="tel"
                    value={formData.bride.phone}
                    onChange={(e) => setFormData({...formData, bride: {...formData.bride, phone: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">은행명</label>
                  <input
                    type="text"
                    value={formData.bride.account?.bank}
                    onChange={(e) => setFormData({...formData, bride: {...formData.bride, account: {...formData.bride.account!, bank: e.target.value}}})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">계좌번호</label>
                  <input
                    type="text"
                    value={formData.bride.account?.accountNumber}
                    onChange={(e) => setFormData({...formData, bride: {...formData.bride, account: {...formData.bride.account!, accountNumber: e.target.value}}})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </section>

            {/* 예식 정보 */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-bold mb-4">예식 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">날짜 *</label>
                  <input
                    type="date"
                    value={formData.wedding.date}
                    onChange={(e) => setFormData({...formData, wedding: {...formData.wedding, date: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">시간 *</label>
                  <input
                    type="time"
                    value={formData.wedding.time}
                    onChange={(e) => setFormData({...formData, wedding: {...formData.wedding, time: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">장소명 *</label>
                  <input
                    type="text"
                    value={formData.wedding.locationName}
                    onChange={(e) => setFormData({...formData, wedding: {...formData.wedding, locationName: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">주소 *</label>
                  <input
                    type="text"
                    value={formData.wedding.locationAddress}
                    onChange={(e) => setFormData({...formData, wedding: {...formData.wedding, locationAddress: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">메시지 *</label>
                  <textarea
                    value={formData.wedding.message}
                    onChange={(e) => setFormData({...formData, wedding: {...formData.wedding, message: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={4}
                    required
                  />
                </div>
              </div>
            </section>

            {/* 이미지 */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-bold mb-4">이미지</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">메인 이미지 URL *</label>
                  <input
                    type="url"
                    value={formData.images.main}
                    onChange={(e) => setFormData({...formData, images: {...formData.images, main: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">갤러리 이미지 URLs</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={galleryInput}
                      onChange={(e) => setGalleryInput(e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg"
                      placeholder="이미지 URL 입력"
                    />
                    <button
                      type="button"
                      onClick={addGalleryImage}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      추가
                    </button>
                  </div>
                  <div className="mt-2 space-y-2">
                    {formData.images.gallery?.map((url, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <span className="flex-1 text-sm truncate">{url}</span>
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 테마 & 폰트 */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-bold mb-4">디자인</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">테마</label>
                  <select
                    value={formData.theme}
                    onChange={(e) => setFormData({...formData, theme: e.target.value as any})}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="elegant">우아한</option>
                    <option value="romantic">로맨틱</option>
                    <option value="modern">모던</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">폰트</label>
                  <select
                    value={formData.font}
                    onChange={(e) => setFormData({...formData, font: e.target.value as any})}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="serif">명조체</option>
                    <option value="sans">고딕체</option>
                  </select>
                </div>
              </div>
            </section>

            {/* 기능 옵션 */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-bold mb-4">기능 옵션</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(formData.features).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setFormData({
                        ...formData,
                        features: {...formData.features, [key]: e.target.checked}
                      })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">
                      {key === 'confetti' && '꽃가루 효과'}
                      {key === 'guestbook' && '방명록'}
                      {key === 'rsvp' && '참석 설문'}
                      {key === 'gallery' && '갤러리'}
                      {key === 'moneyGift' && '계좌번호'}
                      {key === 'pdfDownload' && 'PDF 저장'}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* 사용 기간 */}
            <section className="border-b pb-6">
              <h2 className="text-2xl font-bold mb-4">사용 기간</h2>
              <div>
                <label className="block text-sm font-semibold mb-2">만료일</label>
                <input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({...formData, validUntil: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </section>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              데이터 생성 (콘솔 확인)
            </button>
          </form>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ 이 페이지는 개발 환경에서만 사용하세요. 
              제출 후 브라우저 콘솔(F12)에서 JSON 데이터를 복사하여 
              <code className="bg-yellow-100 px-1 rounded">data/wedding-data.ts</code> 파일에 붙여넣으세요.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
