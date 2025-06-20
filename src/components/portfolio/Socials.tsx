'use client';

import React from 'react';
import Icon, { IconName } from '@/components/icons/Icon';

type Social = {
  name: IconName;
  url: string;
};

const socials: Social[] = [
  { name: 'GitHub', url: 'https://github.com/emwaide' },
  { name: 'Instagram', url: 'https://www.instagram.com/emwaide' },
  { name: 'Linkedin', url: 'https://www.linkedin.com/in/emwaide' },
  { name: 'Email', url: 'mailto:aosknglsnga' },
];

const Socials: React.FC = () => (
  <div className="flex flex-wrap gap-4">
    {socials.map(({ name, url }) => (
      <a
        key={name}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${name}`}
        className="group block w-8 h-8 text-muted-foreground hover:text-rose transition-colors"
      >
        <Icon name={name} />
      </a>
    ))}
  </div>
);

export default Socials;
