import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="text-primary-500 font-bold text-9xl">404</div>
        
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Page Not Found
        </h1>
        
        <p className="mt-2 text-base text-gray-600 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-6">
          <Link to="/">
            <Button variant="primary" leftIcon={<Home size={16} />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;