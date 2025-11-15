import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext";
import ProductSection from "./components/ProductSection";
import ProductDetail from "./components/ProductDetail";
import './App.css';

/**
 * App Component
 * Main application entry point that handles routing and layout
 */
function App() {
    console.log("App loaded");
    
    return (
        // ProductProvider: Makes product data available globally via context
        <ProductProvider>
            <Router>
                {/* Routes: Container for all route definitions */}
                <Routes>
                    {/* Home Page Route - displays marketplace with product sections */}
                    <Route path="/" element={
                        <div className="marketplace-container">
                            {/* Page Header - displays marketplace branding and description */}
                            <header className="marketplace-header">
                                <h1>Marketplace</h1>
                                <p>Your one-stop marketplace for electronic products, and software.</p>
                            </header>

                            {/* Product Sections - now use context instead of props */}
                            <ProductSection
                                title="Recommended for you"
                                category="recommended"
                            />
                            
                            <ProductSection
                                title="Popular"
                                category="popular"
                            />
                            
                            <ProductSection
                                title="Marketing"
                                category="marketing"
                            />
                        </div>
                    } />

                    {/* Product Detail Route - displays individual product information */}
                    {/* :id is a dynamic URL parameter (e.g., /product/woocommerce) */}
                    <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>
            </Router>
        </ProductProvider>
    );
}

export default App;