interface MCQCardProps {
  hData: MCQCard | null;
}
interface User {
  name: string;
  avatar: string;
}

interface Option {
  id: string;
  answer: string;
}

interface MCQCard {
  type: string;
  id: number;
  playlist: string;
  description: string;
  image: string;
  question: string;
  options: Option[];
  user: User;
}
