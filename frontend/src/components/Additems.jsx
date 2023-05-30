import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './InventoryNavbar';
//https://www.youtube.com/watch?v=7oiJj5FcyTQ

const Additems = () => {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [unit, setUnit] = useState();
    const [dimensions, setDimension] = useState();
    const [weight, setWeight] = useState();
    const [manufacturer, setManufacturer] = useState();
    const [brand, setBrand] = useState();
    const [sellingPrice, setSellingPrice] = useState();
    const [costPrice, setCostPrice] = useState();
    const [description, setDescription] = useState();
    const [openingStock, setOpeningStock] = useState();
    const [reorderPoint, setReorderPoint] = useState();
    const [preferredVendor, setPreferredVendor] = useState();

    // const [data, setData] = useState({
    //     name: '',
    //     unit: '',
    //     dimensions: '',
    //     weight: 0,
    //     manufacturer: '',
    //     brand: '',
    //     sellingPrice: 0,
    //     costPrice: 0,
    //     description: '',
    //     openingStock:0,
    //     reorderPoint: 0,
    //     preferredVendor: '',

    // })
    const [image, setImage] = useState('')
    console.log(image, 23)
    console.log(name, 27)
    // const inputHandler = (event) => {
    //     const { name, value } = event.target
    //     setData((previousState) => ({
    //         ...previousState,
    //         [name]: value

    //     }))
    // }

    const readValue = () => {

        const formdata = new FormData()
        formdata.append('name', name)
        formdata.append('unit', unit)
        formdata.append('dimensions', dimensions)
        formdata.append('weight', weight)
        formdata.append('manufacturer', manufacturer)
        formdata.append('brand', brand)
        formdata.append('sellingPrice', sellingPrice)
        formdata.append('costPrice', costPrice)
        formdata.append('description', description)
        formdata.append('openingStock', openingStock)
        formdata.append('reorderPoint', reorderPoint)
        formdata.append('preferredVendor', preferredVendor)
        formdata.append('image', image)
        console.log("Formate Data:  " + formdata.values)
        axios.post('http://localhost:3002/additems', formdata)
            .then((response) => {
                console.log(response.data)
                if (response.data.status == "Success") {
                    
                }
            })
            .catch((error) => {
                console.log(error)
            })
        navigate('/Item')
    }

    const backitems = () => {
        navigate('/Item')
    }


    return (
        <div>
                <Navbar/>
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                        <h3 class="text-uppercase text-center mb-5">Add Item</h3>
                        <div class="card">
                            <div class="card-body p-5">
                                <form>
                                    <div className="form-outline mb-4">
                                        <lable class="form-label" for="form3Example1cg">Name</lable>
                                        <input type="text" placeholder='' class="form-control form-control-lg"
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            name='name' />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <lable class="form-label" for="form3Example1cg">Unit</lable>
                                        <input type="text" placeholder='' class="form-control form-control-lg"
                                            onChange={(e) => setUnit(e.target.value)}
                                            value={unit}
                                            name='unit' />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <lable class="form-label" for="form3Example1cg">Dimensions</lable>
                                        <input type="text" placeholder='' class="form-control form-control-lg"
                                            onChange={(e) => setDimension(e.target.value)}
                                            value={dimensions}
                                            name='dimensions' />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <lable class="form-label" for="form3Example1cg">Weight</lable>
                                        <input type="text" placeholder='' class="form-control form-control-lg"
                                            onChange={(e) => setWeight(e.target.value)}
                                            value={weight}
                                            name='weight' />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <lable class="form-label" for="form3Example1cg">Manufacturer</lable>
                                        <input type="text" placeholder=' ' class="form-control form-control-lg"
                                            onChange={(e) => setManufacturer(e.target.value)}
                                            value={manufacturer}
                                            name='manufacturer' />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <lable class="form-label" for="form3Example1cg">Brand</lable>
                                        <input type="text" placeholder=' ' class="form-control form-control-lg"
                                            onChange={(e) => setBrand(e.target.value)}
                                            value={brand}
                                            name='brand' />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <lable class="form-label" for="form3Example1cg">sellingPrice</lable>
                                        <input type="text" placeholder=' ' class="form-control form-control-lg"
                                            onChange={(e) => setSellingPrice(e.target.value)}
                                            value={sellingPrice}
                                            name='sellingPrice' />

                                    </div>
                                    <div className="form-outline mb-4">
                                        <lable class="form-label" for="form3Example1cg">costPrice</lable>

                                        <input type="text" placeholder=' ' class="form-control form-control-lg"
                                            onChange={(e) => setCostPrice(e.target.value)}
                                            value={costPrice}
                                            name='costPrice' />

                                    </div>
                                    <div className="form-outline mb-4">
                                        <lable class="form-label" for="form3Example1cg">description</lable>

                                        <input type="text" placeholder=' ' class="form-control form-control-lg"
                                            onChange={(e) => setDescription(e.target.value)}
                                            value={description}
                                            name='description' />

                                    </div>
                                    <div className="form-outline mb-4">
                                        <lable class="form-label" for="form3Example1cg">openingStock</lable>

                                        <input type="text" placeholder=' ' class="form-control form-control-lg"
                                            onChange={(e) => setOpeningStock(e.target.value)}
                                            value={openingStock}
                                            name='openingStock' />

                                    </div>
                                    <div className="form-outline mb-4">
                                        <lable class="form-label" for="form3Example1cg">reorderPoint</lable>

                                        <input type="text" placeholder=' ' class="form-control form-control-lg"
                                            onChange={(e) => setReorderPoint(e.target.value)}
                                            value={reorderPoint}
                                            name='reorderPoint' />

                                    </div>
                                    <div className="form-outline mb-4">
                                        <lable class="form-label" for="form3Example1cg">preferredVendor</lable>
                                        <input type="text" placeholder=' ' class="form-control form-control-lg"
                                            onChange={(e) => setPreferredVendor(e.target.value)}
                                            value={preferredVendor}
                                            name='preferredVendor' />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <lable class="form-label" for="form3Example1cg">image</lable>
                                        <input type="file" class="form-control form-control-lg" name='image' onChange={(e) => setImage(e.target.files[0])} />
                                    </div>

                                    <div className="form-group">
                                        <lable class="form-label" for="form3Example1cg">   </lable>
                                        <button type="submit" class="btn btn-success" onClick={readValue} >Add</button>
                                        <button type="submit" class="btn btn-success" onClick={backitems} >Back</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Additems
