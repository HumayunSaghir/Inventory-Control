const express = require('express')
const {handleGetInventoryInfo, handleHomepageFunctionality, handleGetAllProducts, handleGetProductsById, handleCreatingNewProduct, handleUpdatingProduct, handleDeletingProduct} = require('../controllers/products')
const {checkAuthorization} = require('../middlewares/auth')

const router = express.Router()

router.get('/info', checkAuthorization(['admin']), handleGetInventoryInfo)
router.get('/homepage', handleHomepageFunctionality) //done
router.get('/products', handleGetAllProducts)  //done
router.get('/products/:id', handleGetProductsById) //done

router.post('/products', handleCreatingNewProduct) //done
router.patch('/products/:id', handleUpdatingProduct) //done
router.delete('/products/:id', handleDeletingProduct) //done 

module.exports = router