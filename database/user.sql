CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `purpose` varchar(16) NOT NULL,
  `date` varchar(5) NOT NULL,
  `picture` varchar(45) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `is_enabled` bit(1) NOT NULL DEFAULT b'1',
  `insert_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=478 DEFAULT CHARSET=utf8;
