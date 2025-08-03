package com.example.gardenhose.controllers;

import com.example.gardenhose.entity.AuthRequest;
import com.example.gardenhose.entity.UserInfo;
import com.example.gardenhose.services.JwtService;
import com.example.gardenhose.services.UserInfoDetails;
import com.example.gardenhose.services.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {
  private UserInfoService userInfoService;
  private JwtService jwtService;
  private AuthenticationManager authenticationManager;

  @GetMapping("/welcome")
  public String welcome(){
    return "Welcome this endpoint is not secure";
  }

  @PostMapping("/addNewUser")
  public String addNewUser(@RequestBody UserInfo userInfo){
    return userInfoService.addUser(userInfo);
  }

  @PostMapping("/generateToken")
  public String authenticateAndGetToken(@RequestBody AuthRequest authRequest){
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        authRequest.getUsername(),
        authRequest.getPassword()
        )
    );
    if(!authentication.isAuthenticated()){
      throw new UsernameNotFoundException("Invalid user credentials");
    }
    return jwtService.generateToken(authRequest.getUsername());
  }
}
