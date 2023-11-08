const userModel = require("../model/userSchema");

const signup = async (req, res, next) => {
    const { name, email, password, confirmpassword } = req.body;

    console.log(name, email, password, confirmpassword);

    try {
        const userInfo =new  userModel(req.body);

        const result = await userInfo.save();
       // console.log(result)
            if(!name|| !email || !password||!confirmpassword)
            {
                return res.status(400).json(
                    {
                        success:false,
                        message:"Every Field is required"
                    }
                )
            }

            const validEmail= emailValidator.validate(email);
            

        return res.status(200).json({
            success: true,
            data: result
        })
    }
     catch (e) {
       return res.status(400).json({
            success: false,
            message: e.message
        });
    }
};

module.exports={
    signup
}
