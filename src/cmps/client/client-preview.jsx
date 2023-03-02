import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import {
  DELETE_CLIENT,
  GET_CLIENTS,
  GET_PROJECTS,
} from "../../services/graphql.service";

export default function ClientPreview({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
