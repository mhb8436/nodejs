const mongoose = require('mongoose');

(async () => {
  await mongoose.connect('mongodb://localhost:27017/mydb');
  console.log('Connected to MongoDB');

  const { Schema } = mongoose;

  const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, min: 0, max: 120 },
    city: String,
    email: { type: String, match: /.+\@.+\..+/ }
  }, { timestamps: true });

  const User = mongoose.model('User', userSchema);


  const newUser = new User({ name: 'Alice', age: 30, city: 'New York', email: 'alice@example.com' });
  const savedUser = await newUser.save();
  console.log('User saved successfully:', savedUser);

  const users = await User.find({});
  console.log('All users:', users);
  
  const filteredUsers = await User.find({ age: { $gte: 25 } });
  console.log('Users aged 25 and above:', filteredUsers);

  const updatedUser = await User.updateOne({ name: 'Alice' }, { $set: { age: 31 } });
  console.log('User updated successfully:', updatedUser);

  const deletedUser = await User.deleteOne({ name: 'Alice' });
  console.log('User deleted successfully:', deletedUser);

})();




