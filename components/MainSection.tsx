import { WeddingData } from '@/types/wedding';
import Image from 'next/image';

interface MainSectionProps {
  data: WeddingData;
  onImageLoad: () => void;
}

export default function MainSection({ data, onImageLoad }: MainSectionProps) {
  const weddingDate = new Date(data.wedding.date);
  const formattedDate = weddingDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 main-section">
      <div className="max-w-2xl w-full space-y-8 fade-in">
        <div className="relative w-full aspect-[3/4] main-image overflow-hidden shadow-2xl">
          <Image
            src={data.images.main}
            alt="Wedding Photo"
            fill
            style={{ objectFit: 'cover' }}
            priority
            onLoad={onImageLoad}
          />
        </div>

        <div className="text-center space-y-4 main-text">
          <h1 className="text-4xl md:text-5xl font-bold main-title" style={{ color: 'var(--primary-color)' }}>
            {data.groom.name} & {data.bride.name}
          </h1>
          
          <div className="text-lg md:text-xl text-gray-700">
            <p>{formattedDate}</p>
            <p className="mt-2">{data.wedding.time}</p>
            <p className="mt-2 font-semibold">{data.wedding.locationName}</p>
          </div>

          <div className="pt-6 text-gray-600 whitespace-pre-line leading-relaxed">
            {data.wedding.message}
          </div>
        </div>
      </div>
    </section>
  );
}
