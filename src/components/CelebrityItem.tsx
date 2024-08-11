import Accordion from "./Accordion";
import { useCelebrityContext } from "../context/CelebrityContext";

type Props = {
  celebrityId: number;
  isActive: boolean;
  onAccordionToggle: () => void;

};

const CelebrityItem = ({ celebrityId, isActive, onAccordionToggle }: Props) => {
  const { celebrities } = useCelebrityContext();

  const celebrity = celebrities.find((c) => c.id === celebrityId);
  
  if (!celebrity) return null;
  return (
    <div>
      {" "}
      <Accordion
        celebrityId={celebrityId}
        isActive={isActive}
        onAccordionToggle={onAccordionToggle}

      />
    </div>
  );
};

export default CelebrityItem;
