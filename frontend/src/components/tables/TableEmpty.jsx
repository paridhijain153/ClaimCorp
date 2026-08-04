import EmptyState from "../common/EmptyState";

function TableEmpty({
  title,
  description,
}) {
  return (
    <tr>
      <td 
        colSpan={100} 
        className="px-6 py-16 align-middle text-center"
      >
        <EmptyState
          title={title}
          description={description}
        />
      </td>
    </tr>
  );
}

export default TableEmpty;