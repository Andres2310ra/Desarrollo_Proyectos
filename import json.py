import json
from datetime import datetime, timedelta

# Fecha de inicio
start_date = datetime(2024, 1, 1)

# Fecha de fin (hoy)
end_date = datetime.today()

# Generar la lista de fechas
dates = []
current_date = start_date
while current_date <= end_date:
    dates.append(current_date.strftime("%Y-%m-%d"))
    current_date += timedelta(days=1)

# Crear el diccionario para JSON
calendar = {"dates": dates}

# Guardar en un archivo JSON
with open("calendar.json", "w") as json_file:
    json.dump(calendar, json_file, indent=4)
