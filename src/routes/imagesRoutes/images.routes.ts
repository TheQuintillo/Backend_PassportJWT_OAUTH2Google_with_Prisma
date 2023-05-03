import { Router } from "express";
import fs from "fs";

const router = Router();

router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  res.writeHead(200, { "content-type": "image/jpg" });
  fs.createReadStream(__dirname + `../../../../public/images/${id}.jpg`).pipe(
    res
  );
});

export default router;
