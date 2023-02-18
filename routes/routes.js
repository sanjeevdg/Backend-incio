const express =require('express');
 const multer = require('multer');
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



const {editEvent, getEventsList,addNewEvent,editClient, getClientsList, addNewClient,dropMeetingEvents,addMeetingEvent,addGlossaryTerm,editGlossaryTerm,deleteGlossaryTerm,getTermById,getTermsList} = require('../controllers/auth');
 

const router = express.Router();


router.post('/uploadProfileImage', upload.single('file'), function (req, res) {
    console.log('hit imgupl endpoint');
    // updateClientRecordWithProfilePicture
  res.json({'message':'ok'})
});


router.post('/getTermById',function(req, res,next){
     getTermById(req, res,next);
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
let meetlink = 'sss';

passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "http://localhost:5000/auth/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        Meeting({
            clientId: clientID,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            date: "2023-02-14",
            time: "10:59",
            summary: 'summary',
            location: 'location',
            description: 'description',
            checking:0
        }).then(function (result) {
            meetlink = result;
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
    res.send("done"+meetlink)
})







//////////////CALENDAR GMEET CODES





// will match any other path
router.use('/', (req, res, next) => {
    res.status(200).json({error : "page not found"});
});


module.exports = router;
