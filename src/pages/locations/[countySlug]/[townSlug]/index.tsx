import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { counties } from '@/data/counties';
import { trades } from '@/data/trades';
import SEOMetadata from '@/components/SEOMetadata';
import StructuredData from '@/components/StructuredData';
import * as Icons from 'lucide-react';

interface TownLocationPageProps {
  county: string;
  town: string;
  trades: typeof trades;
}

const TownLocationPage: React.FC<TownLocationPageProps> = ({ county, town, trades }) => {
  const pageTitle = `Tradespeople in ${town}, ${county} - Find Local Professionals`;
  const pageDescription = `Discover skilled tradespeople in ${town}, ${county}. Find local professionals for your home improvement and repair needs.`;
  const canonicalUrl = `https://findatradespersonireland.com/locations/${county.toLowerCase()}/${town.toLowerCase()}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
  };

  return (
    <>
      <SEOMetadata
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
      />
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tradespeople in {town}, {county}</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trades.map((trade) => {
            const IconComponent = Icons[trade.icon as keyof typeof Icons];
            return (
              <Link
                key={trade.name}
                href={`/${trade.name.toLowerCase()}/${county.toLowerCase()}/${town.toLowerCase()}`}
                className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-md transition-shadow"
              >
                {IconComponent && <IconComponent className="w-12 h-12 mb-4 text-green-600" />}
                <h2 className="text-xl font-bold mb-2">{trade.name}s</h2>
                <p className="text-sm text-gray-600 text-center">{trade.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = counties.flatMap((county) =>
    county.towns.map((town) => ({
      params: { countySlug: county.name.toLowerCase(), townSlug: town.toLowerCase() },
    }))
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const county = counties.find((c) => c.name.toLowerCase() === params?.countySlug);
  const town = county?.towns.find((t) => t.toLowerCase() === params?.townSlug);

  if (!county || !town) {
    return { notFound: true };
  }

  return {
    props: {
      county: county.name,
      town,
      trades,
    },
  };
};

export default TownLocationPage;