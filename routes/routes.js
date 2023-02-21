const express =require('express');
 const multer = require('multer');

const sequelize = require('../utils/database.js');

const Event = require('../models/event.js');




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const Meeting = require('google-meet-api').meet;



const {preinit,getAllUsers,checkEmailExists,createUser,editEvent, getEventsList,addNewEvent,editClient, getClientsList, addNewClient,dropMeetingEvents,addMeetingEvent,addGlossaryTerm,editGlossaryTerm,deleteGlossaryTerm,getTermById,getTermsList} = require('../controllers/auth');
 

const router = express.Router();


router.post('/uploadProfileImage', upload.single('file'), function (req, res) {
    console.log('hit imgupl endpoint');
    // updateClientRecordWithProfilePicture
  res.json({'message':'ok'})
});



router.post('/checkEmailExists',function(req, res,next){
     checkEmailExists(req, res,next);
} );

router.post('/getAllUsers',function(req, res,next){
     getAllUsers(req, res,next);
} );

router.post('/getTermById',function(req, res,next){
     getTermById(req, res,next);
} );

router.post('/createUser',function(req, res,next){
     createUser(req, res,next);
} );

router.post('/getClientsList', async function(req, res,next){
    console.log('router enter sf');
 getClientsList(req, res,next);
} );

router.post('/getEventsList', async function(req, res,next){
    console.log('router enter sf');
 getEventsList(req, res,next);
} );
router.post('/dropMeetingEvents', async function(req, res,next){
    console.log('router enter sf');
 dropMeetingEvents(req, res,next);
});

router.post('/addNewEvent', async function(req, res,next){
    console.log('router enter sf');
 addNewEvent(req, res,next);
});

router.post('/editEvent', async function(req, res,next){
    console.log('router enter sf');
 editEvent(req, res,next);
});


router.post('/addNewClient', async function(req, res,next){
    console.log('router enter sf');
 addNewClient(req, res,next);
});


router.post('/addMeetingEvent', async function(req, res,next){
    console.log('router enter sf');
 addMeetingEvent(req, res,next);
});

router.post('/addGlossaryTerm', async function(req, res,next){
    console.log('router enter sf');
 addGlossaryTerm(req, res,next);
});

router.post('/editClient', async function(req, res,next){
    console.log('router enter sf');
 editClient(req, res,next);
});

router.post('/deleteGlossaryTerm', async function(req, res,next){
    
 deleteGlossaryTerm(req, res,next);
});


///CALENDAR GMEET CODES







let clientID = "593436295572-fm9krcm5lg4u7kv70dkchm6fk9n0q0f5.apps.googleusercontent.com";
let clientSecret="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";
var gmeetlink = '';
var gmdate = '';
var gmtime = '';
var gmsumm = '';
var gmloc = '';
var gmdesc = '';
var evtid = '';

router.post('/preinit',function(req,res,next){

gmdate= req.body.gmdate;
gmtime = req.body.gmtime;
gmsumm = req.body.name;
gmloc = req.body.location;
gmdesc = req.body.description;
evtid = req.body.event_id;

console.log(gmdate+'..'+gmtime+'...'+gmsumm+'...'+gmloc+'...'+gmdesc+'...'+evtid);


  res.json({'message':'ok'});
   // return res.redirect('http://localhost:5000/auth/google');
});

passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "https://backend-incio.onrender.com/auth/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        Meeting({
            clientId: clientID,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            date: gmdate,
            time: gmtime,
            summary: gmsumm,
            location: gmloc,
            description: gmdesc,
            checking:0
        }).then(async function (result) {
            gmeetlink = result;

if (gmeetlink !=='') {


let response = await Event.update({                        
                        uniquelink:gmeetlink,                        
                    },   {
    where: {
    id: evtid   
  }
});

if (response) {
console.log('within if response');
//res.status(200).json({"editedEvent":response});
}
else { //res.status(500).json({"message":"getting gmeetlink error"});
}


}

else {

    res.status(200).json({"adding gmeetlink error - calendar is already booked":response});
}



            console.log('myresult>>>>>>>>>>>',result);
        }).catch((error) => {
            console.log(error)
        });






        return cb();
    }
));





router.get('/auth/callback',
    passport.authenticate('google', { failureRedirect: '/' })
);

router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile','https://www.googleapis.com/auth/calendar'],
        accessType: 'offline',
        prompt: 'consent'
    }
    ));

router.get('/',function(req,res){
    // res.send("done"+gmeetlink);
    //res.json({'message':'ok'});
    return res.redirect('http://localhost:3000/meetings');
});









//////////////CALENDAR GMEET CODES





// will match any other path
router.use('/', (req, res, next) => {
    res.status(200).json({error : "page not found"});
});


module.exports = router;
