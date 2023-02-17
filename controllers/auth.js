const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/database.js');
const GlossaryTerm = require('../models/glossaryterm.js');
const MeetingEvent = require('../models/meetingevent.js');
const Client = require('../models/client.js');
const Event = require('../models/event.js');

const tokens = [];


const getClientsList = async (req,res,next) => {

var query = "select * from clients";
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);


if (results) {
res.status(200).json({"myclients":results})

}

};

const getEventsList = async (req,res,next) => {

var query = "select * from events";
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);


if (results) {
res.status(200).json({"myevents":results})

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

const dropMeetingEvents = async (req,res,next) => {

var query = "drop table clients";
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

try {
let response = await Event.create({                        
                        name: req.body.name,
						location:req.body.location,
						description:req.body.description,
						uniquelink:req.body.uniquelink,
						mstart:req.body.mstart,
                      	duration: req.body.duration,
                        people: req.body.people,						
                       
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


module.exports = {getEventsList,addNewEvent,editClient, addNewClient,dropMeetingEvents,addMeetingEvent,addGlossaryTerm,deleteGlossaryTerm, getTermById,getClientsList} ;
