"use client";
import { useEffect, useState } from "react";
import { FaTrash, FaUserShield, FaUser } from "react-icons/fa";

export default function UsersSection() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const totalPages = Math.ceil(totalUsers / limit);

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    const res = await fetch(`/api/users?page=${page}&limit=${limit}&search=${search}`);
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
      setTotalUsers(data.totalUsers);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchUsers(); // refresh list
    } else {
      alert("Failed to delete user");
    }
  };

  // Toggle role between USER and ADMIN
  const handleToggleRole = async (id, currentRole) => {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";

    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });

    if (res.ok) {
      fetchUsers(); // refresh list
    } else {
      alert("Failed to update role");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      {/* Search */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by Name/ Email/ Role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded-l-md focus:outline-none"
        />
        <button
          onClick={() => fetchUsers()}
          className="bg-purple-600 text-white px-4 rounded-r-md"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Sr. No</th>
              <th className="p-2 border">User Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{(page - 1) * limit + index + 1}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.role}</td>
                  <td className="p-2 border flex gap-3">
                    {/* Toggle role */}
                    <button
                      onClick={() => handleToggleRole(user.id, user.role)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Change role"
                    >
                      {user.role === "ADMIN" ? (
                        <FaUser className="text-xl" />
                      ) : (
                        <FaUserShield className="text-xl" />
                      )}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete user"
                    >
                      <FaTrash className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 border text-center" colSpan="5">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing {(page - 1) * limit + 1}-
          {Math.min(page * limit, totalUsers)} of {totalUsers}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ⬅
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, page - 2), Math.min(totalPages, page + 1))
            .map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 border rounded ${
                  page === p ? "bg-purple-600 text-white" : ""
                }`}
              >
                {p}
              </button>
            ))}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ➡
          </button>
        </div>
      </div>
    </div>
  );
}
