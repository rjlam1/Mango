

// AddItem.jsx
import React, { useState, useContext } from 'react';
import { FiUpload } from 'react-icons/fi';
import { AuthContext } from '../../PrivateRouter/AuthPrivate'; 
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    plantName: '', 
    category: '',
    careLevel: 'easy', 
    description: '',
    image: '', 
    wateringFrequency: '', 
    nextWateringDate: '', 
    healthStatus: 'Healthy', 
    userEmail: user?.email || '',
    userName: user?.displayName || '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { // user চেক করুন
      setError('You must be logged in to add an item.');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      let imageUrl = '';
      if (imageFile) {
        
        // const storageRef = ref(storage, `images/${imageFile.name}`);
        // await uploadBytes(storageRef, imageFile);
        // imageUrl = await getDownloadURL(storageRef);

        
        imageUrl = 'https://via.placeholder.com/400'; 
        console.log("Image would be uploaded:", imageFile.name);
      }

      const itemData = {
        ...formData,
        image: imageUrl, 
        userEmail: user.email,
        userName: user.displayName, 
      };

      const response = await fetch('https://mango-server-ten.vercel.app/mango', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}` 
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to add item');
      }

      setSuccess(true);
      setFormData({
        plantName: '', category: '', careLevel: 'easy', description: '', image: '',
        wateringFrequency: '', nextWateringDate: '', healthStatus: 'Healthy', userEmail: user.email, userName: user.displayName,
      });
      setImageFile(null);
      navigate('/dashboard/my-items'); 
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Add New Item</h1>

      {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}
      {success && <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">Item added successfully!</div>}

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Plant Name */}
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Plant Name</label>
            <input
              type="text"
              name="plantName"
              value={formData.plantName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

        
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Fruit">Fruit</option>
              <option value="Flower">Flower</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Herbs">Herbs</option>
            </select>
          </div>

        
          <div>
            <label className="block mb-1 font-medium">Care Level</label>
            <select
              name="careLevel"
              value={formData.careLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
            </select>
          </div>

         
          <div>
            <label className="block mb-1 font-medium">Watering Frequency</label>
            <input
              type="text"
              name="wateringFrequency"
              value={formData.wateringFrequency}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Every 3 days"
            />
          </div>

        
          <div>
            <label className="block mb-1 font-medium">Next Watering Date</label>
            <input
              type="date"
              name="nextWateringDate"
              value={formData.nextWateringDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

         
          <div>
            <label className="block mb-1 font-medium">Health Status</label>
            <select
              name="healthStatus"
              value={formData.healthStatus}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Healthy">Healthy</option>
              <option value="Needs Care">Needs Care</option>
              <option value="Critical">Critical</option>
            </select>
          </div>


         
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

       
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>
            {imageFile && <p className="mt-2 text-sm text-gray-600">Selected file: {imageFile.name}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="px-6 py-2 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Adding Item...' : 'Add Item'}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
