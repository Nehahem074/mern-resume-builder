import { useEffect, useState, useRef } from "react";

import axios from "axios";

import { useParams ,Navigate} from "react-router-dom";

import html2pdf from "html2pdf.js";

import ModernTemplate from "../templates/ModernTemplate";

import MinimalTemplate from "../templates/MinimalTemplate";

function ViewResume() {

  const { id } = useParams();
  

  

 const userInfo = JSON.parse(
  localStorage.getItem("userInfo")
);

const resumeRef = useRef();

const [resume, setResume] = useState(null);

const [selectedTemplate, setSelectedTemplate] =
  useState("modern");

useEffect(() => {

  const fetchResume = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/resume/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      setResume(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  if (userInfo) {
    fetchResume();
  }

}, [id, userInfo]);



if (!userInfo) {
  return <Navigate to="/login" />;
}
  if (!resume) {
    return <h1>Loading...</h1>;
  }

  <div ref={resumeRef}></div>  

  const downloadPDF = () => {

  const element = resumeRef.current;

  const options = {
    margin: 0.5,

    filename: `${resume.fullName}_Resume.pdf`,

    image: {
      type: "jpeg",
      quality: 1,
    },

    html2canvas: {
      scale: 2,
    },

    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
    },
  };

  html2pdf().set(options).from(element).save();
};



  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-10">

        <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center">

  <button
    onClick={downloadPDF}
    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
  >
    Download PDF
  </button>



  <select
    value={selectedTemplate}
    onChange={(e) =>
      setSelectedTemplate(e.target.value)
    }
    className="border p-3 rounded-lg"
  >

    <option value="modern">
      Modern Template
    </option>

    <option value="minimal">
      Minimal Template
    </option>

  </select>

</div>

    <div
  ref={resumeRef}
  className="max-w-4xl mx-auto"
>

  {selectedTemplate === "modern" && (
    <ModernTemplate resume={resume} />
  )}

  {selectedTemplate === "minimal" && (
    <MinimalTemplate resume={resume} />
  )}

</div>
        
        
       

    </div>

   
  );
}

export default ViewResume;