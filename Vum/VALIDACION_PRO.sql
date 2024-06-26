SELECT
PRA.ACT_CODIGO,
ACT.ACT_NOMBRE,
PRA.PRA_CODIGO,
PRO.PRO_CODIGO,
PRO.PRO_NOMBRE,
PRO.MAR_CODIGO,
PRA.CAT_CODIGO,
CAT.CAT_NOMBRE,
PRO.ESTADO AS PRO_ESTADO,
PRA.ESTADO AS PRA_ESTADO

FROM
SIM_PRODUCTO_ACTIVIDAD AS PRA
INNER JOIN SIM_ACTIVIDAD AS ACT ON ACT.ACT_CODIGO=PRA.ACT_CODIGO --AND ACT.ESTADO=1
INNER JOIN SIM_PRODUCTO AS PRO ON PRO.PRO_CODIGO=PRA.PRO_CODIGO
INNER JOIN SIM_CATEGORIA AS CAT ON CAT.CAT_CODIGO=PRA.CAT_CODIGO

WHERE
ACT.CLI_CODIGO=138