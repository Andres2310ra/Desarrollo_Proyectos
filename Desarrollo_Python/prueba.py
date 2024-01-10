import pandas as pd
import fake as fk

# fk=fk.Faker()

numeroRegistros=1001

nombre=[fk.fake.name() for _ in range(numeroRegistros)]

date={'Nombre':nombre}

df=pd.DataFrame(date) 
print(df)