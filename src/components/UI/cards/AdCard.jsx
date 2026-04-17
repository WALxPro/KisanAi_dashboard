import { Pencil, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";

const AdCard = ({ ads, openEdit, setDeleteConfirm }) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {ads.map((ad) => (
        <div
          key={ad._id}
          className="group rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-secondary to-muted">
            <img
              src={ad.image} // direct string
              alt={ad.title || "Ad Preview"}
              className="h-full w-full object-cover  "
            />

            <span
              className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
                ad.status === "Active"
                  ? "bg-success/20 text-success"
                  : "bg-muted/80 text-muted-foreground"
              }`}
            >
              {ad.status === "Active" ? (
                <ToggleRight className="h-3.5 w-3.5" />
              ) : (
                <ToggleLeft className="h-3.5 w-3.5" />
              )}
              {ad.status}
            </span>
          </div>

          <div className="p-5 space-y-3">
            <h3 className="font-bold text-foreground">{ad.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {ad.description}
            </p>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">
                {new Date(ad.created_at).toLocaleDateString()}
              </span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(ad)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-info/10 hover:text-info cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    setDeleteConfirm({ open: true, id: ad._id })
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdCard;