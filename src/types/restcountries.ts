export interface RawCountry {
  names: {
    common: string;
    official: string;
    translations?: {
      por?: { common?: string; official?: string };
    };
  };
  codes: { alpha_3: string };
  capitals?: { name: string }[];
  flag?: { url_svg?: string };
  region?: string;
  subregion?: string;
  area?: { kilometers?: number };
  population?: number;
  languages?: { name: string }[];
  currencies?: { code: string; name: string; symbol?: string }[];
}

export interface RawListData {
  objects: RawCountry[];
  meta: { total: number };
}

export interface RawListResponse {
  data: RawListData;
}
