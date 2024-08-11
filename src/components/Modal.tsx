import { RxCross2 } from "react-icons/rx";
type ModalProps = {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const Modal = ({ isVisible, onConfirm, onCancel }: ModalProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-96 relative">
        <button
          onClick={onCancel}
          className="p-2  absolute right-3 top-3 rounded"
        >
          <RxCross2 />
        </button>

        <p className="mb- text-left">Are you sure you want to delete ?</p>
        <div className="flex justify-end gap-2 ">
          <button onClick={onCancel} className="p-2 border rounded">
            cancel
          </button>
          <button
            onClick={onConfirm}
            className="p-2 bg-orange-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
