import { Link } from "react-router-dom";

function Home() {

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-6xl font-bold mb-6 text-blue-600">
          Build Professional Resumes
        </h1>

        <p className="text-xl text-gray-800 dark:text-white mb-10">
          Create beautiful resumes in minutes.
        </p>

        <Link
          to="/create-resume"
          className="bg-blue-600 text-white px-8 py-4 rounded-xl text-xl"
        >
          Start Building
        </Link>

      </div>

    </div>
  );
}

export default Home;