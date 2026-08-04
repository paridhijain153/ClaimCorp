import Modal from "../ui/Modal";
import UserForm from "../forms/UserForm";

function CreateUserModal({
  isOpen,
  onClose,
  onCreateUser,
  managers,
}) {
  return (
    <Modal
      isOpen={isOpen}
      title="Create User"
      onClose={onClose}
    >
      <UserForm
        onSubmit={onCreateUser}
        managers={managers}
      />
    </Modal>
  );
}

export default CreateUserModal;