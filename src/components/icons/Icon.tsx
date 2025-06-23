import React from 'react';

import IconLinkedin from '@/components/icons/IconLinkedin';
import IconInstagram from '@/components/icons/IconInstagram';
import IconGitHub from '@/components/icons/IconGitHub';
import IconEmail from '@/components/icons/IconEmail';
import IconBoat from '@/components/icons/IconBoat';
import IconActivity from '@/components/icons/IconActivity';
import IconFootprint from '@/components/icons/IconFootprint';
import IconNavigation from './IconNavigation';
import IconSettings from '@/components/icons/IconSettings';

const iconMap = {
  Linkedin: IconLinkedin,
  Instagram: IconInstagram,
  GitHub: IconGitHub,
  Email: IconEmail,
  Boat: IconBoat,
  Activity: IconActivity,
  Footprint: IconFootprint,
  Navigation: IconNavigation,
  Settings: IconSettings,
} as const;

export type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
}

const Icon: React.FC<IconProps> = ({ name }) => {
  const Component = iconMap[name];

  return (
    <span className="w-5 h-5 stroke-current transition-colors duration-200 group-hover:stroke-primary">
      <Component />
    </span>
  );
};

export default Icon;
