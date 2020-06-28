    import House from '../models/House';
    import User from '../models/User';

    
    
    class HouseController{

        async index(req, res){
            const { status } = req.query;
            const houses = await House.find({ status })

            return res.json({houses})
        }

        async store(req,res){
            const { filename } = req.file
            const {description, price, location, status} = req.body; 
            const { user_id } = req.headers

            const house = await House.create({
                thumbnail: filename,
                description,
                price,
                location,
                status,
                user: user_id
                })

            return res.json({house})
        }

        async update(req, res){
            const { filename } = req.file;
            const { house_id } = req.params
            const {description, price, location, status} = req.body; 
            const { user_id } = req.headers

            const user = await User.findById(user_id);
            const house = await House.findById(house_id);

            if(String(user._id) !== String(house.user)){
               return res.status(401).json({error: "Não autorizado!" })
            }

            const houses = await House.updateOne({_id: house_id}, {
                thumbnail: filename,
                description,
                price,
                location,
                status,
                user: user_id

            })

            res.json({houses})
        }

        async destroy(req, res){
            const { house_id } = req.body
            const user = await User.findById(user_id);
            const house = await House.findById(house_id);

            if(String(user._id) !== String(house.user)){
               return res.status(401).json({error: "Não autorizado!" })
            }

            await House.findByIdAndDelete({_id: house_id})

            res.json({message: "Excluido com sucesso!"})
        }

    }

    export default new HouseController();