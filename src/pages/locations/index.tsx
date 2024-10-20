import { GetStaticProps } from 'next';
import Link from 'next/link';
import { counties } from '@/data/counties';
import SEOMetadata from '@/components/SEOMetadata';
import StructuredData from '@/components/StructuredData';
import Layout from '@/components/Layout';
import { MapPin } from 'lucide-react';

const LocationsPage: React.FC<{ counties: typeof counties }> = ({ counties }) => {
  const pageTitle = "Browse Locations - Find a Tradesperson Ireland";
  const pageDescription = "Explore tradespeople across different counties and towns in Ireland. Find local professionals for your home improvement and repair needs.";
  const canonicalUrl = "https://findatradespersonireland.com/locations";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
  };

  return (
    <Layout>
      <SEOMetadata
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
      />
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Browse Locations</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {counties.map((county) => (
            <div key={county.name} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">{county.name}</h2>
              <ul className="space-y-2">
                {county.towns.slice(0, 5).map((town) => (
                  <li key={town} className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-green-600" />
                    <Link href={`/locations/${county.name.toLowerCase()}/${town.toLowerCase()}`} className="text-blue-600 hover:underline">
                      {town}
                    </Link>
                  </li>
                ))}
              </ul>
              {county.towns.length > 5 && (
                <Link href={`/locations/${county.name.toLowerCase()}`} className="text-blue-600 hover:underline block mt-4">
                  View all towns in {county.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      counties,
    },
  };
};

export default LocationsPage;