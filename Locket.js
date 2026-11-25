// ~ Mod by anhdungo
// Tối ưu hóa toàn diện Entitlement & Product ID (Full Tiers & AI Perks)

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var body = $response.body;

try {
  var obj = JSON.parse(body);

  if (!obj.subscriber) {
    obj.subscriber = { subscriptions: {}, entitlements: {} };
  }
  if (!obj.subscriber.subscriptions) {
    obj.subscriber.subscriptions = {};
  }
  if (!obj.subscriber.entitlements) {
    obj.subscriber.entitlements = {};
  }

  obj.Attention = "Locket Gold VIP - Full Features by anhdungo";

  // Dữ liệu gói mua cao cấp nhất (Tier cao nhất của Locket)
  var subData = {
    is_sandbox: false,
    ownership_type: "PURCHASED",
    billing_issues_detected_at: null,
    period_type: "normal",
    expires_date: "2099-12-31T23:59:59Z",
    grace_period_expires_date: null,
    unsubscribe_detected_at: null,
    original_purchase_date: "2024-01-01T00:00:00Z",
    purchase_date: "2024-01-01T00:00:00Z",
    store: "app_store"
  };

  // Mở tất cả các mã gói sản phẩm chính thức của Locket
  var productIds = [
    "locket_yearly_tier2",
    "locket_3599_1y",
    "locket_1999_1y",
    "locket_199_1m"
  ];

  for (var i = 0; i < productIds.length; i++) {
    obj.subscriber.subscriptions[productIds[i]] = subData;
  }

  // Mở tất cả các quyền hạn (Entitlements) mà Locket có thể kiểm tra
  var entitlementKeys = ["Gold", "gold", "pro", "locket_gold", "ai_features", "extended_video"];

  for (var j = 0; j < entitlementKeys.length; j++) {
    obj.subscriber.entitlements[entitlementKeys[j]] = {
      grace_period_expires_date: null,
      purchase_date: "2024-01-01T00:00:00Z",
      product_identifier: "locket_yearly_tier2",
      expires_date: "2099-12-31T23:59:59Z"
    };
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({ body });
}
