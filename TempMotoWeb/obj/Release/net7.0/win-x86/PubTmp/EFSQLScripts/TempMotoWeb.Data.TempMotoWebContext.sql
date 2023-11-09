IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230925195734_FirstMigration')
BEGIN
    CREATE TABLE [Medicao] (
        [Id] int NOT NULL IDENTITY,
        [Latitude] float NOT NULL,
        [Longitude] float NOT NULL,
        [Altitude] real NOT NULL,
        [Temperatura] real NOT NULL,
        [Umidade] real NOT NULL,
        [Num_Satelites] int NOT NULL,
        [Velocidade] real NOT NULL,
        [Data_Medicao] datetime2 NOT NULL,
        CONSTRAINT [PK_Medicao] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230925195734_FirstMigration')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230925195734_FirstMigration', N'7.0.11');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230926023154_AtualizarData')
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Medicao]') AND [c].[name] = N'Data_Medicao');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Medicao] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [Medicao] ALTER COLUMN [Data_Medicao] datetime2 NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230926023154_AtualizarData')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230926023154_AtualizarData', N'7.0.11');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20230926045556_MudarHora')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20230926045556_MudarHora', N'7.0.11');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231015061907_AddEndereco')
BEGIN
    ALTER TABLE [Medicao] ADD [endereco] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20231015061907_AddEndereco')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20231015061907_AddEndereco', N'7.0.11');
END;
GO

COMMIT;
GO

