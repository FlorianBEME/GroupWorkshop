const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WilderSchema = new Schema({
  name: { type: String, unique: [true, "Name déja utilisé"], required: true },
  description: { type: String, required: [true, "description Obligatoire"] },
  skills: {
    type: [
      {
        title: { type: String, required: true },
        votes: { type: Number, default: 0 },
      },
    ],
  },
});

module.exports = mongoose.model("wilder", WilderSchema);
