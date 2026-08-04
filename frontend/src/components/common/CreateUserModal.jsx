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
      title="Create New User"
      description="Add a new employee or manager account to the organization directory."
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