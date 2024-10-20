import React from 'react';
import Layout from '@/components/Layout';
import SEOMetadata from '@/components/SEOMetadata';
import StructuredData from '@/components/StructuredData';

const PrivacyPolicyPage: React.FC = () => {
  const pageTitle = "Privacy Policy - Find a Tradesperson Ireland";
  const pageDescription = "Read our privacy policy to understand how we collect, use, and protect your personal information on Find a Tradesperson Ireland.";
  const canonicalUrl = "https://findatradespersonireland.com/privacy";

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
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">This page is under construction. Soon, you'll be able to read our detailed privacy policy explaining how we handle your personal information.</p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;