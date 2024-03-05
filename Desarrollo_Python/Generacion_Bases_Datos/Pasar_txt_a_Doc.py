from docx import Document

# Texto proporcionado
texto = """
For each combination of symbols, we will calculate the probability and then the entropy. Below are the calculations:

M1M1:
Probability: (P(M1M1) = P(M1) ⋅ P(M1) = 1/5 ⋅ 1/5 = 1/25)

M1M3:
Probability: (P(M1M3) = P(M1) ⋅ P(M3) = 1/5 ⋅ 1/3 = 1/15)

M2M1:
Probability: (P(M2M1) = P(M2) ⋅ P(M1) = 1/5 ⋅ 1/5 = 1/25)

M2M3:
Probability: (P(M2M3) = P(M2) ⋅ P(M3) = 1/5 ⋅ 1/3 = 1/15)

M1M2:
Probability: (P(M1M2) = P(M1) ⋅ P(M2) = 1/5 ⋅ 1/5 = 1/25)

M2M2:
Probability: (P(M2M2) = P(M2) ⋅ P(M2) = 1/5 ⋅ 1/5 = 1/25)

M3M1:
Probability: (P(M3M1) = P(M3) ⋅ P(M1) = 1/3 ⋅ 1/5 = 1/15)

M3M2:
Probability: (P(M3M2) = P(M3) ⋅ P(M2) = 1/3 ⋅ 1/5 = 1/15)

M3M3:
Probability: (P(M3M3) = P(M3) ⋅ P(M3) = 1/3 ⋅ 1/3 = 1/9)
"""

# Crear un documento de Word
doc = Document()

# Agregar el texto al documento
doc.add_paragraph(texto)

# Guardar el documento en la carpeta "Documentos"
doc.save(r'C:\Users\carlos.ramos\OneDrive\OneDrive - Vision & Marketing S.A.S\Documents\texto.docx')
