DROP TABLE IF EXISTS [FlyWithButchOhareDB_Copy].[dbo].[baggagebeltleaderboard]

CREATE TABLE [FlyWithButchOhareDB_Copy].[dbo].[BaggageBeltLeaderboard]
(
	[entry_id] INT NOT NULL PRIMARY KEY IDENTITY (1, 1), 
    [user] CHAR(2) NOT NULL, 
    [score] INT NOT NULL
)
