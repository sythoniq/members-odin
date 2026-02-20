function renderIndex(req, res, next) {
  res.render("index", {
    title: "Welcome"
  })
}

module.exports = {
  renderIndex
}
