import { useState } from "react";
import axios from "axios";

function CreateResume() {

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

    education: [
      {
        school: "",
        degree: "",
        year: "",
      },
    ],

    experience: [
      {
        company: "",
        role: "",
        years: "",
        description: "",
      },
    ],
  });




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




  const addEducation = () => {

    setResumeData({
      ...resumeData,

      education: [
        ...resumeData.education,

        {
          school: "",
          degree: "",
          year: "",
        },
      ],
    });
  };




  const addExperience = () => {

    setResumeData({
      ...resumeData,

      experience: [
        ...resumeData.experience,

        {
          company: "",
          role: "",
          years: "",
          description: "",
        },
      ],
    });
  };




  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL
        }/api/resume`,
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


      alert("Resume Created");

    } catch (error) {

      console.log(error);

    }
  };



  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-10">

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg max-w-4xl mx-auto"
      >

        <h1 className="text-4xl font-bold mb-8 bg-white dark:bg-gray-900">
          Create Resume
        </h1>

        {/* PERSONAL INFO */}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <textarea
          name="summary"
          placeholder="Professional Summary"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />



        {/* SKILLS */}

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          onChange={handleChange}
          className="w-full border p-3 mb-8 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />



        {/* EDUCATION */}

        <h2 className="text-2xl font-bold mb-4 dark:text-white">
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
              placeholder="School"
              onChange={(e) =>
                handleEducationChange(index, e)
              }
              className="w-full border p-3 mb-3 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />

            <input
              type="text"
              name="degree"
              placeholder="Degree"
              onChange={(e) =>
                handleEducationChange(index, e)
              }
              className="w-full border p-3 mb-3 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />

            <input
              type="text"
              name="year"
              placeholder="Year"
              onChange={(e) =>
                handleEducationChange(index, e)
              }
              className="w-full border p-3 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />

          </div>
        ))}

        <button
          type="button"
          onClick={addEducation}
          className="bg-green-600 text-white px-4 py-2 rounded-lg mb-8"
        >
          Add Education
        </button>



        {/* EXPERIENCE */}

        <h2 className="text-2xl font-bold mb-4 dark:text-white">
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
              placeholder="Company"
              onChange={(e) =>
                handleExperienceChange(index, e)
              }
              className="w-full border p-3 mb-3 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />

            <input
              type="text"
              name="role"
              placeholder="Role"
              onChange={(e) =>
                handleExperienceChange(index, e)
              }
              className="w-full border p-3 mb-3 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />

            <input
              type="text"
              name="years"
              placeholder="Years"
              onChange={(e) =>
                handleExperienceChange(index, e)
              }
              className="w-full border p-3 mb-3 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />

            <textarea
              name="description"
              placeholder="Description"
              onChange={(e) =>
                handleExperienceChange(index, e)
              }
              className="w-full border p-3 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />

          </div>
        ))}

        <button
          type="button"
          onClick={addExperience}
          className="bg-green-600 text-white px-4 py-2 rounded-lg mb-8"
        >
          Add Experience
        </button>



        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-4 rounded-lg text-xl"
        >
          Save Resume
        </button>

      </form>

    </div>
  );
}

export default CreateResume;