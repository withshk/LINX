package LINX.linx.login.repository;

import LINX.linx.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface LoginRepository extends JpaRepository <User , Long> {

}
