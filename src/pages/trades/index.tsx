import { GetStaticProps } from 'next';
import Link from 'next/link';
import { trades } from '@/data/trades';
import SEOMetadata from '@/components/SEOMetadata';
import StructuredData from '@/components/StructuredData';
import Layout from '@/components/Layout';
import * as Icons from 'lucide-react';

const TradesPage: React.FC<{ trades: typeof trades }> = ({ trades }) => {
  const pageTitle = "Browse Trades - Find a Tradesperson Ireland";
  const pageDescription = "Explore a wide range of trades available on Find a Tradesperson Ireland. Connect with skilled professionals for your home improvement and repair needs.";
  const canonicalUrl = "https://findatradespersonireland.com/trades";

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
        <h1 className="text-3xl font-bold mb-6">Browse Trades</h1>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {trades.map((trade) => {
            const IconComponent = Icons[trade.icon as keyof typeof Icons];
            return (
              <Link
                key={trade.name}
                href={`/${trade.name.toLowerCase()}`}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                {IconComponent && <IconComponent className="w-12 h-12 mb-2 text-green-600" />}
                <h2 className="text-lg font-semibold text-center">{trade.name}</h2>
                <p className="text-sm text-gray-600 text-center mt-2">{trade.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      trades,
    },
  };
};

export default TradesPage;