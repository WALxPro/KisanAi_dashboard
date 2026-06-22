import { Calendar, Cloudy, Droplets, Mail, MapPin, Phone, Shield, ShieldOff, User, X } from "lucide-react";
import Button from "../Button";

const FarmerModal = ({ open, onClose, farmer }) => {
    if (!open || !farmer) return null;

    return (
        <>
            <div className="fixed top-0 left-0 z-50 w-full h-screen bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 animate-scale-in overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                <div className="relative h-32 gradient-primary">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 60%)" }} />
                    <button onClick={onClose} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 transition-colors backdrop-blur-sm cursor-pointer"><X className="h-4 w-4" /></button>

                </div>
                <div className="relative px-6 pb-6">
                    <div className="-mt-14 mb-4 flex items-end gap-4">
                        <div className="flex h-[88px] w-[88px] items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground shadow-lg ring-4 ring-card">

                            {farmer.profilePicture ? (
                                <img
                                    src={farmer.profilePicture}
                                    alt="Profile"
                                    className="h-full w-full object-cover rounded-xl"
                                />
                            ) : (
                                <User className="h-4 w-4 text-primary-foreground" />
                            )}

                        </div>
                        <div className="pb-1">
                            <h2 className="text-xl font-bold text-foreground">{farmer.fullname}</h2>
                            <p className="text-sm text-muted-foreground">{farmer.cropDetail?.cropName}</p>
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/30 p-3.5 transition-colors hover:bg-secondary/50">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-info/10"><Mail className="h-4 w-4 text-info" /></div>
                            <div><p className="text-[11px] uppercase tracking-wider text-muted-foreground">Email</p><p className="text-sm font-medium text-foreground">{farmer.email}</p></div>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/30 p-3.5 transition-colors hover:bg-secondary/50">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10"><Phone className="h-4 w-4 text-success" /></div>
                            <div><p className="text-[11px] uppercase tracking-wider text-muted-foreground">Phone</p><p className="text-sm font-medium text-foreground">{farmer.phone}</p></div>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/30 p-3.5 transition-colors hover:bg-secondary/50">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10"><MapPin className="h-4 w-4 text-warning" /></div>
                            <div><p className="text-[11px] uppercase tracking-wider text-muted-foreground">Location</p><p className="text-sm font-medium text-foreground">{farmer.city}</p></div>
                        </div>

                        
                        <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/30 p-3.5 transition-colors hover:bg-secondary/50">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><Calendar className="h-4 w-4 text-primary" /></div>
                            <div><p className="text-[11px] uppercase tracking-wider text-muted-foreground">Joined</p><p className="text-sm font-medium text-foreground">{new Date(farmer.createdAt).toLocaleDateString()}</p></div>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={() => askConfirmBlock(farmer)}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all cursor-pointer ${farmer.isBlocked
                                ? "bg-success/10 text-success hover:bg-success hover:text-success-foreground"
                                : "bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                }`}
                        >
                            {farmer.isBlocked ? (
                                <>
                                    <Shield className="h-4 w-4" />
                                    Unblock Farmer
                                </>
                            ) : (
                                <>
                                    <ShieldOff className="h-4 w-4" />
                                    Block Farmer
                                </>
                            )}
                        </button>
                        <Button variant="outline" onClick={onClose} className="flex-1">Close</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FarmerModal;