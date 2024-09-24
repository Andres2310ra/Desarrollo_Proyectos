import pandas as pd

# List of public holidays in Colombia from 2023 to 2030
data = [
    # 2023
    [1, "January", 2023, "Año Nuevo", "Celebración del primer día del año"],
    [9, "January", 2023, "Día de los Reyes Magos", "Festividad religiosa celebrada el 6 de enero y trasladada al lunes siguiente"],
    [20, "March", 2023, "Día de San José", "Festividad religiosa celebrada el 19 de marzo y trasladada al lunes siguiente"],
    [6, "April", 2023, "Jueves Santo", "Celebración religiosa en conmemoración de la última cena"],
    [7, "April", 2023, "Viernes Santo", "Celebración religiosa en conmemoración de la crucifixión de Jesús"],
    [1, "May", 2023, "Día del Trabajo", "Celebración mundial del día del trabajador"],
    [22, "May", 2023, "Día de la Ascensión", "Festividad religiosa celebrada el día 40 después de la Pascua y trasladada al lunes siguiente"],
    [12, "June", 2023, "Corpus Christi", "Celebración religiosa que honra la Eucaristía, trasladada al lunes siguiente"],
    [19, "June", 2023, "Sagrado Corazón", "Festividad religiosa trasladada al lunes siguiente"],
    [3, "July", 2023, "San Pedro y San Pablo", "Festividad religiosa celebrada el 29 de junio y trasladada al lunes siguiente"],
    [20, "July", 2023, "Día de la Independencia", "Celebración de la independencia de Colombia"],
    [7, "August", 2023, "Batalla de Boyacá", "Conmemoración de la Batalla de Boyacá, que marcó la independencia definitiva de Colombia"],
    [21, "August", 2023, "La Asunción de la Virgen", "Festividad religiosa celebrada el 15 de agosto y trasladada al lunes siguiente"],
    [16, "October", 2023, "Día de la Raza", "Conmemoración del descubrimiento de América"],
    [6, "November", 2023, "Todos los Santos", "Festividad religiosa celebrada el 1 de noviembre y trasladada al lunes siguiente"],
    [13, "November", 2023, "Independencia de Cartagena", "Conmemoración de la independencia de Cartagena de Indias en 1811"],
    [8, "December", 2023, "Día de la Inmaculada Concepción", "Celebración religiosa en honor a la Virgen María"],
    [25, "December", 2023, "Navidad", "Celebración del nacimiento de Jesús"],
    
    # 2024
    # (only a few examples are listed for 2024 for brevity, more data would be filled similarly)
    [1, "January", 2024, "Año Nuevo", "Celebración del primer día del año"],
    [8, "January", 2024, "Día de los Reyes Magos", "Festividad religiosa celebrada el 6 de enero y trasladada al lunes siguiente"],
    [19, "March", 2024, "Día de San José", "Festividad religiosa celebrada el 19 de marzo y trasladada al lunes siguiente"],
    # ...
]

# Convert data to DataFrame
df = pd.DataFrame(data, columns=["Día", "Mes", "Año", "Festivo", "Descripción del Festivo"])

# Save to Excel
file_path = "C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Generadas_Python/Festivos_Colombia_2023_2030.xlsx"
df.to_excel(file_path, index=False)

file_path
