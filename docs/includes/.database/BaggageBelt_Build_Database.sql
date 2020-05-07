DROP TABLE IF EXISTS [FlyWithButchOhareDB_Copy].[dbo].[baggagebeltleaderboard];

CREATE TABLE [FlyWithButchOhareDB_Copy].[dbo].[BaggageBeltLeaderboard]
(
	[entry_id] INT NOT NULL PRIMARY KEY IDENTITY (1, 1), 
    [user] CHAR(2) NOT NULL, 
    [score] INT NOT NULL
);

INSERT INTO [FlyWithButchOhareDB_Copy].[dbo].[baggagebeltleaderboard] ([user], [score]) VALUES
('AB', 1000),
('BC', 500),
('CD', 250),
('DE', 125),
('EF', 100),
('FG', 75),
('GH', 50),
('HI', 40),
('IJ', 30),
('JK', 20),
('KL', 10);