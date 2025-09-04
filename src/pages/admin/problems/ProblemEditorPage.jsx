
import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';

// Reusable components waise hi rahenge, woh pehle se hi responsive hain.
const FormInput = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input {...props} className="block w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" />
  </div>
);
const FormSelect = ({ label, children, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select {...props} className="block w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">{children}</select>
  </div>
);
const FormTextArea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea {...props} className="block w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"></textarea>
  </div>
);
const ToggleSwitch = ({ checked, onChange }) => (
  <button type="button" onClick={onChange} role="switch" aria-checked={checked}
    className={`${checked ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}>
    <span className={`${checked ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
  </button>
);


// ======================================================
// MAIN PROBLEM EDITOR COMPONENT (FULLY RESPONSIVE)
// ======================================================
const ProblemEditorPage = ({ problems, fields, onSave, isLoading }) => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(problemId);

  const [formData, setFormData] = useState({
    title: '', description: '', fieldId: '', difficulty: 'Easy',
    testCases: [{ input: '', output: '', hidden: false }],
  });

  useEffect(() => {
    // ... (logic remains the same)
    if (isEditMode) {
      const problemToEdit = problems.find(p => p.id === parseInt(problemId));
      if (problemToEdit) setFormData(problemToEdit);
    } else {
      setFormData({
        title: '', description: '', fieldId: fields[0]?.id || '', difficulty: 'Easy',
        testCases: [{ input: '', output: '', hidden: false }],
      });
    }
  }, [problemId, problems, isEditMode, fields]);

  // ... (handler functions remain the same)
  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleTestCaseChange = (index, event) => { const { name, value } = event.target; const newTestCases = [...formData.testCases]; newTestCases[index][name] = value; setFormData(prev => ({ ...prev, testCases: newTestCases })); };
  const handleToggleHidden = (index) => { const newTestCases = [...formData.testCases]; newTestCases[index].hidden = !newTestCases[index].hidden; setFormData(prev => ({ ...prev, testCases: newTestCases })); };
  const handleAddTestCase = () => setFormData(prev => ({ ...prev, testCases: [...prev.testCases, { input: '', output: '', hidden: false }] }));
  const handleRemoveTestCase = index => setFormData(prev => ({ ...prev, testCases: prev.testCases.filter((_, i) => i !== index) }));
  const handleSubmit = e => { e.preventDefault(); onSave(formData); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/admin/problems" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
            <FaArrowLeft /> Back to Problem List
          </Link>
          {/* Responsive Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">{isEditMode ? 'Edit Problem' : 'Create New Problem'}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Card 1: Responsive Padding */}
        <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 border-b pb-4 mb-6">Problem Details</h3>
          <div className="space-y-6">
            <FormInput label="Problem Title" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., Two Sum Challenge" />
            <FormTextArea label="Problem Description" name="description" value={formData.description} onChange={handleChange} required rows="6" placeholder="Provide a clear and detailed description..."/>
            <div className="grid md:grid-cols-2 gap-6">
              <FormSelect label="Field" name="fieldId" value={formData.fieldId} onChange={handleChange} required>
                {fields.map(field => <option key={field.id} value={field.id}>{field.name}</option>)}
              </FormSelect>
              <FormSelect label="Difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange} required>
                <option>Easy</option> <option>Medium</option> <option>Hard</option>
              </FormSelect>
            </div>
          </div>
        </div>

        {/* Card 2: Responsive Padding and Header */}
        <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6 gap-4">
            <h3 className="text-xl font-bold text-gray-800">Test Cases</h3>
            <button type="button" onClick={handleAddTestCase} className="flex items-center gap-2 rounded-lg bg-blue-50 py-2 px-4 text-sm font-semibold text-blue-600 hover:bg-blue-100 transition-colors self-start sm:self-center">
              <FaPlus /> Add Test Case
            </button>
          </div>
          <div className="space-y-4">
            {formData.testCases.map((tc, index) => (
              <div key={index} className="bg-gray-50 p-4 border rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                  <span className="font-semibold text-gray-600">Test Case #{index + 1}</span>
                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <ToggleSwitch checked={tc.hidden} onChange={() => handleToggleHidden(index)} /> Hidden
                    </label>
                    <button type="button" onClick={() => handleRemoveTestCase(index)} className="text-gray-400 hover:text-red-500 transition-colors"><FaTrash /></button>
                  </div>
                </div>
                {/* Text areas grid already stacks on mobile */}
                <div className="grid md:grid-cols-2 gap-4">
                  <FormTextArea label="Input" name="input" value={tc.input} onChange={e => handleTestCaseChange(index, e)} rows="3" placeholder="e.g., [2, 7, 11, 15], 9"/>
                  <FormTextArea label="Expected Output" name="output" value={tc.output} onChange={e => handleTestCaseChange(index, e)} rows="3" placeholder="e.g., [0, 1]"/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons: Responsive Layout */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end items-center gap-4 pt-4">
          <Link to="/admin/problems" className="w-full sm:w-auto py-2 px-6 bg-gray-200 text-gray-800 text-center rounded-lg font-semibold hover:bg-gray-300 transition-colors">Cancel</Link>
          <button type="submit" disabled={isLoading}
            className="w-full sm:w-auto py-2 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-blue-300 disabled:cursor-not-allowed">
            {isLoading ? (<><FaSpinner className="animate-spin" /> Saving...</>) : (isEditMode ? 'Update Problem' : 'Save Problem')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProblemEditorPage;