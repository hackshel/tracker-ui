/*
{
    "username":"",
    "user_role":"",
    "user_id":"",
    "passkey":"",
    "iss":"tracker-server",
    "exp":1745397268,
    "iat":1745393668
}
*/
const JWTStorage = (function () {
    // 解析 JWT 的 payload（base64 解码）
    function parseJWT(token) {
      try {
        const payload = token.split('.')[1];
        const decoded = atob(payload);
        return JSON.parse(decoded);
      } catch (err) {
        console.error('解析 JWT 失败:', err);
        return null;
      }
    }
  
    // 设置 token 和过期时间
    function setToken(token) {
      const payload = parseJWT(token);
      if (!payload || !payload.exp) {
        console.warn("token 无法识别或缺少 'exp' 字段");
        return;
      }
  
      const expiresAt = payload.exp * 1000; // 转换为毫秒时间戳
      localStorage.setItem("token", token);
      localStorage.setItem("token_expires", expiresAt.toString());
      localStorage.setItem("token_user", btoa(payload.user_role));
      localStorage.setItem("username", payload.username);
      
    }
  
    // 获取 token
    function getToken(token) {
      return localStorage.getItem(token);
    }
  
    // 判断 token 是否过期
    function isTokenExpired() {
      const expiresAt = parseInt(localStorage.getItem("token_expires"));
      return isNaN(expiresAt) || Date.now() > expiresAt;
    }
  
    // 清除 token
    function clearToken() {
      localStorage.removeItem("token");
      localStorage.removeItem("token_expires");
      localStorage.removeItem("token_user");
      localStorage.removeItem("username");
    }
  
    function is_super(){
        const role = atob(localStorage.getItem("token_user"));
        console.log(role);
        if(role === 'admin'){
            return true;
        }
        return false;
    }
    return {
      setToken,
      getToken,
      isTokenExpired,
      clearToken,
      is_super
    };
  })();
  