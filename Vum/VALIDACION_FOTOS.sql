-- INACTIVAR FOTOS SIM_FOTO GEE --
UPDATE SIM_FOTO
SET
    USUARIO_MODIFICACION = 'carlos.rgaitan GEE=0',
    FECHA_MODIFICACION = GETDATE(),
    ESTADO = 0
WHERE FOT_CODIGO IN (
        SELECT FOT.FOT_CODIGO
        FROM
            SIM_GESTION_EXHIBICION AS GEE
            INNER JOIN SIM_FOTO_ASOCIACION AS FOA ON (
                FOA.GEE_CODIGO = GEE.GEE_CODIGO
            )
            INNER JOIN SIM_FOTO AS FOT ON (
                FOT.FOT_CODIGO = FOA.FOT_CODIGO
            )
        WHERE
            GEE.ESTADO = 0
            AND FOT.ESTADO = 1
    )

-- INACTIVAR FOTOS SIM_FOTO_ASOCIACION GEE --
UPDATE SIM_FOTO_ASOCIACION
SET
    USUARIO_MODIFICACION = 'carlos.rgaitan GEE=0',
    FECHA_MODIFICACION = GETDATE(),
    ESTADO = 0
WHERE FOT_CODIGO IN (
        SELECT FOA.FOT_CODIGO
        FROM
            SIM_GESTION_EXHIBICION AS GEE
            INNER JOIN SIM_FOTO_ASOCIACION AS FOA ON (
                FOA.GEE_CODIGO = GEE.GEE_CODIGO
            )
        WHERE
            GEE.ESTADO = 0
            AND FOA.ESTADO = 1
    )

-- INACTIVAR FOTOS SIM_FOTO REU --
UPDATE SIM_FOTO
SET
    USUARIO_MODIFICACION = 'carlos.rgaitan REU=0',
    FECHA_MODIFICACION = GETDATE(),
    ESTADO = 0
WHERE FOT_CODIGO IN (
        SELECT FOT.FOT_CODIGO
        FROM
            SIM_RESPUESTA_USUARIO AS REU
            INNER JOIN SIM_FOTO_ASOCIACION AS FOA ON (
                FOA.REU_CODIGO = REU.REU_CODIGO
            )
            INNER JOIN SIM_FOTO AS FOT ON (
                FOT.FOT_CODIGO = FOA.FOT_CODIGO
            )
        WHERE
            REU.ESTADO = 0
            AND FOT.ESTADO = 1
    )

-- INACTIVAR FOTOS SIM_FOTO_ASOCIACION REU --
UPDATE SIM_FOTO_ASOCIACION
SET
    USUARIO_MODIFICACION = 'carlos.rgaitan REU=0',
    FECHA_MODIFICACION = GETDATE(),
    ESTADO = 0
WHERE FOT_CODIGO IN (
        SELECT FOA.FOT_CODIGO
        FROM
            SIM_RESPUESTA_USUARIO AS REU
            INNER JOIN SIM_FOTO_ASOCIACION AS FOA ON (
                FOA.REU_CODIGO = REU.REU_CODIGO
            )
        WHERE
            REU.ESTADO = 0
            AND FOA.ESTADO = 1
    )

-- INACTIVAR FOTOS SIM_FOTO ACO --
UPDATE SIM_FOTO
SET
    USUARIO_MODIFICACION = 'carlos.rgaitan ACO=0',
    FECHA_MODIFICACION = GETDATE(),
    ESTADO = 0
WHERE FOT_CODIGO IN (
        SELECT FOT.FOT_CODIGO
        FROM
            SIM_ACTIVIDAD_COMERCIAL AS ACO
            INNER JOIN SIM_FOTO_ASOCIACION AS FOA ON (
                FOA.ACO_CODIGO = ACO.ACO_CODIGO
            )
            INNER JOIN SIM_FOTO AS FOT ON (
                FOT.FOT_CODIGO = FOA.FOT_CODIGO
            )
        WHERE
            ACO.ESTADO = 0
            AND FOT.ESTADO = 1
    )

-- INACTIVAR FOTOS SIM_FOTO_ASOCIACION ACO --
UPDATE SIM_FOTO_ASOCIACION
SET
    USUARIO_MODIFICACION = 'carlos.rgaitan ACO=0',
    FECHA_MODIFICACION = GETDATE(),
    ESTADO = 0
WHERE FOT_CODIGO IN (
        SELECT FOA.FOT_CODIGO
        FROM
            SIM_ACTIVIDAD_COMERCIAL AS ACO
            INNER JOIN SIM_FOTO_ASOCIACION AS FOA ON (
                FOA.ACO_CODIGO = ACO.ACO_CODIGO
            )
        WHERE
            ACO.ESTADO = 0
            AND FOA.ESTADO = 1
    )