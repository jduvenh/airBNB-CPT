const mongoose = require('mongoose');

const fileHelper = require('../util/file');

//const { validationResult } = require('express-validator/check');

const Roomdb = require('../models/rooms');
const Rooms = require('../models/rooms');
const Users = require('../models/user');


exports.Availrooms = (req, res) => {
  //if(req.session.email == undefined)
   //     res.redirect("/");
    //const page = +req.query.page || 1;
   // let totalItems;
    const filterdate = req.query.filter_date;
    console.log(filterdate);
    if(filterdate)
    {
      Rooms.find({avail : true, availfrom : filterdate})
      .countDocuments()
      .then(numRooms => {
        totalrooms = numRooms;
        return Rooms.find({avail : true , availfrom : filterdate})
        
      })
      .then(rooms => {
        res.render('availrooms.ejs', {
        
          rooms: rooms,
          pageTitle: 'Rooms',
          path: 'availrooms.ejs',
  
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
    }
    Rooms.find({avail : true})
      .countDocuments()
      .then(numRooms => {
        totalrooms = numRooms;
        return Rooms.find({avail : true})
          
      })
      .then(rooms => {
        res.render('availrooms.ejs', {
        
          rooms: rooms,
          pageTitle: 'Rooms',
          path: 'availrooms.ejs',
  
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };

  exports.landAvailrooms = (req, res) => {
    const page = +req.query.page || 1;
    let totalItems;
    console.log(req.session.email);
    if(req.session.email == undefined)
        res.redirect("/");
    Rooms.find({owner: req.session.email })
      .countDocuments()
      .then(numRooms => {
        totalItems = numRooms;
        return Rooms.find({owner: req.session.email})
          //.skip((page - 1) * 100)
          //.limit(100);
      })
      .then(rooms => {
        res.render('landrooms.ejs', {
        
          rooms: rooms,
          pageTitle: 'Rooms',
          path: 'landrooms.ejs',
  
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };


  exports.postAvailrooms = (req, res) => {
    if(req.session.email == undefined)
        res.redirect("/");
    const roomid = req.body.roomid;
    
    console.log(roomid);
    
    Rooms.findOne({_id : roomid})
    .countDocuments()
      .then(numRooms => {
        totalItems = numRooms;
        return Rooms.find({_id : roomid})
         
      })
      .then(rooms => {
        res.render('availroomsview.ejs', {
        
          rooms: rooms,
          pageTitle: 'Rooms',
          path: 'availrooms.ejs',
  
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });

   
  };

  exports.postBookAvailrooms = (req, res) => {
    if(req.session.email == undefined)
        res.redirect("/");
    const roomid = req.body.roomid;
    //const page = +req.query.page || 1;
    let totalItems;
    console.log(roomid);
    
    Rooms.findOne({ _id: roomid })
    // Rooms.findByIdAndUpdate(req.body.roomid, {$push: {bookedbya: {
    //   bookedon : req.body.comment,
    //   bookedby : req.session.email,
    //   isbooked: true}}})
  .then(Rooms => {
      
      Rooms.booked = true;
      Rooms.bookedby = req.session.username;
      // Rooms.bookedbya = {
      //   bookedon : req.body.filter_date,
      //   bookedby : req.session.email,
      //   isbooked: true]};
      
     
      ///User.verifyToken = ''; // Setting verifyToken to nothing once validation

      Rooms.save(); 
      req.flash('success_msg', 'room booked');
      console.log("room booked ");
      res.redirect('/home/availrooms');
  })
  .catch(err => console.log(err));

  };

 

  exports.postupdateroom = function (req, res) {
    if(req.session.email == undefined)
           res.redirect("/");
    const select = req.body.chooseArea;
    console.log(select);
   // res.redirect("/");
   const roomid = req.body.roomid;
    const page = +req.query.page || 1;
    let totalItems;
    console.log(roomid);
    
    Rooms.findOne({ _id: roomid })
  .then(Rooms => {
     
      //Rooms.booked = true;
     

      
   if(select == "1")
   {
      Rooms.delete();
   }
   if(select == "2")
   {
     Rooms.avail = false;
   }
   if(select == "3")
   {
     Rooms.avail = true;
   }
   if(select == "4")
   {
    Rooms.booked = true;
   }
   if(select == "5")
   {
    Rooms.booked = false;
   }
   if(select == "6")
   {
     Rooms.notofi = true;
   }
   if(select == "7"){
    Rooms.notofi = false;

  }
  Rooms.save(); 
      req.flash('success_msg', 'room updated');
      console.log("room updated");
      if (req.session.username == "admin"){
        res.redirect('admin/rooms');
      }
      res.redirect('/landlord/availrooms');
      
  })
  .catch(err => console.log(err));
  };


  exports.adminAvailrooms = (req, res) => {
    //const page = +req.query.page || 1;
    
    let totalItems;
    console.log(req.session.email);
    if(req.session.email == undefined)
        res.redirect("/");
    Rooms.find()
      .countDocuments()
      .then(numRooms => {
        totalItems = numRooms;
        return Rooms.find()
          //.skip((page - 1) * 100)
          //.limit(100);
      })
      .then(rooms => {
        res.render('adminrooms.ejs', {
        
          rooms: rooms,
          pageTitle: 'Rooms',
          path: 'adminrooms.ejs',
  
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };

  exports.postupdateroom = function (req, res) {
    if(req.session.email == undefined)
           res.redirect("/");
    const select = req.body.chooseArea;
    console.log(select);
   // res.redirect("/");
   const roomid = req.body.roomid;
    const page = +req.query.page || 1;
    let totalItems;
    console.log(roomid);
    
    Rooms.findOne({ _id: roomid })
  .then(Rooms => {
     
      //Rooms.booked = true;
     

      
   if(select == "1")
   {
      Rooms.delete();
   }
   if(select == "2")
   {
     Rooms.avail = false;
   }
   if(select == "3")
   {
     Rooms.avail = true;
   }
   if(select == "4")
   {
    Rooms.booked = true;
   }
   if(select == "5")
   {
    Rooms.booked = false;
   }
   if(select == "6")
   {
     Rooms.notofi = true;
   }
   if(select == "7"){
    Rooms.notofi = false;

  }
  Rooms.save(); 
      req.flash('success_msg', 'room updated');
      console.log("room updated");
      if (req.session.username == "admin"){
        res.redirect('admin/rooms');
      }
      res.redirect('/landlord/availrooms');
      
  })
  .catch(err => console.log(err));
  };


  exports.adminAvailrooms = (req, res) => {
    const page = +req.query.page || 1;
    let totalItems;
    console.log(req.session.email);
     if(req.session.email == undefined)
         res.redirect("/");
    Rooms.find()
      .countDocuments()
      .then(numRooms => {
        totalItems = numRooms;
        return Rooms.find()
          //.skip((page - 1) * 100)
          //.limit(100);
      })
      .then(rooms => {
        res.render('adminrooms.ejs', {
        
          rooms: rooms,
          pageTitle: 'Rooms',
          path: 'adminrooms.ejs',
  
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };

  exports.deluser =  (req, res) => {
    if(req.session.email == undefined)
           res.redirect("/");
   Users.findOne({ email:  req.session.email})
   //Users.findOneAndUpdate({email: req.user.}, {$push: {friends: friend}})
  .then(Users => {

    rooms.comments
  Users.delete(); 
      req.flash('success_msg', 'user deleted');
      console.log("user deleted");
   
      res.redirect('/');
      
  })
  .catch(err => console.log(err))
};
/////////////////////////
exports.postcomment =  (req, res) => {
  if(req.session.email == undefined)
         res.redirect("/");
 
 console.log(req.body.roomid);
 console.log(req.body.comment);
 
 Rooms.findByIdAndUpdate(req.body.roomid, {$push: {comments: req.body.comment}})
 .then(Rooms => {
   Rooms.save();
   res.redirect(req.get('referer'));
 })
 
};

////////////////
exports.postlike =  (req, res) => {
  if(req.session.email == undefined)
         res.redirect("/");
 
 console.log(req.body.roomid);
 //console.log(req.body.comment);
 
 Rooms.findById(req.body.roomid)
 .then(Rooms => {
   Rooms.likes++;
   Rooms.save();
   res.redirect(req.get('referer'));
 })
 
};


//////////////////

