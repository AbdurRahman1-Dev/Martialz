const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const stripe = require('stripe')(process.env.PAYMENT_SYSRECT_KEY)
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json())


// jwt middleware
const verifyJWT = (req, res, next) => {

  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized access' });
  }
  // bearer token
  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
   
    if (err) {
      return res.status(401).send({ error: true, message: 'unauthorized access' })
    }
    req.decoded = decoded;
    next();
  })
}


// MongoDb Config
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n6wfj5p.mongodb.net/?retryWrites=true&w=majority`;

// const uri = `mongodb://127.0.0.1/:27017`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const classCollection = client.db('mairtialz').collection('classes')
    const userCollection = client.db('mairtialz').collection('users')
    const paymentCollection = client.db('mairtialz').collection('payment')
    const selectClassCollection = client.db('mairtialz').collection('selectedClasses')

// jwr
   app.post('/jwt', (req, res) => {
    const email = req.body;
    const token = jwt.sign(email, process.env.JWT_TOKEN, {
      expiresIn: '7d'
    })
    res.send({token})
   })



  // Verify admin
  const verifyAdmin = async(req, res, next) => {
    const email = req.decoded.email;
    const query = {email: email};
    const user = await userCollection.findOne(query);

    if(user?.role !== 'admin') {
      return res.status(200).send({error: 'Forbidden Access'})
    }
    next()
  }  
  
  const verifyInstructor = async(req, res, next) => {
    const email = req.decoded.email;
    const query = {email: email};
    const user = await userCollection.findOne(query);

    if(user?.role !== 'instructor') {
      return res.status(200).send({error: 'Forbidden Access'})
    }
    next()
  }

  // post user to db
    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = {email: user.email}
      const existingUser = await userCollection.findOne(query);

      if(existingUser) {
        return res.send({message: 'User Already Exist'})
      }
      const result = await userCollection.insertOne(user)
      res.send(result)
    })

// get all users
    app.get('/allusers', async(req, res) => {
      const result = await userCollection.find().toArray()
      res.send(result)
    })
   
  // get all instructor
  app.get('/instructors', async (req, res) => {
    const query = {role: 'instructor'}
    const result = await userCollection.find(query).toArray()
    res.send(result)
  })


// make user admin api
    app.patch('/user/admin/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const updateDoc = {
        $set: {
          role: 'admin'
        },
      };
      const result = await userCollection.updateOne(query, updateDoc)
      res.send(result)
    })


// make user instructor api
    app.patch('/user/instructor/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const updateDoc = {
        $set: {
          role: 'instructor'
        },
      };
      const result = await userCollection.updateOne(query, updateDoc)
      res.send(result)
    })

// Check Admin
    app.get('/users/admin/:email',verifyJWT,verifyAdmin, async (req, res) => {
      const email = req.params.email;

      if(req.decoded.email !== email) {
        return res.send({message: 'Forbidden Access'})
      }
      const query = {email: email}
      const user = await userCollection.findOne(query);
      const result = {admin: user?.role === 'admin'};
      res.send(result)
    })


// Check instructor
    app.get('/users/instructor/:email',verifyJWT,verifyInstructor,  async (req, res) => {
      const email = req.params.email;

      if(req.decoded.email !== email) {
        return res.send({message: 'Forbidden Access'})
      }
      const query = {email: email}
      const user = await userCollection.findOne(query);
      const result = {instructor: user?.role === 'instructor'};
      res.send(result)
    })


