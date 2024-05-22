package cr.ac.una.cabysstub;

import io.jsonwebtoken.Jwts;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.crypto.SecretKey;
import java.util.Arrays;

@SpringBootApplication
public class CabysStubApplication {

    public static void main(String[] args) {
        SpringApplication.run(CabysStubApplication.class, args);
    }

}
