BEGIN TRANSACTION;
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

SELECT*FROM(

        SELECT DISTINCT
        REU_CODIGO,
        RUT_CODIGO,
        RES_CODIGO,
        ENA_CODIGO
        FECHA_CREACION,
        COUNT(*) OVER (PARTITION BY
        RES_CODIGO,
        USU_CODIGO,
        RUT_CODIGO,
        REU_OTRO,
        USUARIO_CREACION,
        FECHA_CREACION,
        USUARIO_MODIFICACION,
        FECHA_MODIFICACION,
        ESTADO,
        REU_OBSERVACION,
        REU_CONSECUTIVO_ENC,
        EXA_CODIGO,
        ENA_CODIGO,
        TIP_CODIGO_AUDIT,
        TIP_CODIGO_MOTIVO_RECHAZO,
        REU_DETALLE_RECHAZO,
        USU_AUDITORIA,
        RES_FECHA_AUDITORIA) AS CONTEO
        
        FROM
        SIM_RESPUESTA_USUARIO
        WHERE
        ESTADO=1
        AND YEAR(FECHA_CREACION)=2024
        AND MONTH(FECHA_CREACION) BETWEEN 9 AND 9
        --AND CONVERT(DATE,FECHA_CREACION) BETWEEN '2024-09-25' AND '2024-09-25'
        --AND RUT_CODIGO=24323521
) AS VAL

WHERE
VAL.CONTEO>1

COMMIT TRANSACTION;