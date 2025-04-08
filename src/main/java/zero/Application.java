package zero;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "zero")
public class Application {

	public static void main(String[] args) {
            System.out.println("Hello WOrld");
		SpringApplication.run(Application.class, args);
	}

}
