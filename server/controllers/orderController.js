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
    const { phone } = req.query;
    if (!phone) return res.status(400).json({ error: 'Numéro de téléphone requis' });

    const phoneClean = phone.replace(/\s/g, '');
    const orders = await Order.find({
      'customer.phone': { $regex: new RegExp(phoneClean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) },
    }).sort({ createdAt: -1 });

    if (!orders.length) return res.status(404).json({ error: 'Aucune commande trouvée pour ce numéro.' });

    res.json(orders.map(o => ({
      orderNumber: o.orderNumber,
      status: o.status,
      createdAt: o.createdAt,
      items: o.items,
      totalTND: o.totalTND,
      deliveryFeeTND: o.deliveryFeeTND,
      grandTotalTND: o.grandTotalTND,
      customer: {
        fullName: o.customer.fullName,
        city: o.customer.city,
        address: o.customer.address,
        phone: o.customer.phone,
      },
    })));
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
