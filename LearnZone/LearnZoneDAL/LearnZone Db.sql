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




INSERT INTO Courses (title, description, instructor_id, status, created_at)
VALUES 
('Introduction to C#', 'Learn the basics of C# programming.', 1, 'active', GETDATE()),
('Advanced SQL', 'Deep dive into SQL queries and optimization.', 2, 'active', GETDATE());


INSERT INTO Enrollments (user_id, course_id, enrolled_at, progress)
VALUES 
(2, 1, GETDATE(), 0),   -- John Doe enrolled in Introduction to C#
(3, 2, GETDATE(), 0);   -- Jane Smith enrolled in Advanced SQL


INSERT INTO Feedback (user_id, course_id, rating, comment, created_at)
VALUES 
(2, 1, 5, 'Great introduction to C#!', GETDATE()),
(3, 2, 4, 'Very informative and well structured.', GETDATE());



INSERT INTO Courses (title, description, instructor_id, status, created_at) VALUES
('Introduction to C#', 'Learn the basics of C# programming.', 1, 'active', GETDATE()),
('Advanced SQL', 'Deep dive into SQL queries and optimization.', 2, 'active', GETDATE()),
('Web Development Basics', 'HTML, CSS, and JavaScript fundamentals.', 3, 'active', GETDATE()),
('Python for Data Science', 'Python essentials for data analysis.', 1, 'active', GETDATE()),
('Machine Learning 101', 'Introduction to machine learning concepts.', 2, 'active', GETDATE()),
('Database Design', 'Principles of relational database design.', 3, 'active', GETDATE()),
('Angular Fundamentals', 'Build dynamic web apps with Angular.', 1, 'active', GETDATE()),
('ASP.NET Core', 'Develop web APIs with ASP.NET Core.', 2, 'active', GETDATE()),
('Java Programming', 'Object-oriented programming with Java.', 3, 'active', GETDATE()),
('Cloud Computing', 'Basics of cloud platforms and services.', 1, 'active', GETDATE()),
('Cybersecurity Essentials', 'Protect systems and data from threats.', 2, 'active', GETDATE()),
('Mobile App Development', 'Create apps for Android and iOS.', 3, 'active', GETDATE()),
('DevOps Practices', 'CI/CD and automation for developers.', 1, 'active', GETDATE()),
('ReactJS Crash Course', 'Quick start to ReactJS development.', 2, 'active', GETDATE()),
('Project Management', 'Agile and Scrum methodologies.', 3, 'active', GETDATE());



INSERT INTO Chapters (course_id, title, content, [order]) VALUES
(1, 'Getting Started with C#', 'Introduction to C# and .NET framework.', 1),
(1, 'Variables and Data Types', 'Understanding variables and data types in C#.', 2),
(1, 'Control Structures', 'If statements, loops, and switch cases.', 3),
(2, 'SQL Basics', 'Introduction to SQL syntax and commands.', 1),
(2, 'Joins and Subqueries', 'Combining data from multiple tables.', 2),
(2, 'Indexing and Optimization', 'Improving query performance.', 3),
(3, 'HTML Fundamentals', 'Structure of web pages with HTML.', 1),
(3, 'CSS Styling', 'Applying styles to HTML elements.', 2),
(3, 'JavaScript Basics', 'Adding interactivity with JavaScript.', 3);




    INSERT INTO Quizzes (course_id, title) VALUES
    (1, 'C# Basics Quiz'),
    (2, 'SQL Fundamentals Quiz'),
    (3, 'Web Development Quiz');

    INSERT INTO Questions (quiz_id, question, options, correct_ans) VALUES
    (1, 'What is the correct way to declare a variable in C#?', 'int x = 10;|x int = 10;|var x = 10;', 'int x = 10;'),
    (1, 'Which of the following is a valid C# data type?', 'string|text|number', 'string'),
    (2, 'What does SQL stand for?', 'Structured Query Language|Simple Query Language|Standard Query Language', 'Structured Query Language'),
    (2, 'Which SQL command is used to retrieve data?', 'SELECT|GET|FETCH', 'SELECT'),
    (3, 'What does HTML stand for?', 'HyperText Markup Language|HighText Markup Language|HyperText Marking Language', 'HyperText Markup Language'),
    (3, 'Which tag is used to create a hyperlink in HTML?', '<link>|<a>|<href>', '<a>');

    INSERT INTO Submissions (user_id, quiz_id, score, submitted_at) VALUES
    (2, 1, 85, GETDATE()),  -- John Doe's submission for C# Basics Quiz
    (3, 2, 90, GETDATE()),  -- Jane Smith's submission for SQL Fundamentals Quiz
    (2, 3, 75, GETDATE());  -- John Doe's submission for Web Development Quiz



    -- Sample data for Feedback
    INSERT INTO Feedback (user_id, course_id, rating, comment, created_at) VALUES
    (2, 1, 5, 'Great introduction to C#!', GETDATE()),
    (3, 2, 4, 'Very informative and well structured.', GETDATE()),
    (2, 3, 3, 'Good overview of web development basics.', GETDATE()),
    (3, 4, 5, 'Loved the Python for Data Science course!', GETDATE()),
    (2, 5, 4, 'Machine Learning concepts explained well.', GETDATE());

        
