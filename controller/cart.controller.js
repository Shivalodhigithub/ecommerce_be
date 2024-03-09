// const cart_model = require('../model/cart.model')
// exports.Create_Cart = async (req, res) => {
//     //read the request body 
//     const req_body = req.body;
//     try {
//         // if the user already exist then update cart or increament quantity
//         // const user = await cart_model.findOne({ user_id:req_body.user_id })
//         if (user) {
//             const product_exist = await cart_model.user.items[0].findOne({product_id: req_body.items[0].product_id })
//             console.log(product_exist)
//             if (product_exist !== -1) {
//                 //if the product is already in cart then update quantity
//                 // product_exist.quantity += 1;
//                 user.items[product_exist].quantity+=1;
//             }
//             else {
//                 // if the product is not in cart then push it into items 
//                 cart_model.items.push({ product_id: req_body.items[0].product_id, quantity: 1 })
//             }
//             const saved = await cart_model.Save()
//             return res.status(201).send({
//                 message: "saved successfully", saved
//             })
//             // return res.status(201).send(user);

//         }//if the user does not exist then create new cart
//         else {
//             const cart_obj = {
//                 user_id: req_body.user_id,
//                 items: [
//                     {
//                         product_id: req_body.items[0].product_id,
//                         quantity: 1
//                     }
//                 ]
//             }
//             const Cart_created = await cart_model.create(cart_obj)
//             return res.status(200).send({
//                 message: "Cart Successfully created", Cart_created
//             })
//         }
//     } catch (error) {
//         console.log("Error while creating cart", error)
//         return res.status(500).send({
//             message: "Error while creating cart"
//         })

//     }
// }


const cart_model = require('../model/cart.model')

exports.Create_Cart = async (req, res) => {
    // read the request body 
    const req_body = req.body;

    try {
        // if the user already exists, then update the cart or increment quantity
        const user = await cart_model.findOne({ user_id: req_body.user_id });

        if (user) {
            const productExistIndex = user.items.findIndex(item => item.product_id === req_body.items[0].product_id);

            if (productExistIndex !== -1) {
                // if the product is already in the cart, then update the quantity
                user.items[productExistIndex].quantity += 1;
            } else {
                // if the product is not in the cart, then push it into items 
                user.items.push({ product_id: req_body.items[0].product_id, quantity: 1 });
            }

            const saved = await user.save(); // Save the changes to the user document
            return res.status(201).send({
                message: "Saved successfully",
                saved
            });
        } else {
            // if the user does not exist, then create a new cart
            const cart_obj = {
                user_id: req_body.user_id,
                items: [
                    {
                        product_id: req_body.items[0].product_id,
                        quantity: 1
                    }
                ]
            }

            const Cart_created = await cart_model.create(cart_obj);
            return res.status(200).send({
                message: "Cart successfully created",
                Cart_created
            });
        }
    } catch (error) {
        console.log("Error while creating cart", error);
        return res.status(500).send({
            message: "Error while creating cart"
        });
    }
}
