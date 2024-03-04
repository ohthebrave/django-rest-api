import React, { useEffect, useState } from 'react';
import "../App.css";
import SideBar from './SideBar';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useCreateProductsMutation } from '../features/animalsApi';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [createProducts, isLoading, isError] = useCreateProductsMutation() || {}

    const [category, setCategory] = useState("");
    const [breed, setBreed] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [image_url, setImage_url] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [quantity, setQuatity] = useState("");
    const [description, setDescription] = useState("");
    const [farmer, setFarmer] = useState();
    const [animals, setAnimals] = useState([]);
    const [name, setName] = useState(null);
    const [orders, setOrders] = useState([]);
    const [animalId, setAnimalId] = useState('');
    const [deleted, setDeleted] = useState(false);

    const navigate = useNavigate();

        useEffect(() => {
        // Retrieve cookie value
        const cookieValue = Cookies.get("access");
        setFarmer(jwtDecode(cookieValue).user_id);
        setName(jwtDecode(cookieValue).name)
        const fetchAnimals = async () => {
          try {
              // Make a GET request to your API endpoint to fetch animals
              const response = await axios.get('https://django-rest-api-x6mz.onrender.com/farm/list/', {
                headers: {
                  Authorization: `Bearer ${cookieValue}`
                }
              }); 
              
              setAnimals(response.data);
              // Map the response data to return only the animal IDs
              const animalIds = response.data.map(animal => animal.id);
              setAnimalId(animalIds)
          } catch (error) {
              console.error('Error fetching animals:', error);
          }
      };

      fetchAnimals();
      fetchOrders();
       
      }, []);

      const fetchOrders = async () => {
        try {
            // Make a GET request to your API endpoint to fetch animals
            const response = await axios.get('https://django-rest-api-x6mz.onrender.com/farm/orders/',); 
            setOrders(response.data);
            // console.log(response.data);
        } catch (error) {
            console.error('Error fetching animals:', error);
        }
    };

    const handleDelete = (orderId) => {
      axios.delete(`https://django-rest-api-x6mz.onrender.com/farm/orders/${orderId}/delete/`)
        .then(response => {
          const updatedOrders = orders.filter(order => order.id !== orderId);
      // Update the orders state with the updatedOrders array
          setOrders(updatedOrders);
          alert('Order rejected successfully');
        })
        .catch(error => {
          // Handle error
          console.error('Error deleting order:', error);
        });
    };
  
    if (deleted) {
      navigate('/farm-upload') // If deleted, don't render anything
    }
    // console.log(farmer)

      const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log("Uploading animal");

        try { await createProducts({
            category,
            breed,
            weight,
            quantity,
            age,
            image_url,
            price,
            location,
            description,
            farmer,
        })
        // Clear form fields
        setBreed('');
        setImage_url('');
        setCategory('');
        setPrice('');
        setWeight('');
        setQuatity('');
        setAge('') ;
        setLocation('');
        setDescription('');
        } catch (error) {
          console.error("Error sending data:", error);
        }
      };

  return (
    <div>
        <SideBar/>
        <main role="main" className="container">
            <div className="p-1">
                <h3>Welcome {name}</h3>
                <p>Upload Animal or view your Orders Here.</p>
            </div>
        <div className="row">
          <div className="col-md-7">
            <form className="row g-3 papa">
                <div className="col-12">
                    <label htmlFor="inputBreed" className="form-label">Breed</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="breed" 
                    value={breed} onChange={(e) => setBreed(e.target.value)}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Weight</label>
                    <input type="number" className="form-control" id="inputWeight" placeholder="weight" 
                    value={weight} onChange={(e) => setWeight(e.target.value)}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress2" className="form-label">Age</label>
                    <input type="number" className="form-control" id="inputAddress2" placeholder="Age" 
                    value={age} onChange={(e) => setAge(e.target.value)}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Price</label>
                    <input type="number" className="form-control" id="inputAddress" placeholder="amount" 
                    value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Quantity</label>
                    <input type="number" className="form-control" id="inputQuantity" placeholder="quantity" 
                    value={quantity} onChange={(e) => setQuatity(e.target.value)}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Location</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="location" 
                    value={location} onChange={(e) => setLocation(e.target.value)}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Add Image Url</label>
                    <input type="text" className="form-control mb-3" name="imageUrl" placeholder="Image URL"
                    value={image_url}
                    onChange={(e) => setImage_url(e.target.value)}/>
                </div>
                <div className="col-12">
                <select className="form-select mb-3" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option >Category</option>
                      <option value="1">Cattle</option>
                      <option value="2">Swine</option>
                      <option value="3">Poultry</option>
                      <option value="4">Sheep</option>
                </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                    value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Upload</button>
                </div>
            </form>
          </div>
          <div className="col-md-5 ">
          <div className="content-section m-2">
            <h3>My Orders</h3>
            <p className='text-muted'>Shows orders received.
                <ul className="list-group">
                    {orders.map(order => {
                        // Check if order.animal is included in animalIds array
                        if (animalId.includes(order.animal)) {
                            return (
                                <li key={order.id} className="list-group-item list-group-item-light fw-light fs-3">
                                    Order id: {order.id}
                                    <div className="row mt-1">
                                      <div className="col">
                                      <Link className="btn btn-outline-warning"  type="button">confirm</Link>
                                      </div>
                                      <div className="col">
                                      <Link className="btn btn-danger" onClick={() => handleDelete(order.id)} type="button">reject</Link>
                                      </div>
                                    </div>
                                </li>
                            );
                        }
                        return null; // Skip rendering if order is not related to any animal in animalIds
                    })}
                </ul>
            </p>
          </div>

            <div className="content-section m-2">
              <h3>Animal Posted</h3>
              <p className='text-muted'>Shows animals posted.
                <ul className="list-group">
                {animals.map(animal => (
                    <li key={animal.id} className="list-group-item list-group-item-light fs-3">{animal.breed}
                    <Link className="btn btn-primary btn-sm ml-2 ms-3" to={`/${animal.id}`} >View Details</Link>
                    </li>
                ))}
                </ul>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard