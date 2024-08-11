import { ChangeEvent, useEffect, useState } from "react";
import { useCelebrityContext, Celebrity } from "../context/CelebrityContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdOutlineModeEdit, MdOutlineCancel } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiCircleCheck } from "react-icons/ci";
import Modal from "./Modal";

type AccordionProps = {
  celebrityId: number;
  isActive: boolean;
  onAccordionToggle: () => void | boolean;
};

const Accordion = ({
  celebrityId,
  isActive,
  onAccordionToggle,
}: AccordionProps) => {
  const { celebrities, handleDelete, editingCelebrity, setEditingCelebrity } =
    useCelebrityContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Celebrity | null>(null); // Initialize with null
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIsEditing(false); // Reset editing mode when accordion is closed
    }
  }, [isActive]);

  useEffect(() => {
    const celebrity = celebrities.find((c) => c.id === celebrityId);
    if (celebrity) {
      setFormData(celebrity);
    }
  }, [celebrities, celebrityId]);

  useEffect(() => {
    if (editingCelebrity && editingCelebrity.id !== celebrityId) {
      setIsEditing(false); // Prevent editing if another accordion is being edited
    }
  }, [editingCelebrity, celebrityId]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (formData) {
      const { name, value } = e.target;

      // Only update the formData if the input name is 'country'
      if (name === "country") {
        // Filter out numeric values for the country field
        const filteredValue = value.replace(/[0-9]/g, "");
        setFormData({ ...formData, [name]: filteredValue });
      } else {
        setFormData({ ...formData, [name]: value });
      }

      setIsDirty(true);
    }
  };

  const handleSave = () => {
    if (!formData?.country || !formData.description.trim()) {
      alert("Country and description are required.");
      return;
    }

    // Simulate saving logic (e.g., calling an API or updating state)
    console.log("Saved data:", formData);
    setEditingCelebrity(null); // Reset editing state
    // setIsEditing(false);
    setIsDirty(false);
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age;
  };

  const age = formData ? calculateAge(formData.dob) : 0;

  const handledelete = () => {
    if (formData) {
      handleDelete(formData.id); // Call the delete handler from context
      setIsModalVisible(false); // Hide the modal after deletion
    }
  };

  if (!formData) return null;

  const toggleAccordion = () => {
    if (
      !isEditing &&
      (!editingCelebrity || editingCelebrity.id !== celebrityId)
    )
      return;
    onAccordionToggle();
  };
  return (
    <div className="w-[50%] border-2 mx-auto my-7 rounded-lg">
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center w-full p-2.5"
      >
        <div className="flex items-center gap-4">
          <img
            className="w-12 rounded-full"
            src={formData.picture}
            alt={`${formData.first} ${formData.last}`}
          />
          <p>
            {formData.first} {formData.last}
          </p>
        </div>
        <span>{isActive ? <FaChevronUp /> : <FaChevronDown />}</span>
      </button>
      {isActive && (
        <div className="p-4 transition-all duration-300 ease-out">
          <div className="flex justify-evenly gap-8">
            <div className="mb-4">
              <label>Age</label>
              {isEditing ? (
                <input
                  type="number"
                  value={age}
                  name="age"
                  disabled={true}
                  className="w-full p-2 border rounded text-center"
                />
              ) : (
                <p className="w-20 p-2 text-center">{age}</p>
              )}
            </div>
            <div className="mb-4">
              <label>Gender</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-center"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Rather not say">Rather not say</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="w-full p-2">{formData.gender}</p>
              )}
            </div>
            <div className="mb-4">
              <label>Country</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.country}
                  name="country"
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-center"
                />
              ) : (
                <p className="w-full p-2">{formData.country}</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-left">Description</p>
            {isEditing ? (
              <textarea
                value={formData.description}
                name="description"
                onChange={handleInputChange}
                draggable={false}
                className="w-full p-1 text-justify mb-1 h-36 border rounded no-scrollbar"
              ></textarea>
            ) : (
              <p className="text-justify p-1 mb-1">{formData.description}</p>
            )}
          </div>

          <div className="buttons flex space-x-2 justify-end">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 text-red-300 rounded"
                >
                  <MdOutlineCancel />
                </button>
                <button
                  onClick={handleSave}
                  disabled={!isDirty}
                  className={
                    isDirty
                      ? "p-2 text-green-700 bg-green-100  rounded"
                      : "p-2 text-green-400 rounded"
                  }
                >
                  <CiCircleCheck />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsModalVisible(true)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  <RiDeleteBinLine />
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  disabled={age < 18}
                  className="p-2 bg-sky-500 text-white rounded"
                >
                  <MdOutlineModeEdit />
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <Modal
        isVisible={isModalVisible}
        onConfirm={handledelete}
        onCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default Accordion;
