// 将树转为数组
export const traverseArray = tree => {
  let result = Array.isArray(tree) ? tree : [tree];
  for (let i = 0; i < result.length; i++) {
    if (!result[i].children) continue;
    const list = result[i].children.map(node => node);
    result.splice(i + 1, 0, ...list);
  }
  if (tree.id === 0) {
    const ids = result.map(item => item.akProjectId);
    result = result.map(item => {
      let { projectParentId } = item;
      let projectIdPathArr = item?.projectIdPath?.split(',').map(id => +id) || [];
      projectIdPathArr = projectIdPathArr.filter(id => ids.indexOf(id) > -1);
      if (item.id !== 0 && ids.indexOf(projectParentId) === -1) {
        projectParentId = -999;
      }
      projectIdPathArr.unshift(-999);
      return {
        ...item,
        children: null,
        projectParentId,
        projectIdPathArr,
        projectIdPath: projectIdPathArr.join(','),
      };
    });
  } else {
    result = result.map(item => ({
      ...item,
      projectIdPathArr: item?.projectIdPath?.split(',').map(id => +id) || [],
    }));
  }
  return result;
};
// 将数组转为树
export const traverseTree = (projects, rootProjectId) => {
  const len = projects.length;
  const map = {};
  for (let i = 0; i < len; i++) {
    map[projects[i].akProjectId] = projects[i];
  }
  for (const key in map) {
    if (map[map[key].projectParentId]?.children?.length) {
      map[map[key].projectParentId].children.push(map[key]);
    } else if (map[map[key].projectParentId]) {
      map[map[key].projectParentId].children = [map[key]];
    }
  }
  return map[rootProjectId];
};
// 获取树转成的数组中的根节点
export const getTreesRootId = (projects, ids) => {
  const selectedProject = projects.filter(item => ids.indexOf(+item.akProjectId) > -1);
  const len = selectedProject.length;
  const rootIds = new Set();
  for (let i = 0; i < len; i++) {
    const project = selectedProject[i];
    const path = (project?.projectIdPath || '').split(',');
    for (let pIndex = 0; pIndex < path.length; pIndex++) {
      if (ids.indexOf(+path[pIndex]) > -1) {
        rootIds.add(path[pIndex]);
        break;
      }
    }
  }
  return [...rootIds];
}

// 树节点过滤
export const treeFilter = (tree, func) => {
  // 使用map复制一下节点，避免修改到原树
  return tree
    .map(node => ({ ...node }))
    .filter(node => {
      const newNode = node;
      newNode.children = node.children && treeFilter(newNode.children, func);
      return func(newNode) || (newNode.children && newNode.children.length);
    });
};

// 找出一个不同的元素
export const findDifference = (arr1, arr2) => {
  const set2 = new Set(arr2);
  const unequal = arr1.filter(item => !set2.has(item));
  return unequal.length ? unequal[0] : '';
};
// 去重
export const unequal = arr => Array.from(new Set(arr));
// 去除数据交集
export const removeDuplicates = (arr1, arr2) => {
  const set = new Set([...arr2]);
  return [...new Set([...arr1].filter(item => !set.has(item)))];
}

export default {
  traverseArray,
  traverseTree,
  getTreesRootId,
  treeFilter,
  findDifference,
  unequal,
  removeDuplicates
}