import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { 
    createUserWithEmailAndPassword,
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { AuthContext } from '../context/useAuthContext';

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                sessionStorage.setItem("user", JSON.stringify(currentUser));
                setUser(currentUser);
            } else {
                sessionStorage.removeItem("user");
                setUser(null);
            }
            setLoading(false);
        });

        return () => listener();
    }, []);

    useEffect(() => {
        const sessionUser = sessionStorage.getItem("user");
        if (sessionUser) {
            setUser(JSON.parse(sessionUser));
        }
    }, []);

    const handleAuthError = (error) => {
        console.error(error);
        const errorCode = error.code;

        const errorMessages = {
            "auth/email-already-in-use": "This email is already registered.",
            "auth/invalid-email": "Invalid email address.",
            "auth/weak-password": "Password should be at least 6 characters.",
            "auth/user-not-found": "No account found with this email.",
            "auth/wrong-password": "Incorrect password.",
            "auth/popup-closed-by-user": "Popup closed before authentication.",
            "auth/network-request-failed": "Network error. Please check your connection.",
            default: "Authentication failed. Please try again."
        };

        toast.error(errorMessages[errorCode] || errorMessages.default);
    };

    const signup = async (name, email, password) => {
        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                authProvider: "local",
                email,
                name,
            });
            sessionStorage.setItem("user", JSON.stringify(res.user));
            navigate("/");
        } catch (err) {
            handleAuthError(err);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password, closeModal) => {
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            setUser(res.user);
            sessionStorage.setItem("user", JSON.stringify(res.user));
            closeModal();
        } catch (err) {
            handleAuthError(err);
        } finally {
            setLoading(false);
        }
    };

    const googleAuth = async (closeModal) => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
            const user = res.user;
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    authProvider: "google",
                    email: user.email,
                    name: user.displayName,
                });
            }
            sessionStorage.setItem("user", JSON.stringify(user));
            setUser(user)
            closeModal();
        } catch (err) {
            handleAuthError(err);
        } finally {
            setLoading(false);
        }
    };  

    const logout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setUser(null);
            sessionStorage.removeItem("user");
        } catch (err) {
            handleAuthError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            signup,
            login,
            googleAuth,
            logout,
            loading,
            isModalOpen,
            setModalOpen
        }} >
            {children}
        </AuthContext.Provider>
    )
}