const router = require('express').Router();
const {WebhookResponse} = require('@jambonz/node-client');
const { response } = require('express');
router.post('/', (req, res) => {
    const {logger} = req.app.locals;
    logger.debug({payload: req.body}, 'POST /rasa');
    console.log("\NrasaOOOO: \N",req.body);
    try {
      const app = new WebhookResponse();
      app.rasa({
            // verb: "rasa",
            url: "https://0291-14-241-131-43.ngrok-free.app/webhooks/jambonz/webhook",
            prompt: "Hello there!  What can I do for you today?",
            eventHook: "/rasa/event",
            actionHook: "/rasa/action"

          });
      res.status(200).json(app);
    } catch (err) {
      logger.error({err}, 'Error');
      res.sendStatus(503);
    }
    console.log("\n FINALLLLLLL:  \N", app.text)
  });

  router.post('/event', (req, res) => {
    const {logger} = req.app.locals;
    const payload = req.body;
    console.log("event body: ", req.body);
    logger.debug({payload}, 'POST /rasa/event');
    try {
      const app = new WebhookResponse();
      app
        .say({text: `A B C D E Fuck up in the night, can't belive what whe see`});
      
      res.status(200).json(app);
    } catch (err) {
      logger.error({err}, 'Error');
    }
  });

  router.post('/action', (req, res) => {
    const {logger} = req.app.locals;
    
    logger.debug({payload: req.body}, 'POST /rasa/action');
    console.log("action body: ", req.body);
    try {
  
      res.sendStatus(200);
    } catch (err) {
      logger.error({err}, 'Error');
      res.sendStatus(503);
    }
  });
  
  router.post('/transcript', (req, res) => {
    const {logger} = req.app.locals;
    const {reason, speech} = req.body;
    logger.debug({payload: req.body}, 'POST /rasa/transcript');
    console.log("\n Speech:  \N", speech);
    try {
      const app = new WebhookResponse();
      if (reason === 'speechDetected') {
        const {transcript, confidence} = speech.alternatives[0];
        app
          .say({text: `You said: ${transcript}.  The confident score was ${confidence.toFixed(2)}. `});
        if (speech.vendor?.name) {
          app.say({text: `The speech service was provided by ${speech.vendor.name}`});
        }
        app
          .gather({
            say: {text: 'Say something else.'},
            input: ['speech'],
            actionHook: '/rasa/transcript',
          });
      }
      else {
        app
        .gather({
          say: {text: 'Are you still there?  I didn\'t hear anything.'},
          input: ['speech'],
          actionHook: '/rasa/transcript',
        });
      }
res.status(200).json(app);
    } catch (err) {
      logger.info({err}, 'Error handling /rasa/transcript');
      res.sendStatus(503);
    }
  });

  router.post('/messaging', (req, res) => {
    const {logger} = req.app.locals;
    logger.debug({payload: req.body}, 'POST /messaging');
    console.log("\messaging: \N",req.body);
    try {
    //   const app = new WebhookResponse();
    //   app
    //     .say({text: 'silence_stream://1000'})
    //     .gather({
    //       say: {text: 'Please say something and we will rasa it back to you.'},
    //       input: ['speech'],
    //       actionHook: '/rasa/transcript',
    //       timeout: 15,
    //     })
      res.status(200).json({});
    } catch (err) {
      logger.error({err}, 'Error');
      res.sendStatus(503);
    }
  });
  
  module.exports = router;