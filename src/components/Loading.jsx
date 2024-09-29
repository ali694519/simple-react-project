import { FaSpinner } from 'react-icons/fa';

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <FaSpinner className="text-blue-500 animate-spin w-6 h-6 mr-3" />
      <span className="text-lg font-medium text-gray-600"></span>
    </div>
  );
}

export default Loading;
