import Header from "./cmps/header";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Clients from "./cmps/clients";
import  ClientAdd  from "./cmps/client-add";
import  Projects  from "./cmps/projects";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <ClientAdd/>
          <Projects/>
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
