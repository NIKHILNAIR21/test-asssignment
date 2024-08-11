import { useState } from "react";
import CelebrityItem from "./CelebrityItem";
import { useCelebrityContext } from "../context/CelebrityContext";

export interface celebritiesobj {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}

const CelebrityList = () => {
  const { celebrities, searchQuery ,editingCelebrity} = useCelebrityContext();
  const [isAnyEditing, setIsAnyEditing] = useState<boolean>(false);

  const normalizedSearchQuery = searchQuery.toLowerCase();

  const filteredCelebrities = celebrities.filter((celebrity) => {
    const fullName = `${celebrity.first} ${celebrity.last}`.toLowerCase();
    return fullName.includes(normalizedSearchQuery);
  });

  const [activeAccordionId, setActiveAccordionId] = useState<number | null>(
    null
  );

  const handleAccordionToggle = (id: number) => {
    if (editingCelebrity) return; // Prevent opening another accordion while editing
    setActiveAccordionId(activeAccordionId === id ? null : id);
  };

  return (
    <ul>
      {filteredCelebrities.map((celebrity) => (
        <CelebrityItem
          key={celebrity.id}
          celebrityId={celebrity.id}
          isActive={activeAccordionId === celebrity.id}
          onAccordionToggle={() => handleAccordionToggle(celebrity.id)}
      
        />
      ))}
    </ul>
  );
};

export default CelebrityList;
