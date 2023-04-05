import React, { useCallback } from "react";

import { User as FirebaseUser } from "firebase/auth";
import {
    Authenticator,
    buildCollection,
    buildProperty,
    EntityReference,
    FirebaseCMSApp,
    FirebaseSignInProvider
} from "firecms";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";
// TODO: Replace with your config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId:  import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID
};

// const firebaseConfig = {
//   apiKey:import.meta.env.FIREBASE_API_KEY,
//   authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.FIREBASE_PROJECT_ID,
//   storageBucket:import.meta.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId:  import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.FIREBASE_APP_ID
// };

const locales = {
    "en-US": "English (United States)",
};

type Blog = {
    age: string;
    author: string;
    care: string;
    date: Date;
    image: string;
    tags: string[];
    interests: string[];
    timeToRead: number;
    title: string,
    description: string
}


const blogsCollection = buildCollection<Blog>({
    name: "blogs",
    singularName: "Blog",
    path: "blogs",
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        // we have created the roles object in the navigation builder
        delete: false
    }),
    properties: {
        age: {
            name: "age",
            validation: { required: true },
            dataType: "string"
        },
        author: {
            name: "author",
            validation: {
                required: true,
            },
            dataType: "string"
        },
        care: {
            name: "care",
            validation: { required: true },
            dataType: "string",
        },
        date: {
            dataType: "date",
            name: "date",
        },
        image: buildProperty({ 
            name: "Image",
            dataType: "string",
            storage: {
                storagePath: "images",
                acceptedFiles: ["image/*"]
            }
        }),
        tags: {
            name: "tags",
            validation: { required: true },
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
        interests: {
          name: "interests",
          validation: { required: true },
          dataType: "array",
          of: {
              dataType: "string"
          }
      },
        description: {
            name: "Description",
            dataType: "string",
            columnWidth: 300
        },
        timeToRead: {
            name: "timeToRead",
            validation: { required: true },
            dataType: "number",
        },
        title: {
            name: "title",
            dataType: "string",
        }
    }
});

export default function App() {
  const DEFAULT_OPTION: FirebaseSignInProvider = "password";
    const signInOptions = [ DEFAULT_OPTION ];

    const myAuthenticator: Authenticator<FirebaseUser> = useCallback(async ({
                                                                    user,
                                                                    authController
                                                                }) => {

        return true;
    }, []);

    return <FirebaseCMSApp
        name={"CDIC"}
        authentication={myAuthenticator}
        signInOptions={signInOptions}
        collections={[blogsCollection]}
        firebaseConfig={firebaseConfig}
    />;
}