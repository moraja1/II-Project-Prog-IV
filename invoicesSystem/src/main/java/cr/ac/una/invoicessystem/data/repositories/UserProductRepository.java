package cr.ac.una.invoicessystem.data.repositories;

import cr.ac.una.invoicessystem.data.entities.User;
import cr.ac.una.invoicessystem.data.entities.UserProduct;
import cr.ac.una.invoicessystem.data.entities.UserProductId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProductRepository extends JpaRepository<UserProduct, UserProductId> {
}