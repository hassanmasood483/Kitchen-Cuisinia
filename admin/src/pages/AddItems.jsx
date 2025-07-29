import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import "../pagesCSS/AddItems.css";
import { toast } from "react-toastify";

const AddItems = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    image: false,
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // Validate required fields
      if (!data.name || !data.price || !data.image) {
        toast.error("Please fill all required fields and upload an image");
        return;
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", data.image);

      console.log("Sending request to:", `${url}/food/add-food`);
      console.log("Form data:", {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        image: data.image ? data.image.name : "No image"
      });

      const response = await axios.post(`${url}/food/add-food`, formData);

      if (response.data.success) {
        setData({ name: "", description: "", price: "", category: "Salad" });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding food:", error);
      if (error.response) {
        toast.error(`Server error: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        toast.error("Network error: Cannot connect to server. Make sure backend is running on port 3000");
      } else {
        toast.error("Error: " + error.message);
      }
    }
  };

  return (
    <>
      <div className="add">
        <form className="form" onSubmit={onSubmitHandler}>
          <div className="img-upload form">
            <p>Upload Image</p>

            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="upload"
              />
            </label>

            <input
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setData((prevData) => ({ ...prevData, image: file }));
              }}
              type="file"
              id="image"
              hidden
              required
            />
          </div>

          <div className="product-name form">
            <p>Product Name</p>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="Enter name"
              required
            />
          </div>

          <div className="product-description form">
            <p>Product description</p>

            <textarea
              type="text"
              onChange={onChangeHandler}
              value={data.description}
              name="description"
              placeholder="Write about food item here"
            ></textarea>
          </div>

          <div className="category-price">
            <div className="add-category form">
              <p>Select Category</p>

              <select onChange={onChangeHandler} name="category" required>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>

            <div className="price form">
              <p>Product price</p>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="Number"
                name="price"
                placeholder="eg: $20"
                required
              />
            </div>
          </div>

          <button type="submit" className="button">
            ADD
          </button>
        </form>
      </div>
    </>
  );
};

export default AddItems;
