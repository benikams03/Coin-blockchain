export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm text-slate-600">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
