const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (body) => {
  // name,
  // nim,
  // department,
  // handphone,
  // email,
  // image,
  // password,
  // role
  let params = {
    name: body.name,
    nim: body.nim,
    department: body.department,
    handphone: body.handphone,
    email: body.email,
    image: body.image,
    role: body.role,
  };

  //   console.log("PARAMS 1", params);
  for (let prop in params) if (!params[prop]) delete params[prop];
  //   console.log("PARAMS 2", params);

  return new Promise((resolve, reject) => {
    // console.log("BODY: ",body)
    User.findOne({ nim: body.nim })
      .then((user) => {
        if (user == null) {
          let encripted_password = bcrypt.hashSync(body.password, 10);
          // console.log(encripted_password)
          params.encripted_password = encripted_password;
          User.create(params).then((user) => {
            return resolve({
              message: "User has been created",
              data: user,
            });
          });
        } else {
          return reject({
            message: `User with nim ${body.nim} already exist`,
          });
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

exports.loginUser = async (body) => {
  return new Promise((resolve, reject) => {
    User.findOne({ nim: body.nim })
      .then((user) => {
        if (user !== null) {
          let isUser = bcrypt.compareSync(
            body.password,
            user.encripted_password
          );
          if (isUser == true) {
            if (user.status == true) {
              let token = jwt.sign(
                {
                  id: user._id,
                  email: user.email,
                  nim: user.nim,
                  name: user.name,
                  role: user.role,
                },
                process.env.SECRET_KEY
              );
              return resolve({
                message: "You are succesfully logged in",
                data: {
                  nim: user.nim,
                  name: user.name,
                  email: user.email,
                  department: user.department,
                  role: user.role,
                  handphone: user.handphone,
                  token: token,
                },
              });
            } else {
              return reject({
                message: "User has not approved",
              });
            }
          } else {
            return reject({
              message: `Password or NIM is wrong`,
            });
          }
        } else {
          return reject({
            message: `You are not autorized to login`,
          });
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// Arrow function
exports.approve_user = async (role, nim) => {
  console.log("ROLE: ", role);
  console.log("Nim: ", nim);
  return new Promise((resolve, reject) => {
    if (role == "ADMIN") {
      User.findOneAndUpdate(
        {
          nim: nim,
        },
        {
          status: true,
        },
        {
          new: true,
        }
      )
        .then((user) => {
          return resolve({
            message: `User ${user.nim} has been approve`,
          });
        })
        .catch((err) => {
          return reject({
            message: `User is not found`,
          });
        });
    } else {
      return reject({
        message: `You are not authorized, to do this action`,
      });
    }
  });
};
exports.getAllUser = async () => {
  return new Promise((resolve, reject) => {
    // cara 1
    User.find({})
      .then((user) => {
        if (user.length == 0) {
          return resolve({
            message: "Users empty",
            data: user,
          });
        }
        return resolve({
          data: user,
        });
      })
      .catch((err) => {
        return reject({
          message: err.message,
        });
      });

    // // cara 2
    // const allLetters = await LetterModel.find({})
    // console.log(allLetters)
  });
};
