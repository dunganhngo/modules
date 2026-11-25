// ~ Mod by anhdungo
// Can thiệp Firebase Remote Config để bật Feature Flags (AI, Quay video dài)

var body = $response.body;

try {
  var obj = JSON.parse(body);

  if (obj && obj.entries) {
    // Duyệt qua toàn bộ cờ có sẵn của Locket
    for (var key in obj.entries) {
      var lowerKey = key.toLowerCase();
      
      // Nếu là cờ tắt tính năng video/AI/camera/gold thì ép thành true
      if (lowerKey.includes("ai") || lowerKey.includes("gold") || lowerKey.includes("video") || 
          lowerKey.includes("camera") || lowerKey.includes("duration") || lowerKey.includes("limit") || 
          lowerKey.includes("feature")) {
        if (obj.entries[key] === "false") {
          obj.entries[key] = "true";
        }
      }
    }

    // Tiêm các cờ thời lượng video và AI phổ biến của Locket
    obj.entries["video_max_duration"] = "15";
    obj.entries["max_video_duration"] = "15";
    obj.entries["video_duration_seconds"] = "15";
    obj.entries["camera_video_duration"] = "15";
    obj.entries["video_duration"] = "15";
    obj.entries["locket_gold_ai_enabled"] = "true";
    obj.entries["ai_caption_enabled"] = "true";
    obj.entries["ai_features_enabled"] = "true";
    obj.entries["enable_ai"] = "true";
    obj.entries["long_video_enabled"] = "true";
    obj.entries["extended_video_enabled"] = "true";
    obj.entries["gold_tier"] = "tier2";
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({ body });
}
