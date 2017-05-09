import request from '../utils/request';

function getHomeList() {
  return request(`api/list`);
}
export {getHomeList};
