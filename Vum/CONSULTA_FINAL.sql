SELECT
	RUT_CODIGO,
    FOT_CODIGO,
    URL_FOTO,
    TIPO_TAREA,
	NOMBRE_TAREA,
	FECHA_CREACION,
    FECHA_MODIFICACION,
	STRING_AGG(CAT.CAT_NOMBRE, ',') AS CATEGORIA
FROM VTA_INDEXADA_PRUEBA
LEFT JOIN (SELECT DISTINCT MAR.MAR_CODIGO, CAT.CAT_NOMBRE
        FROM
            SIM_MARCA AS MAR
            INNER JOIN SIM_PRODUCTO AS PRO ON PRO.MAR_CODIGO=MAR.MAR_CODIGO
            INNER JOIN SIM_PRODUCTO_ACTIVIDAD AS PRA ON PRA.PRO_CODIGO=PRO.PRO_CODIGO
            INNER JOIN SIM_CATEGORIA AS CAT ON CAT.CAT_CODIGO=PRA.CAT_CODIGO) AS CAT ON CAT.MAR_CODIGO=VTA_INDEXADA_PRUEBA.MAR_CODIGO
WHERE VTA_INDEXADA_PRUEBA.MAR_CODIGO IS NOT NULL
GROUP BY RUT_CODIGO,
    FOT_CODIGO,
    URL_FOTO,
    TIPO_TAREA,
	NOMBRE_TAREA,
	FECHA_CREACION,
    FECHA_MODIFICACION