import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface WalletData {
  balance: string;
  auto_fill_amount: string;
  auto_fill_date: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://01.fy25ey02.64mb.io/',
  }),
  endpoints: (builder) => ({
    getWalletData: builder.query<WalletData, void>({
      query: () => '',
    }),
  }),
});

export const {useGetWalletDataQuery} = api; 