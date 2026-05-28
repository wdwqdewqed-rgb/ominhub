using System;
using System.Data.Common;

namespace OminHub.Api.Model
{
    public class VideoDetailDto
{
    public long Id { get; set; } //
    public string Title { get; set; } //
    public string Description { get; set; } //

    public string VideoUrl { get; set; } //
    public string ThumbnailUrl { get; set; } //

    public string Duration { get; set; } //
    public long Views { get; set; } //
    public string UploadDate { get; set; } //

    public List<string> Categories { get; set; } //
    public List<string> Tags { get; set; } //

    public long ChannelId { get; set; } //
    public string ChannelName { get; set; } //
    public string ChannelAvatar { get; set; } //
    public bool ChannelVerified { get; set; } //
    public long Subscribers { get; set; } //

    public int Likes { get; set; } //
    public int Dislikes { get; set; }  //

    public string? UserReaction { get; set; }
    public bool IsSubscribed { get; set; }
}
}