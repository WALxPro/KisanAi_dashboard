import React from "react";
import { Plus } from "lucide-react";
import Button from "./Button";

const DashboardText = ({ text, para, openAdd }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{text}</h1>
        <p className="text-muted-foreground">{para}</p>
      </div>

      {/* Render button only if openAdd is provided */}
      {openAdd && (
        <Button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5"
        >
          <Plus className="h-4 w-4" /> Add New 
        </Button>
      )}
    </div>
  );
};

export default DashboardText;