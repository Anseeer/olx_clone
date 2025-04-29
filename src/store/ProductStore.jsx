import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, getDoc, doc } from "firebase/firestore"
import { ProductContext } from '../context/useProductContext'
import { db } from '../config/firebase'
import { toast } from 'react-toastify'
import axios from 'axios'

export const ProductProvider = ({ children }) => {
    const [adding, setAdding] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productList);
            } catch (error) {
                setProducts([]);
                console.error("Error fetching data:", error);
                toast.error("Failed to load products. Please try again.");
            } finally {
                setAdding(false);
            }
        };

        fetchData();
    }, []);

    const uploadToCloudinary = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", import.meta.env.VITE_CLOUD_PRESET);
    
            const cloudName = import.meta.env.VITE_CLOUD_NAME;
    
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
    
            return res.data.secure_url;
        } catch (error) {
            console.error("Upload Error:", error.response?.data || error.message);
            toast.error("Something went wrong");
            return null;
        }
    };
    

    const addProduct = async (product, images, setProduct, setImages) => {
        setAdding(true)
        try {
            const imageUrls = await Promise.all(
                images.map((img) => uploadToCloudinary(img))
            );

            if (imageUrls.length < 0) return

            await addDoc(collection(db, 'products'), {
                ...product,
                price: Number(product.price),
                images: imageUrls,
                createdAt: new Date(),
            });

            toast.success('Product added successfully!');
            setProduct({
                title: '',
                description: '',
                category: '',
                price: '',
                location: '',
            });
            setImages([]);
        } catch (error) {
            console.error(error);
            toast.success('Something went wrong!');
        } finally {
            setAdding(false);
        }
    };

    const fetchProductById = async (productId) => {
        try {
            const docRef = doc(db, "products", productId);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const product = { id: docSnap.id, ...docSnap.data() };
                return product;
            } else {
                console.error("No such product exists!");
                toast.error("Product not found.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            toast.error("Failed to load product. Please try again.");
            return null;
        }
    };

    return (
        <ProductContext.Provider value={{
            adding,
            products,
            uploadToCloudinary,
            addProduct,
            fetchProductById
        }}>
            {children}
        </ProductContext.Provider>
    )
}