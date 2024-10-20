import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export async function fetchTradespeople(keyword: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/tradespeople`, {
      params: { keyword },
    });
    return response.data.items || [];
  } catch (error) {
    console.error('Error fetching tradespeople:', error);
    return [];
  }
}