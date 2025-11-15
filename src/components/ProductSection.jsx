import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";
import ProductCard from "./ProductCard";

/**
 * Helper function: Splits an array into smaller chunks of size `n`
 * Example: chunk([1,2,3,4], 2) → [[1,2], [3,4]]
 */
const chunk = (arr, n) => {
    const res = [];
    for (let i = 0; i < arr.length; i += n) res.push(arr.slice(i, i + n));
    return res;
};

/**
 * ProductSection component
 * - Renders a section of products with a title (e.g. "Recommended" or "Popular")
 * - Uses carousel layout for "Recommended" products
 * - Uses grid layout for other categories like "Popular" or "Marketing"
 */
const ProductSection = ({ title, description, category }) => {
    // Get product data from context based on category
    const products = useProducts()[category];

    // Check if this section is "Recommended"
    const isRecommended = title.toLowerCase().includes("recommended");

    // For Recommended section: group products into sets of 2 for carousel slides
    const slides = isRecommended ? chunk(products, 2) : [];
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section className="product-section">
            {/* Section header: Title + optional description */}
            <div className="section-header">
                <div>
                    <h2 className="section-title">{title}</h2>
                    {description && <p className="section-description">{description}</p>}
                </div>
            </div>

            {isRecommended ? (
                /**
                 * CASE 1: Recommended → Render custom Carousel
                 * Each carousel slide contains 2 product cards
                 */
                <div className="carousel-container">
                    <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {slides.map((group, idx) => (
                            <div key={idx} className="carousel-slide">
                                {group.map((product) => (
                                    <div key={product.id} className="recommended-card">
                                        <div className="recommended-content">
                                            <span className="recommended-badge">
                                                {product.label || "Recommended"}
                                            </span>

                                            {/* Make title clickable */}
                                            <Link
                                                to={`/product/${product.id}`}
                                                className="recommended-title"
                                            >
                                                {product.title}
                                            </Link>

                                            <p className="recommended-description">{product.description}</p>

                                            <div className="recommended-actions">
                                                <button className="btn-install">Install</button>
                                                <div className="recommended-price">{product.price}</div>
                                            </div>
                                        </div>

                                        {/* Right section: preview placeholder */}
                                        <div className="recommended-preview">
                                            <span>Preview</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Carousel controls (prev/next buttons) */}
                    <div className="carousel-controls">
                        <button
                            className="carousel-btn"
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            aria-label="Previous slide"
                        >
                            ←
                        </button>
                        <button
                            className="carousel-btn"
                            onClick={nextSlide}
                            disabled={currentSlide === slides.length - 1}
                            aria-label="Next slide"
                        >
                            →
                        </button>
                    </div>

                    {/* Carousel indicators (dots at bottom) */}
                    <div className="carousel-indicators">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                className={`carousel-dot ${i === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(i)}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                /**
                 * CASE 2: Popular / Marketing → Render as simple Grid
                 * Each product rendered via ProductCard component
                 */
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProductSection;