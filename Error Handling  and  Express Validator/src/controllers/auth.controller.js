const registerController = async (req, res, next) => {
  try {
    // throw new Error("This is the custom error");
    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

export { registerController };
