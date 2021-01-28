const webpush = require("web-push");
const router = require('express').Router();   

const mongoose = require('mongoose');
const PushUser = mongoose.model('PushUser');

const devConnection = process.env.DB_STRING;
const prodConnection = process.env.DB_STRING_PROD;

// Connect to thae correct environment database
if (process.env.NODE_ENV === 'production') {
    mongoose.connect(prodConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });

} else {

    mongoose.connect(devConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });
}

router.post("/user_notification_details", (req, res) => {

  const newPushUser = new PushUser({

  endpoint:req.body.endpoint,
  expirationTime:req.body.expirationTime,
  keys:{
      p256dh:req.body.keys['p256dh'],
      auth:req.body.keys['auth'],
    }

  });


  try {
  
    newPushUser.save()
    res.status(201).json({push_notification_credentials:'saved'})

  } catch (err) {

    console.log(err)
  
  }

});



// Fire a notification
router.post("/fire_push_notification", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload (TITLE IS SOMETHING SET BY SERVER)
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});


module.exports = router;