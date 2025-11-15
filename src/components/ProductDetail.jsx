import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";

/**
 * ProductDetail Component
 * Displays detailed information about a single product
 * Now uses context instead of importing products.json directly
 */
const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Get product using context helper function
    const { getProductById } = useProducts();
    const product = getProductById(id);

    // Handle case when product doesn't exist
    if (!product) {
        return (
            <div className="product-detail-container">
                <div className="alert">
                    Product not found
                </div>
                <button className="btn-primary" onClick={() => navigate("/")} >
                    Back to Home
                </button>
            </div>
        );
    }

    // Render product detail page
    return (
        <div className="product-detail-container">
            {/* Back button - returns user to marketplace home */}
            <button className="back-button" onClick={() => navigate("/")}>
                ← Back to Marketplace
            </button>

            <div className="product-detail-grid">
                {/* Left: Product Preview */}
                <div className="product-preview">
                    <div className="preview-placeholder">
                        <span>Product Preview</span>
                    </div>
                </div>

                {/* Right: Product Information */}
                <div className="product-info-section">
                    {/* Badge */}
                    {product.label && (
                        <span className="product-detail-badge">{product.label}</span>
                    )}
                    
                    {/* Title */}
                    <h1 className="product-detail-title">{product.title}</h1>
                    
                    {/* Description */}
                    <p className="product-detail-description">{product.description}</p>

                    {/* Price Card */}
                    <div className="price-card">
                        <div className="price-card-content">
                            <div className="price-info">
                                <span className="price-label">Starting at</span>
                                <h3 className="price-value">{product.price}</h3>
                            </div>
                            <button className="btn-primary">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* About Card */}
                    <div className="info-card">
                        <div className="info-card-header">
                            <h2>About this product</h2>
                        </div>
                        <div className="info-card-body">
                            <p>{product.description}</p>
                            <ul className="info-list">
                                <li className="info-list-item">
                                    <span className="info-list-label">Category:</span>
                                    <span className="info-list-value">{product.category || "General"}</span>
                                </li>
                                <li className="info-list-item">
                                    <span className="info-list-label">Product ID:</span>
                                    <span className="info-list-value">{product.id}</span>
                                </li>
                                {product.compatibility && (
                                    <li className="info-list-item">
                                        <span className="info-list-label">Compatibility:</span>
                                        <span className="info-list-value">{product.compatibility}</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Features Section */}
                    {product.features && product.features.length > 0 && (
                        <div className="info-card">
                            <div className="info-card-header">
                                <h2>Key Features</h2>
                            </div>
                            <div className="info-card-body">
                                <div className="features-grid">
                                    {product.features.map((feature, index) => (
                                        <div className="feature-item" key={index}>
                                            <div className="feature-icon">{feature.icon}</div>
                                            <h3 className="feature-title">{feature.title}</h3>
                                            <p className="feature-description">
                                                {feature.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;