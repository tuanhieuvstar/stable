import React from 'react';
import Layout from '@/components/Layout';
import SEOMetadata from '@/components/SEOMetadata';
import StructuredData from '@/components/StructuredData';

const BlogPage: React.FC = () => {
  const pageTitle = "Blog - Find a Tradesperson Ireland";
  const pageDescription = "Read our latest articles on home improvement, DIY tips, and insights into various trades in Ireland.";
  const canonicalUrl = "https://findatradespersonireland.com/blog";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
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
        <h1 className="text-3xl font-bold mb-6">Our Blog</h1>
        <p className="mb-4">This page is under construction. Soon, you'll be able to read our latest articles on home improvement, DIY tips, and insights into various trades in Ireland.</p>
      </div>
    </Layout>
  );
};

export default BlogPage;