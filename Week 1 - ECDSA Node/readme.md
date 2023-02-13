## ECDSA Node

After you have the frontend setup
run signTransaction.js (in the folder server/scripts)

you can change the sender public key, recipient, amount and sender private key in signTransaction, but by default the sender public key is
04866e97de1cf270e52357100be9284b85c9f828ab745a28ef3130e445fb6bd848ac14746c76134d1dab6a57da5d7f481b663939d7f1e149a4a44bd3f9c47a749b

recipient public key is
048d3395377bfc88436bfa6a7275123b52e5ab7b84d39be0b630491b2fa69b8143a47ce3f09cc9a6f4cb173eb23e019800a23bf71ee8c70dbdf62cafc1f9c052cf

amount is 
20

Use this transaction we generate here as well as the recovery bit in the frontend so the transaction has confirmation to execute (otherwise the transaction will not go through!)

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
