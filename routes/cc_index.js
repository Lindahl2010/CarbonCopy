module.exports = {
    getHomePage: (req, res) => {
        //res.send("Welcome to the Homepage");
        res.render('index.ejs', {
            title: "Carbon Copy"
        });
    }
}