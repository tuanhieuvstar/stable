import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { trades } from '@/data/trades';
import { counties } from '@/data/counties';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const baseUrl = 'https://findatradespersonireland.com';

  const fields = trades.flatMap((trade) =>
    counties.flatMap((county) =>
      county.towns.map((town) => ({
        loc: `${baseUrl}/${trade.name.toLowerCase()}/${county.name.toLowerCase()}/${town.toLowerCase()}`,
        lastmod: new Date().toISOString(),
      }))
    )
  );

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}