import { Footprints, Glasses, Watch, Headphones, Laptop, Smartphone, Package } from 'lucide-react';

// Associe le nom d'icône (string venant des données) à un composant lucide.
const icons = {
  shoe: Footprints,
  glasses: Glasses,
  watch: Watch,
  headphones: Headphones,
  laptop: Laptop,
  phone: Smartphone,
};

export default function ProductIcon({ name, className }) {
  const Icon = icons[name] ?? Package;
  return <Icon className={className} aria-hidden="true" />;
}
