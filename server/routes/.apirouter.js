module.exports = (app) => {
  require("./user.js")(app);
  require("./post.js")(app);
};
