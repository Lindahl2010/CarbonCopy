module.exports = {
    getHomePage: (req, res) => {
        res.render('index.ejs', {
            title: "Carbon Copy"
        });
    }
}