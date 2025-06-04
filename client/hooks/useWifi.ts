import { useQuery } from '@tanstack/react-query';

import { api } from '@lib/strapi';
import { Wifi, WifiResponse, wifiSchema } from '@models/wifi';

export const useWifi = ({ locale }: { locale: string }) =>
  useQuery<Wifi>({
    queryKey: ['wifi', locale],
    queryFn: async () => {
      const res = await api.get<WifiResponse>(`/api/wifi?locale=${locale}`);

      const wifiData = wifiSchema.parse(res.data.data);

      if (!wifiData) throw new Error('Wi-Fi data not found');

      return wifiData;
    },
  });
