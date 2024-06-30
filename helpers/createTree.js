let count = 0;
let check = true;
const createTree = (arr, parentId = "", status) => {
  const tree = [];
  arr.forEach((item, index) => {
    if(item.parent_id === parentId ) {
      check = false;
      count++;
      const newItem = item;
      newItem.index = count;
      const children = createTree(arr, item.id, status);
      if(children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    } 
    // else if(status === "inactive" && check) {
    //   tree.push(arr[index]);
    // }
  });
  return tree;
};

module.exports.tree = (arr, parentId = "", status) => {
  count = 0;
 check = true;

  const tree = createTree(arr, parentId = "", status);
  return tree;
}