const { Router } = require("express");

const { sessionController } = require("../Controllers/SessionController");

const SessionRouter = new Router();
module.exports = {SessionRouter };

SessionRouter.get("/", sessionController.getSessions);
SessionRouter.get("/:id", sessionController.getSession);
SessionRouter.post('/', sessionController.addSession);
SessionRouter.put('/:id', sessionController.updateSession);
SessionRouter.delete('/:id', sessionController.deleteSession);
