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

const {getEventsList,addNewEvent,editClient, getClientsList, addNewClient,dropMeetingEvents,addMeetingEvent,addGlossaryTerm,editGlossaryTerm,deleteGlossaryTerm,getTermById,getTermsList} = require('../controllers/auth');
 

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
// will match any other path
router.use('/', (req, res, next) => {
    res.status(200).json({error : "page not found"});
});


module.exports = router;
