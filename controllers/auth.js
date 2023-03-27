const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/database.js');
const GlossaryTerm = require('../models/glossaryterm.js');
const MeetingEvent = require('../models/meetingevent.js');
const Client = require('../models/client.js');
const Event = require('../models/event.js');
const User = require('../models/user.js');

const tokens = [];


const getClientsList = async (req,res,next) => {

var query = "select * from clients";
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);


if (results) {
res.status(200).json({"myclients":results})

}

};
const loginUser = (req, res, next) => {
    // checks if email exists
    User.findOne({ where : {
        email: req.body.email, 
    }})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "user not found"});
        } else {
            // password hash
            bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
                if (err) { // error while comparing
                    res.status(502).json({message: "error while checking user password"});
                } else if (compareRes) { // password match
                    const token = jwt.sign({ phone: req.body.phone }, 'secret', { expiresIn: '1h' });
                    res.status(200).json({message: "user logged in", "token": token,"uid":dbUser.id,"usrph":dbUser.phone,"user":dbUser});
                } else { // password doesnt match
                    res.status(401).json({message: "invalid credentials"});
                };
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const getEventsList = async (req,res,next) => {

var query = "select * from events";
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);


if (results) {
res.status(200).json({"myevents":results})

}

};



const getAllUsers = async (req,res,next) => {

var query = "select * from users";
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);


if (results) {
res.status(200).json({"myusers":results})

}

};


const deleteGlossaryTerm = async (req,res,next) => {

var query = "delete from glossaryterms where id="+req.body.termid;
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);

//if (results) {
res.status(200).json({"message":"Glossary Term delete success."})

//}

};


const editEvent = async (req,res,next) => {

let peoplearr =  req.body.people.split(',');

try {
let response = await Event.update({                        
                       name: req.body.name,
						location:req.body.location,
						description:req.body.description,
						uniquelink:req.body.uniquelink,
						mstart:req.body.mstart,
                      	duration: req.body.duration,
                        people: peoplearr,
						rptmon:req.body.rptmon,
						rpttue:req.body.rpttue,
						rptwed:req.body.rptwed,
						rptthu:req.body.rptthu,
                      	rptfri: req.body.rptfri,
                      	rptsat:req.body.rptsat,
                      	rptsun:req.body.rptsun,
                      	
                    },   {
    where: {
    id: req.body.event_id   
  }
});

if (response) {
console.log('within if response');
res.status(200).json({"editedEvent":response});
}
else { res.status(500).json({"message":"edit event error"});}
}
catch (e) {

    console.log('editevent newerror is:'+e.message);
    res.status().json({"message":"editevent try reporting error occur"});


} 

return res;





};



const dropMeetingEvents = async (req,res,next) => {

var query = "drop table events";
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);

//if (results) {
res.status(200).json({"message":"mee eve delete success."})

//}

};

const getTermById = async (req,res,next) => {

//let myforms = await SpunkyForm.findAll();

var query = "select id,term,termdesc from glossaryterms where id="+req.body.termid;
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);


if (results) {
res.status(200).json({"myterm":results})

}

};



const addGlossaryTerm = async (req,res,next) => {

try {
let response = await GlossaryTerm.create({                        
                        term: req.body.term,
                      termdesc: req.body.termdesc                       
                    });
if (response) {
console.log('within if response');
res.status(200).json({"glossaryterm":response});
}
else { res.status(500).json({"message":"glossary term error"});}
}
catch (e) {

    console.log('newerror is:'+e.message);
    res.status().json({"message":"try reporting error occur"});


} 

return res;
};


const addNewEvent = async (req,res,next) => {

console.log('received people value'+req.body.people);
console.log('typeof received people value'+typeof(req.body.people));
try {

	let peoplearr =  req.body.people.split(',');

let response = await Event.create({                        
                        name: req.body.name,
						location:req.body.location,
						description:req.body.description,
						uniquelink:req.body.uniquelink,
						mstart:req.body.mstart,
                      	duration: req.body.duration,
                        people:peoplearr,
                        rptmon:req.body.rptmon,
                        rpttue:req.body.rpttue,
                        rptwed:req.body.rptwed,
                        rptthu:req.body.rptthu,
                        rptfri:req.body.rptfri,
                        rptsat:req.body.rptsat,
                        rptsun:req.body.rptsun
                       
                    });
if (response) {
console.log('within if response');
res.status(200).json({"newEvent":response});
}
else { res.status(500).json({"message":"new event create error"});}
}
catch (e) {

    console.log('newerror is:'+e.message);
    res.status().json({"message":"try reporting error occur"});


} 


return res;
};


