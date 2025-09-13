package com.example.landingpage.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.landingpage.Entity.ContactoForm;

@Controller
@RequestMapping("/")
public class LandingPageController {

    //localhost:8091
    @GetMapping
    public String index(Model model) {

        return "index";
    }

    //localhost:8091/contacto
    @GetMapping("contacto")
    public String contacto(@RequestParam(required = false) Boolean success, Model model) {
        if (Boolean.TRUE.equals(success)) {
            model.addAttribute("modalExito", true);
        }
        return "contacto";
    }

    @PostMapping("contacto")
    public String contactoPost(@ModelAttribute ContactoForm contactoForm,
            RedirectAttributes redirectAttributes) {
        if (contactoForm.getNotificaciones() == null) {
            contactoForm.setNotificaciones(false);
        } else {
            contactoForm.setNotificaciones(true);
        }

        // objeto lleno
        System.out.println("Nuevo contacto: " + contactoForm);

        // TODO: guardar en BD, enviar correo, etc.
        // Redirige con un parámetro de éxito
        return "redirect:/contacto?success=true";
    }

}
