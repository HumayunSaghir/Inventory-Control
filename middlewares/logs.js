const fs = require('fs')
const express = require('express')

function createLogs(req, res, next){
    let data = `new request is recieved at ${req.method} by method ${req.method}\n`

    fs.appendFile('./logs.txt', data, (err) => {
        if(err){
            console.log('error while appending data in the file.')
        }
    })

    next()
}

module.exports = createLogs