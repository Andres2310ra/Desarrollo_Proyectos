SELECT DISTINCT

CIU.CIU_CODIGO,
CIU.CIU_NOMBRE,
DEP.DEP_CODIGO,
DEP.DEP_NOMBRE,
PAI.PAI_CODIGO,
PAI.PAI_NOMBRE

FROM
SIM_CIUDAD AS CIU
FULL JOIN SIM_DEPARTAMENTO AS DEP ON (CIU.DEP_CODIGO=DEP.DEP_CODIGO)
FULL JOIN SIM_PAIS AS PAI ON (DEP.PAI_CODIGO=PAI.PAI_CODIGO)

WHERE CIU.ESTADO=1 AND DEP.ESTADO=1 