INSERT INTO Enrollments (user_id, course_id, enrolled_at, progress) VALUES
(2, 1, GETDATE(), 0),
(3, 2, GETDATE(), 0),
(1, 3, GETDATE(), 0),
(2, 4, GETDATE(), 0),
(3, 5, GETDATE(), 0),
(1, 6, GETDATE(), 0),
(2, 7, GETDATE(), 0),
(3, 8, GETDATE(), 0),
(1, 9, GETDATE(), 0),
(2, 10, GETDATE(), 0),
(3, 11, GETDATE(), 0),
(1, 12, GETDATE(), 0),
(2, 13, GETDATE(), 0),
(3, 14, GETDATE(), 0),
(1, 15, GETDATE(), 0);


INSERT INTO Feedback (user_id, course_id, rating, comment, created_at) VALUES
(2, 1, 5, 'Great introduction to C#!', GETDATE()),
(3, 2, 4, 'Very informative and well structured.', GETDATE()),
(1, 3, 5, 'Loved the web basics course!', GETDATE()),
(2, 4, 4, 'Python course was helpful.', GETDATE()),
(3, 5, 5, 'Machine learning explained well.', GETDATE()),
(1, 6, 4, 'Database design was clear.', GETDATE()),
(2, 7, 5, 'Angular course was excellent.', GETDATE()),
(3, 8, 4, 'ASP.NET Core was practical.', GETDATE()),
(1, 9, 5, 'Java programming was fun.', GETDATE()),
(2, 10, 4, 'Cloud computing basics covered.', GETDATE()),
(3, 11, 5, 'Cybersecurity essentials were useful.', GETDATE()),
(1, 12, 4, 'Mobile app dev was hands-on.', GETDATE()),
(2, 13, 5, 'DevOps practices were insightful.', GETDATE()),
(3, 14, 4, 'ReactJS crash course was fast-paced.', GETDATE()),
(1, 15, 5, 'Project management course was great.', GETDATE());


-- Sample data for Chapters
INSERT INTO Chapters (course_id, title, content, [order]) VALUES
(1, 'Getting Started with C#', 'Introduction to C# and .NET framework.', 1),
(1, 'Variables and Data Types', 'Understanding variables and data types in C#.', 2),
(1, 'Control Structures', 'If statements, loops, and switch cases.', 3),
(2, 'SQL Basics', 'Introduction to SQL syntax and commands.', 1),
(2, 'Joins and Subqueries', 'Combining data from multiple tables.', 2),
(2, 'Indexing and Optimization', 'Improving query performance.', 3),
(3, 'HTML Fundamentals', 'Structure of web pages with HTML.', 1),
(3, 'CSS Styling', 'Applying styles to HTML elements.', 2),
(3, 'JavaScript Basics', 'Adding interactivity with JavaScript.', 3);

-- Sample data for Quizzes
INSERT INTO Quizzes (course_id, title) VALUES
(1, 'C# Basics Quiz'),
(2, 'SQL Fundamentals Quiz'),
(3, 'Web Development Quiz');

