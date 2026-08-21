package LINX.linx.login.service;

import LINX.linx.login.repository.LoginRepository;
import LINX.linx.login.dto.response.LoginResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {
    private final LoginRepository loginRepository;

    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public List<LoginResponse> getAllUsers() {
        return loginRepository.findAll()
                .stream()
                .map(LoginResponse::from)
                .toList();
    }
}
