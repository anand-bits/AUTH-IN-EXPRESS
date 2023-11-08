const userModel = require("../model/userSchema");
const emailValidator=require("email-validator")



const signup = async (req, res, next) => {
    const { name, email, password, confirmpassword } = req.body;

    console.log(name, email, password, confirmpassword);

    try {
        const userInfo = userModel(req.body);

       
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

            if(!validEmail)
            {
                return res.status(400).json(
                    {
                        success:false,
                        message:"Please Provide Correct Email ID"
                    }
                )
            }

            if(password!=confirmpassword)
            {
                return res.status(400).json(
                    {
                        success:false,
                        message:"Ur confirm Password not matching"
                    }
                )
            }


            const result = await userInfo.save();


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



// Sign In ..........>>>>>>>>>>>>>>>>>>>>>>>>
// In Routes Signin is Declared Now In COntroller We will write the LOgic how will work..........................>>>>>>>>>>>>>>>>>>>>>>>

const signin= async (req,res)=>
{
        const { email,password}= req.body;

        if(!email ||!password)
        {
            return res.status(400).json({
                success: false,
                message: "Every Field is Mandatory------------->>>>>>>>>>>>>>>>>>"
            });
        }

        try{
        const user=await userModel.findOne({email}).select('password');

        if(!user || user.password!==password)
        {
            return res.status(400).json({
                success: false,
                message: "Invalid Credential------------->>>>>>>>>>>>>>>>>>"
            });
        }
        



const token= user.jwtToken();
user.password=undefined;

const cookieoption=
{
    maxAge: 24*60*60*1000,
    httpOnly:true
};
res.cookie("token",token,cookieoption);

return res.status(200).json({
    success: true,
    data: user
})

}
catch(err){
    console.error("Error in signin:", err); // Log the error for debugging
    return res.status(400).json({
        success: false,
        message: "Error during signin. Please check the server logs for more details."
    });

}
}





module.exports={
    signup,signin
}
