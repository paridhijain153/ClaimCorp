import Modal from "../ui/Modal";
import CategoryForm from "../forms/CategoryForm";

function CreateCategoryModal({
  isOpen,
  onClose,
  onCreateCategory,
}) {
  return (
    <Modal
      isOpen={isOpen}
      title="Create Expense Category"
      description="Add a new category classification to organize and track employee reimbursement claims."
      onClose={onClose}
    >
      <CategoryForm
        onSubmit={onCreateCategory}
      />
    </Modal>
  );
}

export default CreateCategoryModal;