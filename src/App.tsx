import React from 'react';
import { Admin, Resource } from "react-admin";
import WorkspaceList from "./workspace/WorkspaceList";
import dataProvider from "./dataProvider/dataProvider";
import authProvider from "./authProvider/authProvider";
import WorkspaceShow from "./workspace/WorkspaceShow";
import WorkspaceCreate from "./workspace/WorkspaceCreate";

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name={'workspace'} list={WorkspaceList} show={WorkspaceShow} create={WorkspaceCreate}/>
    </Admin>
  );
}

export default App;
