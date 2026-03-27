import { Router } from "express";
import {
  findUser,
  getConnectionsList,
  getPendingRequests,
  getSentRequests,
  removeConnection,
  respondToRequest,
  sendConnectionRequest,
} from "../controllers/connectionController.js";
import { authentication } from "../middleware/auth.js";

const router = Router();

router.get("/find_user", authentication, findUser);
router.post("/send_connection_req", authentication, sendConnectionRequest);
router.get("/get_sent_reqs", authentication, getSentRequests);
router.get("/get_pending_reqs", authentication, getPendingRequests);
router.put("/respond_to_connection/:id", authentication, respondToRequest);
router.get("/get_connections_list", authentication, getConnectionsList);
router.delete("/remove_connection/:id", authentication, removeConnection);

export default router;
