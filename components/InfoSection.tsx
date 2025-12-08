import { WeddingData } from '@/types/wedding';

interface InfoSectionProps {
  data: WeddingData;
}

export default function InfoSection({ data }: InfoSectionProps) {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--primary-color)' }}>
          예식 안내
        </h2>

        <div className="grid grid-cols-2 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-lg font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>
              신랑
            </div>
            <div className="text-2xl font-bold mb-2">{data.groom.name}</div>
            <a 
              href={`tel:${data.groom.phone}`}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
               {data.groom.phone}
            </a>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-lg font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>
              신부
            </div>
            <div className="text-2xl font-bold mb-2">{data.bride.name}</div>
            <a 
              href={`tel:${data.bride.phone}`}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
               {data.bride.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
