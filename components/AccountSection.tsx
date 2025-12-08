import { WeddingData } from '@/types/wedding';
import { useState } from 'react';

interface AccountSectionProps {
  groom: WeddingData['groom'];
  bride: WeddingData['bride'];
}

export default function AccountSection({ groom, bride }: AccountSectionProps) {
  const [showAccounts, setShowAccounts] = useState(false);

  const copyAccount = (accountNumber: string, holder: string) => {
    navigator.clipboard.writeText(accountNumber);
    alert(`${holder}님의 계좌번호가 복사되었습니다.`);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--primary-color)' }}>
          마음 전하실 곳
        </h2>

        <div className="text-center mb-6">
          <button
            onClick={() => setShowAccounts(!showAccounts)}
            className="py-3 px-8 rounded-lg font-semibold text-white transition-colors"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            {showAccounts ? '계좌번호 닫기' : '계좌번호 보기'}
          </button>
        </div>

        {showAccounts && (
          <div className="space-y-4 fade-in">
            {groom.account && (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-lg font-bold mb-3">신랑측 계좌</div>
                <div className="space-y-2">
                  <p className="text-gray-700">{groom.account.bank}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono">{groom.account.accountNumber}</p>
                    <button
                      onClick={() => copyAccount(groom.account!.accountNumber, groom.account!.holder)}
                      className="text-sm px-3 py-1 bg-white rounded border hover:bg-gray-100"
                    >
                      복사
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">예금주: {groom.account.holder}</p>
                </div>
              </div>
            )}

            {bride.account && (
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-lg font-bold mb-3">신부측 계좌</div>
                <div className="space-y-2">
                  <p className="text-gray-700">{bride.account.bank}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono">{bride.account.accountNumber}</p>
                    <button
                      onClick={() => copyAccount(bride.account!.accountNumber, bride.account!.holder)}
                      className="text-sm px-3 py-1 bg-white rounded border hover:bg-gray-100"
                    >
                      복사
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">예금주: {bride.account.holder}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
