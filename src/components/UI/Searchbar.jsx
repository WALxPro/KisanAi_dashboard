import React from "react";
import { Search, LayoutGrid, List } from "lucide-react";
import Input from "./Input";

const Searchbar = ({
  searchValue,
  onSearchChange,
  activeTab,
  onTabChange,
  ads = [],
  
}) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Search input */}
      <div className="relative max-w-sm flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 border border-input"
        />
      </div>

      

      {/* Tab switcher */}
      {onTabChange && (
        <div className="ml-auto flex items-center rounded-lg border border-border bg-secondary/30 p-1">
          <button
            onClick={() => onTabChange("cards")}
            className={`cursor-pointer flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "cards"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="h-4 w-4" /> Cards
          </button>
          <button
            onClick={() => onTabChange("table")}
            className={`cursor-pointer flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTab === "table"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="h-4 w-4" /> Table
          </button>
        </div>
      )}
    </div>
  );
};

export default Searchbar;