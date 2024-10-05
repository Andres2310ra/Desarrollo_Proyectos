import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.security.SecureRandom;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;

public class FormularioSimetrico extends JFrame {
    private JTextField usuarioField;
    private JPasswordField contrasenaField;
    private JButton iniciarSesionButton;

    // Generar una clave simétrica aleatoria de 256 bits
    public static SecretKey generarClave() throws Exception {
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(256);
        return keyGen.generateKey();
    }

    // Generar un vector de inicialización aleatorio de 16 bytes
    public static byte[] generarIV() {
        byte[] iv = new byte[16];
        SecureRandom random = new SecureRandom();
        random.nextBytes(iv);
        return iv;
    }

    // Cifrar una cadena de texto con la clave simétrica y el vector de inicialización
    public static String cifrar(String texto, SecretKey clave, byte[] iv) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        IvParameterSpec ivSpec = new IvParameterSpec(iv);
        cipher.init(Cipher.ENCRYPT_MODE, clave, ivSpec);
        byte[] textoCifrado = cipher.doFinal(texto.getBytes());
        return Base64.getEncoder().encodeToString(textoCifrado);
    }

    // Descifrar una cadena de texto con la clave simétrica y el vector de inicialización
    public static String descifrar(String textoCifrado, SecretKey clave, byte[] iv) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        IvParameterSpec ivSpec = new IvParameterSpec(iv);
        cipher.init(Cipher.DECRYPT_MODE, clave, ivSpec);
        byte[] textoDescifrado = cipher.doFinal(Base64.getDecoder().decode(textoCifrado));
        return new String(textoDescifrado);
    }

    public FormularioSimetrico() throws Exception {
   
        setTitle("Encriptacion Simetrica");
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

        SecretKey clave = generarClave();
        byte[] iv = generarIV();

        iniciarSesionButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    String usuario = usuarioField.getText();
                    char[] contrasena = contrasenaField.getPassword();
         
                    String usuarioCifrado = cifrar(usuario, clave, iv);
                    String contrasenaCifrada = cifrar(String.valueOf(contrasena), clave, iv);
                    System.out.println("Usuario cifrado: " + usuarioCifrado);
                    System.out.println("Contraseña cifrada: " + contrasenaCifrada);

                    String usuarioDescifrado = descifrar(usuarioCifrado, clave, iv);
                    String contrasenaDescifrada = descifrar(contrasenaCifrada, clave, iv);
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
                    new FormularioSimetrico();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
}
