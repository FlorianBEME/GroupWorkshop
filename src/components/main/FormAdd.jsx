import { useState } from "react";

function FormAdd({ submitData }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    skills: [],
  });

  const [skills, setSkills] = useState([
    { title: "HTML" },
    { title: "CSS" },
    { title: "React" },
    { title: "JS" },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addAndRemoveSkills = (el, e) => {
    if (e.target.checked) {
      !formData.skills.filter((skill) => skill.title === el.title).length > 0 &&
        setFormData({ ...formData, skills: [...formData.skills, { ...el }] });
    } else {
      setFormData({
        ...formData,
        skills: formData.skills.filter((skill) => skill.title !== el.title),
      });
    }
  };

  return (
    <section className="list">
      <div className="list-container">
        <h2>Ajout d'un nouveau wilder</h2>
        <form
          onSubmit={(e) => submitData(e, formData)}
          className="w-full space-y-6"
          method="POST"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                onChange={(e) => handleChange(e)}
                type="text"
                // required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block  text-lg font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                onChange={(e) => handleChange(e)}
                type="text"
                // required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <label
            htmlFor=""
            className="block  text-lg font-medium text-gray-700"
          >
            Skills
          </label>
          <div className="relative flex flex-row items-center space-x-5">
            {skills.map((el, index) => {
              return (
                <div className="flex items-center " key={index}>
                  <div className="flex items-center h-5">
                    <input
                      onChange={(e) => addAndRemoveSkills(el, e)}
                      id={"skills" + index}
                      name="skills"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3  text-lg">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-700"
                    >
                      {el.title}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="bg-red-400 p-2 rounded-lg text-white">
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}

export default FormAdd;
