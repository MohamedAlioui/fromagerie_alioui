import mongoose from 'mongoose';

const saleItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  subtotal: { type: Number, required: true },
});

const saleSchema = new mongoose.Schema(
  {
    date: { type: String, required: true, index: true }, // YYYY-MM-DD
    clientName: { type: String, required: true },
    items: [saleItemSchema],
    total: { type: Number, required: true },
    notes: { type: String, default: '' },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Sale', saleSchema);
