import Product from '../models/Product.js';

export const getAll = async (_req, res, next) => {
  try {
    const products = await Product.find({ isAvailable: true }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) { next(err); }
};

export const getAllAdmin = async (_req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) { next(err); }
};

export const getBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isAvailable: true });
    if (!product) return res.status(404).json({ error: 'Produit introuvable' });
    res.json(product);
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (typeof data.tags === 'string') data.tags = data.tags.split(',').map(t => t.trim()).filter(Boolean);
    if (typeof data.weightOptions === 'string') data.weightOptions = JSON.parse(data.weightOptions);
    if (req.file) data.image = req.file.filename;
    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (typeof data.tags === 'string') data.tags = data.tags.split(',').map(t => t.trim()).filter(Boolean);
    if (typeof data.weightOptions === 'string') data.weightOptions = JSON.parse(data.weightOptions);
    if (req.file) data.image = req.file.filename;
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ error: 'Produit introuvable' });
    res.json(product);
  } catch (err) { next(err); }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isAvailable: false });
    res.json({ message: 'Produit désactivé' });
  } catch (err) { next(err); }
};

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier fourni' });
    const product = await Product.findByIdAndUpdate(req.params.id, { image: req.file.filename }, { new: true });
    res.json(product);
  } catch (err) { next(err); }
};
