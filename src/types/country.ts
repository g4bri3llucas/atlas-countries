export interface Country {
  code: string;
  name: string;
  nameEn: string;
  officialName: string;
  region: string;
  subregion: string;
  capital: string | null;
  population: number;
  areaKm2: number;
  flagUrl: string | null;
  flagAlt: string;
  languages: string[];
  currencies: string[];
}
