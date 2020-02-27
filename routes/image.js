const fs = require('fs');

module.exports = {
    uploadPage: (req, res) => {
        res.render('upload.ejs', {
            title: 'Carbon Copy Upload',
            message: ''
        });
    },
    upload: (req, res) => {

        let uploadFile = req.files.image;
        let imageName = 'test.' + uploadFile.name;

        let imgQuery = "SELECT * FROM image_collection WHERE img_name = '" + imageName + "'";

        db.query(imgQuery, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          if (result.length > 0) {
            message = 'Image already exists.';
            res.render('upload.ejs', {
                message,
                title: 'Carbon Copy Upload'
            });
          } else {
              if (uploadFile.mimetype === 'image/png' || uploadFile.mimetype === 'image/jpeg' || uploadFile.mimetype === 'image/gif') {
                uploadFile.mv(`public/img/${imageName}`, function(err) {
                  if (err) {
                    return res.status(500).send(err);
                  }

                  let query = "INSERT INTO image_collection (img_name) VALUES ('" + imageName + "')";

                  db.query(query, (err, result) => {
                    if (err) {
                      return res.status(500).send(err);
                    }

                    res.redirect('/upload');
                  });
                });
              } else {
                message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                res.render('upload.ejs', {
                    message,
                    title: 'Carbon Copy Upload'
                });
              }
            }
        });
    },
    collectionPage: (req, res) => {

      let query = "SELECT * FROM `image_collection` ORDER BY id ASC";

      db.query(query, (err, result) => {
        if (err) {
          res.redirect('/');
        }
        
        var col1 = [], col2 = [], col3 = [];
        var uno = result.length/3;
        var dos = (result.length/3)*2;
        var tres = result.length;

        for (i = 0; i < 3; i++) {
          if (i == 0){
            col1 = result.slice(0, uno);
          }
          else if (i == 1) {
            col2 = result.slice(uno, dos);
          }
          else if (i == 2) {
            col3 = result.slice(dos, tres);
          }
          else {
            break;
          }
        }
        // console.log(col1,col2);

        res.render('collection.ejs', {
          title: 'Carbon Copy - Collection',
          images: result,
          imgCol1: col1,
          imgCol2: col2,
          imgCol3: col3
        });
      });
    },
    deleteImage: (req, res) => {

    }
}