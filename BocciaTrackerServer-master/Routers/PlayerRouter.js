const { Router } = require("express");

const { playerController } = require("../Controllers/PlayerController");

const PlayerRouter = new Router();
module.exports = { PlayerRouter };

PlayerRouter.get("/", playerController.getPlayers);
PlayerRouter.get("/:id", playerController.getPlayer);
PlayerRouter.post('/', playerController.addPlayer);
PlayerRouter.put('/:id', playerController.updatePlayer);
PlayerRouter.delete('/:id', playerController.deletePlayer);
