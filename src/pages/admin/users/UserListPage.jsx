
import React, { useState, useMemo } from 'react';
import { FaSearch, FaPlus, FaUsers, FaTimes, FaBoxOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';

import UserTable from './components/UserTable';
import UserFormModal from './components/UserFormModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import styles from './UserListPage.module.css'; // Animation CSS

const initialUsers = [
  { id: 1, name: 'Ali Khan', email: 'ali.khan@example.com', field: 'Full Stack Developer', registeredDate: '2025-08-15', status: 'Active' },
  { id: 2, name: 'Sara Ahmed', email: 'sara.ahmed@example.com', field: 'Data Scientist', registeredDate: '2025-08-12', status: 'Active' },
  { id: 3, name: 'Zainab Fatima', email: 'zainab.f@example.com', field: 'Frontend Developer', registeredDate: '2025-07-30', status: 'Blocked' },
];

const EmptyState = ({ onAdd }) => (
  <div className="text-center py-16 px-6">
    <FaBoxOpen className="mx-auto text-6xl text-gray-300" />
    <h3 className="mt-4 text-xl font-semibold text-gray-700">No Users Found</h3>
    <p className="mt-2 text-sm text-gray-500">Get started by adding a new user.</p>
    <button onClick={onAdd} className="mt-6 inline-flex items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
      <FaPlus className="mr-2" /> Add New User
    </button>
  </div>
);

const UserListPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const uniqueFields = useMemo(() => {
    const fields = new Set(users.map(u => u.field));
    return ['All', ...Array.from(fields)];
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesField = filterField === 'All' || user.field === filterField;
      const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
      return matchesSearch && matchesField && matchesStatus;
    });
  }, [users, searchTerm, filterField, filterStatus]);

  const handleSaveUser = (userData) => {
    if (userData.id) {
      setUsers(users.map(u => u.id === userData.id ? userData : u));
      toast.success(`User '${userData.name}' updated!`);
    } else {
      const newUser = { ...userData, id: Date.now(), registeredDate: new Date().toISOString().slice(0, 10), status: 'Active' };
      setUsers([newUser, ...users]);
      toast.success(`User '${newUser.name}' added!`);
    }
    closeFormModal();
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter(u => u.id !== userToDelete.id));
    toast.error(`User '${userToDelete.name}' deleted!`);
    closeDeleteModal();
  };

  const handleToggleStatus = (userId) => {
    let userName = '', newStatus = '';
    setUsers(users.map(u => {
      if (u.id === userId) {
        userName = u.name;
        newStatus = u.status === 'Active' ? 'Blocked' : 'Active';
        return { ...u, status: newStatus };
      }
      return u;
    }));
    toast.info(`Status of '${userName}' changed to ${newStatus}.`);
  };

  const openAddUserModal = () => { setCurrentUser(null); setIsFormModalOpen(true); };
  const openEditUserModal = (user) => { setCurrentUser(user); setIsFormModalOpen(true); };
  const openDeleteModal = (user) => { setUserToDelete(user); setIsDeleteModalOpen(true); };
  const closeFormModal = () => setIsFormModalOpen(false);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const clearFilters = () => {
    setSearchTerm('');
    setFilterField('All');
    setFilterStatus('All');
  };

  const areFiltersActive = searchTerm || filterField !== 'All' || filterStatus !== 'All';

  return (
    <div className="space-y-6 p-4 sm:p-0">
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${styles.animateFadeInUp} ${styles.delay1}`}>
        <div className="flex items-center gap-3">
          <FaUsers className="text-2xl sm:text-3xl text-gray-700" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Users</h2>
        </div>
        <button onClick={openAddUserModal} className="flex items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors self-end sm:self-center">
          <FaPlus className="mr-2" />
          <span className="hidden sm:inline">Add New User</span>
          <span className="sm:hidden">New User</span>
        </button>
      </div>

      <div className={`bg-white p-4 sm:p-6 rounded-2xl shadow-xl ${styles.animateFadeInUp} ${styles.delay2}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-end">
          <div className="relative sm:col-span-2 xl:col-span-2">
            <label className="text-sm font-medium text-gray-600">Search by name or email</label>
            <input type="text" placeholder="e.g., Ali Khan" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <FaSearch className="absolute left-3 top-10 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Field</label>
            <select value={filterField} onChange={e => setFilterField(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {uniqueFields.map(field => <option key={field}>{field}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Status</label>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All</option><option>Active</option><option>Blocked</option>
            </select>
          </div>
        </div>
        {areFiltersActive && (
          <button onClick={clearFilters} className="mt-4 flex items-center gap-2 text-sm text-gray-500 hover:text-red-500">
            <FaTimes /> Clear Filters
          </button>
        )}
      </div>

      <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${styles.animateFadeInUp} ${styles.delay3}`}>
        {filteredUsers.length > 0 ? (
          <UserTable users={filteredUsers} onEdit={openEditUserModal} onDelete={openDeleteModal} onToggleStatus={handleToggleStatus} />
        ) : (
          <EmptyState onAdd={openAddUserModal} />
        )}
      </div>

      {isFormModalOpen && <UserFormModal isOpen={isFormModalOpen} onClose={closeFormModal} onSave={handleSaveUser} user={currentUser} />}
      {isDeleteModalOpen && <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleConfirmDelete} userName={userToDelete?.name} />}
    </div>
  );
};

export default UserListPage;