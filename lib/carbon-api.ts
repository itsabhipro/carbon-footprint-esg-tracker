// lib/carbonApi.ts

export interface IntensityData {
  from: string;
  to: string;
  intensity: {
    forecast: number;
    actual: number;
    index: 'very low' | 'low' | 'moderate' | 'high' | 'very high';
  };
}

export interface GenerationMixItem {
  fuel: string;
  percentage: number;
}

export interface RegionalData {
  regionid: number;
  dnoregion: string;
  shortname: string;
  intensity: {
    forecast: number;
    index: string;
  };
  generationmix: GenerationMixItem[];
}

const BASE_URL = 'https://api.carbonintensity.org.uk';

export const carbonApi = {
  /**
   * Fetches the current 30-minute national carbon intensity factors.
   */
  async getCurrentIntensity(): Promise<IntensityData> {
    try {
      const response = await fetch(`${BASE_URL}/intensity`, {
        next: { revalidate: 1800 }, // Cache on Next.js for 30 mins
      });

      if (!response.ok) throw new Error('Failed to query national carbon factors');
      const body = await response.json();
      return body.data[0];
    } catch (error) {
      console.error('carbonApi.getCurrentIntensity error:', error);
      throw error;
    }
  },

  /**
   * Fetches regional breakdown matrices for a breakdown across the UK.
   */
  async getRegionalIntensity(): Promise<RegionalData[]> {
    try {
      const response = await fetch(`${BASE_URL}/regional`, {
        next: { revalidate: 1800 },
      });

      if (!response.ok) throw new Error('Failed to query regional grids');
      const body = await response.json();
      return body.data[0].regions;
    } catch (error) {
      console.error('carbonApi.getRegionalIntensity error:', error);
      throw error;
    }
  },

  /**
   * Helper utility calculating carbon outputs directly from user inputs.
   * Logic: Activity (kWh) * Intensity Factor (gCO2/kWh) / 1000 = kg CO2e
   */
  async computeScope2(kwh: number): Promise<{ totalKg: number; factorGrams: number }> {
    try {
      const currentGrid = await this.getCurrentIntensity();
      const factorGrams = currentGrid.intensity.actual || currentGrid.intensity.forecast || 150;
      const totalKg = (kwh * factorGrams) / 1000;
      return { totalKg, factorGrams };
    } catch {
      // Elegant operational fallback if the public API experiences rate limits
      return { totalKg: (kwh * 210) / 1000, factorGrams: 210 };
    }
  }
};
