import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  updateProductAsync,
} from "../../products/productSlice";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { deleteProduct } from "../../products/productApi";

function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const categories = useSelector((state) => state.product.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("stock", selectedProduct.stock);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    // const product = { ...selectedProduct };
    // product.deleted = true;
    // dispatch(updateProductAsync(product));
    dispatch(deleteProduct(selectedProduct.id));
    navigate("/admin");
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        const product = { ...data };
        product.images = [
          product.image1,
          product.image2,
          product.image3,
          product.thumbnail,
        ];
        product.rating = 0;
        delete product["image1"];
        delete product["image2"];
        delete product["image3"];
        product.price = +product.price;
        product.stock = +product.stock;
        product.discountPercentage = +product.discountPercentage;

        if (params.id) {
          product.id = params.id;
          product.rating = selectedProduct.rating || 0;
          dispatch(updateProductAsync(product));
          reset();
        } else {
          dispatch(createProductAsync(product));
          reset();
          //TODO:  on product successfully added clear fields and show a message
        }
        navigate("/admin");
      })}
    >
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">
          Add Product
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-900"
            >
              Product Name
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              id="title"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              rows={3}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Brand */}
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-900"
            >
              Brand Name
            </label>
            <input
              type="text"
              {...register("brand", { required: "Brand is required" })}
              id="brand"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-900"
            >
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              id="category"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">-- Choose category --</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-900"
            >
              Price
            </label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                min: 1,
                max: 10000,
              })}
              id="price"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Discount Percentage */}
          <div>
            <label
              htmlFor="discountPercentage"
              className="block text-sm font-medium text-gray-900"
            >
              Discount Percentage
            </label>
            <input
              type="number"
              {...register("discountPercentage", {
                required: "Discount percentage is required",
                min: 0,
                max: 100,
              })}
              id="discountPercentage"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Stock */}
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-900"
            >
              Stock
            </label>
            <input
              type="number"
              {...register("stock", { required: "Stock is required", min: 0 })}
              id="stock"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-900"
            >
              Thumbnail
            </label>
            <input
              type="text"
              {...register("thumbnail", { required: "Thumbnail is required" })}
              id="thumbnail"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Image 1 */}
          <div>
            <label
              htmlFor="image1"
              className="block text-sm font-medium text-gray-900"
            >
              Image 1
            </label>
            <input
              type="text"
              {...register("image1", { required: "Image 1 is required" })}
              id="image1"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Image 2 */}
          <div>
            <label
              htmlFor="image2"
              className="block text-sm font-medium text-gray-900"
            >
              Image 2
            </label>
            <input
              type="text"
              {...register("image2", { required: "Image 2 is required" })}
              id="image2"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Image 3 */}
          <div>
            <label
              htmlFor="image3"
              className="block text-sm font-medium text-gray-900"
            >
              Image 3
            </label>
            <input
              type="text"
              {...register("image3", { required: "Image 3 is required" })}
              id="image3"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Extra */}
          <div className="sm:col-span-2">
            <fieldset>
              <legend className="block text-sm font-semibold text-gray-900">
                By Email
              </legend>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="comments"
                    className="ml-2 block text-sm font-medium text-gray-900"
                  >
                    Comments
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="candidates"
                    name="candidates"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="candidates"
                    className="ml-2 block text-sm font-medium text-gray-900"
                  >
                    Candidates
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="offers"
                    name="offers"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="offers"
                    className="ml-2 block text-sm font-medium text-gray-900"
                  >
                    Offers
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="mr-4 py-2 px-4 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
          >
            Cancel
          </button>

          {selectedProduct && (
            <button
              onClick={handleDelete}
              className="mr-4 py-2 px-4 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-50"
            >
              Delete
            </button>
          )}

          <button
            type="submit"
            className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProductForm;
