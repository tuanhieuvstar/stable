import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const auth = Buffer.from(`${process.env.DATAFORSEO_USERNAME}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    const response = await axios.post(
      'https://api.dataforseo.com/v3/serp/google/maps/live/advanced',
      [{
        keyword,
        location_code: 2372,
        language_code: 'en',
        device: 'desktop',
        os: 'windows',
        depth: 100
      }],
      { headers: { Authorization: `Basic ${auth}` } }
    );

    const tradespeople = response.data.tasks[0].result[0].items;
    res.status(200).json({ items: tradespeople });
  } catch (error) {
    console.error('Error fetching tradespeople:', error);
    res.status(500).json({ error: 'Error fetching tradespeople' });
  }
}