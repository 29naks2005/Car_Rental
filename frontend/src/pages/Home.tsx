import { useEffect, useState } from "react";
import api from "../api/axios";
import { Vehicle } from "../types";

const Home = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingModal, setBookingModal] = useState<Vehicle | null>(null);
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await api.get("/vehicles");
      setVehicles(res.data);
    } catch (err) {
      console.error("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async () => {
    if (!bookingModal || !pickupDate || !dropoffDate) return;

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    setBookingLoading(true);
    try {
      await api.post("/bookings", {
        vehicleId: bookingModal.id,
        pickupDate,
        dropoffDate,
      });
      setToast(`✅ ${bookingModal.make} ${bookingModal.model} booked successfully!`);
      setBookingModal(null);
      setPickupDate("");
      setDropoffDate("");
      fetchVehicles();
      setTimeout(() => setToast(""), 4000);
    } catch (err: any) {
      alert(err.response?.data?.error || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  // Calculate days and total for preview
  const getDays = () => {
    if (!pickupDate || !dropoffDate) return 0;
    const d = Math.ceil(
      (new Date(dropoffDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    return d > 0 ? d : 0;
  };

  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-12 md:py-20 mb-10">
        <div className="flex-1 space-y-6 text-center lg:text-left z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold tracking-wide mb-2">
            Elevate Your Journey
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Find Your <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              Perfect Ride
            </span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Browse our premium fleet and book instantly. Experience effortless luxury with transparent pricing and zero hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button
              onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
              className="px-8 py-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 font-bold shadow-xl hover:shadow-2xl hover:shadow-slate-900/20 transition-all"
            >
              Explore the Fleet
            </button>
            <button className="px-8 py-4 rounded-2xl bg-violet-50 text-violet-700 hover:bg-violet-100 font-bold transition-all border border-violet-100">
              How it works
            </button>
          </div>
        </div>
        
        <div className="flex-1 w-full relative">
          <div className="relative mx-auto max-w-xl">
            {/* Decorative background shape */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-200 to-indigo-200 rounded-[3rem] -rotate-3 transform scale-105 shadow-inner" />
            {/* Main Image */}
            <img 
              src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1200" 
              alt="Premium Sports Car" 
              className="relative rounded-[2.5rem] shadow-2xl object-cover aspect-[4/3] w-full border-4 border-white"
            />
            {/* Floating Glass Badge */}
            <div className="absolute -bottom-8 -left-8 md:-left-12 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-white">
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-xl font-bold text-violet-600 shadow-inner">
                DE
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Verified</p>
                <p className="font-extrabold text-slate-900 text-lg">Premium Fleet</p>
              </div>
            </div>
            {/* Floating Ratings Badge */}
            <div className="absolute -top-6 -right-6 md:-right-8 bg-white p-4 rounded-2xl shadow-lg flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="User"
                  />
                ))}
              </div>
              <div className="text-sm font-bold text-slate-900">4.9/5</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 rounded-xl bg-emerald-50 border border-emerald-200 px-6 py-4 text-emerald-700 font-medium animate-[slideIn_0.3s_ease] shadow-xl">
          {toast}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-[3px] border-violet-100 border-t-violet-600 rounded-full animate-spin" />
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-xl">No vehicles available right now</p>
          <p className="text-sm mt-2">Check back soon!</p>
        </div>
      ) : (
        /* Vehicle Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl hover:border-violet-200 transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={v.imageUrl || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"}
                  alt={`${v.make} ${v.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {v.make} {v.model}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {v.year} · {v.category?.name || "Standard"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-violet-600">${v.pricePerDay}</p>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wide">/ day</p>
                  </div>
                </div>

                <button
                  onClick={() => setBookingModal(v)}
                  className="w-full py-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-violet-600 hover:text-white hover:border-violet-600 text-slate-700 text-sm font-semibold transition-all duration-200"
                >
                  Book Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setBookingModal(null)}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Book {bookingModal.make} {bookingModal.model}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                ${bookingModal.pricePerDay}/day · {bookingModal.year}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Pickup Date</label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">Drop-off Date</label>
                <input
                  type="date"
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  min={pickupDate || new Date().toISOString().split("T")[0]}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-slate-900"
                />
              </div>
            </div>

            {/* Price Preview */}
            {getDays() > 0 && (
              <div className="rounded-xl bg-violet-50 border border-violet-100 p-4 flex justify-between items-center">
                <span className="text-sm text-slate-600">
                  {getDays()} day{getDays() > 1 ? "s" : ""} × ${bookingModal.pricePerDay}
                </span>
                <span className="text-lg font-bold text-violet-700">
                  ${getDays() * bookingModal.pricePerDay}
                </span>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setBookingModal(null)}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleBook}
                disabled={!pickupDate || !dropoffDate || getDays() === 0 || bookingLoading}
                className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-600/20 disabled:shadow-none"
              >
                {bookingLoading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
