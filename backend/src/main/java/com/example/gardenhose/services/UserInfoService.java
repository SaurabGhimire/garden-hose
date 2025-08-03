package com.example.gardenhose.services;

import com.example.gardenhose.entity.UserInfo;
import com.example.gardenhose.repositories.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserInfoService implements UserDetailsService {
  private final UserInfoRepository repository;
  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  public UserInfoService(UserInfoRepository repository) {
    this.repository = repository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<UserInfo> userInfo = repository.findByEmail(username);
    if (userInfo.isEmpty()) {
      throw new UsernameNotFoundException("User not found with email: " + username);
    }
    // Convert UserInfo to UserDetails (UserInfoDetails)
    UserInfo user = userInfo.get();
    return new User(user.getEmail(), user.getPassword(), user.getAuthorities());
  }

  public String addUser(UserInfo userInfo){
    userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
    repository.save(userInfo);
    return  "User added successfully";
  }
}
