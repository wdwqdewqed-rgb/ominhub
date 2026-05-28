/*
#region categories

CREATE TABLE categories (
  Id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  Name VARCHAR(120) NOT NULL,
  Slug VARCHAR(140) NOT NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY uq_cat_slug (Slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#region creator_collaborators

CREATE TABLE creator_collaborators (
    Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    CreatorId BIGINT UNSIGNED NOT NULL,
    Type ENUM('manual','user_request') NOT NULL DEFAULT 'manual',
    Name VARCHAR(200) NULL,
    Document VARCHAR(200) NULL,
    Role ENUM('performer','partner','guest','producer') NOT NULL,
    ConsentFileUrl VARCHAR(500) NULL,
    LinkedUserId BIGINT UNSIGNED NULL,
    RequestState ENUM('pending','approved','rejected','cancelled') NOT NULL DEFAULT 'pending',
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ApprovedAt DATETIME NULL,
    RejectedAt DATETIME NULL,
    FOREIGN KEY (CreatorId) REFERENCES usuarios(Id) ON DELETE CASCADE,
    FOREIGN KEY (LinkedUserId) REFERENCES usuarios(Id) ON DELETE SET NULL
);

#region jwt_blacklist

CREATE TABLE jwt_blacklist (
  Id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  Jti VARCHAR(200) NOT NULL,
  RevokedAt DATETIME NOT NULL,
  ExpiresAt DATETIME NOT NULL,
  PRIMARY KEY (Id),
  INDEX idx_jti (Jti)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


#region tags

CREATE TABLE tags (
  Id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  Name VARCHAR(100) NOT NULL,
  Slug VARCHAR(120) NOT NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY uq_tag_slug (Slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#region user_refresh_tokens

CREATE TABLE user_refresh_tokens (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  UserId BIGINT UNSIGNED NOT NULL,
  TokenSha256 CHAR(64) NOT NULL,
  TokenBcrypt VARCHAR(255) NOT NULL,
  DeviceId VARCHAR(200) NULL,
  UserAgent VARCHAR(500) NULL,
  CreatedAt DATETIME NOT NULL,
  ExpiresAt DATETIME NOT NULL,
  RevokedAt DATETIME NULL,
  ReplacedByTokenSha256 CHAR(64) NULL,
  PRIMARY KEY (Id),
  INDEX idx_user (UserId),
  INDEX idx_token (TokenSha256),
  CONSTRAINT fk_reftoken_user FOREIGN KEY (UserId) REFERENCES usuarios(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


#region identity_verification_documents

CREATE TABLE identity_verification_documents (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  RequestId BIGINT UNSIGNED NOT NULL,
  Type ENUM('front','back','selfie') NOT NULL,
  Url VARCHAR(255) NOT NULL,
  CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Id),
  INDEX idx_req (RequestId),
  CONSTRAINT fk_uvdocs_req FOREIGN KEY (RequestId) REFERENCES user_verification_requests(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


#region user_verification_requests

CREATE TABLE user_verification_requests (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  UserId BIGINT UNSIGNED NOT NULL,
  DocumentType VARCHAR(50) NULL,
  DocumentNumber VARCHAR(100) NULL,
  RoleRequest VARCHAR(50) NOT NULL,
  State ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  RequestNotes TEXT NULL,
  CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ReviewedAt DATETIME NULL,
  ReviewedBy BIGINT UNSIGNED NULL,
  IPAddress VARCHAR(45) NULL,
  AttemptNumber INT NULL DEFAULT 1,
  PRIMARY KEY (Id),
  INDEX idx_user (UserId),
  INDEX idx_role_state (RoleRequest, State),
  CONSTRAINT fk_uvreq_user FOREIGN KEY (UserId) REFERENCES usuarios(Id) ON DELETE CASCADE,
  CONSTRAINT fk_uvreq_reviewer FOREIGN KEY (ReviewedBy) REFERENCES usuarios(Id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


#region usuarios

CREATE TABLE usuarios (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  Username VARCHAR(100) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  PasswordHash VARCHAR(512) NOT NULL,
  Role VARCHAR(50) NOT NULL,
  TokenVersion INT NOT NULL DEFAULT 0,
  CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt DATETIME NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY uq_username (Username),
  UNIQUE KEY uq_email (Email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


#region videos

CREATE TABLE videos (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  UploaderId BIGINT UNSIGNED NOT NULL,
  Title VARCHAR(255) NOT NULL,
  Description TEXT NULL,
  CategoryId INT NULL,
  IsSensitive TINYINT(1) NOT NULL DEFAULT 0,
  Visibility ENUM('public','unlisted','private') NOT NULL DEFAULT 'public',
  Status ENUM('draft','pending','approved','rejected','removed') NOT NULL DEFAULT 'draft',
  ProcessingStatus ENUM('uploaded','transcoding','ready','failed') NOT NULL DEFAULT 'uploaded',
  OriginalFilePath VARCHAR(1024) NULL,
  HlsPath VARCHAR(1024) NULL,
  DurationSeconds INT NULL,
  Width INT NULL,
  Height INT NULL,
  MimeType VARCHAR(100) NULL,
  SizeBytes BIGINT NULL,
  AllowComments TINYINT(1) NOT NULL DEFAULT 1,
  RequiresApproval TINYINT(1) NOT NULL DEFAULT 1,
  CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PublishedAt DATETIME NULL,
  ApprovedAt DATETIME NULL,
  ApprovedBy BIGINT NULL,
  ViewCount BIGINT UNSIGNED NOT NULL DEFAULT 0,
  LikeCount INT UNSIGNED NOT NULL DEFAULT 0,
  DislikeCount INT UNSIGNED NOT NULL DEFAULT 0,
  CommentsCount INT UNSIGNED NOT NULL DEFAULT 0,
  IsDeleted TINYINT(1) NOT NULL DEFAULT 0,
  DeletedAt DATETIME NULL,
  PRIMARY KEY (Id),
  INDEX idx_uploader (UploaderId),
  INDEX idx_status_published (Status, PublishedAt),
  INDEX idx_visibility (Visibility),
  INDEX idx_createdat (CreatedAt),
  CONSTRAINT fk_videos_user FOREIGN KEY (UploaderId) REFERENCES usuarios(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


#region video_collaborators

CREATE TABLE video_collaborators (
  VideoId BIGINT UNSIGNED NOT NULL,
  CollaboratorId BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (VideoId, CollaboratorId),
  CONSTRAINT fk_vcollab_video FOREIGN KEY (VideoId) REFERENCES videos(Id) ON DELETE CASCADE,
  CONSTRAINT fk_vcollab_collab FOREIGN KEY (CollaboratorId) REFERENCES creator_collaborators(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



#region video_comments

CREATE TABLE video_comments (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  VideoId BIGINT UNSIGNED NOT NULL,
  UserId BIGINT UNSIGNED NOT NULL,
  ParentCommentId BIGINT UNSIGNED NULL,
  Body TEXT NOT NULL,
  IsApproved TINYINT(1) NOT NULL DEFAULT 1,
  IsDeleted TINYINT(1) NOT NULL DEFAULT 0,
  CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt DATETIME NULL,
  DeletedAt DATETIME NULL,
  PRIMARY KEY (Id),
  INDEX idx_comment_video (VideoId),
  INDEX idx_comment_parent (ParentCommentId),
  CONSTRAINT fk_comment_video FOREIGN KEY (VideoId) REFERENCES videos(Id) ON DELETE CASCADE,
  CONSTRAINT fk_comment_user FOREIGN KEY (UserId) REFERENCES usuarios(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


#region video_moderation_logs

CREATE TABLE video_moderation_logs (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  VideoId BIGINT UNSIGNED NOT NULL,
  ActionBy BIGINT UNSIGNED NULL,
  Action ENUM('submitted','approved','rejected','flagged','removed','restored') NOT NULL,
  Notes TEXT NULL,
  CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Id),
  INDEX idx_mod_video (VideoId),
  CONSTRAINT fk_mod_video FOREIGN KEY (VideoId) REFERENCES videos(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#region video_processing_jobs

CREATE TABLE video_processing_jobs (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  VideoId BIGINT UNSIGNED NOT NULL,
  JobType VARCHAR(60) NOT NULL,
  State ENUM('queued','processing','done','failed') NOT NULL DEFAULT 'queued',
  Attempts INT UNSIGNED NOT NULL DEFAULT 0,
  LastError TEXT NULL,
  CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt DATETIME NULL,
  PRIMARY KEY (Id),
  INDEX idx_job_video (VideoId),
  CONSTRAINT fk_job_video FOREIGN KEY (VideoId) REFERENCES videos(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#region video_reactions

CREATE TABLE video_reactions (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  VideoId BIGINT UNSIGNED NOT NULL,
  UserId BIGINT UNSIGNED NOT NULL,
  Type ENUM('like','dislike') NOT NULL,
  CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Id),
  UNIQUE KEY uq_video_user (VideoId, UserId),
  INDEX idx_video_reactions (VideoId, Type),
  CONSTRAINT fk_react_video FOREIGN KEY (VideoId) REFERENCES videos(Id) ON DELETE CASCADE,
  CONSTRAINT fk_react_user FOREIGN KEY (UserId) REFERENCES usuarios(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


#region video_reports

CREATE TABLE video_reports (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  VideoId BIGINT UNSIGNED NOT NULL,
  ReporterId BIGINT UNSIGNED NOT NULL,
  Reason VARCHAR(255) NULL,
  Details TEXT NULL,
  CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Id),
  INDEX idx_report_video (VideoId),
  CONSTRAINT fk_report_video FOREIGN KEY (VideoId) REFERENCES videos(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


#region video_tags



CREATE TABLE video_tags (
  VideoId BIGINT UNSIGNED NOT NULL,
  TagId INT UNSIGNED NOT NULL,
  PRIMARY KEY (VideoId, TagId),
  CONSTRAINT fk_vtag_video FOREIGN KEY (VideoId) REFERENCES videos(Id) ON DELETE CASCADE,
  CONSTRAINT fk_vtag_tag FOREIGN KEY (TagId) REFERENCES tags(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


#region video_categories



CREATE TABLE video_categories (
  VideoId BIGINT UNSIGNED NOT NULL,
  CategoriesId INT UNSIGNED NOT NULL,
  PRIMARY KEY (VideoId, CategoriesId),
  CONSTRAINT fk_vcategories_video FOREIGN KEY (VideoId) REFERENCES videos(Id) ON DELETE CASCADE,
  CONSTRAINT fk_vcategories_categories FOREIGN KEY (CategoriesId) REFERENCES categories(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



#region video_thumbnails

CREATE TABLE video_thumbnails (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  VideoId BIGINT UNSIGNED NOT NULL,
  FilePath VARCHAR(1024) NOT NULL,
  IsPrimary TINYINT(1) NOT NULL DEFAULT 0,
  OrderIndex TINYINT UNSIGNED NOT NULL DEFAULT 0,
  CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  LastShownAt DATETIME NULL,
  ServeWeight INT NOT NULL DEFAULT 1,
  IsAutoGenerated TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (Id),
  UNIQUE KEY uq_video_order (VideoId, OrderIndex),
  INDEX idx_video_primary (VideoId, IsPrimary),
  CONSTRAINT fk_thumb_video FOREIGN KEY (VideoId) REFERENCES videos(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


#region video_views

CREATE TABLE video_views (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  VideoId BIGINT UNSIGNED NOT NULL,
  UserId BIGINT UNSIGNED NULL,
  DeviceId VARCHAR(128) NULL,
  IpAddress VARCHAR(45) NULL,
  CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Id),
  INDEX idx_view_video (VideoId),
  INDEX idx_view_video_user (VideoId, UserId),
  CONSTRAINT fk_view_video FOREIGN KEY (VideoId) REFERENCES videos(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


#region viewer_profile

CREATE TABLE viewer_profile (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  UserId BIGINT UNSIGNED NOT NULL,
  DisplayName VARCHAR(100) NULL,
  Bio TEXT NULL,
  AvatarUrl VARCHAR(300) NULL,
  Preferences LONGTEXT NULL,
  CreatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Id),
  INDEX idx_user (UserId),
  CONSTRAINT fk_vp_user FOREIGN KEY (UserId) REFERENCES usuarios(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#region viewer_permissions

CREATE TABLE viewer_permissions (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  ViewerUserId BIGINT UNSIGNED NOT NULL,
  ContentType ENUM('video','post','short') NOT NULL,
  ContentId BIGINT UNSIGNED NOT NULL,
  GrantedBy BIGINT UNSIGNED NULL,
  GrantedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ExpiresAt DATETIME NULL,
  PRIMARY KEY (Id),
  UNIQUE KEY uq_viewer_content (ViewerUserId, ContentType, ContentId),
  INDEX idx_viewer (ViewerUserId),
  INDEX idx_content (ContentType, ContentId),
  CONSTRAINT fk_vperm_user FOREIGN KEY (ViewerUserId) REFERENCES usuarios(Id) ON DELETE CASCADE,
  CONSTRAINT fk_vperm_granter FOREIGN KEY (GrantedBy) REFERENCES usuarios(Id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

#region posts

CREATE TABLE posts (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  AuthorId BIGINT UNSIGNED NOT NULL,
  Body TEXT NULL,
  Visibility ENUM('public','private') NOT NULL DEFAULT 'public',
  CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt DATETIME NULL,
  IsDeleted TINYINT(1) NOT NULL DEFAULT 0,
  DeletedAt DATETIME NULL,
  PRIMARY KEY (Id),
  INDEX idx_post_author (AuthorId),
  INDEX idx_post_created (CreatedAt),
  CONSTRAINT fk_post_user FOREIGN KEY (AuthorId) REFERENCES usuarios(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


#region post_images

CREATE TABLE post_images (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  PostId BIGINT UNSIGNED NOT NULL,
  FilePath VARCHAR(1024) NOT NULL,
  OrderIndex TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (Id),
  UNIQUE KEY uq_post_order (PostId, OrderIndex),
  CONSTRAINT fk_postimg_post FOREIGN KEY (PostId) REFERENCES posts(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


#region shorts

CREATE TABLE shorts (
  Id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  CreatorId BIGINT UNSIGNED NOT NULL,
  VideoPath VARCHAR(1024) NOT NULL,
  DurationSeconds INT NOT NULL,
  Caption VARCHAR(255) NULL,
  Visibility ENUM('public','private') NOT NULL DEFAULT 'public',
  Status ENUM('draft','approved','removed') NOT NULL DEFAULT 'draft',
  CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt DATETIME NULL,
  ViewCount BIGINT UNSIGNED NOT NULL DEFAULT 0,
  LikeCount INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (Id),
  INDEX idx_short_creator (CreatorId),
  INDEX idx_short_created (CreatedAt),
  CONSTRAINT fk_short_user FOREIGN KEY (CreatorId) REFERENCES usuarios(Id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;







ALTER TABLE video_categories
ADD UNIQUE KEY uq_video_category (VideoId, CategoryId);

ALTER TABLE video_tags
ADD UNIQUE KEY uq_video_tag (VideoId, TagId);

*/