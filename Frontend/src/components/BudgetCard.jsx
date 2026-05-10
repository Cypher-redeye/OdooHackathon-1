function BudgetCard({ title, amount }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="text-3xl font-bold text-sky-500 mt-2">
        ₹{amount}
      </p>
    </div>
  );
}

export default BudgetCard;