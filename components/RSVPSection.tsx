import { useState } from 'react';
import { RSVPResponse } from '@/types/wedding';

interface RSVPSectionProps {
  isModal?: boolean;
}

export default function RSVPSection({ isModal = false }: RSVPSectionProps) {
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'yes' | 'no' | 'maybe'>('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newResponse: RSVPResponse = {
      id: Date.now().toString(),
      name,
      attendance,
      guestCount,
      message,
      createdAt: new Date().toISOString(),
    };

    setResponses([newResponse, ...responses]);
    setSubmitted(true);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--primary-color)' }}>
          참석 의사 전달
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">이름 *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">참석 여부 *</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance('yes')}
                    className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
                      attendance === 'yes'
                        ? 'bg-green-500 text-white'
                        : 'bg-white border border-gray-300'
                    }`}
                  >
                    참석
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('maybe')}
                    className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
                      attendance === 'maybe'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-white border border-gray-300'
                    }`}
                  >
                    미정
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('no')}
                    className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
                      attendance === 'no'
                        ? 'bg-red-500 text-white'
                        : 'bg-white border border-gray-300'
                    }`}
                  >
                    불참
                  </button>
                </div>
              </div>

              {attendance === 'yes' && (
                <div>
                  <label className="block text-sm font-semibold mb-2">참석 인원</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}명
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2">메시지 (선택)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 resize-none"
                  rows={3}
                  maxLength={200}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold text-white transition-colors"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                전송하기
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-2">전송 완료!</h3>
            <p className="text-gray-600">소중한 의견 감사합니다.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              다시 작성하기
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
