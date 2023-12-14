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
                "18-39": "18-39",
                "40-59": "40-59",
                "60-79": "60-79",
                "80+": "80+",
                "I prefer not to say":"I prefer not to say"
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
                "0 - 1 year": "0 - 1 year",
                "1 - 3 years": "1 - 3 years",
                "3 - 5 years": "3 - 5 years",
                "> 5 years": "> 5 years",
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
                acceptedFiles: ["image/*"],
                storeUrl: true 
            }
        }),
        interests: {
          name: "interests",
          validation: { required: false },
          dataType: "array",
          of: {
              dataType: "string",
              enumValues: {
                Hemodialysis: "Hemodialysis",
                KidneyBasics: "Kidney Basics",
                Nutrition: "Nutrition",
                PatientStory: "Patient Story",
                MedicalHealthSupport: "Medical Health Support",
                TaxationAndPrograms: "Taxation and Programs",
                Diabetes: "Diabetes",
                WeightManagement: "Weight Management",
            }
          }
      },
        description: {
            name: "Description",
            dataType: "string",
            markdown: true,
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
                Travel: "Travel",
                Hemodialysis: "Hemodialysis",
                Medication: "Medication",
                RenalProgram: "Renal Program",
                WeightManagement: "Weight Management",
                MentalHealth: "Mental Health",
                KidneyFailure: "Kidney Failure",
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