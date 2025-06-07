require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const JamesBond = new Person({
    name: "James Bond",
    age: 54,
    favoriteFoods: ["Shrimp", "Pizza"],
  });
  JamesBond.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, arrayOfPeople) {
    if (err) return console.error(err);
    done(null, arrayOfPeople);
  });
};

const personName = { name: "James Bond" };

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, personName) {
    if (err) return console.error(err);
    done(null, personName);
  });
};

const food = "wine";

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, food) {
    if (err) return console.error(err);
    done(null, food);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, personId) {
    if (err) return console.error(err);
    done(null, personId);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, personId) {
    if (err) return console.error(err);
    personId.favoriteFoods.push(foodToAdd);
    personId.save(function (err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, data) {
      if (err) return console.error(err);
      done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, personId) {
    if (err) return console.error(err);
    done(null, personId);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function (err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
