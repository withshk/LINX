package LINX.linx.user.service;

import LINX.linx.user.dto.response.LoginResponse;
import LINX.linx.user.repository.LoginRepository;
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
