import { AlertTriangle, Trash2, X } from "lucide-react";
import Button from "./Button";


const variantStyles = {
  danger: {
    icon: "bg-destructive/10 text-destructive",
    button: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
  },
  warning: {
    icon: "bg-warning/10 text-warning",
    button: "bg-warning hover:bg-warning/90 text-warning-foreground",
  },
  info: {
    icon: "bg-info/10 text-info",
    button: "bg-info hover:bg-info/90 text-info-foreground",
  },
};

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}) => {
  if (!open) return null;

  const styles = variantStyles[variant];

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed left-1/2 top-1/2 z-[60] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 animate-scale-in rounded-2xl border border-border bg-card p-6 shadow-2xl">
        
        <button
          onClick={onClose}
          className="cursor-pointer absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full ${styles.icon} mb-4`}
          >
            {variant === "danger" ? (
              <Trash2 className="h-6 w-6" />
            ) : (
              <AlertTriangle className="h-6 w-6" />
            )}
          </div>

          <h3 className="text-lg font-bold text-foreground mb-2">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {message}
          </p>

          <div className="flex w-full gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {cancelText}
            </Button>

            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`cursor-pointer flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:shadow-lg ${styles.button}`}
            >
              {confirmText}
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ConfirmModal;