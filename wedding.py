"""
모바일 청첩장 생성기
사진, 이름, 날짜, 내용 등을 입력받아 HTML 청첩장을 생성합니다.
"""

from datetime import datetime
from typing import Dict, List, Optional
import json


class WeddingInvitationGenerator:
    """청첩장 생성 클래스"""
    
    def __init__(self):
        self.config = {
            'groom_name': '김민준',
            'bride_name': '이서연',
            'groom_phone': '010-1234-5678',
            'bride_phone': '010-9876-5432',
            'date': '2025-05-24',
            'time': '12:30',
            'location_name': '아펠가모 선릉',
            'location_address': '서울 강남구 테헤란로 322',
            'main_image': 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'message': '두 사람의 사랑이 결실을 맺어\n한 곳을 바라보며 걸어가려 합니다.\n\n저희 두 사람의 새로운 시작을\n함께 축복해주시면 감사하겠습니다.',
            'theme': 'elegant',  # elegant, romantic, modern
            'font': 'serif',  # serif, sans
            'groom_account': {
                'bank': '카카오뱅크',
                'account_number': '3333-00-0000000',
                'holder': '김민준'
            },
            'bride_account': {
                'bank': '신한은행',
                'account_number': '110-000-000000',
                'holder': '이서연'
            },
            'features': {
                'confetti': True,  # 꽃가루 효과
                'guestbook': True,  # 방명록
                'rsvp': True,  # 참석 의사 전달
                'gallery': True,  # 갤러리
                'money_gift': True,  # 계좌번호
            },
            'gallery_images': [
                'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1522673607200-1645062cd958?auto=format&fit=crop&w=400&q=80',
                'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=400&q=80',
            ]
        }

// --- Helper Components ---