-- Sample data for Questions
INSERT INTO Questions (quiz_id, question, options, correct_ans) VALUES
(1, 'What is the correct way to declare a variable in C#?', 'int x = 10;|x int = 10;|var x = 10;', 'int x = 10;'),
(1, 'Which of the following is a valid C# data type?', 'string|text|number', 'string'),
(2, 'What does SQL stand for?', 'Structured Query Language|Simple Query Language|Standard Query Language', 'Structured Query Language'),
(2, 'Which SQL command is used to retrieve data?', 'SELECT|GET|FETCH', 'SELECT'),
(3, 'What does HTML stand for?', 'HyperText Markup Language|HighText Markup Language|HyperText Marking Language', 'HyperText Markup Language'),
(3, 'Which tag is used to create a hyperlink in HTML?', '<link>|<a>|<href>', '<a>');
-- Sample data for Submissions
INSERT INTO Submissions (user_id, quiz_id, score, submitted_at) VALUES
(2, 1, 85, GETDATE()),  -- John Doe's submission for C# Basics Quiz
(3, 2, 90, GETDATE()),  -- Jane Smith's submission for SQL Fundamentals Quiz
(2, 3, 75, GETDATE());  -- John Doe's submission for Web Development Quiz
-- Sample data for Feedback
INSERT INTO Feedback (user_id, course_id, rating, comment, created_at) VALUES
(2, 1, 5, 'Great introduction to C#!', GETDATE()),
(3, 2, 4, 'Very informative and well structured.', GETDATE()),
(2, 3, 3, 'Good overview of web development basics.', GETDATE()),
(3, 4, 5, 'Loved the Python for Data Science course!', GETDATE()),
(2, 5, 4, 'Machine Learning concepts explained well.', GETDATE());
-- Sample data for Enrollments
INSERT INTO Enrollments (user_id, course_id, enrolled_at, progress) VALUES
(2, 1, GETDATE(), 0),
(3, 2, GETDATE(), 0),
(1, 3, GETDATE(), 0),
(2, 4, GETDATE(), 0),
(3, 5, GETDATE(), 0),
(1, 6, GETDATE(), 0),
(2, 7, GETDATE(), 0),
(3, 8, GETDATE(), 0),
(1, 9, GETDATE(), 0),
(2, 10, GETDATE(), 0),
(3, 11, GETDATE(), 0),
(1, 12, GETDATE(), 0),
(2, 13, GETDATE(), 0),
(3, 14, GETDATE(), 0),
(1, 15, GETDATE(), 0);
-- Sample data for Feedback
INSERT INTO Feedback (user_id, course_id, rating, comment, created_at) VALUES
(2, 1, 5, 'Great introduction to C#!', GETDATE()),
(3, 2, 4, 'Very informative and well structured.', GETDATE()),
(1, 3, 5, 'Loved the web basics course!', GETDATE()),
(2, 4, 4, 'Python course was helpful.', GETDATE()),
(3, 5, 5, 'Machine learning explained well.', GETDATE()),
(1, 6, 4, 'Database design was clear.', GETDATE()),
(2, 7, 5, 'Angular course was excellent.', GETDATE()),
(3, 8, 4, 'ASP.NET Core was practical.', GETDATE()),
(1, 9, 5, 'Java programming was fun.', GETDATE()),
(2, 10, 4, 'Cloud computing basics covered.', GETDATE()),
(3, 11, 5, 'Cybersecurity essentials were useful.', GETDATE()),
(1, 12, 4, 'Mobile app dev was hands-on.', GETDATE()),
(2, 13, 5, 'DevOps practices were insightful.', GETDATE()),
(3, 14, 4, 'ReactJS crash course was fast-paced.', GETDATE()),
(1, 15, 5, 'Project management course was great.', GETDATE());
-- Sample data for Enrollments
INSERT INTO Enrollments (user_id, course_id, enrolled_at, progress) VALUES
(2, 1, GETDATE(), 0),
(3, 2, GETDATE(), 0),
(1, 3, GETDATE(), 0),
(2, 4, GETDATE(), 0),
(3, 5, GETDATE(), 0),
(1, 6, GETDATE(), 0),
(2, 7, GETDATE(), 0),
(3, 8, GETDATE(), 0),
(1, 9, GETDATE(), 0),
(2, 10, GETDATE(), 0),
(3, 11, GETDATE(), 0),
(1, 12, GETDATE(), 0),
(2, 13, GETDATE(), 0),
(3, 14, GETDATE(), 0),
(1, 15, GETDATE(), 0);
-- Sample data for Feedback
INSERT INTO Feedback (user_id, course_id, rating, comment, created_at) VALUES
(2, 1, 5, 'Great introduction to C#!', GETDATE()),
(3, 2, 4, 'Very informative and well structured.', GETDATE()),
(1, 3, 5, 'Loved the web basics course!', GETDATE()),
(2, 4, 4, 'Python course was helpful.', GETDATE()),
(3, 5, 5, 'Machine learning explained well.', GETDATE()),
(1, 6, 4, 'Database design was clear.', GETDATE()),
(2, 7, 5, 'Angular course was excellent.', GETDATE()),
(3, 8, 4, 'ASP.NET Core was practical.', GETDATE()),
(1, 9, 5, 'Java programming was fun.', GETDATE()),
(2, 10, 4, 'Cloud computing basics covered.', GETDATE()),
(3, 11, 5, 'Cybersecurity essentials were useful.', GETDATE()),
(1, 12, 4, 'Mobile app dev was hands-on.', GETDATE()),
(2, 13, 5, 'DevOps practices were insightful.', GETDATE()),
(3, 14, 4, 'ReactJS crash course was fast-paced.', GETDATE()),
(1, 15, 5, 'Project management course was great.', GETDATE());
-- Sample data for Enrollments
INSERT INTO Enrollments (user_id, course_id, enrolled_at, progress) VALUES
(2, 1, GETDATE(), 0),
(3, 2, GETDATE(), 0),
(1, 3, GETDATE(), 0),
(2, 4, GETDATE(), 0),
(3, 5, GETDATE(), 0),
(1, 6, GETDATE(), 0),
(2, 7, GETDATE(), 0),
(3, 8, GETDATE(), 0),
(1, 9, GETDATE(), 0),
(2, 10, GETDATE(), 0),
(3, 11, GETDATE(), 0),
(1, 12, GETDATE(), 0),
(2, 13, GETDATE(), 0),
(3, 14, GETDATE(), 0),
(1, 15, GETDATE(), 0);
-- Sample data for Feedback
INSERT INTO Feedback (user_id, course_id, rating, comment, created_at) VALUES
(2, 1, 5, 'Great introduction to C#!', GETDATE()),
(3, 2, 4, 'Very informative and well structured.', GETDATE()),
(1, 3, 5, 'Loved the web basics course!', GETDATE()),
(2, 4, 4, 'Python course was helpful.', GETDATE()),
(3, 5, 5, 'Machine learning explained well.', GETDATE()),
(1, 6, 4, 'Database design was clear.', GETDATE()),
(2, 7, 5, 'Angular course was excellent.', GETDATE()),
(3, 8, 4, 'ASP.NET Core was practical.', GETDATE()),
(1, 9, 5, 'Java programming was fun.', GETDATE()),
(2, 10, 4, 'Cloud computing basics covered.', GETDATE()),
(3, 11, 5, 'Cybersecurity essentials were useful.', GETDATE()),
(1, 12, 4, 'Mobile app dev was hands-on.', GETDATE()),
(2, 13, 5, 'DevOps practices were insightful.', GETDATE()),
(3, 14, 4, 'ReactJS crash course was fast-paced.', GETDATE()),
(1, 15, 5, 'Project management course was great.', GETDATE());



