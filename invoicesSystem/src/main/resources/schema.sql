-- Schema projectii
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `projectii` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `projectii`;

-- -----------------------------------------------------
-- Table `projectii`.`supplier_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`supplier_type`
(
    `id_supplier_type` BIGINT                                           NOT NULL AUTO_INCREMENT,
    `name`             ENUM ('PHYSICAL', 'JURIDICAL', 'ADMINISTRATIVE') NULL DEFAULT NULL,
    PRIMARY KEY (`id_supplier_type`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `projectii`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`user`
(
    `id_user`               BIGINT       NOT NULL AUTO_INCREMENT,
    `email`                 VARCHAR(32)  NULL DEFAULT NULL,
    `enabled`               BIT(1)       NULL DEFAULT b'0',
    `last_name`             VARCHAR(32)  NULL DEFAULT NULL,
    `mobile`                VARCHAR(16)  NULL DEFAULT NULL,
    `name`                  VARCHAR(32)  NULL DEFAULT NULL,
    `natural_id`            VARCHAR(16)  NULL DEFAULT NULL,
    `password`              VARCHAR(256) NULL DEFAULT NULL,
    `type_id_supplier_type` BIGINT       NOT NULL,
    PRIMARY KEY (`id_user`),
    UNIQUE INDEX `UKofjqkoakihues2v1fiyqyvia6` (`natural_id` ASC) VISIBLE,
    INDEX `FK4o0dn07vxc0enqctc31lpb6am` (`type_id_supplier_type` ASC) VISIBLE,
    CONSTRAINT `FK4o0dn07vxc0enqctc31lpb6am`
        FOREIGN KEY (`type_id_supplier_type`)
            REFERENCES `projectii`.`supplier_type` (`id_supplier_type`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `projectii`.`client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`client`
