// ~ Mod by anhdungo
// Tối ưu hóa Entitlement & Product ID chính hãng cho Locket Gold

const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold', 'locket_yearly_tier2']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

if (!obj.subscriber) {
  obj.subscriber = { subscriptions: {}, entitlements: {} };
}
if (!obj.subscriber.subscriptions) {
  obj.subscriber.subscriptions = {};
}
if (!obj.subscriber.entitlements) {
  obj.subscriber.entitlements = {};
}

obj.Attention = "Locket Gold VIP - Configured by anhdungo";

// Cấu hình gói thuê bao năm chính thức (App Store Production)
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

// Cấu hình quyền hạn Gold đầy đủ tính năng mới
var entitlementData = {
  grace_period_expires_date: null,
  purchase_date: "2024-01-01T00:00:00Z",
  product_identifier: "locket_yearly_tier2",
  expires_date: "2099-12-31T23:59:59Z"
};

const match = Object.keys(mapping).find(e => ua && ua.includes(e));

if (match) {
  let [entitlementKey, productKey] = mapping[match];
  let targetProduct = productKey || "locket_yearly_tier2";

  entitlementData.product_identifier = targetProduct;
  obj.subscriber.subscriptions[targetProduct] = subData;
  obj.subscriber.entitlements[entitlementKey] = entitlementData;
} else {
  // Mặc định cho Locket
  obj.subscriber.subscriptions["locket_yearly_tier2"] = subData;
  obj.subscriber.entitlements["Gold"] = entitlementData;
}

$done({ body: JSON.stringify(obj) });
