import Image from 'next/image';

const images = [
  { src: '/images/IMG_2010.jpg', alt: 'Red Arrows aerobatic display' },
  { src: '/images/IMG_2200.JPG', alt: 'Red-striped lighthouse off the coast' },
  { src: '/images/IMG_3820.jpeg', alt: 'El Capitan, Yosemite at sunset' },
  { src: '/images/IMG_4430.jpeg', alt: 'Mountain peaks emerging from the clouds' },
];

const PhotoGallery: React.FC = () => (
  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
    {images.map((img, index) => (
      <div key={index} className="aspect-square overflow-hidden shadow-md">
        <Image
          src={img.src}
          alt={img.alt}
          width={400}
          height={400}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
    ))}
  </div>
);

export default PhotoGallery;
