import Cookies from "js-cookie";



export const domain = "http://127.0.0.1:8000";
// export const domain = "";

/*
    window.localStorage.setItem('token', 'Tom');
    window.localStorage.removeItem('myCat');
    window.localStorage.clear();
    window.localStorage.getItem("token");
*/
// const token = "bf9299b7ddc31a133c95ba0830880526a1e2361b"
const token = window.localStorage.getItem("token");
export const headerGet = {
    Authorization: `token ${token}`
}
export const headerPost = {
    Authorization: `token ${token}`,
    "Content-Type": "application/json",
  }
const csrftoken = Cookies.get('csrftoken')
export const headerCsrf = {
    'X-CSRFToken': csrftoken,
}
// export const header2 = {
//     Authorization: `token ${token}`,
//     'X-CSRFToken': csrftoken,
// }