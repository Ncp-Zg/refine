import { AuthProvider } from "@pankod/refine-core";
import { notification } from "@pankod/refine-antd";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "firebaseConfig";



export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
    login: async ({ email, password }) => {

        const auth = getAuth(firebaseApp);
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    if (user) {
        localStorage.setItem(TOKEN_KEY, `${email}-${password}`);
        return Promise.resolve(); 
    }
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

        // if(email === "a@test.co"){
        //    localStorage.setItem(TOKEN_KEY, `${email}-${password}`);
        //     return Promise.resolve(); 
        // }
        // else return
        
    },
    register: async ({ email, password }) => {
        try {
            await authProvider.login({ email, password });
            return Promise.resolve();
        } catch (error) {
            return Promise.reject();
        }
    },
    updatePassword: async () => {
        notification.success({
            message: "Updated Password",
            description: "Password updated successfully",
        });
        return Promise.resolve();
    },
    forgotPassword: async ({ email }) => {
        notification.success({
            message: "Reset Password",
            description: `Reset password link sent to "${email}"`,
        });
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return Promise.reject();
        }

        return Promise.resolve({
            id: 1,
            name: "James Sullivan",
            avatar: "https://i.pravatar.cc/150",
        });
    },
};