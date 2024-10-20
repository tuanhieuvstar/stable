import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { trades } from '@/data/trades';
import { counties } from '@/data/counties';
import SEOMetadata from '@/components/SEOMetadata';
import StructuredData from '@/components/StructuredData';
import Layout from '@/components/Layout';

interface TradePageProps {
  trade: {
    name: string;
    description: string;
    icon: string;
  } | null;
  counties: string[];
}

const TradePage: React.FC<TradePageProps> = ({ trade, counties }) => {
  if (!trade) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Trade Not Found</h1>
          <p>Sorry, we couldn't find the trade you're looking for.</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </Layout>
    );
  }

  const pageTitle = `Find ${trade.name}s in Ireland - Skilled Professionals`;
  const pageDescription = `Connect with experienced ${trade.name}s across Ireland. Browse by county to find skilled professionals near you.`;
  const canonicalUrl = `https://findatradespersonireland.com/${trade.name.toLowerCase()}`;

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
        <h1 className="text-3xl font-bold mb-6">Find {trade.name}s in Ireland</h1>
        <p className="mb-6">{trade.description}</p>
        <h2 className="text-2xl font-semibold mb-4">Browse by County</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {counties.map((county) => (
            <Link
              key={county}
              href={`/${trade.name.toLowerCase()}/${county.toLowerCase()}`}
              className="p-4 border rounded hover:bg-gray-100 transition-colors"
            >
              {county}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = trades.map((trade) => ({
    params: { tradeSlug: trade.name.toLowerCase() },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tradeSlug = params?.tradeSlug as string;
  const trade = trades.find((t) => t.name.toLowerCase() === tradeSlug);

  if (!trade) {
    return { notFound: true };
  }

  return {
    props: {
      trade,
      counties: counties.map((county) => county.name),
    },
  };
};

export default TradePage;