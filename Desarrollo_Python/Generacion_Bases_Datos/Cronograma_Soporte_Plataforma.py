from datetime import datetime, timedelta
import calendar
import pandas as pd

# Ruta de los archivos Excel
ruta_excel = r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Plataformas\Diccionario_Equipo\Diccionario_Plataformas.xlsx'

# Leer los nombres desde la hoja 'Plataformas'
df_nombres = pd.read_excel(ruta_excel, sheet_name='Plataformas')
if df_nombres.empty:
    raise FileNotFoundError(f"No se encontró el archivo Excel en la hoja especificada: Plataformas")

nombres = df_nombres['NOMBRE'].tolist()

# Leer la información de días compensatorios desde la hoja 'Dias_Compensatorios'
df_compensatorios = pd.read_excel(ruta_excel, sheet_name='Dias_Compensatorios')
if df_compensatorios.empty:
    raise FileNotFoundError(f"No se encontró el archivo Excel en la hoja especificada: Dias_Compensatorios")

def generar_horario(mes, año):
    # Obtener el primer y último día del mes
    primer_dia = datetime(año, mes, 1)
    _, ultimo_dia_num = calendar.monthrange(año, mes)
    ultimo_dia = datetime(año, mes, ultimo_dia_num)
    
    # Crear lista de fechas del mes especificado
    fechas = [primer_dia + timedelta(days=i) for i in range((ultimo_dia - primer_dia).days + 1)]
    
    horario = []
    
    # Número de personas (excepto el primero)
    num_personas = len(nombres) - 1
    
    # Calcular bloques de horas de soporte
    horas_soporte = 10 / num_personas  # Soporte de 8:00 a 18:00 son 10 horas
    
    for semana in range((len(fechas) + 6) // 7):  # Recorremos cada semana
        for dia in range(6):  # De lunes a sábado
            if semana * 7 + dia >= len(fechas):
                break
            fecha = fechas[semana * 7 + dia]
            soporte_6_8 = nombres[semana % len(nombres)]
            
            if dia == 5:  # Sábados
                # Agregar soporte de 6 a 2 de la tarde en un solo registro
                horario.append([fecha.strftime('%Y-%m-%d'), soporte_6_8, "06:00", "14:00"])
            else:
                horario.append([fecha.strftime('%Y-%m-%d'), soporte_6_8, "06:00", "08:00"])
                start_time = 8
                for j in range(1, len(nombres)):
                    end_time = start_time + horas_soporte
                    soporte = nombres[(semana + j) % len(nombres)]
                    horario.append([fecha.strftime('%Y-%m-%d'), soporte, f"{int(start_time):02d}:00", f"{int(end_time):02d}:00"])
                    start_time = end_time

    return horario

def agregar_compensatorios(df_horario, df_compensatorios):
    df_horario['Compensatorio'] = ''
    
    for index, row in df_compensatorios.iterrows():
        dia_comp = row['DIA_COMPENSATORIO'].strftime('%Y-%m-%d')
        df_horario.loc[(df_horario['Nombre'] == row['NOMBRE']) & (df_horario['Fecha'] == dia_comp), 'Compensatorio'] = 'C'
    
    return df_horario

# Especificar mes y año
mes = 8  # Julio
año = 2024

# Generar el horario
horario = generar_horario(mes, año)

# Convertir a DataFrame de pandas
df_horario = pd.DataFrame(horario, columns=["Fecha", "Nombre", "Hora Inicio", "Hora Fin"])

# Agregar los días compensatorios
df_horario = agregar_compensatorios(df_horario, df_compensatorios)

# Exportar a archivo Excel
output_path = r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Plataformas\Cronograma_Soporte\Cronograma Soporte_Agosto.xlsx'
df_horario.to_excel(output_path, index=False)

print(f"Cronograma exportado a {output_path}")
