import { BookOpen } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 group">
      <div className="bg-bookNavy p-1.5 rounded-lg text-paper">
        <BookOpen size={24} />
      </div>
      <span className="font-fraunses text-2xl font-bold text-bookNavy tracking-tight">
        BookWorm
      </span>
    </div>
  );
};

export default Logo;
