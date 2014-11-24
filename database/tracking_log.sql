CREATE TABLE `tracking_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `source` varchar(10) NOT NULL,
  `channel` varchar(30) DEFAULT NULL,
  `ip` varchar(15) DEFAULT NULL,
  `is_start` bit(1) NOT NULL DEFAULT b'1',
  `insert_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1171 DEFAULT CHARSET=utf8;
