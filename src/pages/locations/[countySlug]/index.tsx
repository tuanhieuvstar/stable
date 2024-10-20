import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { counties } from '@/data/counties';
import { trades } from '@/data/trades';
import SEOMetadata from '@/components/SEOMetadata';
import StructuredData from '@/components/StructuredData';
import { MapPin } from 'lucide-react';

interface CountyLocationPageProps {
  county: {
    name: string;
    towns: string[];
  };
  trades: typeof trades;
}

const CountyLocationPage: React.FC<CountyLocationPageProps> = ({ county, trades }) => {
  const pageTitle = `Tradespeople in ${county.name} - Find Local Professionals`;
  const pageDescription = `Discover skilled tradespeople across various towns in ${county.name}. Find local professionals for your home improvement and repair needs.`;
  const canonicalUrl = `https://findatradespersonireland.com/locations/${county.name.toLowerCase()}`;

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
        <h1 className="text-3xl font-bold mb-6">Tradespeople in {county.name}</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {county.towns.map((town) => (
            <div key={town} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                {town}
              </h2>
              <ul className="space-y-2">
                {trades.slice(0, 5).map((trade) => (
                  <li key={trade.name}>
                    <Link href={`/${trade.name.toLowerCase()}/${county.name.toLowerCase()}/${town.toLowerCase()}`} className="text-blue-600 hover:underline">
                      {trade.name}s in {town}
                    </Link>
                  </li>
                ))}
              </ul>
              {trades.length > 5 && (
                <Link href={`/locations/${county.name.toLowerCase()}/${town.toLowerCase()}`} className="text-blue-600 hover:underline block mt-4">
                  View all trades in {town}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = counties.map((county) => ({
    params: { countySlug: county.name.toLowerCase() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const county = counties.find((c) => c.name.toLowerCase() === params?.countySlug);

  if (!county) {
    return { notFound: true };
  }

  return {
    props: {
      county,
      trades,
    },
  };
};

export default CountyLocationPage;