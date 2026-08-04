function CategoriesTable({
  categories,
}) {
  return (
    <table className="min-w-full">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-6 py-4 text-left">
            Category
          </th>

          <th className="px-6 py-4 text-left">
            Status
          </th>
        </tr>
      </thead>

      <tbody>
        {categories.map((category) => (
          <tr
            key={category.id}
            className="border-t"
          >
            <td className="px-6 py-4">
              {category.name}
            </td>

            <td className="px-6 py-4">
              {category.isActive ? (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Active
                </span>
              ) : (
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                  Inactive
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CategoriesTable;