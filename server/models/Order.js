import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: String,
  weightLabel: String,
  flavorLabel: { type: String, default: '' },
  priceInTND: Number,
  quantity: Number,
  subtotal: Number,
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true },
    status: {
      type: String,
      enum: ['en_attente', 'confirmee', 'en_preparation', 'expediee', 'livree', 'annulee'],
      default: 'en_attente',
    },
    customer: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      notes: { type: String, default: '' },
    },
    items: [orderItemSchema],
    totalTND: { type: Number, required: true },
    deliveryFeeTND: { type: Number, default: 7 },
    grandTotalTND: { type: Number, required: true },
  },
  { timestamps: true }
);

orderSchema.statics.generateOrderNumber = async function () {
  const year = new Date().getFullYear();
  const last = await this.findOne({ orderNumber: new RegExp(`^FA-${year}-`) })
    .sort({ createdAt: -1 })
    .select('orderNumber');
  const next = last
    ? parseInt(last.orderNumber.split('-')[2], 10) + 1
    : 1;
  return `FA-${year}-${String(next).padStart(5, '0')}`;
};

export default mongoose.model('Order', orderSchema);
