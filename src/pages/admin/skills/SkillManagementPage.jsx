
import React, { useState } from 'react';
import { FaPlus, FaBook, FaBoxOpen } from 'react-icons/fa'
import { toast } from 'react-toastify'

// Components
import FieldCard from './components/FieldCard'
import SkillFormModal from './components/SkillFormModal'
import DeleteConfirmationModal from '../users/components/DeleteConfirmationModal'
// import styles from './SkillManagementPage.module.css' // 1. Is line ko comment ya delete kar dein

const initialData = [
  { id: 1, name: 'Full Stack Developer', subSkills: [{ id: 101, name: 'React.js' }, { id: 102, name: 'Node.js / Express.js' }, { id: 103, name: 'MongoDB' }] },
  { id: 2, name: 'Data Scientist', subSkills: [{ id: 201, name: 'Python' }, { id: 202, name: 'Pandas & NumPy' }, { id: 203, name: 'Scikit-learn' }] },
]

// Ek chota sa reusable "Empty State" component
const EmptyState = ({ onAdd }) => (
  // 2. Yahan se animation class hata dein
  <div className="text-center py-16 px-6 col-span-full">
    <FaBoxOpen className="mx-auto text-6xl text-gray-300" />
    <h3 className="mt-4 text-xl font-semibold text-gray-700">No Fields Found</h3>
    <p className="mt-2 text-sm text-gray-500">Get started by adding a new field.</p>
    <button onClick={onAdd} className="mt-6 inline-flex items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
      <FaPlus className="mr-2" /> Add New Field
    </button>
  </div>
);

const SkillManagementPage = () => {
  const [fields, setFields] = useState(initialData)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [currentItem, setCurrentItem] = useState(null)
  const [itemType, setItemType] = useState('')
  const [parentFieldId, setParentFieldId] = useState(null)

  // Baaki sab kuch waise hi rahega...
  const openFormModal = (item = null, type, parentId = null) => {
    setCurrentItem(item)
    setItemType(type)
    setParentFieldId(parentId)
    setIsFormModalOpen(true)
  }
  const handleSave = (itemData) => {
    if (itemType === 'Field') {
      if (itemData.id) {
        setFields(fields.map(f => f.id === itemData.id ? { ...f, name: itemData.name } : f))
        toast.success(`Field '${itemData.name}' updated!`)
      } else {
        const newField = { id: Date.now(), name: itemData.name, subSkills: [] }
        setFields([newField, ...fields])
        toast.success(`Field '${itemData.name}' added!`)
      }
    } else if (itemType === 'Sub-skill') {
      const updatedFields = fields.map(field => {
        if (field.id === parentFieldId) {
          if (itemData.id) {
            const subSkills = field.subSkills.map(s => s.id === itemData.id ? { ...s, name: itemData.name } : s)
            return { ...field, subSkills }
          } else {
            const newSkill = { id: Date.now(), name: itemData.name }
            return { ...field, subSkills: [...field.subSkills, newSkill] }
          }
        }
        return field
      })
      setFields(updatedFields)
      toast.success(`Sub-skill '${itemData.name}' saved!`)
    }
    setIsFormModalOpen(false)
  }
  const openDeleteModal = (item, type, parentId = null) => {
    setCurrentItem(item)
    setItemType(type)
    setParentFieldId(parentId)
    setIsDeleteModalOpen(true)
  }
  const handleConfirmDelete = () => {
    if (itemType === 'Field') {
      setFields(fields.filter(f => f.id !== currentItem.id))
      toast.error(`Field '${currentItem.name}' deleted!`)
    } else if (itemType === 'Sub-skill') {
      const updatedFields = fields.map(field => {
        if (field.id === parentFieldId) {
          const subSkills = field.subSkills.filter(s => s.id !== currentItem.id)
          return { ...field, subSkills }
        }
        return field
      })
      setFields(updatedFields)
      toast.error(`Sub-skill '${currentItem.name}' deleted!`)
    }
    setIsDeleteModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* 3. Yahan se bhi animation classes hata dein */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <FaBook className="text-3xl text-gray-700" />
          <h2 className="text-3xl font-bold text-gray-800">Fields & Skills</h2>
        </div>
        <button onClick={() => openFormModal(null, 'Field')} className="flex items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors self-end sm:self-center">
          <FaPlus className="mr-2" />
          <span className="hidden sm:inline">Add New Field</span>
          <span className="sm:hidden">New Field</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {fields.length > 0 ? (
          fields.map((field) => (
            // 4. Yahan se bhi animation classes hata dein
            <div key={field.id}>
              <FieldCard 
                field={field} 
                onEditField={(item) => openFormModal(item, 'Field')}
                onDeleteField={(item) => openDeleteModal(item, 'Field')}
                onAddSubSkill={(parentId) => openFormModal(null, 'Sub-skill', parentId)}
                onEditSubSkill={(item, parentId) => openFormModal(item, 'Sub-skill', parentId)}
                onDeleteSubSkill={(item, parentId) => openDeleteModal(item, 'Sub-skill', parentId)}
              />
            </div>
          ))
        ) : (
          <EmptyState onAdd={() => openFormModal(null, 'Field')} />
        )}
      </div>

      {isFormModalOpen && (
        <SkillFormModal 
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSave={handleSave}
          item={currentItem}
          itemType={itemType}
        />
      )}
      
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title={`Delete ${itemType}`}
          message={`Are you sure you want to delete "${currentItem?.name}"? All associated data will be removed.`}
        />
      )}
    </div>
  );
};

export default SkillManagementPage;