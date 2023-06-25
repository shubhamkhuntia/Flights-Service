const express = require("express");

const { AirportController, FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");
const router = express.Router();

router.post(
  "/",
  FlightMiddlewares.validateCreateRequest,
  FlightController.createFlight
);
// /api/v1/flights?trips=MUM-DEL GET
router.get("/", FlightController.getAllFlights);

// /api/v1/flights:id GET
router.get("/:id", FlightController.getFlight);

module.exports = router;
