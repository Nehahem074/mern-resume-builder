import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

function EditResume() {

  const { id } = useParams();

  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );



  const [resumeData, setResumeData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    skills: "",

    education: [],

    experience: [],
  });




  // FETCH EXISTING RESUME
  useEffect(() => {

  let isMounted = true;

  const fetchResume = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );



      // UPDATE STATE ONLY IF COMPONENT STILL EXISTS
      if (isMounted) {

        setResumeData({
          ...response.data,

          skills: response.data.skills.join(", "),
        });

      }

    } catch (error) {

      console.log(error);

    }
  };



  if (userInfo) {

    fetchResume();

  }



  return () => {

    isMounted = false;

  };

}, [id, userInfo]);

  const handleChange = (e) => {

    setResumeData({
      ...resumeData,
      [e.target.name]: e.target.value,
    });
  };




  const handleEducationChange = (index, e) => {

    const values = [...resumeData.education];

    values[index][e.target.name] = e.target.value;

    setResumeData({
      ...resumeData,
      education: values,
    });
  };




  const handleExperienceChange = (index, e) => {

    const values = [...resumeData.experience];

    values[index][e.target.name] = e.target.value;

    setResumeData({
      ...resumeData,
      experience: values,
    });
  };




  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/resume/${id}`,
        {
          ...resumeData,

          skills: resumeData.skills
            .split(",")
            .map((skill) => skill.trim()),
        },

        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      toast.success("Resume Updated");
      navigate("/my-resumes");

    } catch (error) {

  toast.error(error.response.data.message);
}
  };



  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-10">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto"
      >

        <h1 className="text-4xl font-bold mb-8 bg-white dark:bg-gray-900">
          Edit Resume
        </h1>



        {/* PERSONAL INFO */}

        <input
          type="text"
          name="fullName"
          value={resumeData.fullName}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <input
          type="email"
          name="email"
          value={resumeData.email}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <input
          type="text"
          name="phone"
          value={resumeData.phone}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lgdark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <input
          type="text"
          name="address"
          value={resumeData.address}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <textarea
          name="summary"
          value={resumeData.summary}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />



        {/* SKILLS */}

        <input
          type="text"
          name="skills"
          value={resumeData.skills}
          onChange={handleChange}
          className="w-full border p-3 mb-8 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />



        {/* EDUCATION */}

        <h2 className="text-2xl font-bold mb-4">
          Education
        </h2>

        {resumeData.education.map((edu, index) => (

          <div
            key={index}
            className="border p-4 rounded-lg mb-4"
          >

            <input
              type="text"
              name="school"
              value={edu.school}
              onChange={(e) =>
                handleEducationChange(index, e)
              }
              className="w-full border p-3 mb-3 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />

            <input
              type="text"
              name="degree"
              value={edu.degree}
              onChange={(e) =>
                handleEducationChange(index, e)
              }
              className="w-full border p-3 mb-3 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />

            <input
              type="text"
              name="year"
              value={edu.year}
              onChange={(e) =>
                handleEducationChange(index, e)
              }
              className="w-full border p-3 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />

          </div>
        ))}



        {/* EXPERIENCE */}

        <h2 className="text-2xl font-bold mb-4">
          Experience
        </h2>

        {resumeData.experience.map((exp, index) => (

          <div
            key={index}
            className="border p-4 rounded-lg mb-4"
          >

            <input
              type="text"
              name="company"
              value={exp.company}
              onChange={(e) =>
                handleExperienceChange(index, e)
              }
              className="w-full border p-3 mb-3 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />

            <input
              type="text"
              name="role"
              value={exp.role}
              onChange={(e) =>
                handleExperienceChange(index, e)
              }
              className="w-full border p-3 mb-3 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />

            <input
              type="text"
              name="years"
              value={exp.years}
              onChange={(e) =>
                handleExperienceChange(index, e)
              }
              className="w-full border p-3 mb-3 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />

            <textarea
              name="description"
              value={exp.description}
              onChange={(e) =>
                handleExperienceChange(index, e)
              }
              className="w-full border p-3 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />

          </div>
        ))}



        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-4 rounded-lg text-xl"
        >
          Update Resume
        </button>

      </form>

    </div>
  );
}

export default EditResume;