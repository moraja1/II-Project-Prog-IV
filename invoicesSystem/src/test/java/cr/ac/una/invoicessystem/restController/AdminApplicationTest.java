package cr.ac.una.invoicessystem.restController;

import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import net.minidev.json.JSONArray;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class AdminApplicationTest {
    @Autowired
    TestRestTemplate restTemplate;

    @Test
    void shouldReturnAllUsersWhenListIsRequested() {
        ResponseEntity<String> response = restTemplate.getForEntity("/admin/users", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        DocumentContext documentContext = JsonPath.parse(response.getBody());
        int cashCardCount = documentContext.read("$.length()");
        assertThat(cashCardCount).isEqualTo(3);

        JSONArray ids = documentContext.read("$..id");
        assertThat(ids.get(0)).isEqualTo(40);
        assertThat(ids.get(1)).isEqualTo(41);
    }

    @Test
    void shouldReturnUserWhenUserIsRequested() {
        ResponseEntity<String> response = restTemplate.getForEntity("/admin/users/40", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);


        DocumentContext documentContext = JsonPath.parse(response.getBody());
        Number id = documentContext.read("$.id");
        assertThat(id).isNotNull();
        assertThat(id).isEqualTo(40);
        assertThat((String) documentContext.read("$.email")).isEqualTo("dlisett0@intel.com");
    }
}