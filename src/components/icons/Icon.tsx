import React from 'react';
import IconLinkedin from '@/components/icons/IconLinkedin';
import IconInstagram from '@/components/icons/IconInstagram';
import IconGitHub from '@/components/icons/IconGitHub';
import IconEmail from '@/components/icons/IconEmail';
import IconBoat from '@/components/icons/IconBoat';

type IconName = 'Linkedin' | 'Instagram' | 'GitHub' | 'Email' | 'Boat';

interface IconProps {
  name: IconName;
}

const Icon: React.FC<IconProps> = ({ name }) => {
  const icons: Record<IconName, JSX.Element> = {
    Linkedin: <IconLinkedin />,
    Instagram: <IconInstagram />,
    GitHub: <IconGitHub />,
    Email: <IconEmail />,
    Boat: <IconBoat />,
  };

  return (
    <span className="w-8 h-8 stroke-current transition-colors duration-200 group-hover:stroke-primary">
      {icons[name] || null}
    </span>
  );
};

export default Icon;
