
import React from 'react';
import { FaEdit, FaTrash, FaUserLock, FaUserCheck } from 'react-icons/fa';

const UserTable = ({ users, onEdit, onDelete, onToggleStatus }) => {
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 ring-1 ring-green-200';
      case 'Blocked': return 'bg-red-100 text-red-800 ring-1 ring-red-200';
      default: return 'bg-gray-100 text-gray-800 ring-1 ring-gray-200';
    }
  };

  return (
    <div className="w-full">
      {/* Table for Desktop (md screens and up) */}
      <div className="hidden md:block">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Primary Field</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Registered</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
                <td className="py-4 px-6">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="py-4 px-6 text-gray-700">{user.field}</td>
                <td className="py-4 px-6 text-gray-700">{user.registeredDate}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-center items-center gap-4">
                    <button onClick={() => onEdit(user)} className="text-gray-400 hover:text-blue-600 transition-colors" title="Edit"><FaEdit size={18} /></button>
                    <button onClick={() => onToggleStatus(user.id)} className="text-gray-400 hover:text-yellow-600 transition-colors" title={user.status === 'Active' ? 'Block' : 'Unblock'}>
                      {user.status === 'Active' ? <FaUserLock size={18} /> : <FaUserCheck size={18} />}
                    </button>
                    <button onClick={() => onDelete(user)} className="text-gray-400 hover:text-red-600 transition-colors" title="Delete"><FaTrash size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card List for Mobile (up to md screens) */}
      <div className="md:hidden space-y-4 p-2 sm:p-4">
        {users.map(user => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="font-bold text-base text-gray-800">{user.name}</h3>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(user.status)}`}>{user.status}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 text-xs space-y-1">
              <p><strong className="font-semibold text-gray-600">Field:</strong> {user.field}</p>
              <p><strong className="font-semibold text-gray-600">Registered:</strong> {user.registeredDate}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-end items-center gap-4">
              {/* Mobile par sirf icons dikhayein */}
              <button onClick={() => onEdit(user)} className="text-gray-500 hover:text-blue-600 transition-colors" title="Edit"><FaEdit size={18} /></button>
              <button onClick={() => onToggleStatus(user.id)} className="text-gray-500 hover:text-yellow-600 transition-colors" title={user.status === 'Active' ? 'Block' : 'Unblock'}>
                {user.status === 'Active' ? <FaUserLock size={18} /> : <FaUserCheck size={18} />}
              </button>
              <button onClick={() => onDelete(user)} className="text-gray-500 hover:text-red-600 transition-colors" title="Delete"><FaTrash size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;