import { useState } from 'react';
import { GuestbookEntry } from '@/types/wedding';

export default function GuestbookSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name,
      message,
      createdAt: new Date().toISOString(),
    };

    setEntries([newEntry, ...entries]);
    setName('');
    setMessage('');
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--primary-color)' }}>
          방명록
        </h2>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ '--tw-ring-color': 'var(--primary-color)' } as any}
                maxLength={20}
              />
            </div>
            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="축하 메시지를 남겨주세요"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-none"
                style={{ '--tw-ring-color': 'var(--primary-color)' } as any}
                rows={3}
                maxLength={200}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white transition-colors"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              등록하기
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {entries.length === 0 ? (
            <p className="text-center text-gray-500">첫 번째 방명록을 남겨주세요!</p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-semibold">{entry.name}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-line">{entry.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
