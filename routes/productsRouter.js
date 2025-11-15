const express = require('express')
const {handleHomepageFunctionality, handleGetAllProducts, handleGetProductsById, handleCreatingNewProduct, handleUpdatingProduct, handleDeletingProduct} = require('../controllers/products')

const router = express.Router()

router.get('/homepage', handleHomepageFunctionality) //done
router.get('/products', handleGetAllProducts)  //done
router.get('/products/:id', handleGetProductsById) //done
router.post('/products', handleCreatingNewProduct) //done
router.patch('/products/:id', handleUpdatingProduct) //done
router.delete('/products/:id', handleDeletingProduct) 

module.exports = router