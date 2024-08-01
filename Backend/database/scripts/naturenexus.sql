DROP TABLE Rabbit;
DROP TABLE Owl;
DROP TABLE Wolf;
DROP TABLE Frog;
DROP TABLE Mom;
DROP TABLE Dad;
DROP TABLE Pond;
DROP TABLE Forest;
DROP TABLE LivesIn;
DROP TABLE PlantedBy;
DROP TABLE Monitors;
DROP TABLE Manages;
DROP TABLE Equipment;
DROP TABLE Visitor;


DROP TABLE Plant;
DROP TABLE Facility;
DROP TABLE ParkRanger;
DROP TABLE Habitat;
DROP TABLE Area;


DROP TABLE Animal;
DROP TABLE Species;
DROP TABLE Family;


CREATE TABLE Family(
	taxonomicalFamily CHAR(30) PRIMARY KEY,
	taxonomicalOrder CHAR(30)
);

GRANT SELECT ON Family TO PUBLIC;

CREATE TABLE Species(
	speciesName CHAR(30) PRIMARY KEY,
	taxonomicalFamily CHAR(30),
	FOREIGN KEY (taxonomicalFamily) REFERENCES Family(taxonomicalFamily)
);

GRANT SELECT ON Species TO PUBLIC;

CREATE TABLE Animal (
	animalId INT PRIMARY KEY,
	health CHAR(30),
	age INT,
	animalName CHAR(30) UNIQUE,
	speciesName CHAR(30),
	lastSeen DATE,
	FOREIGN KEY (speciesName) REFERENCES Species(speciesName)
);

GRANT SELECT ON Animal TO PUBLIC;




CREATE TABLE Rabbit (
	animalId INT PRIMARY KEY,
	furPattern CHAR(30), 
	FOREIGN KEY(animalId) REFERENCES Animal(animalId)
		ON DELETE CASCADE
);

GRANT SELECT ON Rabbit TO PUBLIC;


CREATE TABLE Owl (
	animalId INT PRIMARY KEY,
	plumage CHAR(30), 
  FOREIGN KEY(animalId) REFERENCES Animal(animalId)
    ON DELETE CASCADE
);

GRANT SELECT ON Owl TO PUBLIC;


CREATE TABLE Wolf (
	animalId INT PRIMARY KEY,
	furPattern CHAR(30), 
	FOREIGN KEY(animalId) REFERENCES Animal(animalId)
	  ON DELETE CASCADE
);

GRANT SELECT ON Wolf TO PUBLIC;


CREATE TABLE Frog (
	animalId INT PRIMARY KEY,
	skinPattern CHAR(30), 
	FOREIGN KEY(animalId) REFERENCES Animal(animalId)
	  ON DELETE CASCADE
);

GRANT SELECT ON Frog TO PUBLIC;


CREATE TABLE Mom ( 
	animalId_Mom INT,
	animalId_Child INT PRIMARY KEY,
	FOREIGN KEY(animalId_Mom) REFERENCES Animal(animalId),
	FOREIGN KEY(animalId_Child) REFERENCES Animal(animalId)
);

GRANT SELECT ON Mom TO PUBLIC;

	
CREATE TABLE Dad (
	animalId_Dad INT,
	animalId_Child INT PRIMARY KEY,
	FOREIGN KEY(animalId_Dad) REFERENCES Animal(animalId),
	FOREIGN KEY(animalId_Child) REFERENCES Animal(animalId)
);

GRANT SELECT ON Dad TO PUBLIC;


CREATE TABLE Area (
	coordinates CHAR(30) PRIMARY KEY,
	areaName CHAR(30)
);

GRANT SELECT ON Area TO PUBLIC;

CREATE TABLE Habitat (
	habitatName CHAR(30) PRIMARY KEY,
	coordinates CHAR(30),
	FOREIGN KEY (coordinates) REFERENCES Area(coordinates) 
);

