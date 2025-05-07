import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface OcrResult {
  success: boolean;
  results: {
    brand: string;
    product_type: string;
    batch_number: string;
    expiry_date: string;
    price: string;
    confidence_score: number;
  };
}

export interface CountResult {
  success: boolean;
  count: number;
  timestamp: string;
}

export interface FreshnessResult {
  success: boolean;
  results: {
    freshness_score: number;
    category: string;
    color_score: number;
    texture_score: number;
    estimated_shelf_life: string;
  };
}

export interface DashboardData {
  statistics: {
    products_inspected: number;
    defect_rate: number;
    processing_speed: number;
    uptime: number;
  };
  recent_batches: Array<{
    id: string;
    product: string;
    pass_rate: number;
    time: string;
  }>;
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // OCR Analysis
  performOcr: async (imageData: FormData): Promise<OcrResult> => {
    try {
      const response = await axiosInstance.post('/ocr', imageData);
      return response.data;
    } catch (error) {
      console.error('Error performing OCR analysis:', error);
      throw error;
    }
  },

  // Realtime OCR
  performRealtimeOcr: async (frame: string) => {
    try {
      const response = await axiosInstance.post('/ocr/realtime', { frame });
      return response.data;
    } catch (error) {
      console.error('Error performing realtime OCR:', error);
      throw error;
    }
  },

  // Product Counting
  getProductCount: async (): Promise<CountResult> => {
    try {
      const response = await axiosInstance.get('/count');
      return response.data;
    } catch (error) {
      console.error('Error getting product count:', error);
      throw error;
    }
  },

  // Freshness Detection
  detectFreshness: async (imageData: FormData): Promise<FreshnessResult> => {
    try {
      const response = await axiosInstance.post('/freshness', imageData);
      return response.data;
    } catch (error) {
      console.error('Error detecting freshness:', error);
      throw error;
    }
  },

  // Dashboard Data
  getDashboardData: async (): Promise<DashboardData> => {
    try {
      const response = await axiosInstance.get('/dashboard');
      return response.data;
    } catch (error) {
      console.error('Error getting dashboard data:', error);
      throw error;
    }
  },
};

export default apiService;