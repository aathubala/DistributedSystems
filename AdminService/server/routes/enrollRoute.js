const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Order = require('../models/orderModel');
const enrollModel = require("../models/enrollModel");

const stripe = require("stripe")("sk_test_51FfQBPHdYSqFNE7IJEw81G8DKDo4N94EVn2rMf4RSZsipha3JhUtLCf4lwdl3YgswTcSfMhsrfuUHlr5Ekdds5h900pSVlOeSb")

router.post("/enroll", async (req, res) => {

    const { token, subtotal, currentUser, cartItems } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create({
            amount: subtotal * 100,
            currency: 'LKR',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        })

        if (payment) {

            const neworder = new enrollModel({

                name: currentUser.username,
                email: currentUser.email,
                userid: currentUser._id,
                courses: cartItems,
                //changed
                Amount: subtotal,
                transactionId: payment.source.id

            })

            neworder.save()


            res.send('enrolled successfully')

        } else {

            res.send('Payment Failed')

        }
    } catch (error) {

        return res.status(400).json({ message: 'Something went wrong' });
    }

});

router.post("/getusercourses", async (req, res) => {

    const { userid } = req.body

    try {
        const courses = await enrollModel.find({ userid: userid }).sort({_id : -1})
        res.send(courses)
    } catch (error) {
        return res.status(400).json({ message: 'Something went wrong' })
    }
});

router.get("/getallenrollments", async (req, res) => {


    try {

        const enrollments = await enrollModel.find()
        res.send(enrollments)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.delete("/delete/course/:id", async (req, res) => {

    let enrollId = req.params.id;

    try {
        await enrollModel.findByIdAndDelete(enrollId)

        res.send('Deleted Successfully')
    }

    catch (error) {


        return res.status(400).json({ message: error });
    }
});

//get current order
router.get("/getcurrentenrollment/:id", async (req, res) => {

    let Id = req.params.id;
    try {

        const current = await enrollModel.findById(Id)
        res.send(current)

    } catch (error) {
        return res.status(400).json({ message: error });
    }

})


router.put("/update/refund/request/:id", async (req, res) => {

    let Id = req.params.id;
    const { sendrefundStatus } = req.body;

    const updatesendrefundStatus = {

        sendrefundStatus,

    }

    try {

        await Order.findByIdAndUpdate(Id, updatesendrefundStatus)
        res.send('refund request Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.put("/update/refund/request/user/:id", async (req, res) => {

    let Id = req.params.id;
    const { orderStatus } = req.body;

    const updateorderStatus = {

        orderStatus,

    }

    try {

        await enrollModel.findByIdAndUpdate(Id, updateorderStatus)
        res.send('Order refund request Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


router.put("/update/transactionstatus/:id", async (req, res) => {

    let salesid = req.params.id;
    const { isSuccessfull } = req.body;
  
    const updateisSuccessful = {
  
        isSuccessfull,
  
    }
  
    try {
  
        await enrollModel.findByIdAndUpdate(salesid, updateisSuccessful)
        res.send('Refund Status Updated Successfully')
  
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  });



module.exports = router