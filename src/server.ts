import app from "./app";

const PORT = process.env.PORT || 4040;

app.listen(PORT, function() {
  console.log("Server is listening on port " + PORT);
});
