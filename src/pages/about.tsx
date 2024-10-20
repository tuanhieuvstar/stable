import SEOMetadata from '@/components/SEOMetadata';
import StructuredData from '@/components/StructuredData';

export default function AboutPage() {
  const pageTitle = "About Us - Find a Tradesperson Ireland";
  const pageDescription = "Learn about Find a Tradesperson Ireland, your trusted platform for connecting skilled professionals with customers across Ireland.";
  const canonicalUrl = "https://findatradespersonireland.com/about";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl
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
        <h1 className="text-3xl font-bold mb-6">About Find a Tradesperson Ireland</h1>
        <div className="prose max-w-none">
          <p>Find a Tradesperson Ireland is your go-to platform for connecting skilled professionals with customers across the country. Our mission is to simplify the process of finding reliable tradespeople for all your home improvement and repair needs.</p>
          <h2>Our Vision</h2>
          <p>We envision a future where every homeowner in Ireland can easily access a network of trusted, skilled tradespeople. By bridging the gap between customers and professionals, we aim to foster a community built on trust, quality workmanship, and customer satisfaction.</p>
          <h2>What We Offer</h2>
          <ul>
            <li>A comprehensive directory of skilled tradespeople across Ireland</li>
            <li>Easy-to-use search functionality to find professionals in your area</li>
            <li>Detailed profiles with ratings, reviews, and contact information</li>
            <li>Coverage for a wide range of trades, from plumbing to carpentry and everything in between</li>
          </ul>
          <h2>Our Commitment</h2>
          <p>At Find a Tradesperson Ireland, we are committed to:</p>
          <ul>
            <li>Maintaining a high-quality directory of skilled professionals</li>
            <li>Providing a user-friendly platform for both customers and tradespeople</li>
            <li>Continuously improving our services based on user feedback</li>
            <li>Promoting fair practices and transparency in the home improvement industry</li>
          </ul>
          <p>Whether you're a homeowner looking for a reliable professional or a skilled tradesperson seeking to expand your client base, Find a Tradesperson Ireland is here to help you connect and succeed.</p>
        </div>
      </div>
    </>
  );
}