import React from 'react';
import Layout from '@/components/Layout';
import SEOMetadata from '@/components/SEOMetadata';
import StructuredData from '@/components/StructuredData';

const ReviewsPage: React.FC = () => {
  const pageTitle = "Tradesperson Reviews - Find a Tradesperson Ireland";
  const pageDescription = "Read honest reviews from customers about tradespeople across Ireland. Find reliable professionals for your next project.";
  const canonicalUrl = "https://findatradespersonireland.com/reviews";

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
        <h1 className="text-3xl font-bold mb-6">Tradesperson Reviews</h1>
        <p className="mb-4">This page is under construction. Soon, you'll be able to read reviews from customers about their experiences with tradespeople across Ireland.</p>
      </div>
    </Layout>
  );
};

export default ReviewsPage;