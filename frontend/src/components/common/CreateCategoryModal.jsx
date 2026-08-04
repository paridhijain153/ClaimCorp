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
      title="Create Category"
      onClose={onClose}
    >
      <CategoryForm
        onSubmit={onCreateCategory}
      />
    </Modal>
  );
}

export default CreateCategoryModal;