-- Sample data for Enrollments

INSERT INTO Enrollments (user_id, course_id, enrolled_at, progress) VALUES
(2, 1, GETDATE(), 0),
(3, 2, GETDATE(), 0),
(1, 3, GETDATE(), 0),
(2, 4, GETDATE(), 0),
(3, 5, GETDATE(), 0),
(1, 6, GETDATE(), 0),
(2, 7, GETDATE(), 0),
(3, 8, GETDATE(), 0),
(1, 9, GETDATE(), 0),
(2, 10, GETDATE(), 0),
(3, 11, GETDATE(), 0),
(1, 12, GETDATE(), 0),
(2, 13, GETDATE(), 0),
(3, 14, GETDATE(), 0),
(1, 15, GETDATE(), 0);



-- Sample data for Feedback
INSERT INTO Feedback (user_id, course_id, rating, comment, created_at) VALUES
(2, 1, 5, 'Great introduction to C#!', GETDATE()),
(3, 2, 4, 'Very informative and well structured.', GETDATE()),
(1, 3, 5, 'Loved the web basics course!', GETDATE()),
(2, 4, 4, 'Python course was helpful.', GETDATE()),
(3, 5, 5, 'Machine learning explained well.', GETDATE()),
(1, 6, 4, 'Database design was clear.', GETDATE()),
(2, 7, 5, 'Angular course was excellent.', GETDATE()),
(3, 8, 4, 'ASP.NET Core was practical.', GETDATE()),
(1, 9, 5, 'Java programming was fun.', GETDATE()),
(2, 10, 4, 'Cloud computing basics covered.', GETDATE()),
(3, 11, 5, 'Cybersecurity essentials were useful.', GETDATE()),
(1, 12, 4, 'Mobile app dev was hands-on.', GETDATE()),
(2, 13, 5, 'DevOps practices were insightful.', GETDATE()),
(3, 14, 4, 'ReactJS crash course was fast-paced.', GETDATE()),
(1, 15, 5, 'Project management course was great.', GETDATE());

