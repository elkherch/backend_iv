const express = require("express");
const multer = require("multer");
const userController = require("../controllers/userController");
const teamsController = require("../controllers/teamController");
const authController = require("../controllers/authController");
const challengeController = require("../controllers/challengesController");
const importExcelController = require("../utils/importExcel");
const juryController = require("../controllers/juryController");
const envoyeEmail = require("../utils/send-email");
const submissionsController = require("../controllers/SubmissionController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${getExtension(file.mimetype)}`);
  },
});
// Define a function to determine the file extension based on the MIME type
function getExtension(mimetype) {
  switch (mimetype) {
    case "application/pdf":
      return ".pdf";
    case "application/zip":
      return ".zip";
    case "application/msword":
      return ".doc";
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return ".docx";
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    default:
      return "";
  }
}

const upload = multer({ storage: storage });

const router = express.Router();

// Uncomment to enable JWT check for all routes

router.get("/authorized", (req, res) => res.send("Secured Resource"));
router.get("/", (req, res) => res.send("Hello World"));
router.get("/soumission", (req, res) => res.send("You can submit your work !"));

// User routes
router.get("/users", userController.getAllUsers);
router.post("/users", userController.createUser);
router.get("/users/:id", userController.getUserById);
router.get("/usersRole", userController.getUserByRole);

router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Team routes
router.get("/teams", teamsController.getAllTeams);
router.post("/teams", teamsController.createTeams);
router.get("/teams/:id", teamsController.getTeamsById);
router.put("/teams/:id", teamsController.updateTeams);
router.delete("/teams/:id", teamsController.deleteTeams);

// Jury routes
router.post("/jury/sendNotification", juryController.sendNotificationWithEmail);
router.post("/jury/gradeTeamWork", juryController.gradeTeamWork);

// Challenge routes
router.get("/challenge", challengeController.getAllChallenges);
router.post(
  "/challenge",
  challengeController.upload.single("file"),
  challengeController.createChallenges
);
router.get("/challenge/:id", challengeController.getChallengesById);
router.put(
  "/challenge/:id",
  challengeController.upload.single("file"),
  challengeController.updateChallenges
);
router.delete("/challenge/:id", challengeController.deleteChallenges);

// Authentication and import routes
router.post("/login", authController.Login);
router.post(
  "/import-excel",
  challengeController.upload.array("files"),
  importExcelController.importUsersFromExcel
);
router.post("/send-email", envoyeEmail.sendEmail);
router.post(
  "/submit-work/:challengeId/:teamId",
  upload.single("workFile"),
  submissionsController.submitWork
);

module.exports = router;
