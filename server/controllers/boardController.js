const Board = require("../models/Board");
const mongoose = require("mongoose");

// we will never been getting all boards at once
// only certain ones based on filter, or user owned/subscribed to
