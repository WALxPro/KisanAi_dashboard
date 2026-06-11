import {
  Bell,
  ChevronDown,
  LogOut,
  User,
  Menu,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../store/slices/authSlice";



const Topbar = ({
  setMobileOpen,
  profileOpen,
  setProfileOpen,
  handleNav,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { logoutUser } = useAuth();


  const logOut = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      handleNav("/");
      setProfileOpen(false);
    } catch (e) {
      console.log(e, "Logout Error");
    }
  };

  return (
    <header className="relative z-[9] flex h-[72px] items-center justify-between border-b border-border bg-card/80 backdrop-blur-xl px-4 lg:px-6">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="text-muted-foreground lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">

        

        {/* PROFILE */}
        <div className="relative inline-block">

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-secondary transition-all"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden">
              {user?.profile_picture ? (
                <img
                  src={user.profile_picture}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-4 w-4" />
              )}
            </div>

            <div className="hidden md:block text-left cursor-pointer">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-muted-foreground">
                Administrator
              </p>
            </div>

            <ChevronDown className="hidden md:block h-4 w-4" />
          </button>

          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-[9998] cursor-pointer"
                onClick={() => setProfileOpen(false)}
              />

              <div className="absolute right-0 top-14 z-[10000] w-56 rounded-xl border-border bg-card shadow-xl p-2">

                <div className="p-3 border-b border-border">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email}
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleNav("/dashboard/settings");
                    setProfileOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-secondary rounded-lg"
                >
                  <User className="inline h-4 w-4 mr-2" />
                  Profile Settings
                </button>

                <button
                  onClick={logOut}
                  className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-500 rounded-lg"
                >
                  <LogOut className="inline h-4 w-4 mr-2" />
                  Logout
                </button>

              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

export default Topbar;


