module.exports = {
    aboutPage: (req, res) => {
        res.render('about.ejs', {
            title: 'About Carbon Copy'
        });
    },
    contactPage: (req, res) => {
        res.render('contact.ejs', {
            title: 'Carbon Copy - Contact'
        });
    },
    privacyPage: (req, res) => {
        res.render('privacy.ejs', {
            title: 'Carbon Copy - User Privacy'
        });
    },
    tosPage: (req, res) => {
        res.render('tos.ejs', {
            title: 'Carbon Copy - Terms of Service'
        })
    }
}