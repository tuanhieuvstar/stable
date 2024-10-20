import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { trades } from '@/data/trades';
import { counties } from '@/data/counties';
import SEOMetadata from '@/components/SEOMetadata';
import StructuredData from '@/components/StructuredData';
import Layout from '@/components/Layout';
import { MapPin } from 'lucide-react';

interface CountyPageProps {
  trade: {
    name: string;
    description: string;
    icon: string;
  } | null;
  county: {
    name: string;
    towns: string[];
  } | null;
}

const CountyPage: React.FC<CountyPageProps> = ({ trade, county }) => {
  if (!trade || !county) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Page Not Found</h1>
          <p>Sorry, we couldn't find the trade or county you're looking for.</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </Layout>
    );
  }

  const pageTitle = `${trade.name}s in ${county.name} - Find Local Professionals`;
  const pageDescription = `Discover skilled ${trade.name}s in ${county.name}. Browse local towns to find experienced professionals for your project.`;
  const canonicalUrl = `https://findatradespersonireland.com/${trade.name.toLowerCase()}/${county.name.toLowerCase()}`;

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
        <h1 className="text-3xl font-bold mb-6">{trade.name}s in {county.name}</h1>
        <p className="mb-6">Find skilled {trade.name}s in {county.name} and its surrounding areas.</p>
        <h2 className="text-2xl font-semibold mb-4">Browse by Town</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {county.towns.map((town) => (
            <Link
              key={town}
              href={`/${trade.name.toLowerCase()}/${county.name.toLowerCase()}/${town.toLowerCase()}`}
              className="flex items-center p-4 border rounded hover:bg-gray-100 transition-colors"
            >
              <MapPin className="w-5 h-5 mr-2 text-green-600" />
              <span>{town}</span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = trades.flatMap((trade) =>
    counties.map((county) => ({
      params: {
        tradeSlug: trade.name.toLowerCase(),
        countySlug: county.name.toLowerCase(),
      },
    }))
  );

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tradeSlug = params?.tradeSlug as string;
  const countySlug = params?.countySlug as string;

  const trade = trades.find((t) => t.name.toLowerCase() === tradeSlug);
  const county = counties.find((c) => c.name.toLowerCase() === countySlug);

  if (!trade || !county) {
    return { notFound: true };
  }

  return {
    props: {
      trade,
      county,
    },
  };
};

export default CountyPage;