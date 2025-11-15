import React from "react";
import { Link } from "react-router-dom";

// Reusable product card component that displays product information
const ProductCard = ({ id, title, description, price, label }) => {
    return (
        // Card container with custom CSS class
        <div className="product-card">
            <div className="product-card-content">
                {/* Product thumbnail/icon - currently displays first letter of title */}
                <div className="product-thumbnail">
                    {title.charAt(0)}
                </div>

                <div className="product-info">
                    {/* Optional label badge (e.g., "New", "Featured") */}
                    {label && <span className="product-badge">{label}</span>}
                    
                    {/* Clickable product title that navigates to product detail page */}
                    <Link to={`/product/${id}`} className="product-title">
                        {title}
                    </Link>
                    
                    {/* Product description text */}
                    <p className="product-description">{description}</p>

                    {/* Price and navigation arrow - aligned at bottom of card */}
                    <div className="product-footer">
                        {/* Price display */}
                        <div className="product-price">
                            From <strong>{price}</strong>
                        </div>
                        
                        {/* Arrow icon link to product detail page */}
                        <Link
                            to={`/product/${id}`}
                            className="product-arrow"
                            aria-label={`View ${title}`}
                        >
                            →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;