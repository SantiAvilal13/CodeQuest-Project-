package com.example.landingpage.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class LandingPageController {

    @GetMapping
    public String index() {
        return "index";
    }

    @GetMapping("/contacto")
    public String contacto() {
        return "contacto";
    }
}
