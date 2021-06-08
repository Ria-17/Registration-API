 const express = require('express');
 const router = express.Router();
 const {check, validationResult} = require('express-validator');
 const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.get('/', async(req, res) => {
    try {
        const users = await User.find()
        res.json(users)
        
    } catch (err) {
        res.send("Error " + err)
    }
});

router.post('/',
      [
        check('name', 'Name is required').trim().not().isEmpty(),
        check('email', 'Email is required').trim().isEmail().normalizeEmail(),
        check('password', 'Password is required and minimun 6 digit').trim().isLength({min: 6}),
        check('phone', 'Phone is required and minimun 10 digit').isLength({min: 10}).isMobilePhone(),
        check('address', 'Address is required').trim().isAlphanumeric().notEmpty(),
        check('dob', 'dob is required').isDate(),
        check('gender', 'Gender is required').trim().not().isEmpty()
      ],  
    async(req,res) => {
       const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({msg: errors.array()});
        }
    const {name, email, password, phone, address, dob, gender} = req.body;
     
    const findUser = await User.findOne({email: email})       
                 
     if(findUser){
         res.status(400).json({msg: [{msg: 'User with this email already exists'}]})
        }
    else{   
    const user = new User({
        name : name,
        email : email,
        password : password,
        phone : phone,
        address : address,
        gender : gender,
        dob : dob
    })
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        const u1 = await user.save()
        res.json(u1)
        
    } catch (error) {
        res.send('Error : ' + error)
    }
}
});

router.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(user){
        res.json(user)
        }
        else{
            res.status(400).json({msg:[{msg:'User do not exist'}]});
          }
        
    } catch (err) {
        res.send("Error" + err)
    }
});

router.delete('/:id',async(req, res, next)=>{
  const id=req.params.id;
  try{
    const user =await User.findById(id);
    if(user){
        await User.findByIdAndDelete(id);
    res.status(200).json({msg:[{msg:'User deleted'}]});
    }
    else{
      res.status(400).json({msg:[{msg:'User do not exist'}]});
    }
  }catch(err){
    res.send('Error : ' + err);
  }
});

router.patch('/:id',async(req, res, next)=>{
    try{
      const id=req.params.id;
      const user= await User.findById(id);
      if(user){
             const updatedUser=req.body;
      try{
        const u1=await User.findByIdAndUpdate(id,updatedUser);
        res.status(200).json({msg:[{msg:'User information updated'}, u1]});
      }catch(err){
        res.send('Error : ' + err); 
      }
      }
      else{
        res.status(400).json({msg:[{msg:'User do not exist'}]});
      }
    }catch(err){
      res.send('Error : ' + err);
    }
  });


 module.exports = router;

