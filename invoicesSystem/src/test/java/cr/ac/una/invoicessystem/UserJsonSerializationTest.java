package cr.ac.una.invoicessystem;

import com.jayway.jsonpath.DocumentContext;
import cr.ac.una.invoicessystem.data.entities.User;
import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.json.JacksonTester;

import java.io.IOException;

import static org.assertj.core.api.Assertions.*;

@JsonTest
public class UserJsonSerializationTest {
    @Autowired
    private JacksonTester<User> json;

    @Autowired
    private JacksonTester<User[]> jsonArray;

    private User[] users;

    @BeforeEach
    void setUp() {
        users = Arrays.array(
                User.builder()
                        .id(24)
                        .naturalId("202220222")
                        .password("oW0~kAA91qF")
                        .name("Dana")
                        .lastName("Lisett")
                        .mobile("9636350406")
                        .email("dlisett0@intel.com")
                        .enabled((byte) 0)
                        .type("Physical")
                        .role("Supplier")
                        .build(),
                User.builder()
                        .id(25)
                        .naturalId("303330333")
                        .password("mS4,FW5H&iV#1Q(")
                        .name("Bradney")
                        .lastName("Enefer")
                        .mobile("5083053497")
                        .email("benefer1@yelp.com")
                        .enabled((byte) 0)
                        .type("Physical")
                        .role("Supplier")
                        .build(),
                User.builder()
                        .id(26)
                        .naturalId("404440444")
                        .password("aU6/L3Lc")
                        .name("Minni")
                        .lastName("L'Episcopio")
                        .mobile("6203604625")
                        .email("mlepiscopio2@usa.gov")
                        .enabled((byte) 1)
                        .type("Physical")
                        .role("Supplier")
                        .build()
        );
    }

    @Test
    void userSerializationTest() throws IOException {
        User user = users[0];

        assertThat(json.write(user)).isStrictlyEqualToJson("userSingle.json");
        assertThat(json.write(user)).hasJsonPathNumberValue("@.id");
        assertThat(json.write(user)).hasJsonPathStringValue("@.naturalId");
        assertThat(json.write(user)).extractingJsonPathNumberValue("@.id").isEqualTo(24);
        assertThat(json.write(user)).extractingJsonPathStringValue("@.naturalId").isEqualTo("202220222");
    }

    @Test
    void userDeserializationTest() throws IOException {
        String expected = """
                {
                    "id": 24,
                    "naturalId": "202220222",
                    "password": "oW0~kAA91qF",
                    "name": "Dana",
                    "lastName": "Lisett",
                    "mobile": "9636350406",
                    "email": "dlisett0@intel.com",
                    "enabled": 0,
                    "type": "Physical",
                    "role": "Supplier"
                  }
                """;

        assertThat(json.parse(expected)).isEqualTo(User.builder()
                .id(24)
                .naturalId("202220222")
                .password("oW0~kAA91qF")
                .name("Dana")
                .lastName("Lisett")
                .mobile("9636350406")
                .email("dlisett0@intel.com")
                .enabled((byte) 0)
                .type("Physical")
                .role("Supplier")
                .build());
        assertThat(json.parseObject(expected).getId()).isEqualTo(24);
        assertThat(json.parseObject(expected).getNaturalId()).isEqualTo("202220222");
    }
}
