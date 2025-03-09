import { get, post } from "./config";

const fetchUser = async () => {
  try {
    const user = await get('/api/user');
    return user;
  } catch (err) {
    console.error(err.message);
  }
};

// 提交表单
const login = async (formData) => {
  try {
    const result = await post('/api/user/login', formData);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export {
  fetchUser,
  login,
};
