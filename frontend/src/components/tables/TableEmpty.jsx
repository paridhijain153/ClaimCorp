import EmptyState from "../common/EmptyState";

function TableEmpty({
  title,
  description,
}) {
  return (
    <tr>

      <td colSpan={100}>

        <EmptyState
          title={title}
          description={description}
        />

      </td>

    </tr>
  );
}

export default TableEmpty;