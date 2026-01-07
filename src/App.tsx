import React from "react";
import Routing from "./routes/routes";
import MuiThemeProvider from "./theme/ThemeProvider";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MuiThemeProvider>
            <Routing />
          </MuiThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
