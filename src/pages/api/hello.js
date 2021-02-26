import * as tf from "@tensorflow/tfjs-node";

export default async (req, res) => {
  try {

    res.status(200).json({
      success: true,
      type: "success",
      message: "successfully added",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      type: "error",
      message: "internal error",
    });
  }
};
