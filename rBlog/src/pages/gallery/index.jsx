import { Masonry } from 'react-virtualized';

const Gallery = ({ props }) =>  {
  const items = [
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 300 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 400 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 200 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 300 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 400 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 200 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 300 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 400 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 200 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 300 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 400 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 200 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 300 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 400 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 200 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 300 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 400 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 200 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 300 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 400 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 200 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 300 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 400 },
    { url: 'https://cdn.jsdelivr.net/gh/iovvoi/images@main/md/1629870946159-avatar.jpg', height: 200 },
  ];

  const cache = {
    defaultWidth: 300,
    defaultHeight: 200
  }
  return  <Masonry
  cellCount={items.length}
  cellMeasurerCache={cache}
  cellRenderer={({ index, style }) => (
    <div style={style}>
      <img src={items[index].url} />
    </div>
  )}
  width={1200}
  height={800}
  columnWidth={300}
  rowHeight={({ index }) => items[index].height}
  columnCount={4}
/>
};
export default Gallery;


// 以下是几个优秀的 React 瀑布流（Masonry Layout）组件库，涵盖不同场景需求（动态布局、响应式、无限滚动等）：

// ---

// ### 1. **react-masonry-component**  
// **GitHub**: [https://github.com/eiriklv/react-masonry-component](https://github.com/eiriklv/react-masonry-component)  
// **特点**：  
// - 基于著名的 Masonry.js 封装  
// - 支持动态布局更新（自动重新排列）  
// - 响应式断点配置  
// - 支持服务器端渲染（SSR）  
// **示例代码**：  
// ```jsx
// import Masonry from 'react-masonry-component';

// const masonryOptions = {
//   transitionDuration: 0,
//   gutter: 10
// };

// <Masonry options={masonryOptions}>
//   {items.map((item) => (
//     <div key={item.id} style={{ width: '300px' }}>
//       <img src={item.url} alt={item.title} />
//     </div>
//   ))}
// </Masonry>
// ```

// ---

// ### 2. **react-masonry-css**  
// **GitHub**: [https://github.com/paulcollett/react-masonry-css](https://github.com/paulcollett/react-masonry-css)  
// **特点**：  
// - 纯 CSS 实现的瀑布流（无需 JavaScript 计算）  
// - 超轻量级（<3KB）  
// - 支持响应式断点  
// - 兼容所有现代浏览器  
// **示例代码**：  
// ```jsx
// import Masonry from 'react-masonry-css';

// const breakpointColumnsObj = {
//   default: 4,
//   1100: 3,
//   700: 2,
//   500: 1
// };

// <Masonry
//   breakpointCols={breakpointColumnsObj}
//   className="masonry-grid"
//   columnClassName="masonry-grid_column"
// >
//   {items.map((item) => (
//     <div key={item.id}>
//       <img src={item.url} alt={item.title} />
//     </div>
//   ))}
// </Masonry>
// ```

// ---

// ### 3. **react-waterfall**  
// **GitHub**: [https://github.com/xyxiao001/react-waterfall](https://github.com/xyxiao001/react-waterfall)  
// **特点**：  
// - 专为 React 设计的轻量级瀑布流  
// - 支持动态高度计算  
// - 内置滚动加载更多功能  
// - 兼容移动端手势  
// **示例代码**：  
// ```jsx
// import Waterfall from 'react-waterfall';

// <Waterfall
//   columnWidth={300}
//   columnCount={4}
//   gutterWidth={10}
//   gutterHeight={10}
//   responsive={true}
//   onScroll={handleScroll}
// >
//   {items.map((item) => (
//     <div key={item.id}>
//       <img src={item.url} style={{ width: '100%' }} />
//     </div>
//   ))}
// </Waterfall>
// ```

// ---

// ### 4. **react-grid-gallery**  
// **GitHub**: [https://github.com/benhowell/react-grid-gallery](https://github.com/benhowell/react-grid-gallery)  
// **特点**：  
// - 支持瀑布流和网格布局切换  
// - 内置图片选择和标记功能  
// - 自定义悬停效果  
// - 支持 TypeScript  
// **适用场景**：带交互的图片管理后台  
// ```jsx
// import Gallery from 'react-grid-gallery';

// <Gallery
//   images={IMAGES}
//   enableLightbox={true}
//   rowHeight={200}
//   margin={5}
// />
// ```

// ---

// ### 5. **react-infinite-scroller + Masonry**  
// **组合方案**：  
// - **react-infinite-scroller**: [GitHub](https://github.com/CassetteRocks/react-infinite-scroller)  
// - **Masonry.js**: [官网](https://masonry.desandro.com/)  
// **特点**：  
// - 手动实现无限滚动瀑布流  
// - 完全控制加载逻辑  
// - 适合需要高度定制的场景  
// **示例代码**：  
// ```jsx
// import InfiniteScroll from 'react-infinite-scroller';
// import Masonry from 'masonry-layout';

// // 在 componentDidUpdate 中初始化 Masonry
// componentDidUpdate() {
//   new Masonry(this.grid, { itemSelector: '.grid-item' });
// }

// <InfiniteScroll
//   loadMore={loadMoreItems}
//   hasMore={hasMore}
//   loader={<LoadingSpinner />}
// >
//   <div ref={(el) => (this.grid = el)}>
//     {items.map((item) => (
//       <div className="grid-item" key={item.id}>
//         <img src={item.url} />
//       </div>
//     ))}
//   </div>
// </InfiniteScroll>
// ```

// ---

// ### 6. **react-virtualized Masonry**  
// **GitHub**: [https://github.com/bvaughn/react-virtualized](https://github.com/bvaughn/react-virtualized)  
// **特点**：  
// - 虚拟滚动技术（仅渲染可见区域）  
// - 超大数据量优化（10,000+ 项）  
// - 精准高度控制  
// **示例代码**：  
// ```jsx
// import { Masonry } from 'react-virtualized';

// <Masonry
//   cellCount={items.length}
//   cellMeasurerCache={cache}
//   cellRenderer={({ index, style }) => (
//     <div style={style}>
//       <img src={items[index].url} />
//     </div>
//   )}
//   width={1200}
//   height={800}
//   columnWidth={300}
//   rowHeight={({ index }) => items[index].height}
//   columnCount={4}
// />
// ```

// ---

// ### 选择建议：
// - **简单轻量** → `react-masonry-css`  
// - **动态高度** → `react-waterfall`  
// - **无限滚动** → `react-infinite-scroller + Masonry`  
// - **超大数据量** → `react-virtualized Masonry`  
// - **交互功能** → `react-grid-gallery`

// ---

// ### 性能优化技巧：
// 1. 使用 `react-virtualized` 或 `react-window` 避免渲染不可见元素
// 2. 对图片使用懒加载（如 `loading="lazy"` 或 `react-lazyload`）
// 3. 预计算图片高度（避免布局抖动）
// 4. 使用 CDN 加载图片缩略图
// 5. 对动态内容使用防抖（debounce）重新布局

// 根据项目需求选择最适合的方案，大多数场景下 `react-masonry-component` 或 `react-masonry-css` 即可满足需求！