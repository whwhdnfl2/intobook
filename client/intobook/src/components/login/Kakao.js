//현재 윈도우 창의 주소값 불러옴
const href = window.location.href;
//현재 url의 파라미터를 가져옴
let params = new URL(window.location.href).searchParams;
//params에 저장된 파라미터 안에서 'code'의 값을 가져옴
let code = params.get("code");

