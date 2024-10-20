import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { trades } from '@/data/trades';
import { counties } from '@/data/counties';
import SEOMetadata from '@/components/SEOMetadata';
import StructuredData from '@/components/StructuredData';
import Layout from '@/components/Layout';
import * as Icons from 'lucide-react';

const HomePage: React.FC = () => {
  const pageTitle = "Find a Tradesperson Ireland - Connect with Skilled Professionals";
  const pageDescription = "Find reliable tradespeople in Ireland for all your home improvement and repair needs. Browse by trade or location to connect with skilled professionals near you.";
  const canonicalUrl = "https://findatradespersonireland.com";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Find a Tradesperson Ireland",
    "url": canonicalUrl,
    "description": pageDescription
  };

  return (
    <Layout>
      <SEOMetadata
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
      />
      <StructuredData data={structuredData} />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-green-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Find Skilled Tradesmen in Ireland
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Connect with reliable local tradesmen for all your home improvement and repair needs.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="What trade are you looking for?" type="text" />
                  <Button type="submit">Search</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Popular Trades</h2>
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {trades.map((trade) => {
                const IconComponent = Icons[trade.icon as keyof typeof Icons];
                return (
                  <Link key={trade.name} href={`/${trade.name.toLowerCase()}`} className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    {IconComponent && <IconComponent className="w-12 h-12 mb-2 text-green-600" />}
                    <h3 className="text-lg font-semibold text-center">{trade.name}</h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Featured Locations</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {counties.map((county) => (
                <div key={county.name} className="flex flex-col p-4 bg-white rounded-lg shadow">
                  <h3 className="text-xl font-bold mb-2">{county.name}</h3>
                  <ul className="text-sm text-gray-500 space-y-1">
                    {county.towns.slice(0, 3).map((town) => (
                      <li key={town} className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-green-600" />
                        <span>{town}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="link" className="mt-4 self-start">View all in {county.name}</Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;