import { categories } from '@/data/newsData';

interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onShowTables: () => void;
}

const CategoryNav = ({ activeCategory, onCategoryChange, onShowTables }: CategoryNavProps) => {
  return (
    <nav className="bg-card border-b border-border sticky top-[108px] z-40 overflow-x-auto hide-scrollbar">
      <ul className="flex gap-2 px-4 py-3 max-w-[1200px] mx-auto whitespace-nowrap">
        {categories.map((cat) => (
          <li key={cat.id} className="flex-shrink-0">
            <button
              onClick={() => onCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all border-2 ${
                activeCategory === cat.id
                  ? 'text-primary border-primary bg-primary/10'
                  : 'text-muted-foreground border-transparent hover:text-primary hover:border-primary hover:bg-primary/10'
              }`}
            >
              {cat.label}
            </button>
          </li>
        ))}
        <li className="flex-shrink-0">
          <button
            onClick={onShowTables}
            className="px-4 py-2 rounded-full font-semibold text-sm transition-all border-2 text-muted-foreground border-transparent hover:text-primary hover:border-primary hover:bg-primary/10"
          >
            📊 Tabelas
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default CategoryNav;
