-- -----------------------------------------------------
-- Schema devs_corner
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `devs_corner` ;

-- -----------------------------------------------------
-- Schema devs_corner
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `devs_corner` DEFAULT CHARACTER SET utf8 ;
USE `devs_corner` ;

-- -----------------------------------------------------
-- Table `devs_corner`.`user`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `devs_corner`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `hashedPassword` VARCHAR(255) NOT NULL,
  `role` VARCHAR(15) NOT NULL DEFAULT 'user',
  `state` TINYINT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devs_corner`.`subject`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `devs_corner`.`subject` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(150) NOT NULL,
  `text` MEDIUMTEXT NOT NULL,
  `best_answer_id` INT NULL,
  `status_resolve` TINYINT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_subject_user_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_subject_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `devs_corner`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devs_corner`.`tag`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `devs_corner`.`tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devs_corner`.`answer`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `devs_corner`.`answer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` MEDIUMTEXT NOT NULL,
  `note` INT DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `subject_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `subject_id`, `user_id`),
  INDEX `fk_answer_subject_idx` (`subject_id` ASC) ,
  INDEX `fk_answer_user_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_answer_subject`
    FOREIGN KEY (`subject_id`)
    REFERENCES `devs_corner`.`subject` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_answer_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `devs_corner`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devs_corner`.`comment`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `devs_corner`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(500) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `answer_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `answer_id`, `user_id`),
  INDEX `fk_comment_answer_idx` (`answer_id` ASC) ,
  INDEX `fk_comment_user_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_comment_answer`
    FOREIGN KEY (`answer_id`)
    REFERENCES `devs_corner`.`answer` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `devs_corner`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devs_corner`.`subject_has_tag`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `devs_corner`.`subject_has_tag` (
  `subject_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`subject_id`, `tag_id`),
  INDEX `fk_subject_has_tag_tag_idx` (`tag_id` ASC) ,
  INDEX `fk_subject_has_tag_subject_idx` (`subject_id` ASC) ,
  CONSTRAINT `fk_subject_has_tag_subject`
    FOREIGN KEY (`subject_id`)
    REFERENCES `devs_corner`.`subject` (`id`)
    ON DELETE CASCADE
    ON UPDATE  NO ACTION,
  CONSTRAINT `fk_subject_has_tag_tag`
    FOREIGN KEY (`tag_id`)
    REFERENCES `devs_corner`.`tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


USE `devs_corner` ;
INSERT INTO user
(first_name, last_name, email, hashedPassword, role, state)
VALUES 
(    'John',    'Doe',    'john.doe@example.com',     '$argon2id$v=19$m=65536,t=5,p=1$YzDztYY+TCi/zh9SgddJEQ$6xQ8DyS1tsZWeadULe81jsqR/njUmptLCBx4Nxj+QF0'     , "user", 1  ),
(    'Valeriy',    'Appius',    'valeriy.ppius@example.com',        '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlemZ6ZnpmZQ$eSetR6KPUNAGW+q+wDadcw', "user", 1  ),
(    'Ralf',    'Geronimo',    'ralf.geronimo@example.com',        '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlemZ6ZnpmZXphZGF6ZGQ$a0bg5DZB6H6v3jjQC81DXg', "user", 1  ),
(    'Maria',    'Iskandar',    'maria.iskandar@example.com',        '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlenplZHpkZnpmemZlemFkYXpkZA$V1qAnJDyMuuWG7g9yoGYXA', "user", 1  ),
(    'Jane',    'Doe',    'jane.doe@example.com', '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlenplZHpkZGZ6ZnpmZXphZGF6ZGQ$VCzq45PL9t8khtc44Kk5iw', "user", 1  ),
(    'Johanna',    'Martino',    'johanna.martino@example.com',    '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemVmemZlenplZHpkZGZ6ZnpmZXphZGF6ZGQ$UKaGZ9hGFn/S5SBQDMe/Uw', "user", 1),
('jb','bb','jb@mail.com','$argon2id$v=19$m=65536,t=5,p=1$B/cuitC3u6lETf5W55NDAg$lRtPqSUIYBCzaF25xw3txPvVdA6Fr4dXiUDIUw23mKU', "user", 1);

UPDATE `devs_corner`.`user` SET `role` = 'admin' WHERE (`id` = '7');

INSERT INTO subject  (title, text, user_id, status_resolve)
VALUES
("Application mobile",
"Quels sont les avantages et les inconvénients du développement d'applications mobiles natifs vs le développement d'applications hybrides",1,0),

('Les principaux frameworks',
'Quels sont les principaux frameworks de développement web ?
 ',2,1),

('Site web statique et un site web dynamique',
'Quelle est la différence entre un site web statique et un site web dynamique ?',3,0),

('Titre sujet 4',
'Début sujet 4 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
 publishing software like Aldus PageMaker including versions of Lorem Ipsum.ozurcnoizqeclzhincilqzhx,iqz!,gxqZlh,ihc',5,0),

('Titre sujet 5',
'Début sujet 5 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
 publishing software like Aldus PageMaker including versions of Lorem Ipsum.ozurcnoizqeclzhincilqzhx,iqz!,gxqZlh,ihc',4,0),
 ('Titre sujet 6',
'Début sujet 6',7,1), ("useState","Salut , 
Comment atténuer plusieurs rendus de composants lors de l'utilisation de plusieurs appels useState ?",2,0);

INSERT INTO answer (text, note, subject_id, user_id)
VALUES
("Les applications mobiles natives sont développées pour une plate-forme spécifique (par exemple, iOS ou Android) et sont généralement plus rapides et plus performantes que les applications hybrides. Cependant, le développement d'applications natives peut être plus coûteux et prend plus de temps que le développement d'applications hybrides, qui sont développées en utilisant des technologies web telles que HTML, CSS et JavaScript et sont ensuite encapsulées dans un conteneur natif. Les applications hybrides sont généralement moins chères et plus rapides à développer, mais peuvent être moins performantes que les applications natives.",0,1,2),
('Les principaux frameworks de développement web incluent Ruby on Rails, Django (Python), Laravel (PHP), Express (Node.js), et Spring (Java).',0,2,3),

('Un site web statique est créé en utilisant des fichiers HTML, CSS et JavaScript qui sont envoyés directement au navigateur du visiteur. Un site web dynamique utilise un langage de programmation côté serveur, tel que PHP ou Python, pour générer du contenu HTML en temps réel en fonction de la demande du visiteur.',0,3,4),

('Réponse 4',0,6,1),('Réponse 5',0,6,5),('Réponse 7',0,6,5),('Réponse 8',0,6,5),('Réponse 9',0,6,5),('Réponse 10',0,6,5),
('Réponse 6',0,6,2),("Bonjour !

Lorsque vous utilisez plusieurs appels à la fonction useState dans un composant React, cela peut entraîner plusieurs rendus inutiles du composant, ce qui peut affecter les performances de votre application.

Une solution possible pour atténuer ces rendus inutiles est d'utiliser le hook useReducer au lieu de useState. Le hook useReducer vous permet de gérer l'état de votre composant en utilisant un objet d'état et une fonction de réduction.",0,7,3);
 
INSERT INTO comment (text, answer_id, user_id)
VALUES
('Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
',1,2),
('Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
 ',2,3),
('tandard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
',2,5),
('Commentaire 4',5,7),('Commentaire 5',6,1),('Commentaire 6',5,3), ('Commentaire 7',5,7),('Commentaire 8',5,1),('Commentaire 9',5,3),('Commentaire 10',5,7),('Commentaire 11',6,1),('Commentaire 12',5,3);
 
INSERT INTO tag (name)
VALUES
('JavaScript'), ('React'), ('Html'), ('CSS'), ('Java'), ('Angular'), ('Python');  

INSERT INTO subject_has_tag (subject_id, tag_id)
VALUES
(1, 2),
(2, 1),
(3, 1), (3, 2), (3, 3),
(4, 6),
(5, 3),
(6, 1), (6, 2),
(7,2),(7,1);

