import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../pagesCSS/ListItems.css";

const ListItems = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/food/food-list`);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error while fetchind items list");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/food/remove-food`, {
      id: foodId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success("Item deleted succesfully");
    } else {
      toast.error("Item not deleted");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="list add flex">
        <p>All Foods List</p>

        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {list.map((item, index) => {
            return (
              <>
                <div key={index} className="list-table-format">
                  <img src={`${url}/images/` + item.image} alt={item.name} />

                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <p onClick={() => removeFood(item._id)} className="cursor">
                    X
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListItems;
