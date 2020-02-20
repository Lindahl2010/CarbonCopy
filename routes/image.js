module.exports = {
    uploadPage: (req, res) => {
        res.render('upload.ejs', {
            title: 'Carbon Copy Upload'
        });
    },
    upload: (req, res) => {

        let uploadFile = req.files.image;
        let imageName = 'test' + uploadFile.name;
      
        if (!req.files || Object.keys(req.files).length === 0) {
          res.status(400).send('No files were uploaded.');
          return;
        }
      
        console.log('req.files >>>', req.files); // eslint-disable-line
        
        uploadFile.mv(`public/img/${imageName}`, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
      
          res.redirect('/');

        });
    },
    collectionPage: (req, res) => {
      
    }
}