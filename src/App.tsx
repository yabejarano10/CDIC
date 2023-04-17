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

const locales = {
    "en-US": "English (United States)",
};

type Blog = {
    age: string;
    author: string;
    care: string;
    date: Date;
    image: string;
    interests: string[];
    timeToRead: number;
    title: string,
    description: string,
    category: string,
    trending: boolean
}


const blogsCollection = buildCollection<Blog>({
    name: "blogs",
    singularName: "Blog",
    path: "blogs",
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        delete: true
    }),
    properties: {
        age: {
            name: "age",
            validation: { required: false },
            dataType: "string",
            enumValues: {
                age1: "18-39",
                age2: "40-59",
                age3: "60-79",
                age4: "80+",
                age5:"I prefer not to say"
            }
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
            validation: { required: false },
            dataType: "string",
            enumValues: {
                range1: "0 - 1 year",
                range2: "1 - 3 years",
                range3: "3 - 5 years",
                range4: "> 5 years",
            }
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
        interests: {
          name: "interests",
          validation: { required: false },
          dataType: "array",
          of: {
              dataType: "string",
              enumValues: {
                int1: "Hemodialysis",
                int2: "Kidney Basics",
                int3: "Nutrition",
                int4: "Patient Story",
                int5: "Medical Health Support",
                int6: "Taxation & Programs",
                int7: "Diabetes",
                int8: "Weight Management",
            }
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
        },
        category: {
            name: "category",
            dataType: "string",
            enumValues: {
                cat1: "Travel",
                cat2: "Hemodialysis",
                cat3: "Medication",
                cat4: "Renal Program",
                cat5: "Weight Management",
                cat6: "Mental Health",
                cat7: "Travel",
                cat8: "Kidney Failure",
            }
        },
        trending: {
            name: "trending",
            dataType: "boolean",
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