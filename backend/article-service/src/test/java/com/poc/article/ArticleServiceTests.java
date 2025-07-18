package com.poc.article;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.yml")
@ActiveProfiles("test")
class ArticleServiceTests {

    @Test
    void contextLoads() {
        // Sanity check that context loads with external Postgres and MongoDB
    }
}
