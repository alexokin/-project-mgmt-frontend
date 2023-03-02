import Header from "./cmps/header";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import NotFound from "./pages/not-found";
import ProjectDetails from './pages/project-details'

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

// const BASE_URL = process.env.NODE_ENV === 'production'
//     ? '/graphql'
//     : '//localhost:5000/graphql/'

const client = new ApolloClient({
  uri: '/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="*" element={<NotFound/>}/>
              <Route path="/project/:id" element={<ProjectDetails/>}/>
              
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
