'use client';

import dynamic from 'next/dynamic';
import type { FC } from 'react';

const DynamicLocationMap = dynamic(() => import('./LocationMap'), { ssr: false });

type Props = {
  lat: number;
  lon: number;
};

const LocationMapWrapper: FC<Props> = ({ lat, lon }) => {
  return <DynamicLocationMap lat={lat} lon={lon} />;
};

export default LocationMapWrapper;
