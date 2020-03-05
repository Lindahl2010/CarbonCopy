const fs = require('fs');
const shortid = require('shortid');
const path = require('path');

module.exports = {
    uploadPage: (req, res) => {
        res.render('upload.ejs', {
            title: 'Carbon Copy - Upload',
            message: '',
            link: ''
        });
    },
    upload: (req, res) => {

        let uploadFile = req.files.image;
        let image_name = req.body.img_name;
        let tags = req.body.tags;
        let imgExt = path.extname(uploadFile.name);
        let imgFile = image_name + imgExt;

        let imgQuery = "SELECT * FROM image_collection WHERE img_name = '" + image_name + "'";

        db.query(imgQuery, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          if (result.length > 0) {
            message = 'Image already exists.';
            res.render('upload.ejs', {
                message,
                title: 'Carbon Copy - Upload'
            });
          } else {
              if (uploadFile.mimetype === 'image/png' || uploadFile.mimetype === 'image/jpeg' || uploadFile.mimetype === 'image/gif') {
                uploadFile.mv(`public/img/${imgFile}`, function(err) {
                  if (err) {
                    return res.status(500).send(err);
                  }

                  let uuid = shortid.generate();

                  let query = `INSERT INTO image_collection (uuid, img_name, img_ext, tags) VALUES ('${uuid}', '${image_name}', '${imgExt}', '${tags}')`;

                  db.query(query, (err, result) => {
                    if (err) {
                      return res.status(500).send(err);
                    }

                    res.render('upload.ejs', {
                      title: 'Carbon Copy - Upload',
                      message: '',
                      link: `http://localhost:5000/img/${uuid}`
                    });
                  });
                });
              } else {
                message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                res.render('upload.ejs', {
                    message,
                    title: 'Carbon Copy - Upload'
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
        var uno = Math.ceil(result.length/3);
        var dos = Math.ceil((result.length/3)*2);
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

      let image_name = req.params.img_name;
      let imgQuery = 'SELECT img_name, img_ext FROM `image_collection` WHERE img_name = "' + image_name + '"';

      db.query(imgQuery, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }

        let image = image_name + result[0].img_ext;
        fs.unlink(`public/img/${image}`, (err) => {
          if (err) {
            return res.status(500).send(err);
          }
          else {
            
            let deleteImage = 'DELETE FROM `image_collection` WHERE img_name = "' + image_name + '"';

            db.query(deleteImage, (err, result) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.redirect('/collection');
            });
          }
        });
      });
    },
    imgView: (req, res) => {
      let uuid = req.params.uuid;

      let imgQuery = `SELECT img_name, img_ext FROM image_collection WHERE uuid = '${uuid}'`;

      db.query(imgQuery, (err, result) => {
        if (err) {
          res.status(500).send(err);
        }

        if(result.length > 0) {
          let imgFile = result[0].img_name + result[0].img_ext;

          res.render('view.ejs', {
            message: '',
            title: 'Carbon Copy - View',
            image: imgFile
          });
        }
      });
    }
}