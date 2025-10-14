CREATE TABLE [users] (
  [id] BIGINT PRIMARY KEY IDENTITY(1, 1),
  [first_name] VARCHAR(50) NOT NULL,
  [last_name] VARCHAR(50) NOT NULL,
  [email] VARCHAR(100) UNIQUE NOT NULL,
  [username] VARCHAR(100) UNIQUE NOT NULL,
  [password_hash] VARCHAR(255) NOT NULL,
  [birth_date] DATE,
  [create_at] TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP',
  [update_at] TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP'
)
GO

CREATE TABLE [blog_posts] (
  [id] BIGINT PRIMARY KEY IDENTITY(1, 1),
  [title] VARCHAR(255) NOT NULL,
  [content] TEXT NOT NULL,
  [user_id] BIGINT,
  [created_at] TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP',
  [updated_at] TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP'
)
GO

CREATE TABLE [comments] (
  [id] BIGINT PRIMARY KEY IDENTITY(1, 1),
  [content] TEXT NOT NULL,
  [user_id] BIGINT,
  [blog_post_id] BIGINT,
  [created_at] TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP',
  [updated_at] TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP'
)
GO

CREATE TABLE [blog_post_tags] (
  [id] BIGINT PRIMARY KEY IDENTITY(1, 1),
  [blog_post_id] BIGINT,
  [tag_id] BIGINT,
  [created_at] TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP',
  [updated_at] TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP'
)
GO

CREATE TABLE [tags] (
  [id] BIGINT PRIMARY KEY IDENTITY(1, 1),
  [tag_name] VARCHAR(150) UNIQUE NOT NULL,
  [observation] VARCHAR(150),
  [created_at] TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP',
  [updated_at] TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP'
)
GO

ALTER TABLE [blog_posts] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [comments] ADD FOREIGN KEY ([user_id]) REFERENCES [users] ([id])
GO

ALTER TABLE [comments] ADD FOREIGN KEY ([blog_post_id]) REFERENCES [blog_posts] ([id])
GO

ALTER TABLE [blog_post_tags] ADD FOREIGN KEY ([blog_post_id]) REFERENCES [blog_posts] ([id])
GO

ALTER TABLE [blog_post_tags] ADD FOREIGN KEY ([tag_id]) REFERENCES [tags] ([id])
GO
