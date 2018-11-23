CREATE DATABASE IF NOT EXISTS "studio";

-- customers: table
CREATE TABLE `customers` (
  `id`     int(4)       NOT NULL AUTO_INCREMENT,
  `name`   varchar(150) NOT NULL,
  `logo`   varchar(200)          DEFAULT NULL,
  `active` tinyint(1)   NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `active` (`active`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 66
  DEFAULT CHARSET = utf8;

-- No native definition for element: active (index)

-- customers_retour: table
CREATE TABLE `customers_retour` (
  `id`         int(9)       NOT NULL AUTO_INCREMENT,
  `customerID` int(9)       NOT NULL,
  `street`     varchar(200) NOT NULL,
  `postal`     int(6)       NOT NULL,
  `city`       varchar(200) NOT NULL,
  `person`     varchar(400) NOT NULL,
  `comment`    varchar(250) NOT NULL,
  `active`     tinyint(1)   NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `active` (`active`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 64
  DEFAULT CHARSET = utf8;

-- No native definition for element: active (index)

-- customers_user: table
CREATE TABLE `customers_user` (
  `id`         int(9) NOT NULL AUTO_INCREMENT,
  `customerID` int(9) NOT NULL,
  `userID`     int(9) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customerID` (`customerID`, `userID`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 56
  DEFAULT CHARSET = utf8;

-- options_comment: table
CREATE TABLE `options_comment` (
  `id`         int(3)       NOT NULL AUTO_INCREMENT,
  `name`       varchar(200) NOT NULL,
  `identifier` varchar(50)           DEFAULT NULL,
  `icon`       varchar(100)          DEFAULT NULL,
  `visible`    int(11)      NOT NULL DEFAULT '1',
  `sort`       int(2)       NOT NULL,
  `depth`      int(2)       NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sort` (`sort`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 3
  DEFAULT CHARSET = utf8;

-- No native definition for element: sort (index)

-- options_gender: table
CREATE TABLE `options_gender` (
  `id`      int(3)       NOT NULL AUTO_INCREMENT,
  `name`    varchar(200) NOT NULL,
  `icon`    varchar(100)          DEFAULT NULL,
  `visible` int(11)      NOT NULL DEFAULT '1',
  `sort`    int(2)       NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sort` (`sort`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 8
  DEFAULT CHARSET = utf8;

-- No native definition for element: sort (index)

-- options_wg: table
CREATE TABLE `options_wg` (
  `id`      int(3)       NOT NULL AUTO_INCREMENT,
  `name`    varchar(200) NOT NULL,
  `icon`    varchar(100)          DEFAULT NULL,
  `visible` int(11)      NOT NULL DEFAULT '1',
  `sort`    int(2)       NOT NULL,
  `groupID` int(3)       NOT NULL,
  `depth`   int(2)       NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `sort` (`sort`),
  KEY `groupID` (`groupID`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 44
  DEFAULT CHARSET = utf8;

-- No native definition for element: sort (index)

-- No native definition for element: groupID (index)

-- orders: table
CREATE TABLE `orders` (
  `id`                  int(9)   NOT NULL AUTO_INCREMENT,
  `customerID`          int(9)   NOT NULL,
  `userID`              int(9)   NOT NULL,
  `created`             datetime NOT NULL,
  `comment`             varchar(250)      DEFAULT NULL,
  `retourID`            int(11)           DEFAULT NULL,
  `date_delivery`       datetime          DEFAULT NULL,
  `date_return_data`    datetime          DEFAULT NULL,
  `date_return_article` datetime          DEFAULT NULL,
  `changed`             datetime,
  PRIMARY KEY (`id`),
  KEY `customerID` (`customerID`),
  KEY `userID` (`userID`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 48
  DEFAULT CHARSET = utf8;

-- No native definition for element: customerID (index)

-- No native definition for element: userID (index)

-- orders_articlegroup: table
CREATE TABLE `orders_articlegroup` (
  `cgID`           int(11)          DEFAULT NULL,
  `genderID`       int(11)          DEFAULT NULL,
  `process`        json             DEFAULT NULL,
  `amount`         int(11)          DEFAULT NULL,
  `orderID`        int(11)          DEFAULT NULL,
  `articleGroupID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`articleGroupID`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 17
  DEFAULT CHARSET = latin1;

-- orders_dummy: table
CREATE TABLE `orders_dummy` (
  `id`        int(9)   NOT NULL AUTO_INCREMENT,
  `orderID`   int(9)   NOT NULL,
  `articleID` int(9)   NOT NULL,
  `created`   datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orderID` (`orderID`, `articleID`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- orders_user: table
CREATE TABLE `orders_user` (
  `id`      int(11)  NOT NULL AUTO_INCREMENT,
  `orderID` int(9)   NOT NULL,
  `userID`  int(9)   NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orderID` (`orderID`, `userID`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 10
  DEFAULT CHARSET = utf8;

-- processes: table
CREATE TABLE `processes` (
  `id`          int(9)       NOT NULL AUTO_INCREMENT,
  `description` varchar(200) NOT NULL,
  `active`      tinyint(4)   NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 23
  DEFAULT CHARSET = utf8;

-- roles: table
CREATE TABLE `roles` (
  `id`                   int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name`                 varchar(255)              DEFAULT NULL,
  `category`             varchar(100)              DEFAULT NULL,
  `right_team_edit_role` tinyint(1)                DEFAULT NULL,
  `right_team_edit_data` tinyint(1)                DEFAULT NULL,
  `right_team_edit`      tinyint(1)                DEFAULT NULL,
  `right_team_post`      tinyint(1)                DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 11
  DEFAULT CHARSET = utf8;

-- stages: table
CREATE TABLE `stages` (
  `id`         int(3)       NOT NULL AUTO_INCREMENT,
  `name`       varchar(150) NOT NULL,
  `active`     int(1)       NOT NULL DEFAULT '0',
  `icon`       varchar(50)  NOT NULL DEFAULT ' ',
  `short`      varchar(10)  NOT NULL,
  `type`       varchar(50)           DEFAULT NULL,
  `department` varchar(50)           DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 13
  DEFAULT CHARSET = utf8;

-- No native definition for element: name (index)

-- stagesets: table
CREATE TABLE `stagesets` (
  `id`        int(9)  NOT NULL AUTO_INCREMENT,
  `processID` int(6)  NOT NULL,
  `stageID`   int(6)  NOT NULL,
  `optional`  int(1)  NOT NULL DEFAULT '0',
  `final`     int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `stagesetID` (`processID`, `stageID`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 80
  DEFAULT CHARSET = utf8;

-- teams: table
CREATE TABLE `teams` (
  `id`          int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name`        varchar(250)              DEFAULT NULL,
  `openJoin`    tinyint(1)                DEFAULT '1',
  `description` varchar(500)              DEFAULT NULL,
  `dateCreate`  datetime                  DEFAULT NULL,
  `userCreate`  int(11)                   DEFAULT NULL,
  `avatar`      varchar(500)              DEFAULT NULL,
  `avatar_alt`  varchar(50)               DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 27
  DEFAULT CHARSET = utf8;

-- teams_post: table
CREATE TABLE `teams_post` (
  `id`       int(11) unsigned NOT NULL AUTO_INCREMENT,
  `teamID`   int(11)                   DEFAULT NULL,
  `userID`   int(11)                   DEFAULT NULL,
  `dateSend` datetime                  DEFAULT NULL,
  `title`    varchar(250)     NOT NULL,
  `message`  varchar(500)              DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `teamJoined` (`teamID`, `userID`) USING BTREE
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 73
  DEFAULT CHARSET = utf8;

-- No native definition for element: teamJoined (index)

-- teams_user: table
CREATE TABLE `teams_user` (
  `id`       int(11) unsigned NOT NULL AUTO_INCREMENT,
  `teamID`   int(11)                   DEFAULT NULL,
  `userID`   int(11)                   DEFAULT NULL,
  `dateJoin` datetime                  DEFAULT NULL,
  `roleID`   int(11)                   DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `teamJoined` (`teamID`, `userID`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 59
  DEFAULT CHARSET = utf8;

-- user: table
CREATE TABLE `user` (
  `id`             int(11) NOT NULL AUTO_INCREMENT,
  `username`       varchar(45)      DEFAULT NULL,
  `email`          varchar(45)      DEFAULT NULL,
  `register`       datetime         DEFAULT NULL,
  `login`          datetime         DEFAULT NULL,
  `session_token`  varchar(500)     DEFAULT NULL,
  `session_update` datetime         DEFAULT NULL,
  `roles`          varchar(100)     DEFAULT NULL,
  `password`       varchar(128)     DEFAULT NULL,
  `salt`           varchar(12)      DEFAULT NULL,
  `prename`        varchar(200)     DEFAULT NULL,
  `lastname`       varchar(200)     DEFAULT NULL,
  `avatar`         varchar(400)     DEFAULT NULL,
  `avatar_alt`     int(3)  NOT NULL,
  `lastRead`       datetime         DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `session_token` (`session_token`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 8
  DEFAULT CHARSET = utf8;

-- user_is: table
CREATE TABLE `user_is` (
  `userID`  int(9)       NOT NULL,
  `name`    varchar(100) NOT NULL,
  `created` datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `userID_value` (`name`, `userID`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- user_log: table
CREATE TABLE `user_log` (
  `id`      int(11)      NOT NULL AUTO_INCREMENT,
  `userID`  int(9)       NOT NULL,
  `created` datetime     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_read` datetime              DEFAULT NULL,
  `content` varchar(300) NOT NULL,
  `prio`    int(1)       NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 2
  DEFAULT CHARSET = utf8;

-- No native definition for element: userID (index)

