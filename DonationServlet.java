import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.sql.*;

@WebServlet("/DonationServlet")
@MultipartConfig(fileSizeThreshold = 1024 * 1024,
                 maxFileSize = 1024 * 1024 * 5, 
                 maxRequestSize = 1024 * 1024 * 5 * 5)
public class DonationServlet extends HttpServlet {
    private static final String UPLOAD_DIRECTORY = "upload";

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        // Crear componentes de ruta para guardar el archivo
        String uploadPath = getServletContext().getRealPath("") + File.separator + UPLOAD_DIRECTORY;
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) uploadDir.mkdir();

        String fileName = "";
        for (Part part : request.getParts()) {
            fileName = getFileName(part);
            if (!fileName.isEmpty()) {
                part.write(uploadPath + File.separator + fileName);
            }
        }

        String description = request.getParameter("description");

        // Aquí normalmente guardarías la ruta del archivo y la descripción en una base de datos
        // Por ahora, solo imprimiremos la información
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h2>¡Donación enviada con éxito!</h2>");
        out.println("<p>Archivo: " + fileName + "</p>");
        out.println("<p>Descripción: " + description + "</p>");
        out.println("</body></html>");
    }

    private String getFileName(Part part) {
        for (String content : part.getHeader("content-disposition").split(";")) {
            if (content.trim().startsWith("filename")) {
                return content.substring(content.indexOf('=') + 1).trim().replace("\"", "");
            }
        }
        return "";
    }
}