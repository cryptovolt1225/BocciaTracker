const { Router } = require("express");

const { coachController } = require("../Controllers/CoachController");

const CoachRouter = new Router();

const {
    register,
    login,
} = require('../Middleware/authentication');

CoachRouter.get("/", coachController.getCoaches);
CoachRouter.get("/:id", coachController.getCoach);
// CoachRouter.post('/', coachController.addCoach);
CoachRouter.post('/register', register);
CoachRouter.post('/login', login);
CoachRouter.put('/:id', coachController.updateCoach);
CoachRouter.delete('/:id', coachController.deleteCoach);
module.exports = { CoachRouter };
