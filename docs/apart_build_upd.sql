-- MySQL Script generated by MySQL Workbench
-- Wed Jan  5 15:05:46 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema apart_build_upd
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema apart_build_upd
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `apart_build_upd` DEFAULT CHARACTER SET utf8 ;
USE `apart_build_upd` ;

-- -----------------------------------------------------
-- Table `apart_build_upd`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apart_build_upd`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `apartmentNr` INT NOT NULL,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL DEFAULT NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `apart_build_upd`.`gas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apart_build_upd`.`gas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `gasPrice` FLOAT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `apart_build_upd`.`water`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apart_build_upd`.`water` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `waterPrice` FLOAT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `apart_build_upd`.`extraUtilities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apart_build_upd`.`extraUtilities` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `price` FLOAT NULL,
  `description` TEXT(65535) NULL,
  `amount` FLOAT NULL,
  `dateFrom` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateTo` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `apart_build_upd`.`indicators`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apart_build_upd`.`indicators` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `month` DATE NULL,
  `gasUsage` INT NULL,
  `waterUsage` INT NULL,
  `gas_id` INT NULL,
  `water_id` INT NULL,
  `extraUtilities_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_monthUsage_users_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_monthUsage_gas1_idx` (`gas_id` ASC) VISIBLE,
  INDEX `fk_monthUsage_water1_idx` (`water_id` ASC) VISIBLE,
  INDEX `fk_indicators_extraUtilities1_idx` (`extraUtilities_id` ASC) VISIBLE,
  CONSTRAINT `fk_monthUsage_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `apart_build_upd`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_monthUsage_gas1`
    FOREIGN KEY (`gas_id`)
    REFERENCES `apart_build_upd`.`gas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_monthUsage_water1`
    FOREIGN KEY (`water_id`)
    REFERENCES `apart_build_upd`.`water` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_indicators_extraUtilities1`
    FOREIGN KEY (`extraUtilities_id`)
    REFERENCES `apart_build_upd`.`extraUtilities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `apart_build_upd`.`gaas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `apart_build_upd`.`gaas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `gasPrice` FLOAT NOT NULL,
  `indicators_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_gas_copy_indicators1_idx` (`indicators_id` ASC) VISIBLE,
  CONSTRAINT `fk_gas_copy_indicators1`
    FOREIGN KEY (`indicators_id`)
    REFERENCES `apart_build_upd`.`indicators` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
