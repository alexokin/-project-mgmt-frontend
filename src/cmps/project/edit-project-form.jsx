import { useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_PROJECT, UPDATE_PROJECT } from "../../services/graphql.service";

export default function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [
      {
        query: GET_PROJECT,
        variables: {
          id: project.id,
        },
      },
    ],
  });

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!name || !description || !status) {
      return alert("Please fill out all fields");
    }
    updateProject(name, description, status);
  }

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name </label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(ev) => {
              setName(ev.target.value);
            }}
            id="name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description </label>
          <textarea
            className="form-control"
            value={description}
            onChange={(ev) => {
              setDescription(ev.target.value);
            }}
            id="description"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            onChange={(ev) => setStatus(ev.target.value)}
            value={status}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
