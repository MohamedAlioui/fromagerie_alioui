import Sale from '../models/Sale.js';
import Expense from '../models/Expense.js';

// --- Sales ---

export const getSales = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'date requis (YYYY-MM-DD)' });
    const sales = await Sale.find({ date }).sort({ createdAt: -1 });
    res.json(sales);
  } catch (err) { next(err); }
};

export const createSale = async (req, res, next) => {
  try {
    const { date, clientName, items, notes, customTotal } = req.body;
    if (!date || !clientName || !items?.length) {
      return res.status(400).json({ error: 'date, clientName et items requis' });
    }
    const builtItems = items.map(i => ({
      productName: i.productName,
      qty: Number(i.qty),
      price: Number(i.price),
      subtotal: Number(i.qty) * Number(i.price),
    }));
    const autoTotal = builtItems.reduce((s, i) => s + i.subtotal, 0);
    const total = (customTotal != null && !isNaN(Number(customTotal))) ? Number(customTotal) : autoTotal;
    const sale = await Sale.create({ date, clientName, items: builtItems, total, notes: notes || '' });
    res.status(201).json(sale);
  } catch (err) { next(err); }
};

export const deleteSale = async (req, res, next) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) return res.status(404).json({ error: 'Vente introuvable' });
    res.json({ success: true });
  } catch (err) { next(err); }
};

export const toggleSalePaid = async (req, res, next) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).json({ error: 'Vente introuvable' });
    sale.paid = !sale.paid;
    await sale.save();
    res.json(sale);
  } catch (err) { next(err); }
};

// --- Expenses ---

export const getExpenses = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'date requis' });
    const expenses = await Expense.find({ date }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) { next(err); }
};

export const createExpense = async (req, res, next) => {
  try {
    const { date, label, amount } = req.body;
    if (!date || !label || amount == null) {
      return res.status(400).json({ error: 'date, label et amount requis' });
    }
    const expense = await Expense.create({ date, label, amount: Number(amount) });
    res.status(201).json(expense);
  } catch (err) { next(err); }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Dépense introuvable' });
    res.json({ success: true });
  } catch (err) { next(err); }
};