GRANT SELECT ON Habitat TO PUBLIC;


CREATE TABLE Pond (
	habitatName CHAR(30) PRIMARY KEY,
	waterQuality CHAR(30), 
	FOREIGN KEY(habitatName) REFERENCES Habitat(habitatName)
	  ON DELETE CASCADE
);

GRANT SELECT ON Pond TO PUBLIC;


CREATE TABLE Forest (
	habitatName CHAR(30) PRIMARY KEY,
	soilQuality CHAR(30), 
	FOREIGN KEY(habitatName) REFERENCES Habitat(habitatName)
	  ON DELETE CASCADE
);

GRANT SELECT ON Forest TO PUBLIC;


CREATE TABLE LivesIn (
	animalId INT,
	habitatName CHAR(30),
	PRIMARY KEY(animalId, habitatName),
	FOREIGN KEY(animalId) REFERENCES Animal(animalId)
	  ON DELETE CASCADE,
	FOREIGN KEY(habitatName) REFERENCES Habitat(habitatName)
	  ON DELETE CASCADE
);

GRANT SELECT ON LivesIn TO PUBLIC;


CREATE TABLE Plant (
	plantId INT PRIMARY KEY,
	species CHAR(30),
	coordinates CHAR(30),
	health CHAR(30),
	habitatName CHAR(30) NOT NULL,
	FOREIGN KEY(habitatName) REFERENCES Habitat(habitatName)
	  ON DELETE CASCADE
);

GRANT SELECT ON Plant TO PUBLIC;


CREATE TABLE ParkRanger (
	rangerId INT PRIMARY KEY,
	rangerName CHAR(30),
	dateJoined DATE
);

GRANT SELECT ON ParkRanger TO PUBLIC;

CREATE TABLE PlantedBy (
	plantId INT PRIMARY KEY,
	rangerId INT,
	datePlanted DATE,
	FOREIGN KEY(plantId) REFERENCES Plant(plantId) ON DELETE SET NULL,
	FOREIGN KEY(rangerId) REFERENCES ParkRanger(rangerId) ON DELETE SET NULL
);

GRANT SELECT ON PlantedBy TO PUBLIC;


CREATE TABLE Monitors (
	habitatName CHAR(30),
	rangerId INT,
	PRIMARY KEY(habitatName, rangerId),
	FOREIGN KEY(rangerId) REFERENCES ParkRanger(rangerId) ON DELETE CASCADE,
	FOREIGN KEY(habitatName) REFERENCES Habitat(habitatName) ON DELETE CASCADE
);

GRANT SELECT ON Monitors TO PUBLIC;


CREATE TABLE Facility (
	facilityName CHAR(50) PRIMARY KEY,
	coordinates CHAR(30),
	FOREIGN KEY(coordinates) REFERENCES Area(coordinates)
);

GRANT SELECT ON Facility TO PUBLIC;


CREATE TABLE Manages (
	rangerId INT,
	facilityName CHAR(50),
	PRIMARY KEY(rangerId, facilityName),
	FOREIGN KEY(rangerId) REFERENCES ParkRanger(rangerId) ON DELETE CASCADE,
	FOREIGN KEY(facilityName) REFERENCES Facility(facilityName) ON DELETE CASCADE
);

GRANT SELECT ON Manages TO PUBLIC;




CREATE TABLE Equipment (
	equipmentId INT PRIMARY KEY,
	equipmentType CHAR(50),
	facilityName CHAR(50),
	FOREIGN KEY(facilityName) references Facility(facilityName)
);

GRANT SELECT ON Equipment TO PUBLIC;


CREATE TABLE Visitor (
	passId INT PRIMARY KEY,
	dateVisited DATE,
	rangerId INT NOT NULL,
	FOREIGN KEY(rangerId) references ParkRanger(rangerId)
);

GRANT SELECT ON Visitor TO PUBLIC;




