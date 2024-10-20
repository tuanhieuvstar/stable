import { GetStaticPaths, GetStaticProps } from 'next';
import { trades } from '@/data/trades';
import { counties } from '@/data/counties';
import { fetchTradespeople } from '@/lib/api';
import TradespersonCard from '@/components/TradespersonCard';
import SEOMetadata from '@/components/SEOMetadata';
import StructuredData from '@/components/StructuredData';
import Layout from '@/components/Layout';

interface TownPageProps {
  trade: {
    name: string;
    description: string;
    icon: string;
  };
  county: string;
  town: string;
  tradespeople: any[];
}

const TownPage: React.FC<TownPageProps> = ({ trade, county, town, tradespeople }) => {
  const pageTitle = `${trade.name}s in ${town}, ${county} - Local Professionals`;
  const pageDescription = `Find experienced ${trade.name}s in ${town}, ${county}. Browse profiles, read reviews, and contact skilled professionals for your project.`;
  const canonicalUrl = `https://findatradespersonireland.com/${trade.name.toLowerCase()}/${county.toLowerCase()}/${town.toLowerCase()}`;

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
        <h1 className="text-3xl font-bold mb-6">{trade.name}s in {town}, {county}</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tradespeople.map((person, index) => (
            <TradespersonCard key={index} tradesperson={person} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tradeSlug = params?.tradeSlug as string;
  const countySlug = params?.countySlug as string;
  const townSlug = params?.townSlug as string;

  const trade = trades.find((t) => t.name.toLowerCase() === tradeSlug);
  const county = counties.find((c) => c.name.toLowerCase() === countySlug);
  const town = county?.towns.find((t) => t.toLowerCase() === townSlug);

  if (!trade || !county || !town) {
    return { notFound: true };
  }

  const keyword = `${trade.name} ${town} ${county.name}`;
  const tradespeople = await fetchTradespeople(keyword);

  return {
    props: {
      trade,
      county: county.name,
      town,
      tradespeople,
    },
    revalidate: 86400, // Revalidate once per day
  };
};

export default TownPage;