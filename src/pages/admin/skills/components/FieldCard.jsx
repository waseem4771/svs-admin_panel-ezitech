
import React from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const FieldCard = ({ field, onEditField, onDeleteField, onAddSubSkill, onEditSubSkill, onDeleteSubSkill }) => {
  return (
    // Behtar shadow, rounding, aur hover effect
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      
      {/* 1. Card Header: Sirf Field ka naam aur uske actions */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">{field.name}</h3>
        <div className="flex items-center gap-3">
          <button onClick={() => onEditField(field)} className="text-gray-400 hover:text-blue-500 transition-colors" title="Edit Field"><FaEdit /></button>
          <button onClick={() => onDeleteField(field)} className="text-gray-400 hover:text-red-500 transition-colors" title="Delete Field"><FaTrash /></button>
        </div>
      </div>

      {/* 2. Card Body: Sub-skills ki list */}
      <div className="p-4 flex-grow">
        <h4 className="text-sm font-semibold text-gray-500 mb-3">Sub-skills</h4>
        <ul className="space-y-2">
          {field.subSkills.length > 0 ? (
            field.subSkills.map(skill => (
              // "group" class hover par actions dikhane ke liye zaroori hai
              <li key={skill.id} className="group flex justify-between items-center p-2 rounded-md hover:bg-gray-100 transition-colors">
                <span className="text-gray-700">{skill.name}</span>
                {/* Yeh actions sirf hover par dikhenge */}
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEditSubSkill(skill, field.id)} className="text-gray-400 hover:text-blue-500" title="Edit Sub-skill"><FaEdit /></button>
                  <button onClick={() => onDeleteSubSkill(skill, field.id)} className="text-gray-400 hover:text-red-500" title="Delete Sub-skill"><FaTrash /></button>
                </div>
              </li>
            ))
          ) : (
            <li className="p-2 text-sm text-center text-gray-400 italic">No sub-skills added yet.</li>
          )}
        </ul>
      </div>

      {/* 3. Card Footer: Sirf "Add Sub-skill" ka button */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <button onClick={() => onAddSubSkill(field.id)} className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition-colors">
          <FaPlus /> Add Sub-skill
        </button>
      </div>
    </div>
  );
};

export default FieldCard;