INSERT INTO Family VALUES ('Leporidae', 'Lagomorpha');
INSERT INTO Family VALUES ('Canidae', 'Carnivora');
INSERT INTO Family VALUES ('Strigidae', 'Strigiformes');
INSERT INTO Family VALUES ('Tytonidae', 'Strigiformes');
INSERT INTO Family VALUES ('Ranidae', 'Anura');

INSERT INTO Species VALUES ('European Rabbit', 'Leporidae');
INSERT INTO Species VALUES ('Cottontail Rabbit', 'Leporidae');
INSERT INTO Species VALUES ('British Columbia Wolf', 'Canidae');
INSERT INTO Species VALUES ('Coastal Wolf', 'Canidae');
INSERT INTO Species VALUES ('Red Wolf', 'Canidae');
INSERT INTO Species VALUES ('Great Horned Owl', 'Strigidae');
INSERT INTO Species VALUES ('Barn Owl', 'Tytonidae');
INSERT INTO Species VALUES ('Long-eared owl', 'Strigidae');
INSERT INTO Species VALUES ('Common frog', 'Ranidae');
INSERT INTO Species VALUES ('Wood frog', 'Ranidae');

INSERT INTO Animal VALUES (1, 'good', 2, 'Violet', 'European Rabbit', DATE '2024-07-20');
INSERT INTO Animal VALUES (2, 'unknown', 1, NULL, 'European Rabbit',DATE '2024-07-15');
INSERT INTO Animal VALUES (3, 'poor', 2, 'Tinny', 'Cottontail Rabbit',DATE '2023-01-03');
INSERT INTO Animal VALUES (4, 'good', 4, NULL, 'Cottontail Rabbit',DATE '2024-07-20');
INSERT INTO Animal VALUES (5, 'poor', 9, NULL, 'Cottontail Rabbit',DATE '2024-07-15');

INSERT INTO Animal VALUES (6, 'excellent', 3, 'Kip', 'British Columbia Wolf', DATE '2024-07-15');
INSERT INTO Animal VALUES (7, 'good', 2, NULL, 'Coastal Wolf',DATE '2024-07-20');
INSERT INTO Animal VALUES (8, 'mid', 8, 'Wolfie', 'Red Wolf',DATE  '2024-07-15');
INSERT INTO Animal VALUES (9, 'poor', 12, NULL, 'British Columbia Wolf',DATE  '2024-07-15');
INSERT INTO Animal VALUES (10, 'unknown', 3, NULL, 'British Columbia Wolf', DATE '2024-07-20');

INSERT INTO Animal VALUES (11, 'good', 2, 'Whoo', 'Great Horned Owl', DATE '2024-07-20');
INSERT INTO Animal VALUES (12, 'unknown', 2, NULL, 'Barn Owl',DATE  '2024-07-15');
INSERT INTO Animal VALUES (13, 'poor', 2, NULL, 'Barn Owl', DATE '2023-01-03');
INSERT INTO Animal VALUES (14, 'excellent', 3, NULL, 'Long-eared owl',DATE  '2024-07-20');
INSERT INTO Animal VALUES (15, 'poor', 5, NULL, 'Barn Owl', DATE '2024-07-15');

INSERT INTO Animal VALUES (16, 'poor', 2, 'Rock', 'Common frog', DATE '2024-07-15');
INSERT INTO Animal VALUES (17, 'poor', 2, 'Woody Jr', 'Wood frog', DATE '2024-07-20');
INSERT INTO Animal VALUES (18, 'mid', 1, 'Rick', 'Common frog', DATE '2024-07-15');
INSERT INTO Animal VALUES (19, 'poor', 1, 'Roll', 'Common frog', DATE '024-07-15');
INSERT INTO Animal VALUES (20, 'poor', 3, 'Woody', 'Wood frog', DATE '2024-07-20');

