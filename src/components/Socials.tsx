import React from 'react';
import Icon from '@/components/icons/Icon';

const Socials: React.FC<SocialsProps> = () => {
  const socials = [
    { name: 'GitHub', url: 'https://github.com/emwaide' },
    { name: 'Instagram', url: 'https://www.instagram.com/emwaide' },
    { name: 'Linkedin', url: 'https://www.linkedin.com/in/bchiang7' },
    { name: 'Email', url: 'mailto:aosknglsnga' },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {socials.map(social => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${social.name} profile`}
          className="group block w-8 h-8 text-muted-foreground hover:text-rose transition-colors"
        >
          <Icon name={social.name} />
        </a>
      ))}
    </div>
  );
};

export default Socials;
