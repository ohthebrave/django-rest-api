import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Patch = () => {

    const [category, setCategory] = useState("");
    const [breed, setBreed] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [image_url, setImage_url] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [quantity, setQuatity] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate()
    const [product, setProduct] = useState('');
    const {id} = useParams();
    
    const getSingleAnimal = async() => {
        const data = await axios.get(`https://django-rest-api-x6mz.onrender.com/farm/animals/${id}/`)
        // console.log(data.data)
        setProduct(data.data)
        setCategory(data.data.category)
        setBreed(data.data.breed)
        setWeight(data.data.weight)
        setImage_url(data.data.image_url)
        setAge(data.data.age)
        setPrice(data.data.price)
        setLocation(data.data.location)
        setQuatity(data.data.quantity)
        setDescription(data.data.description)
    }

    // console.log(product)

    useEffect(() => {
        getSingleAnimal()
    }, [])

    const handleSubmit = async(e) => {
      e.preventDefault(); 

      let formField = new FormData();
      formField.append('category', category)
      formField.append('breed', breed)
      formField.append('weight', weight)
      formField.append('image_url', image_url)
      formField.append('age', age)
      formField.append('price', price)
      formField.append('location', location)
      formField.append('quantity', quantity)
      formField.append('description', description)

      await axios.patch(`https://django-rest-api-x6mz.onrender.com/farm/update/${id}/`, formField) 
        .then( res => {
            console.log(res.data)
            navigate('/farm-upload')
        })
        .catch(error => {
            console.error('Error updating data:', error);
        });
    }

  return (
    <div className='p-5'>
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
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Update</button>
                </div>
            </form>
    </div>
  )
}

export default Patch