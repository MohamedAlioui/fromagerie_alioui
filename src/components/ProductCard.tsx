import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  description: string;
  image: string;
  slug?: string;
}

const ProductCard = ({ name, description, image, slug }: Props) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
    className="rounded-lg overflow-hidden bg-card shadow-[var(--card-shadow)] transition-shadow duration-200 hover:shadow-xl"
  >
    <div className="aspect-[4/3] overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div className="p-6">
      <div className="w-12 h-1 bg-primary rounded-full mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-card-foreground">{name}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
      <Link
        to={slug || '/nos-fromages'}
        className="text-primary font-semibold text-sm hover:underline"
      >
        En savoir plus →
      </Link>
    </div>
  </motion.div>
);

export default ProductCard;
