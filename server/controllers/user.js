import User from "../models/User.js";

export const getUser = async (req,res) => {
    console.log("here")
    try {
        const { id } = req.params;
        console.log(req.params)
        const user = await User.findById(id); 
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getUserFriends = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findById(id);
    
        const friends = Promise.all(
            user.friends.map(user=> User.findById(user.id) )
        )
    
        const formattedFriends = friends.map(({ _id,firstName, lastName, occupation, location, picturePath })=>{
            return { 
                _id,firstName, lastName, occupation, location, picturePath
            }
        })
        res.status(200).json(formattedFriends)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}


export const addRemoveFriend = async (req,res) => {
    try {
        const { id, friendID } = req.params;

        const user = await User.findById(id);
        const friend = await User.findById(id);

        if(user.friends.includes(friend)){
            user.friends = user.friends.filter( id => id !== friendID );
            friend.friends = friend.friends.filter((id)=> id !== id);
        }else{
            user.friends.push(friendID);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = Promise.all(
            user.friends.map(user=> User.findById(user.id) )
        )
    
        const formattedFriends = friends.map(({ _id,firstName, lastName, occupation, location, picturePath })=>{
            return { 
                _id,firstName, lastName, occupation, location, picturePath
            }
        })
        res.status(200).json(formattedFriends)

    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}