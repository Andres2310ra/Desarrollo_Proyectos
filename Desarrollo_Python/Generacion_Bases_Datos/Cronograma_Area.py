import pandas as pd
import numpy as np
from itertools import cycle
from datetime import datetime, timedelta

try:
    Data = r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Desarrollo\Python\Bases_Trabajo_Python\Base_Area_BI.xlsx'
    df = pd.read_excel(Data)
    if df.empty:
        raise FileNotFoundError(f"No se encontró el archivo Excel en la ruta especificada: {Data}")

    def generate_schedule(year, month):
        # Crear un DataFrame con todos los días del mes especificado
        start_date = datetime(year, month, 1)
        end_date = (start_date + pd.DateOffset(months=1)) - timedelta(days=1)
        all_days = pd.date_range(start_date, end_date, freq='D')

        # Filtrar solo los días de lunes a viernes
        weekdays = all_days[all_days.weekday < 5]
        
        # Generar el DataFrame vacío para el horario
        schedule = pd.DataFrame(columns=["JEFE INMEDIATO", "ANALISTA/CONSULTOR", "CARGO", "CUENTA", "FECHA", "ASISTENCIA"])

        coordinador_bi = df[df['CARGO'] == 'COORDINADOR BI']
        non_coordinador_bi = df[df['CARGO'] != 'COORDINADOR BI']
        analista_front = df[df['CARGO'] == 'ANALISTA FRONT']
        other_analysts = df[(df['CARGO'] != 'COORDINADOR BI') & (df['CARGO'] != 'ANALISTA FRONT')]

        # Distribuir días para los coordinadores BI
        for week_start in weekdays[::5]:
            week_days = pd.date_range(week_start, periods=5, freq='D')
            week_days = list(week_days)  # Convertir a lista para que shuffle funcione
            np.random.shuffle(week_days)
            coord_days_cycle = cycle(week_days)
            for _, row in coordinador_bi.iterrows():
                person_schedule = []
                for _ in range(3):
                    day = next(coord_days_cycle)
                    person_schedule.append({
                        "JEFE INMEDIATO": row['JEFE INMEDIATO'],
                        "ANALISTA/CONSULTOR": row['ANALISTA/CONSULTOR'],
                        "CARGO": row['CARGO'],
                        "CUENTA": row['CUENTA'],
                        "FECHA": day,
                        "ASISTENCIA": 'PRESENCIAL'
                    })
                schedule = pd.concat([schedule, pd.DataFrame(person_schedule)], ignore_index=True)

        # Distribuir días para los analistas front por cuenta
        for cuenta, group in analista_front.groupby('CUENTA'):
            for week_start in weekdays[::5]:
                week_days = pd.date_range(week_start, periods=5, freq='D')
                week_days = list(week_days)  # Convertir a lista para que shuffle funcione
                np.random.shuffle(week_days)
                days_cycle = cycle(week_days[:3])
                
                attendance_days = [next(days_cycle) for _ in range(3)]
                for day in attendance_days:
                    for _, row in group.iterrows():
                        schedule = pd.concat([schedule, pd.DataFrame([{
                            "JEFE INMEDIATO": row['JEFE INMEDIATO'],
                            "ANALISTA/CONSULTOR": row['ANALISTA/CONSULTOR'],
                            "CARGO": row['CARGO'],
                            "CUENTA": row['CUENTA'],
                            "FECHA": day,
                            "ASISTENCIA": 'PRESENCIAL'
                        }])], ignore_index=True)

        # Distribuir días para los otros analistas/consultores
        for _, row in other_analysts.iterrows():
            if row['ANALISTA/CONSULTOR'] == "VACANTE":
                continue

            person_schedule = []
            for week_start in weekdays[::5]:
                week_days = pd.date_range(week_start, periods=5, freq='D')
                week_days = list(week_days)  # Convertir a lista para que shuffle funcione
                np.random.shuffle(week_days)
                days_cycle = cycle(week_days[:3])

                attendance_days = [next(days_cycle) for _ in range(3)]
                for day in attendance_days:
                    person_schedule.append({
                        "JEFE INMEDIATO": row['JEFE INMEDIATO'],
                        "ANALISTA/CONSULTOR": row['ANALISTA/CONSULTOR'],
                        "CARGO": row['CARGO'],
                        "CUENTA": row['CUENTA'],
                        "FECHA": day,
                        "ASISTENCIA": 'PRESENCIAL'
                    })
                schedule = pd.concat([schedule, pd.DataFrame(person_schedule)], ignore_index=True)
        
        return schedule

except Exception as e:
    print(f"Hubo un error inesperado: {type(e).__name__}: {e}")
else:
    # Generar el horario para un mes y año especificado
    year = 2024
    month = 7
    schedule = generate_schedule(year, month)
    print(schedule)

    schedule.to_excel(r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\Plataformas\Cronograma_Soporte\Cronograma BI_Julio.xlsx', index=False)
    print('Base de Datos Terminada')
