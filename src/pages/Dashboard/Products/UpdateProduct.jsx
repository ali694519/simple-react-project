import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Context/UserContext";

function UpdateProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [accept, setAccept] = useState(false);

  const navigate = useNavigate();
  const context = useContext(User);
  const token = context.auth.token;

  const id = window.location.pathname.split("/").slice(-1)[0];

  useEffect(() => {
    // Fetch product details by ID and set initial form state
    axios.get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        setTitle(data.data[0].title);
        setDescription(data.data[0].description);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post(`http://127.0.0.1:8000/api/product/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });

      if (response.status === 200) {
        navigate(`/dashboard/products`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setAccept(true);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Update Product</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-blue-900 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
              placeholder="Product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {title === '' && accept && <p className="text-red-600">Title is required</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-blue-900 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
              placeholder="Product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {description === '' && accept && <p className="text-red-600">Description is required</p>}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-blue-900 mb-2">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
              onChange={(e) => setImage(e.target.files[0])} // Use file input for image
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
