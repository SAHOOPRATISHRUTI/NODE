const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto'); // hashing password

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImgUrl: { // Corrected typo
        type: String,
        default: "/public/images/default.png",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true });

// Hash password before saving user
UserSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified("password")) return next(); // Skip hashing if password is not modified

    const salt = randomBytes(16).toString('hex'); // Generate salt
    const hashPassword = createHmac('sha256', salt)
                        .update(user.password)
                        .digest('hex');

    user.salt = salt;
    user.password = hashPassword;
    next(); // Proceed with saving the user
});

const User = mongoose.model('User', UserSchema);

module.exports = User; // Export the model directly
