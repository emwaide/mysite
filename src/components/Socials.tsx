import React from 'react';
import Icon from '@/components/icons/Icon';

interface Site {
  name: 'GitHub' | 'Linkedin' | 'Instagram' | 'Email';
  url: string;
}

interface SocialsProps {
  sites: Site[];
}

const Socials: React.FC<SocialsProps> = ({ sites }) => {
  return (
    <div className="flex flex-wrap gap-4 py-6">
      {sites.map(site => (
        <a
          key={site.name}
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${site.name} profile`}
          className="group block w-8 h-8 text-muted-foreground hover:text-rose transition-colors"
        >
          <Icon name={site.name} />
        </a>
      ))}
    </div>
  );
};

export default Socials;
