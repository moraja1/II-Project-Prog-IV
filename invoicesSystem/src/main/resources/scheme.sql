-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema projectii
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema projectii
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `projectii` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `projectii` ;

-- -----------------------------------------------------
-- Table `projectii`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `natural_id` VARCHAR(16) NULL,
  `password` VARCHAR(32) NULL,
  `name` VARCHAR(32) NULL,
  `last_name` VARCHAR(32) NULL,
  `mobile` VARCHAR(16) NULL,
  `email` VARCHAR(32) NULL,
  `enabled` TINYINT NULL DEFAULT 0,
  `type` VARCHAR(16) NULL,
  `role` VARCHAR(16) NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `id_user_UNIQUE` (`id_user` ASC) VISIBLE,
  UNIQUE INDEX `natural_id_UNIQUE` (`natural_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projectii`.`client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`client` (
  `id_client` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NULL,
  `last_name` VARCHAR(32) NULL,
  `natural_id` VARCHAR(32) NULL,
  `mobile` VARCHAR(16) NULL,
  `email` VARCHAR(32) NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_client`),
  UNIQUE INDEX `idclient_UNIQUE` (`id_client` ASC) VISIBLE,
  INDEX `fk_client_user_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_client_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `projectii`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projectii`.`service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`service` (
  `id_service` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NULL,
  `currency` VARCHAR(32) NULL,
  `price_hour` INT NULL,
  PRIMARY KEY (`id_service`),
  UNIQUE INDEX `id_service_UNIQUE` (`id_service` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projectii`.`user_services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`user_services` (
  `id_service` INT NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_service`, `id_user`),
  INDEX `fk_service_has_user_user1_idx` (`id_user` ASC) VISIBLE,
  INDEX `fk_service_has_user_service1_idx` (`id_service` ASC) VISIBLE,
  CONSTRAINT `fk_service_has_user_service1`
    FOREIGN KEY (`id_service`)
    REFERENCES `projectii`.`service` (`id_service`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_service_has_user_user1`
    FOREIGN KEY (`id_user`)
    REFERENCES `projectii`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projectii`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`products` (
  `id_products` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NULL,
  `currency` VARCHAR(32) NULL,
  `price` INT NULL,
  `measure_unit` VARCHAR(16) NULL,
  PRIMARY KEY (`id_products`),
  UNIQUE INDEX `idproducts_UNIQUE` (`id_products` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projectii`.`user_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`user_products` (
  `id_products` INT NOT NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_products`, `id_user`),
  INDEX `fk_products_has_user_user1_idx` (`id_user` ASC) VISIBLE,
  INDEX `fk_products_has_user_products1_idx` (`id_products` ASC) VISIBLE,
  CONSTRAINT `fk_products_has_user_products1`
    FOREIGN KEY (`id_products`)
    REFERENCES `projectii`.`products` (`id_products`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_user_user1`
    FOREIGN KEY (`id_user`)
    REFERENCES `projectii`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projectii`.`invoice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`invoice` (
  `id_invoice` INT NOT NULL AUTO_INCREMENT,
  `code` DOUBLE NULL,
  `date` DATE NULL,
  `total_price` INT NULL,
  `iva` INT NULL,
  `subtotal` INT NULL,
  `id_user` INT NOT NULL,
  `id_client` INT NOT NULL,
  PRIMARY KEY (`id_invoice`),
  UNIQUE INDEX `idinvoice_UNIQUE` (`id_invoice` ASC) VISIBLE,
  INDEX `fk_invoice_user1_idx` (`id_user` ASC) VISIBLE,
  INDEX `fk_invoice_client1_idx` (`id_client` ASC) VISIBLE,
  CONSTRAINT `fk_invoice_user1`
    FOREIGN KEY (`id_user`)
    REFERENCES `projectii`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_invoice_client1`
    FOREIGN KEY (`id_client`)
    REFERENCES `projectii`.`client` (`id_client`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projectii`.`invoice_has_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`invoice_has_products` (
  `invoice_id_invoice` INT NOT NULL,
  `products_id_products` INT NOT NULL,
  `cantity` INT NULL,
  `subtotal` INT NULL,
  PRIMARY KEY (`invoice_id_invoice`, `products_id_products`),
  INDEX `fk_invoice_has_products_products1_idx` (`products_id_products` ASC) VISIBLE,
  INDEX `fk_invoice_has_products_invoice1_idx` (`invoice_id_invoice` ASC) VISIBLE,
  CONSTRAINT `fk_invoice_has_products_invoice1`
    FOREIGN KEY (`invoice_id_invoice`)
    REFERENCES `projectii`.`invoice` (`id_invoice`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_invoice_has_products_products1`
    FOREIGN KEY (`products_id_products`)
    REFERENCES `projectii`.`products` (`id_products`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `projectii`.`invoice_has_service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`invoice_has_service` (
  `id_invoice` INT NOT NULL,
  `id_service` INT NOT NULL,
  `hour_amount` INT NULL,
  `subtotal` INT NULL,
  PRIMARY KEY (`id_invoice`, `id_service`),
  INDEX `fk_invoice_has_service_service1_idx` (`id_service` ASC) VISIBLE,
  INDEX `fk_invoice_has_service_invoice1_idx` (`id_invoice` ASC) VISIBLE,
  CONSTRAINT `fk_invoice_has_service_invoice1`
    FOREIGN KEY (`id_invoice`)
    REFERENCES `projectii`.`invoice` (`id_invoice`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_invoice_has_service_service1`
    FOREIGN KEY (`id_service`)
    REFERENCES `projectii`.`service` (`id_service`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
