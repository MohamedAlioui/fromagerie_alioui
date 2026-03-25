import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res, next) => {
  try {
    const { customer, items: clientItems, deliveryFeeTND = 7 } = req.body;

    // Validate & build items from DB prices
    const builtItems = [];
    for (const ci of clientItems) {
      const product = await Product.findById(ci.productId);
      if (!product || !product.isAvailable) {
        return res.status(400).json({ error: `Produit indisponible: ${ci.productName}` });
      }
      const wopt = product.weightOptions.find(w => w.label === ci.weightLabel);
      if (!wopt) return res.status(400).json({ error: `Option de poids introuvable: ${ci.weightLabel}` });
      if (wopt.stock < ci.quantity) {
        return res.status(400).json({ error: `Stock insuffisant pour ${product.name} (${ci.weightLabel})` });
      }
      builtItems.push({
        productId: product._id,
        productName: product.name,
        weightLabel: wopt.label,
        flavorLabel: ci.flavorLabel || '',
        priceInTND: wopt.priceInTND,
        quantity: ci.quantity,
        subtotal: wopt.priceInTND * ci.quantity,
      });
      // Decrement stock
      wopt.stock -= ci.quantity;
      await product.save();
    }

    const totalTND = builtItems.reduce((s, i) => s + i.subtotal, 0);
    const grandTotalTND = totalTND + deliveryFeeTND;
    const orderNumber = await Order.generateOrderNumber();

    const order = await Order.create({
      orderNumber,
      customer,
      items: builtItems,
      totalTND,
      deliveryFeeTND,
      grandTotalTND,
    });

    res.status(201).json({
      orderNumber: order.orderNumber,
      grandTotalTND: order.grandTotalTND,
      items: order.items,
      customer: { fullName: order.customer.fullName, email: order.customer.email },
    });
  } catch (err) { next(err); }
};

export const trackOrder = async (req, res, next) => {
  try {
    const { orderNumber, email } = req.query;
    if (!orderNumber || !email) return res.status(400).json({ error: 'Paramètres manquants' });

    const order = await Order.findOne({
      orderNumber,
      'customer.email': { $regex: new RegExp(`^${email}$`, 'i') },
    });
    if (!order) return res.status(404).json({ error: 'Commande introuvable. Vérifiez le numéro et l\'email.' });

    res.json({
      orderNumber: order.orderNumber,
      status: order.status,
      createdAt: order.createdAt,
      items: order.items,
      totalTND: order.totalTND,
      deliveryFeeTND: order.deliveryFeeTND,
      grandTotalTND: order.grandTotalTND,
      customer: {
        fullName: order.customer.fullName,
        city: order.customer.city,
      },
    });
  } catch (err) { next(err); }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { next(err); }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId', 'name image');
    if (!order) return res.status(404).json({ error: 'Commande introuvable' });
    res.json(order);
  } catch (err) { next(err); }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: 'Commande introuvable' });
    res.json(order);
  } catch (err) { next(err); }
};
