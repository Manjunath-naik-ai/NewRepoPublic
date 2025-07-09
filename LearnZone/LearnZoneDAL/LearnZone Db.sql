Drop Database LearnZone;

-- 1. Create Database if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'LearnZone')
BEGIN
    CREATE DATABASE LearnZone;
END
GO

-- Use the elearning database
USE LearnZone;
GO

-- Drop existing tables if they exist
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Users') AND type in (N'U'))
DROP TABLE Users;

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Courses') AND type in (N'U'))
DROP TABLE Courses;

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Chapters') AND type in (N'U'))
DROP TABLE Chapters;

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Enrollments') AND type in (N'U'))
DROP TABLE Enrollments;

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Quizzes') AND type in (N'U'))
DROP TABLE Quizzes;

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Questions') AND type in (N'U'))
DROP TABLE Questions;

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Submissions') AND type in (N'U'))
DROP TABLE Submissions;

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'Feedback') AND type in (N'U'))
DROP TABLE Feedback;

GO

-- 2. Users Table
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL, -- Changed ENUM to VARCHAR
    created_at DATETIME DEFAULT GETDATE()
);

-- 3. Courses Table
CREATE TABLE Courses (
    course_id INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    instructor_id INT,
    status VARCHAR(20) DEFAULT 'pending', -- Changed ENUM to VARCHAR
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (instructor_id) REFERENCES Users(user_id)
);

-- 4. Chapters 
CREATE TABLE Chapters (
    chapter_id INT IDENTITY(1,1) PRIMARY KEY,
    course_id INT,
    title VARCHAR(200),
    content TEXT,
    [order] INT,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

-- 5. Enrollments Table
CREATE TABLE Enrollments (
    enrollment_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT,
    course_id INT,
    enrolled_at DATETIME DEFAULT GETDATE(),
    progress FLOAT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

-- 6. Quizzes Table
CREATE TABLE Quizzes (
    quiz_id INT IDENTITY(1,1) PRIMARY KEY,
    course_id INT,
    title VARCHAR(200),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

-- 7. Questions Table
CREATE TABLE Questions (
    question_id INT IDENTITY(1,1) PRIMARY KEY,
    quiz_id INT,
    question TEXT,
    options TEXT, -- Options can be stored as a comma-separated string or JSON
    correct_ans VARCHAR(100),
    FOREIGN KEY (quiz_id) REFERENCES Quizzes(quiz_id)
);

-- 8. Submissions Table
CREATE TABLE Submissions (
    submission_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT,
    quiz_id INT,
    score FLOAT,
    submitted_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (quiz_id) REFERENCES Quizzes(quiz_id)
);

-- 9. Feedback Table
CREATE TABLE Feedback (
    feedback_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT,
    course_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5), -- SQL Server supports CHECK constraint
    comment TEXT,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

Go
--Login Stored Procedure


CREATE PROCEDURE sp_LoginUserByRole
    @Email VARCHAR(100),
    @PasswordHash VARCHAR(255),
    @LoginResult INT OUTPUT  -- Output parameter to return status
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Role VARCHAR(20);

    -- Try to find the user and get the role
    SELECT TOP 1 @Role = role
    FROM Users
    WHERE email = @Email AND password_hash = @PasswordHash;

    IF @Role IS NOT NULL
    BEGIN
        -- Return full user details (optional)
        SELECT user_id, name, email, role, created_at
        FROM Users
        WHERE email = @Email;

        -- Set the output based on role
        IF @Role = 'Admin'
            SET @LoginResult = 1;
        ELSE
            SET @LoginResult = 2;
    END
    ELSE
    BEGIN
        SET @LoginResult = -1;  -- Invalid credentials
    END
END


--Insertion Script
INSERT INTO Users (name, email, password_hash, role, created_at)
VALUES 
('Admin User', 'admin@example.com', 'hashed_admin_password_123', 'Admin', GETDATE()),
('John Doe', 'john.doe@example.com', 'hashed_john_password_456', 'User', GETDATE()),
('Jane Smith', 'jane.smith@example.com', 'hashed_jane_password_789', 'User', GETDATE());

--check login is working

DECLARE @LoginStatus INT;

EXEC sp_LoginUserByRole 
    @Email = 'admin@example.com', 
    @PasswordHash = 'hashed_admin_password_123', 
    @LoginResult = @LoginStatus OUTPUT;

SELECT @LoginStatus AS LoginResult;

GO
-------------------------------------
--register Stored procedure
-- Make sure you're in the correct database
USE LearnZone;
GO

-- Drop the procedure if it exists
IF OBJECT_ID('sp_RegisterUser', 'P') IS NOT NULL
    DROP PROCEDURE sp_RegisterUser;
GO




CREATE PROCEDURE sp_RegisterUser
    @Name VARCHAR(100),
    @Email VARCHAR(100),
    @PasswordHash VARCHAR(255),
    @UserId INT OUTPUT,         -- Returns the new user's ID or -1 if email exists
    @Result INT OUTPUT          -- 1 = Success, -1 = Email Exists, 0 = Error
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if email already exists
    IF EXISTS (SELECT 1 FROM Users WHERE email = @Email)
    BEGIN
        SET @UserId = -1;
        SET @Result = -1; -- Email already exists
        RETURN;
    END

    -- Insert new user with default role 'User'
    INSERT INTO Users (name, email, password_hash, role, created_at)
    VALUES (@Name, @Email, @PasswordHash, 'User', GETDATE());

    -- Return the new user's ID
    SET @UserId = SCOPE_IDENTITY();
    SET @Result = 1; -- Success
END


  DECLARE @NewUserId INT;
DECLARE @Result INT;

EXEC sp_RegisterUser
    @Name = 'Alice Example',
    @Email = 'alice@example.com',
    @PasswordHash = 'hashed_password_here',
    @UserId = @NewUserId OUTPUT,
    @Result = @Result OUTPUT;

SELECT @NewUserId AS UserId, @Result AS Result;
