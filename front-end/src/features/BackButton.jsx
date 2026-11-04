import { ChevronLeft } from 'lucide-react';

function BackButton({ setPage, to }) {
  return (
    <button
      type="button"
      className="back-button"
      aria-label="Go back"
      onClick={() => setPage(to)}
    >
      <ChevronLeft size={24} />
    </button>
  );
}

export default BackButton;
