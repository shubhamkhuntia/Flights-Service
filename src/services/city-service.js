const { StatusCodes } = require("http-status-codes");

const { CityRepository } = require("../repositories");

const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create an city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteCity(id) {
  try {
    const response = await cityRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested to delete is not present",
        error.statusCode
      );
    }
    throw new AppError("Cannnot delete city", statusCode.INTERNAL_SERVER_ERROR);
  }
}

async function updateCity(id, data) {
  try {
    console.log("Trying update service");
    const response = await cityRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested to update is not present",
        error.statusCode
      );
    }
    throw new AppError("Cannot update City", statusCode.BAD_REQUEST);
  }
}

module.exports = {
  createCity,
  deleteCity,
  updateCity,
};
