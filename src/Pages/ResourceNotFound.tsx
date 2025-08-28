import { Link } from "react-router-dom";

const ResourceNotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Resource Not Found</h1>
      <p className="text-lg text-gray-700 mb-6">
        The resource you're looking for does not exist or has been removed.
      </p>
      <Link 
        to="/dashboard" 
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default ResourceNotFoundPage;