(
    `id_client`    BIGINT      NOT NULL AUTO_INCREMENT,
    `email`        VARCHAR(32) NOT NULL,
    `last_name`    VARCHAR(32) NOT NULL,
    `mobile`       VARCHAR(16) NULL DEFAULT NULL,
    `name`         VARCHAR(32) NOT NULL,
    `natural_id`   VARCHAR(32) NOT NULL,
    `user_id_user` BIGINT      NULL DEFAULT NULL,
    PRIMARY KEY (`id_client`),
    UNIQUE INDEX `UK_giud2og02puttc862o04q1w59` (`natural_id` ASC) VISIBLE,
    INDEX `FK7ienpdbhwd46kn7go8busfk7b` (`user_id_user` ASC) VISIBLE,
    CONSTRAINT `FK7ienpdbhwd46kn7go8busfk7b`
        FOREIGN KEY (`user_id_user`)
            REFERENCES `projectii`.`user` (`id_user`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `projectii`.`invoice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`invoice`
(
    `id_invoice`       BIGINT       NOT NULL AUTO_INCREMENT,
    `code`             VARCHAR(255) NULL DEFAULT NULL,
    `date`             DATETIME(6)  NULL DEFAULT NULL,
    `iva`              INT          NULL DEFAULT NULL,
    `subtotal`         BIGINT       NULL DEFAULT NULL,
    `total_price`      BIGINT       NULL DEFAULT NULL,
    `client_id_client` BIGINT       NULL DEFAULT NULL,
    `user_id_user`     BIGINT       NULL DEFAULT NULL,
    PRIMARY KEY (`id_invoice`),
    INDEX `FKd3a5w04o1fet7w9nr5kuvkd71` (`client_id_client` ASC) VISIBLE,
    INDEX `FKi1ts5jpol1m4pq3xl8g6x0b9a` (`user_id_user` ASC) VISIBLE,
    CONSTRAINT `FKd3a5w04o1fet7w9nr5kuvkd71`
        FOREIGN KEY (`client_id_client`)
            REFERENCES `projectii`.`client` (`id_client`),
    CONSTRAINT `FKi1ts5jpol1m4pq3xl8g6x0b9a`
        FOREIGN KEY (`user_id_user`)
            REFERENCES `projectii`.`user` (`id_user`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `projectii`.`measure_units`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`measure_units`
(
    `id_measure_units` BIGINT      NOT NULL AUTO_INCREMENT,
    `name`             VARCHAR(32) NULL DEFAULT NULL,
    `symbol`           VARCHAR(8)  NULL DEFAULT NULL,
    PRIMARY KEY (`id_measure_units`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `projectii`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`products`
(
    `id_products`                    BIGINT      NOT NULL AUTO_INCREMENT,
    `code`                           VARCHAR(32) NOT NULL,
    `name`                           VARCHAR(32) NOT NULL,
    `price`                          INT         NOT NULL,
    `measure_units_id_measure_units` BIGINT      NULL DEFAULT NULL,
    `user_id_user`                   BIGINT      NULL DEFAULT NULL,
    PRIMARY KEY (`id_products`),
    INDEX `FKg2abpcxiodihwrjpsyi67c0y7` (`measure_units_id_measure_units` ASC) VISIBLE,
    INDEX `FKpa0odinmsu0kvdubsv0gslqde` (`user_id_user` ASC) VISIBLE,
    CONSTRAINT `FKg2abpcxiodihwrjpsyi67c0y7`
        FOREIGN KEY (`measure_units_id_measure_units`)
            REFERENCES `projectii`.`measure_units` (`id_measure_units`),
    CONSTRAINT `FKpa0odinmsu0kvdubsv0gslqde`
        FOREIGN KEY (`user_id_user`)
            REFERENCES `projectii`.`user` (`id_user`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `projectii`.`invoice_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`invoice_products`
(
    `quantity`             BIGINT NULL DEFAULT NULL,
    `products_id_products` BIGINT NOT NULL,
    `invoice_id_invoice`   BIGINT NOT NULL,
    PRIMARY KEY (`invoice_id_invoice`, `products_id_products`),
    INDEX `FK8th3qr5rveicuylqfl2dyn6up` (`products_id_products` ASC) VISIBLE,
    CONSTRAINT `FK4x90qiub3592wqqvoeh7hq7xx`
        FOREIGN KEY (`invoice_id_invoice`)
            REFERENCES `projectii`.`invoice` (`id_invoice`),
    CONSTRAINT `FK8th3qr5rveicuylqfl2dyn6up`
        FOREIGN KEY (`products_id_products`)
            REFERENCES `projectii`.`products` (`id_products`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `projectii`.`service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`service`
(
    `id_service`   BIGINT      NOT NULL AUTO_INCREMENT,
    `name`         VARCHAR(32) NULL DEFAULT NULL,
    `price_hour`   INT         NULL DEFAULT NULL,
    `user_id_user` BIGINT      NULL DEFAULT NULL,
    PRIMARY KEY (`id_service`),
    INDEX `FKro75esm13nuacfdos00lg7ye` (`user_id_user` ASC) VISIBLE,
    CONSTRAINT `FKro75esm13nuacfdos00lg7ye`
        FOREIGN KEY (`user_id_user`)
            REFERENCES `projectii`.`user` (`id_user`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `projectii`.`invoice_services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`invoice_services`
(
    `hour_amount`        BIGINT NULL DEFAULT NULL,
    `invoice_id_invoice` BIGINT NOT NULL,
    `service_id_service` BIGINT NOT NULL,
    PRIMARY KEY (`invoice_id_invoice`, `service_id_service`),
    INDEX `FK56xj02tq1jai8fuaxas7oxqoy` (`service_id_service` ASC) VISIBLE,
    CONSTRAINT `FK56xj02tq1jai8fuaxas7oxqoy`
        FOREIGN KEY (`service_id_service`)
            REFERENCES `projectii`.`service` (`id_service`),
    CONSTRAINT `FKk0ytyh54mptuuxruyucg4slhj`
        FOREIGN KEY (`invoice_id_invoice`)
            REFERENCES `projectii`.`invoice` (`id_invoice`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `projectii`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`roles`
(
    `id`   INT                              NOT NULL AUTO_INCREMENT,
    `name` ENUM ('ROLE_ADMIN', 'ROLE_USER') NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `projectii`.`user_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projectii`.`user_roles`
(
    `id_role` INT    NOT NULL,
    `id_user` BIGINT NOT NULL,
    PRIMARY KEY (`id_role`, `id_user`),
    INDEX `FKok1v2uejpjcfqg8va888yvy0w` (`id_user` ASC) VISIBLE,
    CONSTRAINT `FK1v995xldvmr6w96c5feofx1gf`
        FOREIGN KEY (`id_role`)
            REFERENCES `projectii`.`roles` (`id`),
    CONSTRAINT `FKok1v2uejpjcfqg8va888yvy0w`
        FOREIGN KEY (`id_user`)
            REFERENCES `projectii`.`user` (`id_user`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;