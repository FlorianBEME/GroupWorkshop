// controllers/wilders.js
const WilderModel = require("../models/Wilder");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");

module.exports = {
  get: asyncHandler(async (req, res) => {
    await WilderModel.init();
    const wilders = await WilderModel.find({});
    if (wilders)
      return res.status(200).json({ success: true, result: wilders });
    else {
      throw createError(404, "Cannot get the wilders");
    }
  }),
  create: asyncHandler(async (req, res) => {
    console.log(req.body);
    const wilder = new WilderModel(req.body);

    await wilder
      .save()
      .then((result) => {
        res.status(200).json({ success: true, result: result });
      })
      .catch((err) => {
        throw createError(400, err);
      });
  }),
  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await WilderModel.findOneAndUpdate({ _id: id }, req.body);
    if (!result) throw createError(400, "Mauvais syntax");
    res.status(200).json({ success: true, result: result });
  }),
  updateSkillsByIdUser: asyncHandler(async (req, res) => {
    const { id_user, id_skill } = req.params;
    const result = await WilderModel.updateOne(
      { _id: id_user, "skills._id": id_skill },
      {
        $set: {
          "skills.$.votes": req.body.newCount,
        },
      }
    );
    if (!result) throw createError(400, "Mauvais syntax");
    res.status(200).json({ success: true, result: result });
  }),

  delete: asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const result = await WilderModel.findOneAndDelete({ id: id });
    if (!result) throw createError(404, "");
    res.status(200).json({ success: true, result: result });
  }),
  getById: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await WilderModel.findById({ _id: id });
    if (!result) throw createError(404, "");
    res.status(200).json({ success: true, result: result });
  }),
};
