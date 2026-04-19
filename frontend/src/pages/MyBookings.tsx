import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Booking } from "../types";

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "COMPLETED": return "bg-emerald-500/15 text-emerald-400";
      case "PENDING": return "bg-amber-500/15 text-amber-400";
      case "ACTIVE": return "bg-blue-500/15 text-blue-400";
      case "CANCELLED": return "bg-red-500/15 text-red-400";
      default: return "bg-slate-500/15 text-slate-400";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>
        <p className="text-slate-600 mt-1">Track all your rental history</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-[3px] border-violet-100 border-t-violet-600 rounded-full animate-spin" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-xl">No bookings yet</p>
          <p className="text-sm mt-2">Browse vehicles and make your first booking!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col md:flex-row md:items-center gap-4 shadow-sm">
              {/* Vehicle Image */}
              <div className="w-full md:w-40 h-28 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={b.vehicle?.imageUrl || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400"}
                  alt={`${b.vehicle?.make} ${b.vehicle?.model}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-lg text-slate-900">
                  {b.vehicle?.make} {b.vehicle?.model}
                </h3>
                <p className="text-sm text-slate-600">
                  {new Date(b.pickupDate).toLocaleDateString()} → {new Date(b.dropoffDate).toLocaleDateString()}
                </p>
              </div>

              {/* Amount & Status */}
              <div className="flex items-center gap-4">
                <p className="text-xl font-bold text-violet-600">${b.totalAmount}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor(b.status)}`}>
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
