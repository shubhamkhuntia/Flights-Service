const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    console.log("createAirport Service");
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    console.log("createAirport ERROR Service");
    console.log(error);
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.array.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create an airport object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airport you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of the airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirport(id) {
  try {
    const response = await airportRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airport you requested to delete is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannnot destroy the airport",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
}

// Not tested
async function updateAirport(id, data) {
  try {
    const response = await airportRepository.update(id, data);
    return response;
  } catch (error) {
    throw new AppError("Cant update", statusCode.BAD_REQUEST);
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};
