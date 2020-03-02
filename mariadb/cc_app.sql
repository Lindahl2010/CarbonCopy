-- MySQL 10.1.44-MariaDB
-- 
-- Host: 192.168.137.130    Database: carbon_copy
-- ------------------------------------------------------
-- Server version       10.1.44-MariaDB-0ubuntu0.18.04.1

--
-- Table structure for table 'accounts'
-- 

DROP TABLE IF EXISTS usr_accounts, image_collection;
CREATE TABLE usr_accounts (
    usr_name VARCHAR(20) NOT NULL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone_num VARCHAR(255)
);

--
-- Table structure for table 'images'
-- 

CREATE TABLE image_collection (
    id INT(5) NOT NULL AUTO_INCREMENT,
    uuid VARCHAR(8) NOT NULL,
    img_name VARCHAR(255),
    img_ext VARCHAR(16),
    PRIMARY KEY (id)
);