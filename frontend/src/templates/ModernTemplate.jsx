function ModernTemplate({ resume }) {

  return (
    <div className="bg-white p-12 shadow-2xl  dark:bg-gray-900">

      <div className="border-b-4 border-blue-600 pb-6 mb-8">

        <h1 className="text-6xl font-bold dark:text-white">
          {resume.fullName}
        </h1>

        <div className="mt-4 dark:text-gray-300">
          <p>{resume.email}</p>
          <p>{resume.phone}</p>
          <p>{resume.address}</p>
        </div>

      </div>



      <section className="mb-8">

        <h2 className="text-3xl font-bold text-blue-600 mb-3">
          Summary
        </h2>

        <p className="dark:text-gray-300">{resume.summary}</p>

      </section>



      <section className="mb-8">

        <h2 className="text-3xl font-bold text-blue-600 mb-3">
          Skills
        </h2>

        <div className="flex flex-wrap gap-3">

          {resume.skills.map((skill, index) => (

            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full dark:bg-blue-900 dark:text-blue-300"
            >
              {skill}
            </span>
          ))}

        </div>

      </section>

    </div>
  );
}

export default ModernTemplate;