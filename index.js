const ussdRouter =require('ussd-router')

const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5010;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
res.send('WELCOME TO coding for Dumpies 101')
})



app.post('/webhook/ussd', (req, res) => {
    // Read the variables sent via POST from our API
    const {
        text:rawtext,
    } = req.body;

    const text=ussdRouter(rawtext)
    const footer = '\n0: Back 00: Home';
    let msg = '';
   

    if (text === '') {
        // This is the first request. Note how we start the response with CON
        response = `CON CHOOSE YOUR PREFFERED LANGUAGE\n\n
        1. English\n
        2. Swahili\n
        3. French\n
        4.Espanyol\n
        0. exit`;
    } else if ( text === '1') {
        // Business logic for first level response
        msg = 'CON Welcome to Datastructures 101';
        msg += '\n\n 1 Teach me a concept';
        msg += '\n 2 Test me';
    } else if ( text === '2') {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END
        msg = 'CON Karibu kwenye kikao cha Datastructures 101';
        msg += '\n\n 1 Nifundishe concept';
        msg += '\n 2 Nipee assessmenti';
    } else if ( text == '1*1') {
        // This is a second level response where the user selected 1 in the first instance
        
      /*   msg = 'CON Choose a concept to learn\n';
        msg += '\n 1. Arrays';
        msg += '\n 2. Linked Lists';
        msg += '\n 3. Stacks';
        msg += '\n 4. Queues';
        msg += '\n 5. Trees'; */
        msg += footer;
    } else if ( text == '1*1*1') {
        // This is a second level response where the user selected 1 in the first instance

        // This is a terminal request. Note how we start the response with END

    }  else {
        msg = 'END Sorry I did not get that.';
      }
    

    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(msg);
});

app.listen(port, () => {
console.log(`Server running...on port${port}`);
});