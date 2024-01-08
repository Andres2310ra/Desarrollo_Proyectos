from faker import Faker
import datetime

fake = Faker()
start_date = datetime.date(2023, 1, 1)
end_date = datetime.date(2023, 12, 31)
fecha = fake.date_between_dates(date_start=start_date, date_end=end_date)
print(fecha)
