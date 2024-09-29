import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container mx-auto text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Oops! You seem to be lost.</h1>
      <p className="text-2xl mb-8">404 - Page Not Found</p>
      <Link to={'/'} className="btn btn-primary">Go Back Home</Link>
    </div>
  )
}

export default NotFound;
