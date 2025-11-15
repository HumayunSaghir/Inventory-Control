const { allowedNodeEnvironmentFlags } = require('process')
const prdModel = require('../models/products')
const { privateDecrypt } = require('crypto')

async function handleHomepageFunctionality(req, res){
    return res.status(200).render('homepage')
}

async function handleGetAllProducts(req, res){
    const allProducts = await prdModel.find({})

    // incase there are no products.
    if(!allProducts){
        return res.status(200).send('<p>No products found!</p>')
    }

    // case when products will be there -> server side rendering.
    let list = `<h1>List of all Products</h1>`
    
    allProducts.forEach((product) => {
        list += `<li>${product.name}</li>`
    })

    return res.status(200).send(list)
    
}

async function handleGetProductsById(req, res){
    const reqId = req.params.id
    
    const product = await prdModel.findOne({_id : reqId})

    // incase product not found.
    if(!product){
        return res.status(404).json({status : 'no product found with current id!'})
    }

    // incase when the product is found.
    return res.status(200).json({product})
}

async function handleCreatingNewProduct(req, res){
    // this data will be created by the form
    const body = req.body

    // checking if the payload is not complete.
    if(!body || !body.name || !body.price || !body.stock || !body.description){
        return res.status(400).json({status : '400 bad request!'})
    }

    // case when payload will be complete.
    const product = await prdModel.create({
        name : body.name,
        price : body.price,
        stock : body.stock,
        description : body.description,
    })

    return res.status(200).json({status : `${product.name} has been added in inventory with id ${product._id}`})
}

async function handleUpdatingProduct(req, res){
    const reqId = req.params.id

    // the updating stock info will be in the form of json.
    const body = req.body

    // case when data is not recieved.
    if(!body || !body.stock){
        return res.status(400).json({status : '400 bad request!'})
    }

    // case when data will be complete.
    const product = await prdModel.findOne({_id : reqId})

    // updating the product information.
    product.stock = body.stock
    await product.save()

    return res.status(201).json({status : `${product.name} stock info has been updated!`})
}

async function handleDeletingProduct(req, res){
    const reqId = req.params.id

    const deletedProd = await prdModel.findOneAndDelete({_id : reqId})

    return res.status(200).json({status : `${deletedProd.name} has been deleted!`})
}

module.exports = {
    handleGetAllProducts,
    handleGetProductsById,
    handleCreatingNewProduct,
    handleUpdatingProduct,
    handleDeletingProduct,
    handleHomepageFunctionality,
}