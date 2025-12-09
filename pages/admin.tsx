import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { WeddingData } from '@/types/wedding';
import { weddingData as defaultData } from '@/data/wedding-data';

export default function AdminPage() {
  const router = useRouter();
  
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
  const [isLoading, setIsLoading] = useState(false);

  // 현재 배포된 데이터를 불러오기
  useEffect(() => {
    loadCurrentData();
  }, []);

  const loadCurrentData = () => {
    setFormData(defaultData);
  };

  // 데이터 저장 (localStorage만)
  const handleSaveData = () => {
    localStorage.setItem('wedding-data', JSON.stringify(formData));
    alert('✅ 로컬 저장 완료!\n\n미리보기 버튼을 눌러 확인하세요.');
  };

  // 파일 다운로드
  const handleDownloadFile = () => {
    const dataStr = `import { WeddingData } from '@/types/wedding';

export const weddingData: WeddingData = ${JSON.stringify(formData, null, 2)};`;
    
    const blob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wedding-data.ts';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('✅ 파일 다운로드 완료!\n\n📦 실제 배포하기:\n  1. 다운로드한 wedding-data.ts를 data/ 폴더에 복사\n  2. git add data/wedding-data.ts\n  3. git commit -m "Update wedding data"\n  4. git push origin master:main');
  };

  // 파일에서 데이터 불러오기
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        // TypeScript 파일에서 JSON 추출
        const jsonMatch = content.match(/export const weddingData: WeddingData = ({[\s\S]*});/);
        if (jsonMatch) {
          const data = eval('(' + jsonMatch[1] + ')');
          setFormData(data);
          localStorage.setItem('wedding-data', JSON.stringify(data));
          alert('✅ 파일에서 데이터를 불러왔습니다!');
        }
      } catch (error) {
        alert('❌ 파일 형식이 올바르지 않습니다.');
      }
    };
    reader.readAsText(file);
  };

  // 미리보기 (localStorage 데이터 사용)
  const handlePreview = () => {
    localStorage.setItem('wedding-data', JSON.stringify(formData));
    window.open('/', '_blank');
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

      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">청첩장 데이터 입력</h1>
              <button
                onClick={() => router.push('/')}
                className="text-sm px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                청첩장 보기
              </button>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-sm text-blue-700">
                모든 정보를 입력한 후 하단의 "데이터 다운로드" 버튼을 클릭하세요.
              </p>
            </div>
          </div>

          <form className="space-y-6">
            {/* 신랑 정보 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-600">신랑 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">이름 *</label>
                  <input
                    type="text"
                    value={formData.groom.name}
                    onChange={(e) => setFormData({...formData, groom: {...formData.groom, name: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="김철수"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">전화번호 *</label>
                  <input
                    type="tel"
                    value={formData.groom.phone}
                    onChange={(e) => setFormData({...formData, groom: {...formData.groom, phone: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="010-1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">은행명</label>
                  <input
                    type="text"
                    value={formData.groom.account?.bank}
                    onChange={(e) => setFormData({...formData, groom: {...formData.groom, account: {...formData.groom.account!, bank: e.target.value}}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="카카오뱅크"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">계좌번호</label>
                  <input
                    type="text"
                    value={formData.groom.account?.accountNumber}
                    onChange={(e) => setFormData({...formData, groom: {...formData.groom, account: {...formData.groom.account!, accountNumber: e.target.value}}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="3333-00-0000000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">예금주</label>
                  <input
                    type="text"
                    value={formData.groom.account?.holder}
                    onChange={(e) => setFormData({...formData, groom: {...formData.groom, account: {...formData.groom.account!, holder: e.target.value}}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="김철수"
                  />
                </div>
              </div>
            </div>

            {/* 신부 정보 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-pink-600">신부 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">이름 *</label>
                  <input
                    type="text"
                    value={formData.bride.name}
                    onChange={(e) => setFormData({...formData, bride: {...formData.bride, name: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="이영희"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">전화번호 *</label>
                  <input
                    type="tel"
                    value={formData.bride.phone}
                    onChange={(e) => setFormData({...formData, bride: {...formData.bride, phone: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="010-9876-5432"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">은행명</label>
                  <input
                    type="text"
                    value={formData.bride.account?.bank}
                    onChange={(e) => setFormData({...formData, bride: {...formData.bride, account: {...formData.bride.account!, bank: e.target.value}}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="신한은행"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">계좌번호</label>
                  <input
                    type="text"
                    value={formData.bride.account?.accountNumber}
                    onChange={(e) => setFormData({...formData, bride: {...formData.bride, account: {...formData.bride.account!, accountNumber: e.target.value}}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="110-000-000000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">예금주</label>
                  <input
                    type="text"
                    value={formData.bride.account?.holder}
                    onChange={(e) => setFormData({...formData, bride: {...formData.bride, account: {...formData.bride.account!, holder: e.target.value}}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="이영희"
                  />
                </div>
              </div>
            </div>

            {/* 예식 정보 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-purple-600">예식 정보</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">날짜 *</label>
                  <input
                    type="date"
                    value={formData.wedding.date}
                    onChange={(e) => setFormData({...formData, wedding: {...formData.wedding, date: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">시간 *</label>
                  <input
                    type="time"
                    value={formData.wedding.time}
                    onChange={(e) => setFormData({...formData, wedding: {...formData.wedding, time: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">장소명 *</label>
                  <input
                    type="text"
                    value={formData.wedding.locationName}
                    onChange={(e) => setFormData({...formData, wedding: {...formData.wedding, locationName: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="아펠가모 선릉"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">주소 *</label>
                  <input
                    type="text"
                    value={formData.wedding.locationAddress}
                    onChange={(e) => setFormData({...formData, wedding: {...formData.wedding, locationAddress: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="서울 강남구 테헤란로 322"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">인사말 *</label>
                  <textarea
                    value={formData.wedding.message}
                    onChange={(e) => setFormData({...formData, wedding: {...formData.wedding, message: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    rows={4}
                    placeholder="두 사람의 사랑이 결실을 맺어..."
                  />
                </div>
              </div>
            </div>

            {/* 이미지 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-green-600">이미지</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">메인 이미지 URL *</label>
                  <input
                    type="url"
                    value={formData.images.main}
                    onChange={(e) => setFormData({...formData, images: {...formData.images, main: e.target.value}})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">갤러리 이미지 URLs</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={galleryInput}
                      onChange={(e) => setGalleryInput(e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="이미지 URL 입력"
                    />
                    <button
                      type="button"
                      onClick={addGalleryImage}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
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
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 테마 & 기능 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-orange-600">디자인 & 기능</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">테마</label>
                  <select
                    value={formData.theme}
                    onChange={(e) => setFormData({...formData, theme: e.target.value as any})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="elegant">우아한 (Elegant)</option>
                    <option value="romantic">로맨틱 (Romantic)</option>
                    <option value="modern">모던 (Modern)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">폰트</label>
                  <select
                    value={formData.font}
                    onChange={(e) => setFormData({...formData, font: e.target.value as any})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="serif">명조체</option>
                    <option value="sans">고딕체</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(formData.features).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setFormData({
                        ...formData,
                        features: {...formData.features, [key]: e.target.checked}
                      })}
                      className="w-4 h-4 text-orange-500 rounded"
                    />
                    <span className="text-sm">
                      {key === 'confetti' && '🎊 꽃가루 효과'}
                      {key === 'guestbook' && '📝 방명록'}
                      {key === 'rsvp' && '✅ 참석 설문'}
                      {key === 'gallery' && '📸 갤러리'}
                      {key === 'moneyGift' && '💰 계좌번호'}
                      {key === 'pdfDownload' && '📄 PDF 저장'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={handlePreview}
                  className="py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-bold text-lg hover:from-green-700 hover:to-teal-700 transition-all shadow-lg"
                >
                  👁️ 미리보기
                </button>
                <button
                  type="button"
                  onClick={handleSaveData}
                  className="py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                >
                  💾 데이터 저장
                </button>
                <button
                  type="button"
                  onClick={handleDownloadFile}
                  className="py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
                >
                  📥 파일 다운로드
                </button>
              </div>

              <div className="border-t pt-4">
                <label className="block text-center mb-3 font-semibold text-gray-700">
                  📂 기존 데이터 불러오기
                </label>
                <input
                  type="file"
                  accept=".ts"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400 p-4 text-sm">
                <p className="font-semibold mb-2">💡 사용 방법:</p>
                <ol className="list-decimal ml-5 space-y-1 text-gray-700">
                  <li><strong>미리보기</strong>: 입력한 데이터로 청첩장 확인 (로컬 저장)</li>
                  <li><strong>데이터 저장</strong>: localStorage에 저장 (임시 미리보기용)</li>
                  <li><strong>파일 다운로드</strong>: wedding-data.ts 파일 다운로드</li>
                  <li><strong>실제 배포</strong>: 다운로드한 파일을 data/ 폴더에 복사 후 Git 푸시</li>
                </ol>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
