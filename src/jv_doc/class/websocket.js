import store from "@/store";
import { isString } from "@/utils/validate";
const echoMsg = {
  PING: "ping",
  PONG: "pong",
};
export class Ws {
  websocket = null;
  connectURL = window.global_config.WebSocket_Url;
  // 开启标识
  socket_open = false;
  // 心跳timer
  hearbeat_timer = null;
  // 心跳发送频率
  hearbeat_interval = 2 * 1000;
  // 是否自动重连
  is_reonnect = true;
  // 重连次数
  reconnect_count = 3;
  // 已发起重连次数
  reconnect_current = 1;
  // 重连timer
  reconnect_timer = null;
  // 重连频率
  reconnect_interval = 5 * 1000;
  init = (receiveMessage) => {
    if (!("WebSocket" in window)) {
      console.log("浏览器不支持WebSocket");
      return null;
    }
    // const token = Session.get('token');
    // if (!token) {
    //   createMessage.log('websocket认证失败');
    //   return null;
    // }
    const linkToken = store.getters.token ?? undefined;
    if (!linkToken) {
      this.close();
      return;
    }
    const wsUrl = `${window.global_config.WebSocket_Url}/PC_${linkToken}`;
    this.websocket = new WebSocket(wsUrl);
    this.websocket.onmessage = (e) => {
      if (e.data == echoMsg.PONG) return;
      if (receiveMessage) {
        receiveMessage(e);
      }
    };
    this.websocket.onclose = () => {
      this.socket_open = false;
      // 需要重新连接
      if (this.is_reonnect) {
        this.reconnect_timer = setTimeout(() => {
          // 超过重连次数
          if (this.reconnect_current > this.reconnect_count) {
            // @ts-ignore
            clearTimeout(this.reconnect_timer);
            this.is_reonnect = false;
            return;
          }
          // 记录重连次数
          this.reconnect_current++;
          this.reconnect();
        }, this.reconnect_interval);
      }
    };
    // 连接成功
    this.websocket.onopen = () => {
      this.socket_open = true;
      this.is_reonnect = true;
      // 开启心跳
      this.heartbeat();
      console.log("连接成功");
    };
    // 连接发生错误
    this.websocket.onerror = () => {
      console.log("连接发生错误");
    };
  };
  heartbeat = () => {
    this.hearbeat_timer && clearInterval(this.hearbeat_timer);

    this.hearbeat_timer = setInterval(() => {
      // const data = {
      //   token: Session.get('token'),
      // };
      this.send(echoMsg.PING, () => {});
    }, this.hearbeat_interval);
  };
  send = (data, callback) => {
    if (this.websocket == null) return;
    // 开启状态直接发送
    if (this.websocket.readyState === this.websocket.OPEN) {
      if (data != echoMsg.PING) {
        console.log(data, "发送");
      }
      this.websocket.send(isString(data) ? data : JSON.stringify(data));
      // @ts-ignore
      callback && callback();
    } else {
      clearInterval(this.hearbeat_timer);
      console.log("socket链接已断开");
    }
  };
  close = () => {
    if (this.websocket == null) return;
    this.is_reonnect = false;
    this.websocket.close();
    this.websocket = null;
    console.log("连接关闭");
  };
  /**
   * 重新连接
   */
  reconnect = () => {
    if (this.websocket && !this.is_reonnect) {
      this.close();
    }
    this.init(null);
    console.log("重新连接");
  };
}
