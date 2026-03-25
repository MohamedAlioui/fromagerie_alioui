import mongoose from 'mongoose';

const weightOptionSchema = new mongoose.Schema({
  label: { type: String, required: true },
  priceInTND: { type: Number, required: true },
  stock: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, default: '' },
    origin: { type: String, default: '' },
    pairing: { type: String, default: '' },
    notes: { type: String, default: '' },
    tags: [{ type: String }],
    image: { type: String, default: '' },
    weightOptions: [weightOptionSchema],
    flavorOptions: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.pre('save', function (next) {
  if (!this.slug || this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }
  next();
});

export default mongoose.model('Product', productSchema);