INSERT INTO Rabbit VALUES (1, NULL);
INSERT INTO Rabbit VALUES (2, 'brown speckled');
INSERT INTO Rabbit VALUES (3, 'solid brown');
INSERT INTO Rabbit VALUES (4, 'grey mottled');
INSERT INTO Rabbit VALUES (5, NULL);

INSERT INTO Owl VALUES (11, 'brown speckled');
INSERT INTO Owl VALUES (12, 'white and gray');
INSERT INTO Owl VALUES (13, NULL);
INSERT INTO Owl VALUES (14, 'brown striped');
INSERT INTO Owl VALUES (15, NULL);

INSERT INTO Wolf VALUES (6, 'grey speckled');
INSERT INTO Wolf VALUES (7, 'solid brown');
INSERT INTO Wolf VALUES (8, NULL);
INSERT INTO Wolf VALUES (9, NULL);
INSERT INTO Wolf VALUES (10, 'grey speckled');

INSERT INTO Frog VALUES (16, 'solid brown');
INSERT INTO Frog VALUES (17, NULL);
INSERT INTO Frog VALUES (18, 'spotted brown and green');
INSERT INTO Frog VALUES (19, 'brown speckled');
INSERT INTO Frog VALUES (20, NULL);

INSERT INTO Mom VALUES (5, 4);
INSERT INTO Mom VALUES (4, 3);
INSERT INTO Mom VALUES (1, 2);

INSERT INTO Mom VALUES (8, 6);
INSERT INTO Mom VALUES (8, 10);

INSERT INTO Dad VALUES (15, 13);
INSERT INTO Dad VALUES (15, 12);

INSERT INTO Dad VALUES (20, 17);
INSERT INTO Dad VALUES (16, 18);
INSERT INTO Dad VALUES (16, 19);

INSERT INTO Area(coordinates, areaName) 
VALUES ('49.303969, -123.156437', 'Pebble Beach');
INSERT INTO Area(coordinates, areaName) 
VALUES ('49.312442, -123.143080', 'Northernmost Natures');
INSERT INTO Area(coordinates, areaName) 
VALUES ('49.303974, -123.140523', 'Lakeside');
INSERT INTO Area(coordinates, areaName) 
VALUES ('49.295886, -123.146101', 'A.J.C Memorial Sanctuary');
INSERT INTO Area(coordinates, areaName) 
VALUES ('49.299666, -123.117440', 'Treacherous Tip');

INSERT INTO Habitat VALUES ('Becker Lake', '49.303974, -123.140523');
INSERT INTO Habitat VALUES ('Paddlewheel Pond', '49.312442, -123.143080');
INSERT INTO Habitat VALUES ('Syilx Lake', '49.312442, -123.143080');
INSERT INTO Habitat VALUES ('Arrow Lake', '49.312442, -123.143080');
INSERT INTO Habitat VALUES ('Ellison Pond', '49.312442, -123.143080');

INSERT INTO Habitat VALUES ('Lakeside Forests', '49.303974, -123.140523');
INSERT INTO Habitat VALUES ('Paddlewheel Forests', '49.312442, -123.143080');
INSERT INTO Habitat VALUES ('A.J.C Forests', '49.295886, -123.146101');
INSERT INTO Habitat VALUES ('Seqwel Woods', '49.312442, -123.143080');
INSERT INTO Habitat VALUES ('Based Forests', '49.303969, -123.156437');

INSERT INTO Pond Values ('Paddlewheel Pond', 'poor');
INSERT INTO Pond Values ('Arrow Lake', 'poor');
INSERT INTO Pond Values ('Becker Lake', 'poor');
INSERT INTO Pond Values ('Syilx Lake', 'good');
INSERT INTO Pond Values ('Ellison Pond', 'fair');

INSERT INTO Forest Values('Lakeside Forests', 'good');
INSERT INTO Forest Values('Paddlewheel Forests', 'poor');
INSERT INTO Forest Values('A.J.C Forests', 'excellent');
INSERT INTO Forest Values('Seqwel Woods', 'good');
INSERT INTO Forest Values('Based Forests', 'excellent');



