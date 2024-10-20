import React from 'react';
import Layout from '@/components/Layout';
import SEOMetadata from '@/components/SEOMetadata';
import StructuredData from '@/components/StructuredData';

const AdvertisePage: React.FC = () => {
  const pageTitle = "Advertise Your Trade - Find a Tradesperson Ireland";
  const pageDescription = "Promote your trade services on Find a Tradesperson Ireland. Reach potential customers and grow your business.";
  const canonicalUrl = "https://findatradespersonireland.com/advertise";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
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
        <h1 className="text-3xl font-bold mb-6">Advertise Your Trade</h1>
        <p className="mb-4">This page is under construction. Soon, you'll be able to learn about advertising opportunities for tradespeople on our platform.</p>
      </div>
    </Layout>
  );
};

export default AdvertisePage;