

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";

import "@pankod/refine-antd/dist/styles.min.css";
import routerProvider from "@pankod/refine-react-router-v6";

import dataProvider from "@pankod/refine-simple-rest";
import { authProvider } from "authProvider";
import { PostCreate, PostEdit, PostList, PostShow } from "pages/posts";
import { AuthPage } from "pages/auth";

function App() {
  return (
    <Refine
      //@ts-ignore  
    // dataProvider={firestoreDatabase.getDataProvider()}
      authProvider={authProvider}
      dataProvider={dataProvider("")}
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={routerProvider}
      LoginPage={() => (
        <AuthPage
            type="login"
            formProps={{
                initialValues: {
                    email: "demo@refine.dev",
                    password: "demodemo",
                },
            }}
        />
    )}
      resources= {[
        {
          name : "posts",
          list: PostList,
          show: PostShow,
          create: PostCreate,
          edit: PostEdit,
        }
      ]}
    />
    
  );
}

export default App;
