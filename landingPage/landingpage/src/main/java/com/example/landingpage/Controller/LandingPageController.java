package com.example.landingpage.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.landingpage.Entity.ContactoForm;
import com.example.landingpage.Utils.EmailService;

@Controller
@RequestMapping("/")
public class LandingPageController {

    @Value("${correo.correo}")
    private String correo;

    @Value("${correo.password}")
    private String contrasena;

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
        EmailService emailService = new EmailService(correo, contrasena);
        // Enviar correo de verificación (lógica simplificada)
        emailService.enviarCorreo(contactoForm.getCorreo(), "Gracias por contactarnos", "Gracias por contactarnos, en breve nos pondremos en contacto con usted para continuar con el proceso .Gracias. ");

        // Redirige con un parámetro de éxito
        return "redirect:/contacto?success=true";
    }

    @GetMapping("nosotros")
    public String nosotros() {
        return "nosotros";
    }

    @GetMapping("codeQuest")
    public String codeQuest() {
        return "codeQuest";
    }
}
