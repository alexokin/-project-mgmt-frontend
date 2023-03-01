import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT, GET_CLIENTS } from "../services/query.service";

export default function ClientAdd() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  function handleSubmit(ev) {
    ev.preventDefault();
    if (name === "" || email === "" || phone === "") {
      return alert("Please fill in all fields");
    }
    addClient(name, email, phone);
    setName('')
    setEmail('')
    setPhone('')
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#AddClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="AddClientModal"
        aria-labelledby="AddClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="AddClientModalLabel">
                Add Client
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
                    type="text"
                    value={name}
                    onChange={(ev) => {
                      setName(ev.target.value);
                    }}
                    id="name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(ev) => {
                      setEmail(ev.target.value);
                    }}
                    id="email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(ev) => {
                      setPhone(ev.target.value);
                    }}
                    id="phone"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary"
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
  );
}
