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

