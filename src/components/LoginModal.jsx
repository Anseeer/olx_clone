// import React, { useState, useEffect } from "react";
// import useAuthContext from "../context/useAuthContext";
// import { toast } from "react-toastify";


// const slides = [
//     {
//         id: 1,
//         image: "https://statics.olx.in/external/base/img/loginEntryPointPost.webp",
//         text: "Help us become one of the safest places to buy and sell",
//     },
//     {
//         id: 2,
//         image: "https://statics.olx.in/external/base/img/loginEntryPointFavorite.webp",
//         text: "Find great deals on vehicles, hassle-free",
//     },
//     {
//         id: 3,
//         image: "https://statics.olx.in/external/base/img/loginEntryPointChat.webp",
//         text: "Buy or sell properties easily and securely",
//     },
// ];

// export const LoginModal = ({ isOpen, onClose }) => {

//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [loginMode, setLoginMode] = useState("Google");
//     const [authUser, setAuthUSer] = useState({
//         email: "",
//         password: ""
//     })
//     const { googleAuth, login, loading } = useAuthContext();

//     const handleChange = (e) => {
//         setAuthUSer({ ...authUser, [e.target.name]: e.target.value });
//       };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!(/^[a-zA-Z0-9_.+-]+[\x40][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(authUser.email))) {
//             return toast.error("Email or password doesn't match");
//         }

//         if (authUser.password.trim() == "") {
//             return toast.error("Email or password doesn't match");
//         }

//         await login(authUser.email, authUser.password, onClose);
//     }

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prev) => (prev + 1) % slides.length);
//         }, 3000);
//         return () => clearInterval(interval);
//     }, []);
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-[#000000d4] bg-opacity-50 z-50">
//             <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
//                 <button
//                     onClick={onClose}
//                     className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl cursor-pointer"
//                 >
//                     X
//                 </button>

//                 <div className="flex justify-center">
//                     <img src={slides[currentSlide].image} alt="Slide" className="w-24 h-24" />
//                 </div>

//                 <h3 className="text-center text-lg font-medium mt-4 mb-5">
//                     {slides[currentSlide].text}
//                 </h3>

//                 <div className="flex justify-center space-x-2 mt-2">
//                     {slides.map((_, index) => (
//                         <span
//                             key={index}
//                             className={`w-2 h-2 mx-1 rounded-full ${currentSlide === index ? "bg-teal-500" : "bg-gray-300"
//                                 }`}
//                         ></span>
//                     ))}
//                 </div>

//                 {loginMode == "Google" ? (
//                     <div className="mt-6 space-y-3">
//                     <button
//                         onClick={() => googleAuth(onClose)} 
//                         className="w-full border border-gray-300 gap-2 flex items-center justify-center py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
//                         <svg className="w-4 h-4" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
//                             <g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
//                             <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
//                             <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
//                             <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
//                             </path><path fill="none" d="M0 0h48v48H0z"></path>
//                             </g>
//                         </svg>
//                         <span>Continue with Google</span>
//                     </button>
//                 </div>
//                 ): (
//                     <form className="flex flex-col w-full gap-2 my-5" onSubmit={handleSubmit}>
//                         <label htmlFor="email">Email</label>
//                         <input className="border rounded py-1 px-2" placeholder="Email" type="text" name="email" id="email" onChange={handleChange}/>

//                         <label htmlFor="password">Password</label>
//                         <input className="border rounded py-1 px-2" placeholder="Password" type="password" name="password" id="password" onChange={handleChange} />
                        
//                         <button type="submit" className={`w-full bg-blue-600 py-2 px-3 rounded text-white mt-2 cursor-${loading ? 'not-allowed': 'pointer'}`} disabled={loading}>{loading ? 'Logging..': 'Login'}</button>
//                     </form>
//                 )}

//                 <div className="text-center my-3 text-gray-500">OR</div>

//                 <div className="text-center">
//                     <button disabled={loading} className="text-black font-semibold hover:underline cursor-pointer" onClick={() => {
//                         loginMode == "Google" ? setLoginMode("Email"): setLoginMode("Google");
//                     }}>
//                         Login with {loginMode == "Google" ? "Email" : "Google"}
//                     </button>
//                 </div>
//                 <p className="text-xs text-center text-gray-500 mt-4">
//                     All your personal details are safe with us.
//                 </p>
//                 <p className="text-xs text-center text-gray-500 mt-1">
//                     If you continue, you are accepting{" "}
//                     <a href="#" className="text-blue-600 hover:underline">
//                         OLX Terms and Conditions
//                     </a>{" "}
//                     and{" "}
//                     <a href="#" className="text-blue-600 hover:underline">
//                         Privacy Policy
//                     </a>
//                     .
//                 </p>
//             </div>
//         </div>
//     );
// };



import React, { useState, useEffect } from "react";
import useAuthContext from "../context/useAuthContext";
import { toast } from "react-toastify";

const slides = [
  {
    id: 1,
    image: "https://statics.olx.in/external/base/img/loginEntryPointPost.webp",
    text: "Help us become one of the safest places to buy and sell",
  },
  {
    id: 2,
    image: "https://statics.olx.in/external/base/img/loginEntryPointFavorite.webp",
    text: "Find great deals on vehicles, hassle-free",
  },
  {
    id: 3,
    image: "https://statics.olx.in/external/base/img/loginEntryPointChat.webp",
    text: "Buy or sell properties easily and securely",
  },
];

export const LoginModal = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { login, signup, googleAuth, loading } = useAuthContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, password } = formData;
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Invalid email address.");
      return false;
    }

    if (password.trim() === "") {
      toast.error("Password is required.");
      return false;
    }

    if (mode === "signup" && name.trim() === "") {
      toast.error("Name is required for signup.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (mode === "login") {
      await login(formData.email, formData.password, onClose);
    } else {
      await signup(formData.name, formData.email, formData.password);
      onClose(); // optional: auto close after signup
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000d4] z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl cursor-pointer"
        >
          X
        </button>

        <div className="flex justify-center">
          <img
            src={slides[currentSlide].image}
            alt="Slide"
            className="w-24 h-24"
          />
        </div>

        <h3 className="text-center text-lg font-medium mt-4 mb-5">
          {slides[currentSlide].text}
        </h3>

        <div className="flex justify-center space-x-2 mt-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 mx-1 rounded-full ${
                currentSlide === index ? "bg-teal-500" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>

        <form className="flex flex-col gap-3 mt-6" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <label htmlFor="name">Name</label>
              <input
                className="border rounded py-1 px-2"
                placeholder="Your Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </>
          )}

          <label htmlFor="email">Email</label>
          <input
            className="border rounded py-1 px-2"
            placeholder="Email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            className="border rounded py-1 px-2"
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 text-white py-2 rounded hover:bg-teal-700 mt-2"
          >
            {loading ? "Processing..." : mode === "login" ? "Login" : "Signup"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer underline"
                onClick={() => setMode("signup")}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer underline"
                onClick={() => setMode("login")}
              >
                Log In
              </span>
            </>
          )}
        </p>

        <div className="mt-6">
          <button
            onClick={() => googleAuth(onClose)}
            className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded hover:bg-gray-100"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <g>
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </g>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};
