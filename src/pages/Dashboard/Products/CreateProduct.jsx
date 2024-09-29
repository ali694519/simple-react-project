import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Context/UserContext";

function CreateProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [accept, setAccept] = useState(false);
  const nav = useNavigate();

  const context = useContext(User);
  const token = context.auth.token;

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
      }
      let res = await axios.post(`http://127.0.0.1:8000/api/product/create`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        });
      if (res.status === 200) {
        nav(`/dashboard/products`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Create New Product</h1>
        <form className="space-y-4" onSubmit={Submit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-blue-900 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
              placeholder="Enter product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {title.length < 1 && accept && (
              <p className="text-red-600">Title is required</p>
            )}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-blue-900 mb-2">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {description.length < 1 && accept && (
              <p className="text-red-600">Description is required</p>
            )}
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-blue-900 mb-2">
              Image URL
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
              placeholder="Enter image URL"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image.length < 1 && accept && (
              <p className="text-red-600">Image URL is required</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
