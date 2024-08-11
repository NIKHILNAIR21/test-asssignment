import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Celebrity {
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

interface CelebrityContextProps {
  celebrities: Celebrity[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleDelete: (id: number) => void;
  editingCelebrity: Celebrity | null;
  setEditingCelebrity: (celebrity: Celebrity | null) => void;
}

const CelebrityContext = createContext<CelebrityContextProps | undefined>(undefined);

export const CelebrityProvider = ({ children }: { children: ReactNode }) => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingCelebrity, setEditingCelebrity] = useState<Celebrity | null>(null);

  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        const response = await fetch('/celebrities.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCelebrities(data);
      } catch (error) {
        console.error('Error fetching celebrities:', error);
      }
    };
    fetchCelebrities();
  }, []);

  const handleDelete = (id: number) => {
    setCelebrities(celebrities.filter(celebrity => celebrity.id !== id));
  };

  const value = {
    celebrities,
    searchQuery,
    setSearchQuery,
    handleDelete,
    editingCelebrity,
    setEditingCelebrity,
  };

  return (
    <CelebrityContext.Provider value={value}>
      {children}
    </CelebrityContext.Provider>
  );
};

export const useCelebrityContext = () => {
  const context = useContext(CelebrityContext);
  if (!context) {
    throw new Error('useCelebrityContext must be used within a CelebrityProvider');
  }
  return context;
};
