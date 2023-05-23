const CrudRepository = require("./crud-repository");
const { Airplane } = require("../models");

class AirplaneRepository extends CrudRepository {
  constructor() {
    console.log("Inside constructor of Airplane repo");
    super(Airplane);
  }
}

module.exports = AirplaneRepository;
