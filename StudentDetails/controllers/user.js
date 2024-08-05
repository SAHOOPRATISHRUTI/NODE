const Details = require("../models/user");

async function handleGetAllUsers(req, res) {
    try {
        const users = await Details.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error retrieving users:", error);
        return res.status(500).json({ status: 'Error', message: error.message });
    }
}

async function handleGetUserById(req, res) {
    const id = req.params.id;

    try {
        const user = await Details.findById(id);
        if (!user) {
            return res.status(404).json({ status: 'Error', message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).json({ status: 'Error', message: error.message });
    }
}

async function handleupdatedById(req, res) {
    {
        const id = req.params.id;
        const updates = req.body;

        try {
            const user = await Details.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
            if (!user) {
                return res.status(404).json({ status: 'Error', message: 'User not found' });
            }
            return res.status(200).json({ msg: "User updated successfully", user });
        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({ status: 'Error', message: error.message });
        }
    }
}

async function handleDeleteUserById(req, res) {
    const id = req.params.id;

    try {
        const user = await Details.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ status: 'Error', message: 'User not found' });
        }
        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ status: 'Error', message: error.message });
    }
}
async function handleCreatenewUser(req, res) {
    {
        const { Name, Age, Gender, Email } = req.body;

        if (!Name || !Age || !Gender || !Email) {
            return res.status(400).json({ status: "Error", message: "All fields are required" });
        }
        try {
            const result = await Details.create({ Name, Age, Gender, Email });
            return res.status(201).json({ msg: "Success", result });
        } catch (error) {
            console.error("Error creating user:", error);
            if (error.name === 'MongoError' && error.code === 11000) {
                return res.status(400).json({ status: 'Error', message: 'Email already exists' });
            }
            return res.status(500).json({ status: 'Error', message: error.message });
        }
    }
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleupdatedById,
    handleDeleteUserById,
    handleCreatenewUser
};
