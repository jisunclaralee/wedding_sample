import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      router.push('/');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>청첩장 관리자</title>
      </Head>

      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            청첩장 관리자 페이지
          </h1>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-sm text-yellow-700">
              이 페이지는 개발 환경에서만 접근 가능합니다.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">청첩장 데이터 수정 방법</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>
                  data/wedding-data.ts 파일을 직접 수정하세요.
                </li>
                <li>
                  변경사항을 저장한 후 Git에 푸시하세요.
                </li>
                <li>
                  Vercel이 자동으로 재배포합니다 (1-2분 소요).
                </li>
              </ol>
            </div>

            <div className="text-center">
              <button
                onClick={() => router.push('/')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                청첩장 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
