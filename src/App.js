import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/Router/Router";
import { initialState } from "./Reducer";
import { reducer } from "./Reducer";
import { DataLayer } from "./DataLayer";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
} from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const httpLink = new HttpLink({
  uri: "https://aiclass-graphql-endpoint.herokuapp.com/",
  // uri: "http://localhost:4000/",
});

const wsLink = new WebSocketLink({
  uri: "wss://aiclass-graphql-endpoint.herokuapp.com/graphql",
  // uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <DataLayer initialstate={initialState} reducer={reducer}>
        <BrowserRouter>
          <div className="App">
            <AppRouter />
            <ToastContainer />
          </div>
        </BrowserRouter>
      </DataLayer>
    </ApolloProvider>
  );
}

export default App;
