let flag = false;
let findData = "";
function deepFind(data, id) {
  if (flag) return false;
  if (!id || !data) return false;
  data.forEach(A => {
    if (id != A.id && A.children) {
      deepFind(A.children, id);
    } else if (id == A.id) {
      flag = true;
      findData = A.departmentName;
    }
  });
}
export function deepFind1(data, id) {
  flag = false;
  findData = "";
  deepFind(data, id);
  if (flag) {
    return findData;
  } else {
    return;
  }
}
