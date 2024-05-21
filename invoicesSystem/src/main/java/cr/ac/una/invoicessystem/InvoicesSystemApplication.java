package cr.ac.una.invoicessystem;

import cr.ac.una.invoicessystem.data.entities.ERole;
import cr.ac.una.invoicessystem.data.entities.EType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InvoicesSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(InvoicesSystemApplication.class, args);
        System.out.println(EType.JURIDICAL.name());
        System.out.println(EType.PHYSICAL.name());
    }

}
