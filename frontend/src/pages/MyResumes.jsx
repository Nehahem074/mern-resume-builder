import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyResumes() {

  const [resumes, setResumes] = useState([]);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );



  // FETCH RESUMES
 useEffect(() => {

  const fetchResumes = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/resume`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setResumes(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  fetchResumes();

   }, [userInfo.token]);

  const deleteResume = async (id) => {

  try {

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/resume/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    // REMOVE DELETED RESUME FROM STATE
    setResumes((prevResumes) =>
      prevResumes.filter(
        (resume) => resume._id !== id
      )
    );

  } catch (error) {

    console.log(error);

  }
};


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-10">

      <div className="flex justify-between items-center mb-10 bg-white dark:bg-gray-900">

        <h1 className="text-4xl font-bold dark:text-white">
          My Resumes
        </h1>

        <Link
          to="/create-resume"
          className="bg-blue-600 dark:text-white px-6 py-3 rounded-lg"
        >
          Create Resume
        </Link>

      </div>



      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {resumes.map((resume) => (

          <div
            key={resume._id}
            className="bg-white p-6 rounded-xl shadow-lg"
          >

            <h2 className="text-2xl font-bold mb-2 dark:text-white">
              {resume.fullName}
            </h2>

            <p className="text-gray-600 mb-4 dark:text-white">
              {resume.email}
            </p>

            <div className="flex gap-3 dark:text-white">

              <Link
  to={`/resume/${resume._id}`}
  className="bg-green-600 dark:text-white px-4 py-2 rounded-lg"
>
  View
</Link>

              <Link
  to={`/edit-resume/${resume._id}`}
  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
>
  Edit
</Link>

              <button
                 onClick={() => deleteResume(resume._id)}
                 className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
               Delete
              </button>
            </div> 

          </div>
        ))}

      </div>

    </div>
  );
}

export default MyResumes;