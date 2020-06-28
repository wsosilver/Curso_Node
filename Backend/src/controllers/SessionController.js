import User from '../models/User'

class SessionController{

   async index(req, res){
        const { email } = req.body;
        
        //let user = await User.create({ email });

        let user = await User.findOne({email})


        if(!user){
            user = await User.create({ email });
        }

        else{ 
            console.log(user)
            return res.json({response: "Usuario ja cadastrado"}) }

        return res.json({response: user})
    }
}

export default new SessionController();