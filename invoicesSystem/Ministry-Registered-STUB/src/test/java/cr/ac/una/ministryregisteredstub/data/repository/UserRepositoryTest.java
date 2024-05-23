package cr.ac.una.ministryregisteredstub.data.repository;

import cr.ac.una.ministryregisteredstub.data.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserRepositoryTest {
    @Autowired
    private UserRepository repository;

    @Test
    void testRepositoryAccessWithFindAllStatement(){
        List<User> userList = repository.findAll();
        assertThat(userList).isNotNull();
        assertThat(userList.size()).isGreaterThan(0);
        for (User u : userList) {
            System.out.println(new StringBuilder().append(u.getId()).
                    append("-").
                    append(u.getUsuario()));
        }
    }

    @Test
    void testRepositoryAccessWithFindSingleUserByUsuario(){
        User user = repository.getUserByUsuario("401060606");
        assertThat(user).isNotNull();
        assertThat(user.getUsuario()).isEqualTo("401060606");

        System.out.println(user.getUsuario());

        user = repository.getUserByUsuario("401060607");
        assertThat(user).isNull();

        System.out.println(user);
    }
}
