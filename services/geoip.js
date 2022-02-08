import ip from 'public-ip';
import axios from 'axios';

const IpAddress = async () => {
  try {
    return await ip.v4();
  } catch (e) {
    return e;
  }
};
const Location = async () => {
  try {
    const ipAddress = await ip.v4();
    if (ipAddress) {
      const { data } = await axios.get(`https://api.ip2location.com/v2/?ip=${ipAddress}&key=4MGG8VAUEP&package=WS5`);
      return data;
    }
    return undefined;
  } catch (e) {
    return e;
  }
};

export default {
  IpAddress,
  Location,
};
