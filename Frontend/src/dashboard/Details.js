import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Details = () => {

    const [animal, setAnimal] = useState('');
    const {id} = useParams();

    const getSingleAnimal = async() => {
        const data = await axios.get(`https://django-rest-api-x6mz.onrender.com/farm/animals/${id}/`)
        // console.log(data.data)
        setAnimal(data.data)
    }

    useEffect(() => {
        getSingleAnimal()
    }, [])

  return (
    <div className='dunyu'>
        <div className="card">
            <img src={animal.image_url} className="animal-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{animal.breed}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{animal.price}</h6>
                <p className="card-text"> {animal.description}</p>
                <div className="row mt-1">
                    <div className="col">
                    <Link className="btn btn-primary" to={`/${animal.id}/patch`} type="button">edit</Link>
                    </div>
                    <div className="col">
                    <Link className="btn btn-primary" to="/farm-upload" type="button">return</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Details