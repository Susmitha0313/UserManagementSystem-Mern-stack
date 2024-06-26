const User = require('../models/user')
const { generateToken } = require('../jwtConfig')
const bcrypt = require('bcrypt')

const securePass = async (password) => {
    try {
        const hashBcrypt = await bcrypt.hash(password, 10);
        if (hashBcrypt) {
            return hashBcrypt;
        }
    } catch (error) {
        console.log(error.message);
    }
}



const verifyLogin = async (req, res) => {
    try {

        const { email, password } = req.body

        const findEmail = await User.findOne({ email: email });
        console.log(findEmail);

        if (findEmail) {
            const passwordMatch = await bcrypt.compare(password, findEmail.password)
            if (passwordMatch) {
                const token = await generateToken({ id: findEmail._id })

                let data = {}

                for (let key in findEmail.toObject()) { //toObject to convert mongo data to js obejct
                    if (key !== "password") {
                        data[key] = findEmail[key]
                    }

                }
                res.status(200).json({
                    token: token,
                    data: data
                })
            } else {
                res.json({ status: "incorrect" });
            }
        } else {
            res.json({ status: "usernotfound" });
        }

    } catch (error) {
        console.log(error.message);
    }
}

const registerPost = async (req, res) => {
    try {
        console.log("veriyfyyy");
        const { name, email, mobile, password } = req.body;
        const existingEmail = await User.findOne({ email: email })
        console.log(existingEmail);
        if (existingEmail) {
            res.json({ status: "emailExists" })
        } else {
            const hashPassword = await securePass(password);
            console.log(hashPassword);
            if (hashPassword) {
                console.log("getting heerr");
                const newUser = new User({
                    name: name,
                    email: email,
                    mobile: mobile,
                    password: hashPassword,
                });
                await newUser.save();
                res.json({ status: "success" })
            }
        }

    } catch (error) {
        console.log(error.message);
    }
}


const addImage = async (req, res) => {
    try {
        const image = req.file.filename;
        const id = req.body.userId;

        const findUser = await User.findByIdAndUpdate(
            {_id : id },
            {
                image : image,
            }
        );

            let data = {};

            if(findUser) {
                const Data = await User.findOne({ _id : id });

                for(let key in Data.toObject()) {
                    if(key !== "password") {
                        data[key] = Data[key];
                    }
                }

                console.log('this is the data ', data);

                res.json({
                    data : data,
                });
            }
        
    } catch (error) {
        console.log(error.message);
    }
}

const profileEdit = async (req, res) => {
    try {
      const { name, mobile, userId } = req.body;
  
      const updateUser = await User.findByIdAndUpdate(
        { _id: userId },
        {
          $set: {
            name: name,
            mobile: mobile,
          },
        }
      );
      if (updateUser) {
        const data={}
        const Data = await User.findOne({ _id: userId });
  
        for (let key in Data.toObject()) {
          if (key !== "password") {
            data[key] = Data[key];
          }
        }
  console.log("insie edit profile json");
        res.json({
          data: data,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };


module.exports = {
    verifyLogin,
    registerPost,
    addImage,
    profileEdit
}