-- Sample data for Enrollments
INSERT INTO Enrollments (user_id, course_id, enrolled_at, progress) VALUES
(2, 1, GETDATE(), 0),
(3, 2, GETDATE(), 0),
(1, 3, GETDATE(), 0),
(2, 4, GETDATE(), 0),
(3, 5, GETDATE(), 0),
(1, 6, GETDATE(), 0),
(2, 7, GETDATE(), 0),
(3, 8, GETDATE(), 0),
(1, 9, GETDATE(), 0),
(2, 10, GETDATE(), 0),
(3, 11, GETDATE(), 0),
(1, 12, GETDATE(), 0),
(2, 13, GETDATE(), 0),
(3, 14, GETDATE(), 0),
(1, 15, GETDATE(), 0);

-- Sample data for Feedback
INSERT INTO Feedback (user_id, course_id, rating, comment, created_at) VALUES
(2, 1, 5, 'Great introduction to C#!', GETDATE()),
(3, 2, 4, 'Very informative and well structured.', GETDATE()),
(1, 3, 5, 'Loved the web basics course!', GETDATE()),
(2, 4, 4, 'Python course was helpful.', GETDATE()),
(3, 5, 5, 'Machine learning explained well.', GETDATE()),
(1, 6, 4, 'Database design was clear.', GETDATE()),
(2, 7, 5, 'Angular course was excellent.', GETDATE()),
(3, 8, 4, 'ASP.NET Core was practical.', GETDATE()),
(1, 9, 5, 'Java programming was fun.', GETDATE()),
(2, 10, 4, 'Cloud computing basics covered.', GETDATE()),
(3, 11, 5, 'Cybersecurity essentials were useful.', GETDATE()),
(1, 12, 4, 'Mobile app dev was hands-on.', GETDATE()),
(2, 13, 5, 'DevOps practices were insightful.', GETDATE()),
(3, 14, 4, 'ReactJS crash course was fast-paced.', GETDATE()),
(1, 15, 5, 'Project management course was great.', GETDATE());


-- Sample data for Enrollments
INSERT INTO Enrollments (user_id, course_id, enrolled_at, progress) VALUES
(2, 1, GETDATE(), 0),
(3, 2, GETDATE(), 0),
(1, 3, GETDATE(), 0),
(2, 4, GETDATE(), 0),
(3, 5, GETDATE(), 0),
(1, 6, GETDATE(), 0),
(2, 7, GETDATE(), 0),
(3, 8, GETDATE(), 0),
(1, 9, GETDATE(), 0),
(2, 10, GETDATE(), 0),
(3, 11, GETDATE(), 0),
(1, 12, GETDATE(), 0),
(2, 13, GETDATE(), 0),
(3, 14, GETDATE(), 0),
(1, 15, GETDATE(), 0);