// get specific instractrs classes
    app.get('/classes/:email',verifyJWT,  async(req, res) => {
      const email = req.params.email;
      const query = {email: email}
      const result = await classCollection.find(query).toArray()
      res.send(result)
    })


  // insert class data to BD
  app.post('/class', async (req, res) => {
    const data = req.body;
    const result = await classCollection.insertOne(data);
    res.send(result)
  });


  // get all approved classes api
  app.get('/classes', async (req, res) => {
    const query = {status: 'approved'}
    const result = await classCollection.find(query).sort({students: -1}).toArray()
    res.send(result)
  })

  // get all classes
  app.get('/allclasses', async (req, res) => {
    const result = await classCollection.find().toArray()
    res.send(result)
  })

  // get single classes
  app.get('/singleclasses/:id',verifyJWT, async (req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await classCollection.findOne(query)
    res.send(result)
  })


  // approve classes api
  app.patch('/approveclass/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const updateDoc = {
      $set: {
        status: 'approved'
      },
    };
    const result = classCollection.updateOne(query, updateDoc);
    res.send(result)
  }) 
  
  // deniedclass classes api
  app.patch('/deniedclass/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const updateDoc = {
      $set: {
        status: 'denied'
      },
    };
    const result = classCollection.updateOne(query, updateDoc);
    res.send(result)
  }) 
  
  
  
  // feedback classes api
  app.patch('/classfeedback/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const query = {_id: new ObjectId(id)};
    const updateDoc = {
      $set: {
        feedBack: body.feedback
      },
    };
    const result = classCollection.updateOne(query, updateDoc);
    res.send(result)
  })


  // Update classes api
  app.patch('/updateclass/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const query = {_id: new ObjectId(id)};
    const updateDoc = {
      $set: {
        className: body.className,
        price: body.price,
        availableSeats: body.availableSeats,
        classImage: body.classImage
      },
    };
    const result = classCollection.updateOne(query, updateDoc);
    res.send(result)
  })

  // select classes
    app.post('/selectclasses', async (req, res) => {
        const data = req.body;

      // check the matching id
        const query = {classId: data.classId, studentEmail: data.studentEmail};
        const existCLass = await selectClassCollection.findOne(query);
        // student can select classes one time
        if(existCLass) {
          return res.send({error: 'Already selected'})
        }
        const result = await selectClassCollection.insertOne(data)
        res.send(result)
       
    });

  // get students selected classes
  app.get('/selectclass/:email',verifyJWT,  async(req, res) => {
    const email = req.params.email;
    const query = {studentEmail: email}
    const result = await selectClassCollection.find(query).toArray()
    res.send(result)
  })  
  
  // get single selected classes
  app.get('/payforclass/:id', verifyJWT, async(req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await selectClassCollection.find(query).toArray()
    res.send(result)
  }) 
  

  // get students paid selected classes and history
  app.get('/paidclasses/:email',verifyJWT,  async(req, res) => {
    const email = req.params.email;
    const query = {email: email, status: 'paid'}
    const date = {date: -1}
    const result = await paymentCollection.find(query).sort(date).toArray()
    res.send(result)
  }) 
  



  // stripe payment api
  app.post('/create-payment-intent', verifyJWT, async (req, res) => {
    const {classPrice} = req.body;

    const amount = parseInt(classPrice * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card']
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    })
  })


  // payment api
  app.post('/setpayments/:id', async(req, res) => {
    const body = req.body;
    const id = req.params.id;
    const idQuery = {_id: new ObjectId(id)}
    const removeClass = await selectClassCollection.deleteOne(idQuery)
    const result = await paymentCollection.insertOne(body)
    res.send({result, removeClass})
  })


  // delete selected classes
  app.delete('/deleteselectclss/:id', async (req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await selectClassCollection.deleteOne(query)
    res.send(result)
  })

 // delete enrolled classes
  app.delete('/deleteenrolledcl/:id', async (req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await paymentCollection.deleteOne(query)
    res.send(result)
  })


  //update classes after Payments
  app.patch('/classupdate/:id', async(req, res) => {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const updateDoc = {
      $inc: {
        availableSeats: -1,
        students: 1
      },
    };
    const result = await classCollection.updateOne(query, updateDoc)
    res.send(result)
  })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Server is runnig')
});


app.listen(port, () => {
  console.log("server is running");
})