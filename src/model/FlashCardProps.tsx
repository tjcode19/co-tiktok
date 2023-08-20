interface FlashcardProps {
  fData: Flashcard | null;
}

interface User {
  name: string;
  avatar: string;
}

interface Flashcard {
  type: string;
  id: number;
  playlist: string;
  flashcard_front: string;
  flashcard_back: string;
  description: string;
  user: User;
}
