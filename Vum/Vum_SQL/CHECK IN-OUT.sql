WITH SIM_USUARIOS AS(
SELECT
    CLI.CLI_CODIGO,
    CLI.CLI_NOMBRE,
    ACT.ACT_CODIGO,
    ACT.ACT_NOMBRE,
    USU.USU_CODIGO,
    UPPER(USU.USU_NOMBRES + ' ' + USU.USU_APELLIDOS) AS NOMBRE_COMPLETO,
    USU.USU_NUMERO_DOCUMENTO AS #_DOCUEMNTO,
    LOWER(USU.USU_LOGIN) AS LOGIN,
    PER.PER_CODIGO,
    PER.PER_NOMBRE AS PERFIL,
    USC.USC_CODIGO,
    USA.USA_CODIGO,
    PEU.PEU_CODIGO,
    UAE.TIP_CODIGO,
    CASE
    WHEN USA.ESTADO=0 AND USC.ESTADO=0 THEN 'CLIANTE-ACTIVIDAD INACTIVO'
    WHEN USC.ESTADO=1 AND USA.ESTADO=0 THEN 'CLIENTE-ACTIVO Y ACTIVIDAD-INACTIVA'
    WHEN USC.ESTADO=0 AND USA.ESTADO=1 THEN 'CLIENTE-INACTIVO Y ACTIVIDAD-ACTIVA'
    WHEN USC.ESTADO=1 AND USA.ESTADO=1 THEN 'ACTIVO'
    ELSE 'HAY NOVEDADES'
    END AS ESTADO
FROM
    SIM_USUARIO AS USU
    LEFT JOIN SIM_USUARIO_CLIENTE AS USC ON USC.USU_CODIGO=USU.USU_CODIGO
    LEFT JOIN SIM_USUARIO_ACTIVIIDAD AS USA ON USA.USC_CODIGO=USC.USC_CODIGO AND USA.ESTADO=1
    LEFT JOIN SIM_PERFIL_USUARIO AS PEU ON PEU.USA_CODIGO=USA.USA_CODIGO AND PEU.ESTADO=1
    LEFT JOIN SIM_PERFIL AS PER ON PER.PER_CODIGO=PEU.PER_CODIGO
    INNER JOIN SIM_ACTIVIDAD AS ACT ON ACT.ACT_CODIGO=USA.ACT_CODIGO AND ACT.ESTADO=1
    INNER JOIN SIM_CLIENTE AS CLI ON CLI.CLI_CODIGO=ACT.CLI_CODIGO AND CLI.ESTADO=1
    INNER JOIN SIM_USUARIO_ACTIVIDAD_ENCARGADO AS UAE ON UAE.USA_CODIGO2=USA.USA_CODIGO AND UAE.ESTADO=1 AND UAE.TIP_CODIGO=59
    INNER JOIN (SELECT DISTINCT
                        USA_CODIGO
                FROM
                        SIM_USUARIO_PUNTO_VENTA
                WHERE
                        ESTADO=1 AND CONVERT(DATE,UPV_FECHA_INACTIVACION1) > CONVERT(DATE,GETDATE())) AS UPV ON UPV.USA_CODIGO=USA.USA_CODIGO
WHERE
    USU.ESTADO=1 AND PEU.PEU_CODIGO IS NOT NULL
    AND CLI.CLI_CODIGO NOT IN (12,48,57,72,77,88,89,99,100,110,111,116,117,124,130,131,132,136,137,140,147,148,155,164,204,205,209,217,143,65,67,65,67,112,115,120,121,151,152,153,94,160,211,213,206,11,691,692)
    AND ACT.ACT_CODIGO NOT IN (326,525,541,622,628,761,352,369,444,461,559,587,606,607,644,525,529,550,184,196,211,212,325,436,535,536)
    AND PER.PER_CODIGO NOT IN (1,22,369,8,188,187,39,198,38,332,39,198,253,182,123,283,205,75,298,258,284,67,66,178,133,5,191,201,224,299,363,218,303,301,302,300,307,308,294,306,295,291,16,305,331,339,344,267,288,337,356,353,354,366,373,202)
),
      MAX_RUTA AS (
        SELECT
        MAX(RUT.RUT_CODIGO) AS RUT_CODIGO,
        USU.USU_LOGIN
        FROM
        SIM_RUTA AS RUT
        INNER JOIN SIM_USUARIO_ACTIVIIDAD AS USA ON USA.USA_CODIGO=RUT.USA_CODIGO
        INNER JOIN SIM_USUARIO_CLIENTE AS USC ON USC.USC_CODIGO=USA.USC_CODIGO
        INNER JOIN SIM_USUARIO AS USU ON USU.USU_CODIGO=USC.USU_CODIGO
        WHERE
        RUT.ESTADO=1
        AND CONVERT(DATE,RUT.RUT_FECHA_RUTA) BETWEEN '2024-05-01' AND '2024-05-31'
        AND RUT.TIP_CODIGO=32
        GROUP BY USU.USU_LOGIN)

SELECT DISTINCT
USU.CLI_CODIGO,
USU.CLI_NOMBRE,
USU.LOGIN,
USU.PERFIL,
RUT.RUT_FECHA_RUTA,
IIF(RU2.RUT_CODIGO IS NULL,0,1) AS RUT_CODIGO
FROM
SIM_USUARIOS AS USU
LEFT JOIN MAX_RUTA AS RU2 ON RU2.USU_LOGIN=USU.LOGIN
LEFT JOIN SIM_RUTA AS RUT ON RUT.RUT_CODIGO=RU2.RUT_CODIGO