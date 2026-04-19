import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Booking } from "../types";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(userStr);
    if (user.role !== "ADMIN") {
      navigate("/");
      return;
    }
    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/all");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await api.patch(`/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (err) {
      alert("Failed to update status");
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

  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
  const activeCount = bookings.filter((b) => b.status === "ACTIVE").length;
  const completedCount = bookings.filter((b) => b.status === "COMPLETED").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600 mt-1">Manage all bookings and vehicle availability</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: bookings.length, color: "text-slate-900" },
          { label: "Pending", value: pendingCount, color: "text-amber-600" },
          { label: "Active", value: activeCount, color: "text-blue-600" },
          { label: "Completed", value: completedCount, color: "text-emerald-600" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                    Loading...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-sm text-slate-900">{b.user?.name}</p>
                      <p className="text-xs text-slate-500">{b.user?.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-sm text-slate-900">
                        {b.vehicle?.make} {b.vehicle?.model}
                      </p>
                      <p className="text-xs text-slate-500">{b.vehicle?.licensePlate}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(b.pickupDate).toLocaleDateString()} →{" "}
                      {new Date(b.dropoffDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-bold text-violet-600">${b.totalAmount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${statusColor(b.status)}`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {b.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(b.id, "ACTIVE")}
                              className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold transition-all"
                            >
                              Activate
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(b.id, "CANCELLED")}
                              className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-all"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {b.status === "ACTIVE" && (
                          <button
                            onClick={() => handleStatusUpdate(b.id, "COMPLETED")}
                            className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-xs font-bold transition-all"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