// 1. Falling Petals Effect
const FallingPetals = () => {
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPetals((prev) => {
        const next = [...prev, Date.now()];
        if (next.length > 20) return next.slice(1);
        return next;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((id) => {
        const left = Math.random() * 100;
        const animationDuration = 5 + Math.random() * 5;
        const size = 10 + Math.random() * 10;
        return (
          <div
            key={id}
            className="absolute top-[-20px] bg-pink-200 opacity-70 rounded-full animate-fall"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${animationDuration}s`,
            }}
          />
        );
      })}
    </div>
  );
};

// 2. Accordion for Bank Accounts
const AccountAccordion = ({ title, account }: { title: string, account: AccountInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${account.bank} ${account.accountNumber} ${account.holder}`);
    // Fallback for iframe environments if navigator fails (often blocked)
    const textArea = document.createElement("textarea");
    textArea.value = `${account.bank} ${account.accountNumber} ${account.holder}`;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="border rounded-lg bg-white overflow-hidden mb-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition"
      >
        <span className="text-sm font-medium text-gray-700">{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="p-4 border-t bg-white animate-fadeIn">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">{account.bank}</span>
            <span className="text-xs text-gray-500">예금주: {account.holder}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
            <span className="text-sm font-medium text-gray-800">{account.accountNumber}</span>
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition ${copied ? 'bg-green-100 text-green-700' : 'bg-white border text-gray-600 hover:bg-gray-100'}`}
            >
              {copied ? <CheckSquare size={12} /> : <Copy size={12} />}
              {copied ? '복사완료' : '복사'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Application Component ---
export default function App() {
  const [config, setConfig] = useState<InvitationConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'features'>('content');
  const [guestMessages, setGuestMessages] = useState<GuestMessage[]>([
    { id: 1, name: '박지성', text: '결혼 축하한다! 행복하게 잘 살아~', date: '2024.12.01' },
    { id: 2, name: '손흥민', text: '두 분의 앞날에 축복만 가득하길!', date: '2024.12.02' }
  ]);
  const [newMessage, setNewMessage] = useState({ name: '', text: '' });
  const previewRef = useRef<HTMLDivElement>(null);

  // --- Handlers ---
  const handleInputChange = (field: keyof InvitationConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleAccountChange = (person: 'groom' | 'bride', field: keyof AccountInfo, value: string) => {
    setConfig((prev) => ({
      ...prev,
      [person === 'groom' ? 'groomAccount' : 'brideAccount']: {
        ...prev[person === 'groom' ? 'groomAccount' : 'brideAccount'],
        [field]: value
      }
    }));
  };

  const handleFeatureToggle = (feature: keyof typeof config.features) => {
    setConfig((prev) => ({
      ...prev,
      features: { ...prev.features, [feature]: !prev.features[feature] },
    }));
  };

  const handleGuestbookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.name || !newMessage.text) return;
    setGuestMessages([
      { id: Date.now(), name: newMessage.name, text: newMessage.text, date: new Date().toLocaleDateString() },
      ...guestMessages,
    ]);
    setNewMessage({ name: '', text: '' });
  };

  const handlePrint = () => {
    window.print();
  };

  // --- Date Calculation ---
  const weddingDate = new Date(`${config.date}T${config.time}`);
  const formattedDate = weddingDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
  const dDay = Math.ceil((weddingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const dDayText = dDay > 0 ? `D-${dDay}` : dDay === 0 ? 'Today' : `D+${Math.abs(dDay)}`;

  // --- Styles Injection ---
  // Using style tag for animations and fonts to keep single file requirement
  const GlobalStyles = () => (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&family=Noto+Serif+KR:wght@300;400;700&family=Great+Vibes&display=swap');
      
      .font-serif-kr { font-family: 'Noto Serif KR', serif; }
      .font-sans-kr { font-family: 'Noto Sans KR', sans-serif; }
      .font-script { font-family: 'Great Vibes', cursive; }
      
      @keyframes fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
      }
      .animate-fall { animation-name: fall; animation-timing-function: linear; animation-iteration-count: 1; }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn { animation: fadeIn 0.3s ease-out; }

      /* Print Styles to isolate the mobile view */
      @media print {
        body * { visibility: hidden; }
        #mobile-preview-area, #mobile-preview-area * { visibility: visible; }
        #mobile-preview-area { 
          position: absolute; 
          left: 0; 
          top: 0; 
          width: 100%; 
          margin: 0; 
          padding: 0; 
          background: white;
          box-shadow: none;
          border: none;
        }
        .no-print { display: none !important; }
      }
      
      /* Scrollbar hiding for clean UI */
      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans-kr text-gray-800">
      <GlobalStyles />
      
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm z-20 no-print">
        <div className="flex items-center gap-2">
          <Heart className="text-pink-500 fill-pink-500" size={24} />
          <h1 className="text-xl font-bold text-gray-800">모바일 청첩장 메이커</h1>
        </div>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          <Download size={18} />
          <span className="text-sm font-medium">청첩장 저장/인쇄</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden max-h-[calc(100vh-64px)]">
        
        {/* LEFT: Editor Panel (Hidden on print) */}
        <aside className="w-full lg:w-[450px] bg-white border-r flex flex-col overflow-y-auto no-print shadow-lg z-10">
          <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b grid grid-cols-3 gap-2">
            <button 
              onClick={() => setActiveTab('content')}
              className={`pb-2 text-sm font-medium transition-colors ${activeTab === 'content' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-500'}`}
            >
              기본 정보
            </button>
            <button 
              onClick={() => setActiveTab('design')}
              className={`pb-2 text-sm font-medium transition-colors ${activeTab === 'design' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-500'}`}
            >
              디자인 설정
            </button>
            <button 
              onClick={() => setActiveTab('features')}
              className={`pb-2 text-sm font-medium transition-colors ${activeTab === 'features' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-500'}`}
            >
              기능 옵션
            </button>
          </div>

          <div className="p-6 space-y-6">
            {activeTab === 'content' && (
              <div className="space-y-4 animate-fadeIn">
                {/* Basic Info */}
                <div className="space-y-4 border-b pb-6">
                  <h3 className="font-bold text-gray-700">신랑 & 신부 정보</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">신랑 이름</label>
                      <input 
                        type="text" 
                        value={config.groomName} 
                        onChange={(e) => handleInputChange('groomName', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">신부 이름</label>
                      <input 
                        type="text" 
                        value={config.brideName} 
                        onChange={(e) => handleInputChange('brideName', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-200 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Account Info Section */}
                {config.features.moneyGift && (
                  <div className="space-y-4 border-b pb-6">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">
                      <CreditCard size={16} /> 계좌 정보
                    </h3>
                    
                    {/* Groom Account */}
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs font-bold text-gray-500 mb-2">신랑측 계좌</p>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input 
                          type="text" 
                          placeholder="은행명"
                          value={config.groomAccount.bank}
                          onChange={(e) => handleAccountChange('groom', 'bank', e.target.value)}
                          className="p-2 border rounded text-xs"
                        />
                        <input 
                          type="text" 
                          placeholder="예금주"
                          value={config.groomAccount.holder}
                          onChange={(e) => handleAccountChange('groom', 'holder', e.target.value)}
                          className="p-2 border rounded text-xs"
                        />
                      </div>
                      <input 
                        type="text" 
                        placeholder="계좌번호"
                        value={config.groomAccount.accountNumber}
                        onChange={(e) => handleAccountChange('groom', 'accountNumber', e.target.value)}
                        className="w-full p-2 border rounded text-xs"
                      />
                    </div>

                    {/* Bride Account */}
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs font-bold text-gray-500 mb-2">신부측 계좌</p>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input 
                          type="text" 
                          placeholder="은행명"
                          value={config.brideAccount.bank}
                          onChange={(e) => handleAccountChange('bride', 'bank', e.target.value)}
                          className="p-2 border rounded text-xs"
                        />
                        <input 
                          type="text" 
                          placeholder="예금주"
                          value={config.brideAccount.holder}
                          onChange={(e) => handleAccountChange('bride', 'holder', e.target.value)}
                          className="p-2 border rounded text-xs"
                        />
                      </div>
                      <input 
                        type="text" 
                        placeholder="계좌번호"
                        value={config.brideAccount.accountNumber}
                        onChange={(e) => handleAccountChange('bride', 'accountNumber', e.target.value)}
                        className="w-full p-2 border rounded text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Date & Location */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-700">예식 정보</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">예식 날짜</label>
                      <input 
                        type="date" 
                        value={config.date} 
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">예식 시간</label>
                      <input 
                        type="time" 
                        value={config.time} 
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-200 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">예식장 이름</label>
                    <input 
                      type="text" 
                      value={config.locationName} 
                      onChange={(e) => handleInputChange('locationName', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">주소</label>
                    <input 
                      type="text" 
                      value={config.locationAddress} 
                      onChange={(e) => handleInputChange('locationAddress', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-200 outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">초대 문구</label>
                    <textarea 
                      value={config.message} 
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full p-2 border rounded h-32 resize-none focus:ring-2 focus:ring-pink-200 outline-none text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">메인 사진 URL</label>
                    <input 
                      type="text" 
                      value={config.mainImage} 
                      onChange={(e) => handleInputChange('mainImage', e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-200 outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">서체 스타일</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => handleInputChange('font', 'serif')}
                      className={`p-3 border rounded-lg text-center transition ${config.font === 'serif' ? 'bg-pink-50 border-pink-500 text-pink-700' : 'hover:bg-gray-50'}`}
                    >
                      <span className="font-serif-kr text-lg">명조체</span>
                      <p className="text-xs text-gray-500 mt-1">우아하고 진지한 느낌</p>
                    </button>
                    <button 
                      onClick={() => handleInputChange('font', 'sans')}
                      className={`p-3 border rounded-lg text-center transition ${config.font === 'sans' ? 'bg-pink-50 border-pink-500 text-pink-700' : 'hover:bg-gray-50'}`}
                    >
                      <span className="font-sans-kr text-lg">고딕체</span>
                      <p className="text-xs text-gray-500 mt-1">깔끔하고 모던한 느낌</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">테마 색상</label>
                  <select 
                    value={config.theme} 
                    onChange={(e) => handleInputChange('theme', e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-200"
                  >
                    <option value="elegant">Elegant Beige (차분함)</option>
                    <option value="romantic">Romantic Pink (사랑스러움)</option>
                    <option value="modern">Modern White (심플함)</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-4 animate-fadeIn">
                {/* Feature Toggles */}
                 <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full text-yellow-600"><CreditCard size={18} /></div>
                    <div>
                      <p className="font-medium text-sm">계좌번호 (마음 전하실 곳)</p>
                      <p className="text-xs text-gray-500">계좌번호 아코디언 메뉴를 표시합니다</p>
                    </div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={config.features.moneyGift} 
                    onChange={() => handleFeatureToggle('moneyGift')}
                    className="w-5 h-5 accent-pink-500 cursor-pointer" 
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-100 p-2 rounded-full text-pink-600"><Heart size={18} /></div>
                    <div>
                      <p className="font-medium text-sm">꽃가루 효과</p>
                      <p className="text-xs text-gray-500">화면에 벚꽃이 흩날립니다</p>
                    </div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={config.features.confetti} 
                    onChange={() => handleFeatureToggle('confetti')}
                    className="w-5 h-5 accent-pink-500 cursor-pointer" 
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600"><MessageCircle size={18} /></div>
                    <div>
                      <p className="font-medium text-sm">방명록 기능</p>
                      <p className="text-xs text-gray-500">하객들이 축하 메시지를 남깁니다</p>
                    </div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={config.features.guestbook} 
                    onChange={() => handleFeatureToggle('guestbook')}
                    className="w-5 h-5 accent-pink-500 cursor-pointer" 
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600"><CheckSquare size={18} /></div>
                    <div>
                      <p className="font-medium text-sm">참석 의사 전달 (RSVP)</p>
                      <p className="text-xs text-gray-500">참석 여부 설문 폼을 표시합니다</p>
                    </div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={config.features.rsvp} 
                    onChange={() => handleFeatureToggle('rsvp')}
                    className="w-5 h-5 accent-pink-500 cursor-pointer" 
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full text-purple-600"><Camera size={18} /></div>
                    <div>
                      <p className="font-medium text-sm">갤러리</p>
                      <p className="text-xs text-gray-500">웨딩 화보 섹션을 표시합니다</p>
                    </div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={config.features.gallery} 
                    onChange={() => handleFeatureToggle('gallery')}
                    className="w-5 h-5 accent-pink-500 cursor-pointer" 
                  />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT: Mobile Preview Area */}
        <div className="flex-1 bg-gray-200 flex justify-center items-start lg:items-center p-4 lg:p-8 overflow-y-auto">
          {/* Mobile Frame Container */}
          <div 
            id="mobile-preview-area"
            ref={previewRef}
            className={`
              relative w-full max-w-[375px] bg-white shadow-2xl overflow-hidden transition-all duration-300
              ${config.font === 'serif' ? 'font-serif-kr' : 'font-sans-kr'}
              ${config.theme === 'elegant' ? 'bg-[#FAF7F2]' : config.theme === 'romantic' ? 'bg-[#FFF0F5]' : 'bg-white'}
            `}
            style={{ minHeight: '800px' }} // Ensure height for printing
          >
            {/* Confetti Effect Overlay */}
            {config.features.confetti && <FallingPetals />}

            {/* Content Wrapper */}
            <div className="pb-20">
              
              {/* 1. Hero Section */}
              <div className="relative h-[500px] w-full bg-gray-100 overflow-hidden">
                <img 
                  src={config.mainImage} 
                  alt="Main Wedding" 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=Wedding+Photo' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end items-center text-white pb-12">
                  <p className="font-script text-3xl mb-2 opacity-90 tracking-widest">Wedding Invitation</p>
                  <div className="flex items-center gap-4 text-xl font-light mb-4">
                    <span>{config.groomName}</span>
                    <span className="text-xs opacity-70">AND</span>
                    <span>{config.brideName}</span>
                  </div>
                  <p className="text-sm tracking-widest opacity-90">
                    {config.date.replaceAll('-', '.')} {config.time}
                  </p>
                  <p className="text-sm opacity-80 mt-1">{config.locationName}</p>
                </div>
              </div>

              {/* 2. Invitation Message */}
              <div className="px-8 py-12 text-center">
                <div className="mb-6 opacity-40">
                  <Heart className="w-4 h-4 mx-auto fill-current" />
                </div>
                <h2 className="text-lg font-bold mb-6 text-gray-800">초 대 합 니 다</h2>
                <div className="whitespace-pre-line text-sm leading-8 text-gray-600 mb-8 break-keep">
                  {config.message}
                </div>
                
                <div className="flex justify-center items-center gap-8 text-gray-700 mt-8 text-sm">
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">GROOM</p>
                    <p className="font-medium">{config.groomName}</p>
                  </div>
                  <div className="h-8 w-[1px] bg-gray-300"></div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">BRIDE</p>
                    <p className="font-medium">{config.brideName}</p>
                  </div>
                </div>
              </div>

              {/* 3. Calendar & D-Day */}
              <div className="bg-white/50 px-8 py-12 text-center border-t border-b border-gray-100">
                <h3 className="text-sm font-bold tracking-widest mb-2 text-gray-400">THE WEDDING DAY</h3>
                <p className="text-xl font-medium mb-8 text-gray-800">{formattedDate} {config.time}</p>
                
                {/* Simplified Calendar Visual */}
                <div className="w-full max-w-[280px] mx-auto bg-white p-4 rounded shadow-sm mb-6">
                   <div className="grid grid-cols-7 text-xs text-gray-400 mb-2 border-b pb-2">
                     <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                   </div>
                   {/* Mock Calendar Grid - Logic simplified for demo but highlights 24th */}
                   <div className="grid grid-cols-7 text-sm text-gray-600 gap-y-3">
                     <div className="opacity-0">27</div><div className="opacity-0">28</div><div className="opacity-0">29</div><div className="opacity-0">30</div>
                     <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div><div>10</div>
                     <div>11</div><div>12</div><div>13</div><div>14</div><div>15</div><div>16</div><div>17</div><div>18</div><div>19</div><div>20</div>
                     <div>21</div><div>22</div><div>23</div>
                     <div className="bg-pink-400 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto shadow-md">24</div>
                     <div>25</div><div>26</div><div>27</div><div>28</div><div>29</div><div>30</div><div>31</div>
                   </div>
                </div>

                <div className="inline-block bg-pink-50 text-pink-600 px-4 py-1 rounded-full text-sm font-medium">
                  {config.groomName} <span className="text-pink-400">♥</span> {config.brideName}의 결혼식이 <span className="font-bold">{dDayText}</span> 남았습니다.
                </div>
              </div>

              {/* 4. Gallery (Optional) */}
              {config.features.gallery && (
                <div className="py-12 px-4 bg-white">
                  <h3 className="text-center font-bold text-gray-800 mb-6 tracking-widest">GALLERY</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <img src="https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&w=400&q=80" className="w-full h-32 object-cover rounded" alt="Gallery 1"/>
                    <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=400&q=80" className="w-full h-32 object-cover rounded" alt="Gallery 2"/>
                    <img src="https://images.unsplash.com/photo-1522673607200-1645062cd958?auto=format&fit=crop&w=400&q=80" className="w-full h-32 object-cover rounded" alt="Gallery 3"/>
                    <img src="https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=400&q=80" className="w-full h-32 object-cover rounded" alt="Gallery 4"/>
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-4">더 많은 사진은 결혼식장에서 확인해주세요 :)</p>
                </div>
              )}

              {/* 5. Location */}
              <div className="py-12 px-6 bg-gray-50">
                <h3 className="text-center font-bold text-gray-800 mb-2 tracking-widest">LOCATION</h3>
                <p className="text-center text-sm text-gray-600 mb-6">{config.locationName}<br/><span className="text-xs text-gray-400">{config.locationAddress}</span></p>
                
                {/* Fake Map */}
                <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center relative overflow-hidden mb-4 border">
                  <div className="absolute inset-0 bg-gray-300 opacity-50 flex items-center justify-center">
                     <span className="text-gray-500 text-xs">지도 영역 (API 연동 필요)</span>
                  </div>
                  <div className="z-10 bg-white p-2 rounded-full shadow-lg text-pink-500 animate-bounce">
                    <MapPin fill="currentColor" size={24} />
                  </div>
                </div>
                
                <div className="flex gap-2 justify-center">
                  <button className="flex-1 py-2 bg-white border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">네이버 지도</button>
                  <button className="flex-1 py-2 bg-white border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">카카오 내비</button>
                  <button className="flex-1 py-2 bg-white border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">티맵</button>
                </div>
              </div>

               {/* NEW: Money Gift (Accounts) */}
               {config.features.moneyGift && (
                <div className="py-12 px-6 bg-white border-t border-gray-100">
                  <h3 className="text-center font-bold text-gray-800 mb-6 tracking-widest text-sm text-pink-600">마음 전하실 곳</h3>
                  <div className="space-y-3">
                    <AccountAccordion title="신랑측 계좌번호" account={config.groomAccount} />
                    <AccountAccordion title="신부측 계좌번호" account={config.brideAccount} />
                  </div>
                </div>
              )}

              {/* 6. RSVP (Optional) */}
              {config.features.rsvp && (
                <div className="py-12 px-6 bg-white border-t border-gray-100">
                  <h3 className="text-center font-bold text-gray-800 mb-6 tracking-widest text-sm text-pink-600">참석 여부 전달하기</h3>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                    <p className="text-center text-xs text-gray-500 mb-4">식사 인원 준비를 위해 참석 여부를<br/>알려주시면 감사하겠습니다.</p>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-white border rounded cursor-pointer hover:border-pink-300">
                          <input type="radio" name="attend" className="accent-pink-500" />
                          <span className="text-sm">참석 가능</span>
                        </label>
                        <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-white border rounded cursor-pointer hover:border-pink-300">
                          <input type="radio" name="attend" className="accent-pink-500" />
                          <span className="text-sm">참석 불가</span>
                        </label>
                      </div>
                      <input type="text" placeholder="성함" className="w-full p-2 border rounded text-sm bg-white" />
                      <input type="text" placeholder="연락처" className="w-full p-2 border rounded text-sm bg-white" />
                      <div className="flex gap-2">
                         <input type="number" placeholder="동행인원" className="w-20 p-2 border rounded text-sm bg-white" />
                         <span className="flex items-center text-sm text-gray-500">명</span>
                      </div>
                      <button className="w-full py-3 bg-gray-800 text-white rounded text-sm mt-2 hover:bg-gray-700">참석 의사 보내기</button>
                    </div>
                  </div>
                </div>
              )}

              {/* 7. Guestbook (Optional) */}
              {config.features.guestbook && (
                <div className="py-12 px-6 bg-[#FAF7F2]">
                  <h3 className="text-center font-bold text-gray-800 mb-6 tracking-widest">GUESTBOOK</h3>
                  
                  {/* Messages List */}
                  <div className="space-y-3 mb-6">
                    {guestMessages.map((msg) => (
                      <div key={msg.id} className="bg-white p-4 rounded-lg shadow-sm">
                         <div className="flex justify-between items-baseline mb-1">
                           <span className="font-bold text-sm text-gray-700">{msg.name}</span>
                           <span className="text-xs text-gray-400">{msg.date}</span>
                         </div>
                         <p className="text-sm text-gray-600">{msg.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleGuestbookSubmit} className="bg-white p-4 rounded-lg border">
                    <div className="flex gap-2 mb-2">
                      <input 
                        value={newMessage.name}
                        onChange={(e) => setNewMessage({...newMessage, name: e.target.value})}
                        className="flex-1 p-2 border rounded text-sm" 
                        placeholder="이름" 
                      />
                      <input 
                        className="w-20 p-2 border rounded text-sm" 
                        placeholder="비밀번호" 
                        type="password"
                      />
                    </div>
                    <textarea 
                      value={newMessage.text}
                      onChange={(e) => setNewMessage({...newMessage, text: e.target.value})}
                      className="w-full p-2 border rounded text-sm resize-none h-20 mb-2" 
                      placeholder="축하 메시지를 남겨주세요"
                    />
                    <button type="submit" className="w-full py-2 bg-pink-500 text-white rounded text-sm font-medium hover:bg-pink-600">등록하기</button>
                  </form>
                </div>
              )}

              {/* Footer */}
              <div className="py-12 px-6 text-center bg-gray-800 text-white">
                <div className="flex justify-center gap-4 mb-6">
                  <button className="p-3 bg-white/10 rounded-full hover:bg-white/20">
                    <Share2 size={20} />
                  </button>
                  <button className="p-3 bg-white/10 rounded-full hover:bg-white/20">
                    <Music size={20} />
                  </button>
                </div>
                <p className="text-xs opacity-50">Copyright © 2025 Wedding Invitation</p>
              </div>

            </div>
          </div>
          {/* End Mobile Preview */}
        </div>
      </main>
    </div>
  );
}