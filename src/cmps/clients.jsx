import { gql, useQuery } from "@apollo/client";
import ClientPreview from "./client-preview";
import  Spinner  from "./spinner";
import { GET_CLIENTS } from "../services/query.service";


export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner/>;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientPreview key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
