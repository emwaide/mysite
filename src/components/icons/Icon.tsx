import React from 'react';
import IconLinkedin from '@/components/icons/IconLinkedin';
import IconInstagram from '@/components/icons/IconInstagram';
import IconGitHub from '@/components/icons/IconGitHub';
import IconEmail from '@/components/icons/IconEmail';

type IconName = 'Linkedin' | 'Instagram' | 'GitHub' | 'Email';

interface IconProps {
  name: IconName;
}

const Icon: React.FC<IconProps> = ({ name }) => {
  const icons: Record<IconName, JSX.Element> = {
    Linkedin: <IconLinkedin />,
    Instagram: <IconInstagram />,
    GitHub: <IconGitHub />,
    Email: <IconEmail />,
  };

  return (
    <span className="w-8 h-8 stroke-current transition-colors duration-200 group-hover:stroke-primary">
      {icons[name] || null}
    </span>
  );
};

export default Icon;
