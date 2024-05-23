package cr.ac.una.ministryregisteredstub.controller;

import cr.ac.una.ministryregisteredstub.presentation.controller.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class UserControllerTest {
    @Autowired
    private UserController controller;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testExistenceOfControllerBean(){
        assertThat(controller).isNotNull();
    }

    @Test
    void getTrueFromUserControllerWhenGetRequestSent() throws Exception {
        this.mockMvc.perform(get("http://localhost:8080/api/user/401060606")).andDo(print()).andExpect(status().isOk());
    }
}
