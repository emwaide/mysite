export const icons: Record<string, string> = {
  Temperature: '🌡️',
  Rain: '🌧',
  Wind: '💨',
  'Wave Height': '🌊',
  'Swell Height': '📈',
  Visibility: '👓',
};

export const normaliseLabel = (label: string) => label.toLowerCase().replace(/\s+/g, '');
