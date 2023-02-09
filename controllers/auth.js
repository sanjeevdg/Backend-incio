const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/database.js');
const GlossaryTerm = require('../models/glossaryterm.js');
const MeetingEvent = require('../models/meetingevent.js');


const tokens = [];


const getTermsList = async (req,res,next) => {

var query = "select id,term,termdesc from glossaryterms";
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);


if (results) {
res.status(200).json({"myterms":results})

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

var query = "drop table meetingevents";
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




const editGlossaryTerm = async (req,res,next) => {

try {
let response = await GlossaryTerm.update({                        
                        term: req.body.term,
                      termdesc: req.body.termdesc                       
                    },   {
    where: {
    id: req.body.termid   
  }
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


module.exports = {dropMeetingEvents,addMeetingEvent,addGlossaryTerm,editGlossaryTerm,deleteGlossaryTerm, getTermById,getTermsList} ;
