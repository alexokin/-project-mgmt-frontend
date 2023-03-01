import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { GET_CLIENTS, GET_PROJECTS } from "../services/graphql.service";
import Spinner from "./spinner";

export default function ProjectAdd() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  // Get clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  function handleSubmit(ev) {
    ev.preventDefault();
    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields");
    }

    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  }

  if (loading) return null;
  if (error) return "Something Went Wrong";

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#AddProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="AddProjectModal"
            aria-labelledby="AddProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="AddProjectModalLabel">
                    New Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
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
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        onChange={(ev) => setClientId(ev.target.value)}
                        value={clientId}
                        className="form-select"
                        id="clientId"
                      >
                        <option value="">Select Client</option>
                        {
                            data.clients.map((client) => (
                                <option value={client.id} key={clientId.id}>
                                    {client.name}
                                </option>
                            ))
                        }
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