const addNewClient = async (req,res,next) => {

try {
let response = await Client.create({                        
                        name: req.body.name,
						email:req.body.email,
						phone:req.body.phone,
						address:req.body.address,
						zip:req.body.zip,
                      	country: req.body.country,
                        cname: req.body.cname,
						cemail:req.body.cemail,
						cphone:req.body.cphone,
						caddress:req.body.caddress,
						czip:req.body.czip,
                      	ccountry: req.body.ccountry,
                      	profilephoto:req.body.profilephoto,                     
                      	companylogo:req.body.companylogo,
                      	role:req.body.role,
                      	ccno:req.body.ccno,
                      	ccexp:req.body.ccexp,
                      	cccvv:req.body.cccvv                       
                    });
if (response) {
console.log('within if response');
res.status(200).json({"newClient":response});
}
else { res.status(500).json({"message":"new client create error"});}
}
catch (e) {

    console.log('newerror is:'+e.message);
    res.status().json({"message":"try reporting error occur"});


} 


return res;
};

const addMeetingEvent = async (req,res,next) => {

try {
let response = await MeetingEvent.create({                        
                        start: req.body.start,
						end:req.body.end,
						mname:req.body.mname,
						place:req.body.place,
						people:req.body.people,
                      	description: req.body.description                       
                    });
if (response) {
console.log('within if response');
res.status(200).json({"meetingevent":response});
}
else { res.status(500).json({"message":"meeting event add error"});}
}
catch (e) {

    console.log('newerror is:'+e.message);
    res.status().json({"message":"try reporting error occur"});


} 

return res;
};




const editClient = async (req,res,next) => {

try {
let response = await Client.update({                        
                       name: req.body.name,
						email:req.body.email,
						phone:req.body.phone,
						address:req.body.address,
						zip:req.body.zip,
                      	country: req.body.country,
                        cname: req.body.cname,
						cemail:req.body.cemail,
						cphone:req.body.cphone,
						caddress:req.body.caddress,
						czip:req.body.czip,
                      	ccountry: req.body.ccountry,
                      	profilephoto:req.body.profilephoto,
                      	companylogo:req.body.companylogo,
                      	role:req.body.role,
                      	ccno:req.body.ccno,
                      	ccexp:req.body.ccexp,
                      	cccvv:req.body.cccvv                      
                    },   {
    where: {
    id: req.body.clientid   
  }
});

if (response) {
console.log('within if response');
res.status(200).json({"editedClient":response});
}
else { res.status(500).json({"message":"glossary term error"});}
}
catch (e) {

    console.log('newerror is:'+e.message);
    res.status().json({"message":"try reporting error occur"});


} 

return res;
};


const checkEmailExists = (req, res, next) => {
    // checks if email already exists
    //'san@san.com'
     console.log('entering method fndOne::::::::::::::');
    User.findOne({ where : {
        email:req.body.email, 
    }})
    .then(dbUser => {
        console.log('entered then clause.................');
        if (dbUser) {
            console.log('this is email already exists message after querying db');
            return res.status(200).json({message: "email already exists"});
        } else {
        	return res.status(200).json({message: "email can be used"});	

        }
}).catch(err => {
        console.log('error', err);
    });
};
 


const createUser = (req, res, next) => {
    // checks if email already exists
    //'san@san.com'
     console.log('entering method fndOne::::::::::::::');
    User.findOne({ where : {
        email:req.body.email, 
    }})
    .then(dbUser => {
        console.log('entered then clause.................');
        if (dbUser) {
            console.log('this is email already exists message after querying db');
                        
            
            
            
          //  return res.status(409).json({message: "email already exists"});
        } else if (!dbUser && req.body.email && req.body.password) {
            // password hash
       console.log('attemoting to hash password');
            
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    return User.create(({
                        email: req.body.email,
                        name: req.body.name,
                        password: passwordHash,
                       	fireb_uid:req.body.fireb_uid,
                        regtoken:req.body.regtoken,                      
                    }))
                    .then(() => {
                        res.status(200).json({message: "user created"});
                    })
                    .catch(err => {
                        console.log('signup error message is:::::'+err);
                        res.status(502).json({message: "error while creating the user"});
                    });
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};




module.exports = {loginUser,getAllUsers,checkEmailExists,createUser,editEvent,getEventsList,addNewEvent,editClient, addNewClient,dropMeetingEvents,addMeetingEvent,addGlossaryTerm,deleteGlossaryTerm, getTermById,getClientsList} ;
