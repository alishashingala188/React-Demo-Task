import React, { useState, useEffect } from "react";
import { getProducts } from "../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    filterProducts(searchValue, sort, category);
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    setSort(sortValue);
    filterProducts(search, sortValue, category);
  };

  const handleCategory = (e) => {
    const categoryValue = e.target.value;
    setCategory(categoryValue);
    filterProducts(search, sort, categoryValue);
  };

  const filterProducts = (search, sort, category) => {
    let filtered = products.filter(
      (product) =>
        product.title &&
        product.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "" || product.category === category)
    );
    if (sort === "price-asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(filtered);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <div className="flex justify-center mt-7">
        <div className="flex w-full max-w-4xl justify-between items-center">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search products"
            className="form-input h-fit w-fit"
          />
          <select
            value={sort}
            onChange={handleSort}
            className="form-select w-fit"
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price low to high</option>
            <option value="price-desc">Price high to low</option>
          </select>
          <select
            value={category}
            onChange={handleCategory}
            className="form-select w-fit"
          >
            <option value="">All Categories</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
          </select>
        </div>
      </div>
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <a href="#">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {product.brand}
                </span>
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product.title}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    ${product.price}
                  </p>
                  {product.discountPercentage && (
                    <del>
                      <p className="text-sm text-gray-600 cursor-auto ml-2">
                        $
                        {(
                          product.price /
                          (1 - product.discountPercentage / 100)
                        ).toFixed(2)}
                      </p>
                    </del>
                  )}
                  <div className="ml-auto">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </section>
      <div className="flex justify-center mt-5 mb-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-1 bg-white border rounded">{page}</span>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page * itemsPerPage >= filteredProducts.length}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Products;
