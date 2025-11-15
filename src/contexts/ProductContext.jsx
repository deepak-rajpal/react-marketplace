import React, { createContext, useContext } from "react";
import productsData from "../data/products.json";

// Create the context
const ProductContext = createContext();

/**
 * ProductProvider Component
 * Wraps the application and provides product data globally
 */
export const ProductProvider = ({ children }) => {
    // Combine all products into a single searchable array
    const allProducts = [
        ...productsData.recommended,
        ...productsData.popular,
        ...productsData.marketing
    ];

    // Context value containing all product data
    const value = {
        recommended: productsData.recommended,
        popular: productsData.popular,
        marketing: productsData.marketing,
        allProducts,
        // Helper function to find product by ID
        getProductById: (id) => {
            return allProducts.find(
                p => p.id === id || p.id === Number(id) || String(p.id) === id
            );
        }
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

/**
 * Custom hook to use product context
 * Throws error if used outside of ProductProvider
 */
export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
};
