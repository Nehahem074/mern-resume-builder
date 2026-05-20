function MinimalTemplate({ resume }) {

  return (
    <div className="bg-white p-12">

      <h1 className="text-5xl font-light mb-3">
        {resume.fullName}
      </h1>

      <p className="text-gray-600 mb-10">
        {resume.email} | {resume.phone}
      </p>



      <section className="mb-8">

        <h2 className="uppercase tracking-widest text-gray-500 mb-3">
          Summary
        </h2>

        <p>{resume.summary}</p>

      </section>



      <section>

        <h2 className="uppercase tracking-widest text-gray-500 mb-3">
          Skills
        </h2>

        <p>
          {resume.skills.join(", ")}
        </p>

      </section>

    </div>
  );
}

export default MinimalTemplate;