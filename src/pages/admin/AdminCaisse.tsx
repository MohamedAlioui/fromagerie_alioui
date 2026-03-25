import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, X, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Wallet, CheckCircle2, Circle } from 'lucide-react';
import {
  getSales, createSale, deleteSale, toggleSalePaid,
  getExpenses, createExpense, deleteExpense,
  type Sale, type Expense,
} from '@/api/sales';

const QUICK_PRODUCTS = ['Gouta', 'Mozzarella', 'Ricotta', 'Sicilien Blanc'];

const today = () => new Date().toISOString().split('T')[0];

const fmtDate = (d: string) =>
  new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

// --- Sale form modal ---
interface SaleFormItem { productName: string; qty: string; price: string }

const SaleModal = ({ date, onClose }: { date: string; onClose: () => void }) => {
  const qc = useQueryClient();
  const [client, setClient] = useState('');
  const [items, setItems] = useState<SaleFormItem[]>([{ productName: '', qty: '1', price: '' }]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [customTotal, setCustomTotal] = useState('');
  const [editTotal, setEditTotal] = useState(false);

  const autoTotal = items.reduce((s, i) => s + (Number(i.qty) || 0) * (Number(i.price) || 0), 0);
  const finalTotal = editTotal && customTotal !== '' ? Number(customTotal) : autoTotal;

  const mutation = useMutation({
    mutationFn: () => createSale({
      date,
      clientName: client.trim(),
      notes,
      items: items.map(i => ({ productName: i.productName, qty: Number(i.qty), price: Number(i.price) })),
      customTotal: editTotal && customTotal !== '' ? Number(customTotal) : undefined,
    }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['sales', date] }); onClose(); },
    onError: (e: Error) => setError(e.message),
  });

  const addRow = (name = '') => setItems(p => [...p, { productName: name, qty: '1', price: '' }]);
  const removeRow = (i: number) => setItems(p => p.filter((_, idx) => idx !== i));
  const setRow = (i: number, key: keyof SaleFormItem, val: string) =>
    setItems(p => p.map((r, idx) => idx === i ? { ...r, [key]: val } : r));

  const handleSave = () => {
    if (!client.trim()) return setError('Nom du client requis');
    if (items.some(i => !i.productName || !i.price)) return setError('Remplissez tous les produits');
    mutation.mutate();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col gap-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Nouvelle vente</h2>
          <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Nom du client</label>
          <input
            value={client}
            onChange={e => setClient(e.target.value)}
            placeholder="ex: Mohamed, Famille Ben Ali..."
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">Produits</label>
            <div className="flex gap-1 flex-wrap justify-end">
              {QUICK_PRODUCTS.map(p => (
                <button key={p} onClick={() => addRow(p)}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                  + {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-12 gap-1 text-[10px] font-bold text-gray-400 uppercase px-1">
              <span className="col-span-5">Produit</span>
              <span className="col-span-2 text-center">Qté</span>
              <span className="col-span-3 text-center">Prix/u (TND)</span>
              <span className="col-span-2" />
            </div>
            {items.map((row, i) => (
              <div key={i} className="grid grid-cols-12 gap-1 items-center">
                <input
                  value={row.productName}
                  onChange={e => setRow(i, 'productName', e.target.value)}
                  placeholder="Produit"
                  className="col-span-5 px-2 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  value={row.qty}
                  onChange={e => setRow(i, 'qty', e.target.value)}
                  type="number" min="1"
                  className="col-span-2 px-2 py-2 rounded-lg border border-gray-200 text-sm text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  value={row.price}
                  onChange={e => setRow(i, 'price', e.target.value)}
                  type="number" min="0" step="0.5" placeholder="0.00"
                  className="col-span-3 px-2 py-2 rounded-lg border border-gray-200 text-sm text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button onClick={() => removeRow(i)} disabled={items.length === 1}
                  className="col-span-2 flex justify-center p-1 text-red-400 hover:text-red-600 disabled:opacity-20 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => addRow()}
            className="mt-2 text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1">
            <Plus size={13} /> Ajouter un produit
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Notes (optionnel)</label>
          <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="..."
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none" />
        </div>

        <div className={`flex flex-col gap-2 py-3 px-4 rounded-xl border ${editTotal ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100'}`}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-700">Total</span>
            <div className="flex items-center gap-3">
              {!editTotal && (
                <span className="font-bold text-xl" style={{ color: '#1B3A2D' }}>{autoTotal.toFixed(2)} TND</span>
              )}
              <button
                type="button"
                onClick={() => { setEditTotal(v => !v); setCustomTotal(autoTotal.toFixed(2)); }}
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                  editTotal
                    ? 'bg-amber-200 text-amber-800 hover:bg-amber-300'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {editTotal ? 'Auto' : 'Modifier'}
              </button>
            </div>
          </div>
          {editTotal && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                step="0.5"
                value={customTotal}
                onChange={e => setCustomTotal(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-amber-300 text-lg font-bold text-right focus:outline-none focus:ring-2 focus:ring-amber-400"
                style={{ color: '#1B3A2D' }}
                autoFocus
              />
              <span className="font-semibold text-gray-500 text-sm">TND</span>
            </div>
          )}
          {editTotal && autoTotal > 0 && Number(customTotal) !== autoTotal && (
            <p className="text-[11px] text-amber-700">
              Calculé automatiquement : {autoTotal.toFixed(2)} TND
            </p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">
            Annuler
          </button>
          <button onClick={handleSave} disabled={mutation.isPending}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-60"
            style={{ background: '#1B3A2D' }}>
            {mutation.isPending ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Expense inline form ---
const ExpenseForm = ({ date, onClose }: { date: string; onClose: () => void }) => {
  const qc = useQueryClient();
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const mutation = useMutation({
    mutationFn: () => createExpense({ date, label: label.trim(), amount: Number(amount) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['expenses', date] }); onClose(); },
  });
  return (
    <tr className="bg-orange-50">
      <td className="px-4 py-2">
        <input value={label} onChange={e => setLabel(e.target.value)}
          placeholder="ex: Emballages, Lait, Transport..."
          className="w-full px-2 py-1.5 rounded-lg border border-orange-200 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400" />
      </td>
      <td className="px-4 py-2">
        <input value={amount} onChange={e => setAmount(e.target.value)}
          type="number" min="0" step="0.5" placeholder="0.00"
          className="w-28 px-2 py-1.5 rounded-lg border border-orange-200 text-sm text-right focus:outline-none focus:ring-1 focus:ring-orange-400" />
        <span className="ml-1 text-xs text-gray-500">TND</span>
      </td>
      <td className="px-4 py-2">
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600 font-semibold">Annuler</button>
          <button
            onClick={() => { if (label && amount) mutation.mutate(); }}
            disabled={!label || !amount || mutation.isPending}
            className="text-xs font-bold px-3 py-1 rounded-lg text-white disabled:opacity-50"
            style={{ background: '#b45309' }}>
            Ajouter
          </button>
        </div>
      </td>
    </tr>
  );
};

// --- Main page ---
const AdminCaisse = () => {
  const qc = useQueryClient();
  const [date, setDate] = useState(today());
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const { data: sales = [] } = useQuery({ queryKey: ['sales', date], queryFn: () => getSales(date) });
  const { data: expenses = [] } = useQuery({ queryKey: ['expenses', date], queryFn: () => getExpenses(date) });

  const delSale = useMutation({
    mutationFn: deleteSale,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sales', date] }),
  });

  const togglePaid = useMutation({
    mutationFn: toggleSalePaid,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sales', date] }),
  });
  const delExpense = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['expenses', date] }),
  });

  const shiftDate = (days: number) => {
    const d = new Date(date + 'T12:00:00');
    d.setDate(d.getDate() + days);
    setDate(d.toISOString().split('T')[0]);
  };

  const totalVentes = sales.reduce((s, v) => s + v.total, 0);
  const totalDepenses = expenses.reduce((s, e) => s + e.amount, 0);
  const benefice = totalVentes - totalDepenses;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Caisse du Jour</h1>
          <p className="text-sm text-gray-500 mt-0.5">Suivi des ventes et dépenses quotidiennes</p>
        </div>

        {/* Date picker */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
          <button onClick={() => shiftDate(-1)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <ChevronLeft size={16} className="text-gray-500" />
          </button>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="text-sm font-semibold text-gray-700 border-none outline-none bg-transparent cursor-pointer"
          />
          <button onClick={() => shiftDate(1)} disabled={date === today()} className="p-1 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30">
            <ChevronRight size={16} className="text-gray-500" />
          </button>
          {date !== today() && (
            <button onClick={() => setDate(today())}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 ml-1">
              Aujourd'hui
            </button>
          )}
        </div>
      </div>

      <p className="text-sm font-semibold text-gray-500 capitalize -mt-4">{fmtDate(date)}</p>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <TrendingUp size={20} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Ventes</p>
            <p className="text-xl font-bold text-gray-800">{totalVentes.toFixed(2)} <span className="text-sm font-semibold text-gray-400">TND</span></p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
            <TrendingDown size={20} className="text-orange-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Dépenses</p>
            <p className="text-xl font-bold text-gray-800">{totalDepenses.toFixed(2)} <span className="text-sm font-semibold text-gray-400">TND</span></p>
          </div>
        </div>
        <div className={`flex items-center gap-4 p-4 rounded-2xl border shadow-sm ${
          benefice >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
        }`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            benefice >= 0 ? 'bg-emerald-100' : 'bg-red-100'
          }`}>
            <Wallet size={20} className={benefice >= 0 ? 'text-emerald-700' : 'text-red-600'} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Bénéfice net</p>
            <p className={`text-xl font-bold ${benefice >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
              {benefice >= 0 ? '+' : ''}{benefice.toFixed(2)} <span className="text-sm font-semibold">TND</span>
            </p>
          </div>
        </div>
      </div>

      {/* Sales table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">Ventes ({sales.length})</h2>
          <button onClick={() => setShowSaleModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
            style={{ background: '#1B3A2D' }}>
            <Plus size={15} /> Nouvelle vente
          </button>
        </div>

        {sales.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">Aucune vente enregistrée pour cette journée</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-center px-4 py-3 font-semibold text-gray-500">Payé</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">Client</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">Produits</th>
                  <th className="text-right px-5 py-3 font-semibold text-gray-500">Total</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {sales.map((sale: Sale) => (
                  <tr key={sale._id} className={`border-b border-gray-50 transition-colors ${sale.paid ? 'bg-emerald-50/40' : 'hover:bg-gray-50/50'}`}>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => togglePaid.mutate(sale._id)}
                        title={sale.paid ? 'Marquer non payé' : 'Marquer payé'}
                        className="transition-colors"
                      >
                        {sale.paid
                          ? <CheckCircle2 size={20} className="text-emerald-600" />
                          : <Circle size={20} className="text-gray-300 hover:text-emerald-400" />}
                      </button>
                    </td>
                    <td className="px-5 py-3 font-semibold text-gray-800">
                      <span className={sale.paid ? 'line-through text-gray-400' : ''}>{sale.clientName}</span>
                      {sale.paid && <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Payé</span>}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-col gap-0.5">
                        {sale.items.map((it, i) => (
                          <span key={i} className="text-xs text-gray-600">
                            {it.productName} × {it.qty} <span className="text-gray-400">@ {it.price.toFixed(2)} TND</span>
                            <span className="font-semibold text-gray-700 ml-1">= {it.subtotal.toFixed(2)} TND</span>
                          </span>
                        ))}
                        {sale.notes && <span className="text-[10px] text-gray-400 italic mt-0.5">{sale.notes}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right font-bold text-gray-800">{sale.total.toFixed(2)} TND</td>
                    <td className="px-5 py-3">
                      <button onClick={() => { if (confirm('Supprimer cette vente ?')) delSale.mutate(sale._id); }}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 border-t-2 border-gray-200">
                  <td colSpan={3} className="px-5 py-3 font-bold text-gray-700">
                    Total ventes
                    <span className="ml-3 text-xs font-normal text-gray-400">
                      ({sales.filter(s => s.paid).length}/{sales.length} payés)
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-bold text-lg" style={{ color: '#1B3A2D' }}>
                    {totalVentes.toFixed(2)} TND
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Expenses table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">Dépenses ({expenses.length})</h2>
          <button onClick={() => setShowExpenseForm(v => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white"
            style={{ background: '#b45309' }}>
            <Plus size={15} /> Nouvelle dépense
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-semibold text-gray-500">Libellé</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-500">Montant</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {showExpenseForm && (
                <ExpenseForm date={date} onClose={() => setShowExpenseForm(false)} />
              )}
              {expenses.length === 0 && !showExpenseForm ? (
                <tr><td colSpan={3} className="py-8 text-center text-gray-400 text-sm">Aucune dépense pour cette journée</td></tr>
              ) : (
                expenses.map((exp: Expense) => (
                  <tr key={exp._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3 text-gray-800">{exp.label}</td>
                    <td className="px-5 py-3 text-right font-semibold text-orange-700">{exp.amount.toFixed(2)} TND</td>
                    <td className="px-5 py-3">
                      <button onClick={() => { if (confirm('Supprimer cette dépense ?')) delExpense.mutate(exp._id); }}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {expenses.length > 0 && (
              <tfoot>
                <tr className="bg-orange-50 border-t-2 border-orange-200">
                  <td className="px-5 py-3 font-bold text-gray-700">Total dépenses</td>
                  <td className="px-5 py-3 text-right font-bold text-lg text-orange-700">
                    {totalDepenses.toFixed(2)} TND
                  </td>
                  <td />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* Sale modal */}
      {showSaleModal && <SaleModal date={date} onClose={() => setShowSaleModal(false)} />}
    </div>
  );
};

export default AdminCaisse;