INSERT INTO LivesIn VALUES (1, 'Lakeside Forests');
INSERT INTO LivesIn VALUES (2, 'Lakeside Forests');
INSERT INTO LivesIn VALUES (3, 'Lakeside Forests');
INSERT INTO LivesIn VALUES (4, 'Based Forests');
INSERT INTO LivesIn VALUES (5, 'Based Forests');

INSERT INTO LivesIn VALUES (6, 'Lakeside Forests');
INSERT INTO LivesIn VALUES (7, 'Seqwel Woods');
INSERT INTO LivesIn VALUES (8, 'Seqwel Woods');
INSERT INTO LivesIn VALUES (9, 'A.J.C Forests');
INSERT INTO LivesIn VALUES (10, 'Based Forests');


INSERT INTO LivesIn VALUES (11, 'Paddlewheel Forests');
INSERT INTO LivesIn VALUES (12, 'Paddlewheel Forests');
INSERT INTO LivesIn VALUES (13, 'Paddlewheel Forests');
INSERT INTO LivesIn VALUES (14, 'Based Forests');
INSERT INTO LivesIn VALUES (15, 'Based Forests');


INSERT INTO LivesIn VALUES (16, 'Becker Lake');
INSERT INTO LivesIn VALUES (17, 'Paddlewheel Pond');
INSERT INTO LivesIn VALUES (18, 'Becker Lake');
INSERT INTO LivesIn VALUES (19, 'Arrow Lake');
INSERT INTO LivesIn VALUES (20, 'Arrow Lake');


INSERT INTO Plant 
VALUES (1, 'White Water Lily', '50.311342, -124.143080', 'poor', 'Paddlewheel Pond');
INSERT INTO Plant 
VALUES (2, 'White Water Lily', '48.311342, -122.143080', 'poor', 'Paddlewheel Pond');
INSERT INTO Plant 
VALUES (3, 'White Water Lily', '47.311342, -123.143080', 'good', 'Paddlewheel Pond');
INSERT INTO Plant 
VALUES (4, 'Oak Tree', '50.311342, -123.143080', 'good', 'Paddlewheel Forests');
INSERT INTO Plant 
VALUES (5, 'Maple Tree', '51.311342, -123.143080', 'excellent', 'Paddlewheel Forests');


INSERT INTO ParkRanger(rangerID, rangerName, dateJoined)
VALUES (0001, 'Aiden Kerr',DATE '2020-03-01');
INSERT INTO ParkRanger(rangerID, rangerName, dateJoined)
VALUES (0002, 'Cindy Cui',DATE '2021-07-05');
INSERT INTO ParkRanger(rangerID, rangerName, dateJoined)
VALUES (0003, 'Joel Bonnie',DATE '2021-11-21');
INSERT INTO ParkRanger(rangerID, rangerName, dateJoined)
VALUES (0004, 'Seva Lynov',DATE '2020-01-03');
INSERT INTO ParkRanger(rangerID, rangerName, dateJoined)
VALUES (0005, 'Jessica Bator',DATE '2022-04-07');

INSERT INTO PlantedBy(plantId, rangerId, datePlanted)
VALUES(1, 0005,DATE '2022-04-08');
INSERT INTO PlantedBy(plantId, rangerId, datePlanted)
VALUES(2, 0005,DATE '2022-04-09');
INSERT INTO PlantedBy(plantId, rangerId, datePlanted)
VALUES(3, 0001,DATE '2021-05-05');
INSERT INTO PlantedBy(plantId, rangerId, datePlanted)
VALUES(4, 0002,DATE '2022-09-10');
INSERT INTO PlantedBy(plantId, rangerId, datePlanted)
VALUES(5, 0003,DATE '2022-04-10');

