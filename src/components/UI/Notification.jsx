import { useEffect, useState } from "react";
import { get } from "../../api/apiClient";
import { useSelector } from "react-redux";
import { Check } from "lucide-react";
import { formatTime } from "../../services/time/moment";

const Notification = ({ setNotifOpen }) => {
  const user = useSelector((state) => state.auth.user);

  const [notifications, setNotifications] = useState([
    
  ]);
  const fetchNotifications = async () => {
  try {
    const res = await get(
      `notifications/${user._id}/admin`
    );

    setNotifications(res);
  } catch (e) {
    console.log("Notification error:", e);
  }
};
  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: !n.read } : n
      )
    );
  };

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };
  useEffect(() => {
  if (user?._id) {
    fetchNotifications();
  }
}, [user]);
console.log(notifications)
  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 z-[9998]"
        onClick={() => setNotifOpen(false)}
      />

      {/* DROPDOWN */}
      <div className="absolute right-0 top-12 z-[10000] w-120 rounded-xl border-border bg-card shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-border">
          <p className="text-sm font-bold text-foreground">Notifications</p>

          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs font-semibold text-primary"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* LIST */}
        <div className="max-h-72 overflow-auto">

          {notifications.map((noti) => (
            <button
              key={noti._id}
              onClick={() => toggleRead(noti._id)}
              className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${noti.read ? "bg-card" : "bg-primary/5"} hover:bg-secondary border-b border-border/50 last:border-0`}
            >  <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${noti.read ? "bg-muted" : "bg-primary"}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${noti.read ? "text-muted-foreground font-medium" : "text-foreground font-semibold"}`}>{noti.title}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{noti.message}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">{formatTime(noti.created_at)}</p>
              </div>
              {noti.read && <Check className="h-3.5 w-3.5 shrink-0 text-muted mt-1" />}
            </button>
          ))}
        </div>

        </div>
      
    </>
  );
};

export default Notification;