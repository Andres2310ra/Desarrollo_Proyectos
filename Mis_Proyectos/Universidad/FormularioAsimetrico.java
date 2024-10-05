import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.util.Base64;
import javax.crypto.Cipher;

public class FormularioAsimetrico extends JFrame {
    private JTextField usuarioField;
    private JPasswordField contrasenaField;
    private JButton iniciarSesionButton;

    // Generar un par de claves pública y privada de 2048 bits
    public static KeyPair generarClaves() throws Exception {
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        return keyGen.generateKeyPair();
    }

    // Cifrar una cadena de texto con la clave pública
    public static String cifrar(String texto, KeyPair claves) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        cipher.init(Cipher.ENCRYPT_MODE, claves.getPublic());
        byte[] textoCifrado = cipher.doFinal(texto.getBytes());
        return Base64.getEncoder().encodeToString(textoCifrado);
    }

    // Descifrar una cadena de texto con la clave privada
    public static String descifrar(String textoCifrado, KeyPair claves) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        cipher.init(Cipher.DECRYPT_MODE, claves.getPrivate());
        byte[] textoDescifrado = cipher.doFinal(Base64.getDecoder().decode(textoCifrado));
        return new String(textoDescifrado);
    }

    public FormularioAsimetrico() throws Exception {

        setTitle("Encriptacion Asimetrica");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(600, 150);
        setLocationRelativeTo(null);

        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(3, 2));

        JLabel usuarioLabel = new JLabel("Usuario:");
        usuarioField = new JTextField();
        panel.add(usuarioLabel);
        panel.add(usuarioField);

        JLabel contrasenaLabel = new JLabel("Contraseña:");
        contrasenaField = new JPasswordField();
        panel.add(contrasenaLabel);
        panel.add(contrasenaField);

        iniciarSesionButton = new JButton("Iniciar Sesión");
        panel.add(new JLabel());
        panel.add(iniciarSesionButton);

        // Generar un par de claves para el proceso de encriptación asimétrica
        KeyPair claves = generarClaves();

        iniciarSesionButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    String usuario = usuarioField.getText();
                    char[] contrasena = contrasenaField.getPassword();

                    String usuarioCifrado = cifrar(usuario, claves);
                    String contrasenaCifrada = cifrar(String.valueOf(contrasena), claves);
                    System.out.println("Usuario cifrado: " + usuarioCifrado);
                    System.out.println("Contraseña cifrada: " + contrasenaCifrada);

                    String usuarioDescifrado = descifrar(usuarioCifrado, claves);
                    String contrasenaDescifrada = descifrar(contrasenaCifrada, claves);
                    System.out.println("Usuario descifrado: " + usuarioDescifrado);
                    System.out.println("Contraseña descifrada: " + contrasenaDescifrada);
   
                    if (usuarioDescifrado.equals("admin") && contrasenaDescifrada.equals("12345")) {
                        JOptionPane.showMessageDialog(null, "Inicio de sesión exitoso");
                    } else {
                        JOptionPane.showMessageDialog(null, "Usuario o contraseña incorrectos");
                    }

                    usuarioField.setText("");
                    contrasenaField.setText("");
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        });

        add(panel);

        setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                try {
                    new FormularioAsimetrico();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
}
