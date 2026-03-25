import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Product from '../models/Product.js';

await mongoose.connect(process.env.MONGO_URI);

// Seed admin
const existing = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
if (!existing) {
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await Admin.create({ username: process.env.ADMIN_USERNAME, passwordHash });
  console.log(`Admin créé: ${process.env.ADMIN_USERNAME}`);
} else {
  console.log('Admin existe déjà.');
}

// Seed products
const count = await Product.countDocuments();
if (count === 0) {
  await Product.insertMany([
    {
      name: 'Mozzarella Artisanale',
      description: 'Mozzarella fraîche faite à la main, au lait de vache local. Texture crémeuse et fondante.',
      origin: 'Utique, Bizerte',
      pairing: 'Tomates fraîches, basilic, huile d\'olive',
      notes: 'Douce, laiteuse, légèrement salée',
      tags: ['Frais', 'Artisanal', 'Vache'],
      weightOptions: [
        { label: '250g', priceInTND: 8, stock: 20 },
        { label: '500g', priceInTND: 14, stock: 15 },
      ],
    },
    {
      name: 'Fromage Sicilien Blanc',
      description: 'Fromage ferme à pâte blanche, inspiré des traditions méditerranéennes. Notes équilibrées et légèrement salées.',
      origin: 'Utique, Bizerte',
      pairing: 'Olives, pain grillé, thym',
      notes: 'Ferme, salé, saveurs méditerranéennes',
      tags: ['Affiné', 'Ferme', 'Vache'],
      weightOptions: [
        { label: '500g', priceInTND: 16, stock: 10 },
        { label: '1kg', priceInTND: 28, stock: 8 },
      ],
    },
    {
      name: 'Ricotta Veloutée',
      description: 'Ricotta délicate au grain fin, légère et crémeuse. Parfaite en dessert ou salée.',
      origin: 'Utique, Bizerte',
      pairing: 'Miel, figues, noix',
      notes: 'Légère, douce, grains fins',
      tags: ['Frais', 'Doux', 'Petit-lait'],
      weightOptions: [
        { label: '250g', priceInTND: 7.9, stock: 25 },
        { label: '500g', priceInTND: 13, stock: 12 },
      ],
    },
  ]);
  console.log('3 produits créés.');
} else {
  console.log(`${count} produits existent déjà.`);
}

await mongoose.disconnect();
console.log('Seed terminé.');
