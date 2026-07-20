import { useState, useEffect, useRef } from "react";
import api from "../../services/api";

function DepartmentModal({
  show,
  onClose,
  fetchDepartments,
  isEdit,
  selectedDepartment,
}) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([""]);
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const modalBodyRef = useRef(null);

  useEffect(() => {

    if (show) {

      if (isEdit && selectedDepartment) {

        setName(selectedDepartment.name);
        setDescription(selectedDepartment.description);
        setPosts(selectedDepartment.posts || [""]);
        setIsActive(selectedDepartment.isActive);

      } else {

        setName("");
        setDescription("");
        setPosts([""]);
        setIsActive(true);

      }

      setSubmitted(false);

    }

  }, [show, isEdit, selectedDepartment]);


  useEffect(() => {
  if (show) {
    setTimeout(() => {
      modalBodyRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  }
}, [show]);


  const handleSubmit = async () => {

  setSubmitted(true);

  if (
    !name ||
    !description ||
    posts.some((post) => post.trim() === "")
  ) {
    return;
  }

  try {

    setLoading(true);

    const token = localStorage.getItem("token");

    const data = {
      name,
      description,
      posts,
      isActive,
    };

    if (isEdit) {

      await api.put(
        `/admin/departments/${selectedDepartment._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } else {

      await api.post(
        "/admin/departments",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    }

    await fetchDepartments();
       setName("");
       setDescription("");
       setPosts([""]);
       setIsActive(true);
       setSubmitted(false);

       onClose();

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Something went wrong."
    );

  } finally {

    setLoading(false);

  }

};

  if (!show) return null;
  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

   <div className="w-full max-w-3xl max-h-[90vh] rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl flex flex-col">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-700 px-6 py-5">

        <div>

          <h2 className="text-2xl font-bold text-white">

            {isEdit
              ? "Edit Department"
              : "Add Department"}

          </h2>

          <p className="mt-1 text-sm text-gray-400">

            {isEdit
              ? "Update department information."
              : "Create a new department."}

          </p>

        </div>

        <button
         onClick={() => {

  setName("");
  setDescription("");
  setPosts([""]);
  setIsActive(true);

  onClose();

}}
          className="rounded-lg bg-slate-800 px-3 py-2 text-white hover:bg-slate-700"
        >
          ✕
        </button>

      </div>

      {/* Body */}

     <div
     ref={modalBodyRef}
      className="space-y-6 p-6 max-h-[70vh] overflow-y-auto"
      >

        {/* Department Name */}

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-300">

            Department Name *

          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter department name"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
          />

          {submitted && !name && (
            <p className="mt-2 text-sm text-red-400">
              Department name is required.
            </p>
          )}

        </div>

        {/* Description */}

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-300">

            Description *

          </label>

          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter department description"
            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
          />

          {submitted && !description && (
            <p className="mt-2 text-sm text-red-400">
              Description is required.
            </p>
          )}

        </div>

                {/* Department Posts */}

        <div>

          <div className="mb-3 flex items-center justify-between">

            <label className="text-sm font-medium text-gray-300">
              Department Posts *
            </label>

            <button
              type="button"
              onClick={() => setPosts([...posts, ""])}
              className="rounded-lg bg-cyan-600 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-700"
            >
              + Add Post
            </button>

          </div>

          <div className="space-y-3">

            {posts.map((post, index) => (

              <div
                key={index}
                className="flex items-center gap-3"
              >

                <input
                  type="text"
                  value={post}
                  placeholder={`Post ${index + 1}`}
                  onChange={(e) => {

                    const updatedPosts = [...posts];
                    updatedPosts[index] = e.target.value;
                    setPosts(updatedPosts);

                  }}
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
                />

                {posts.length > 1 && (

                  <button
                    type="button"
                    onClick={() => {

                      const updatedPosts =
                        posts.filter(
                          (_, i) => i !== index
                        );

                      setPosts(updatedPosts);

                    }}
                    className="rounded-lg bg-red-600 px-4 py-3 text-white hover:bg-red-700"
                  >
                    Remove
                  </button>

                )}

              </div>

            ))}

          </div>

          {submitted &&
            posts.some(
              (post) => post.trim() === ""
            ) && (
              <p className="mt-2 text-sm text-red-400">
                Please fill all post names.
              </p>
            )}

        </div>

        {/* Department Status */}

        <div>

          <label className="mb-3 block text-sm font-medium text-gray-300">
            Department Status
          </label>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) =>
                setIsActive(e.target.checked)
              }
              className="h-5 w-5 accent-cyan-600"
            />

            <span className="text-white">
              Active Department
            </span>

          </label>

        </div>
         </div>
        {/* Footer */}

<div className="flex items-center justify-end gap-3 border-t border-slate-700 px-6 py-5">

  <button
  onClick={() => {

    setName("");
    setDescription("");
    setPosts([""]);
    setIsActive(true);

    onClose();

  }}
  className="rounded-xl bg-slate-700 px-6 py-3 font-medium text-white hover:bg-slate-600"
>
  Cancel
</button>

  <button
    disabled={loading}
    onClick={handleSubmit}
    className="rounded-xl bg-cyan-600 px-6 py-3 font-medium text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
  >

    {loading ? (

      <div className="flex items-center gap-2">

        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>

        <span>Saving...</span>

      </div>

    ) : (

      isEdit
        ? "Update Department"
        : "Add Department"

    )}

  </button>

</div>


     
          </div>

  </div>

);
}

export default DepartmentModal;

