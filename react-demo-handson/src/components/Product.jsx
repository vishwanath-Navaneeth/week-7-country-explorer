import React from "react";

function Product(props)  
{
    let {name,price,brand,description,image}=props.products;

    return(
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition duration-300">

            <img src={image} className="w-full h-48 object-cover rounded-lg"/>

            <h3 className="text-lg font-semibold mt-3">{name}</h3>

            <h5 className="text-gray-600 text-sm">{brand}</h5>

            <p className="text-gray-500 text-sm mt-2">{description}</p>

            <p className="text-blue-600 font-bold mt-2">${price}</p>

        </div>
    )
}

export default Product;