INSERT INTO Monitors(habitatName, rangerId)
VALUES('Becker Lake', 0003);
INSERT INTO Monitors(habitatName, rangerId)
VALUES('Paddlewheel Pond', 0001);
INSERT INTO Monitors(habitatName, rangerId)
VALUES('Syilx Lake', 0002);
INSERT INTO Monitors(habitatName, rangerId)
VALUES('Arrow Lake', 0005);
INSERT INTO Monitors(habitatName, rangerId)
VALUES('Ellison Pond', 0001);

INSERT INTO Monitors(habitatName, rangerId)
VALUES('Lakeside Forests', 0004);
INSERT INTO Monitors(habitatName, rangerId)
VALUES('Paddlewheel Forests', 0002);
INSERT INTO Monitors(habitatName, rangerId)
VALUES('A.J.C Forests', 0005);
INSERT INTO Monitors(habitatName, rangerId)
VALUES('Seqwel Woods', 0003);
INSERT INTO Monitors(habitatName, rangerId)
VALUES('Based Forests', 0001);

INSERT INTO Facility(facilityName, coordinates)
VALUES ('A.J.C Memorial Outhouse', '49.295886, -123.146101');
INSERT INTO Facility(facilityName, coordinates)
VALUES ('A.J.C Memorial Storage Center', '49.295886, -123.146101');
INSERT INTO Facility(facilityName, coordinates)
VALUES ('Lakeside Water Maintenance Center', '49.303974, -123.140523');
INSERT INTO Facility(facilityName, coordinates)
VALUES ('Pebble Beach Hotdog and Snorkle Stand', '49.303969, -123.156437');
INSERT INTO Facility(facilityName, coordinates)
VALUES ('Treacherous Mountain Equipment Center', '49.299666, -123.117440');

INSERT INTO Manages VALUES (2, 'A.J.C Memorial Outhouse');
INSERT INTO Manages VALUES (1,'A.J.C Memorial Storage Center');
INSERT INTO Manages VALUES (3,'Lakeside Water Maintenance Center');
INSERT INTO Manages VALUES (4, 'Pebble Beach Hotdog and Snorkle Stand');
INSERT INTO Manages VALUES (5, 'Treacherous Mountain Equipment Center');

INSERT INTO Equipment(equipmentId, equipmentType, facilityName)
VALUES (00001, 'Snorkle', 'Pebble Beach Hotdog and Snorkle Stand');
INSERT INTO Equipment(equipmentId, equipmentType, facilityName)
VALUES (00002, 'Rope', 'Treacherous Mountain Equipment Center');
INSERT INTO Equipment(equipmentId, equipmentType, facilityName)
VALUES (000023, 'Water Treatment Kit', 'Lakeside Water Maintenance Center');
INSERT INTO Equipment(equipmentId, equipmentType, facilityName)
VALUES (00022, 'Grill', 'Pebble Beach Hotdog and Snorkle Stand');
INSERT INTO Equipment(equipmentId, equipmentType, facilityName)
VALUES (00033, 'Ranger Uniforms', 'A.J.C Memorial Storage Center');

INSERT INTO Visitor(passId, dateVisited, rangerId)
VALUES (00001,DATE '2023-04-01', 0005);
INSERT INTO Visitor(passId, dateVisited, rangerId)
VALUES (00002,DATE '2023-04-01', 0004);
INSERT INTO Visitor(passId, dateVisited, rangerId)
VALUES (00003,DATE '2023-04-01', 0001);
INSERT INTO Visitor(passId, dateVisited, rangerId)
VALUES (00004,DATE '2023-10-21', 0002);
INSERT INTO Visitor(passId, dateVisited, rangerId)
VALUES (00005,DATE '2023-11-12', 0003);
INSERT INTO Visitor(passId, dateVisited, rangerId)
VALUES (00006,DATE '2024-04-07', 0004);

COMMIT;