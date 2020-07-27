import $ from 'jquery';

const list = {
  init() {
    console.log('list组件初始化完成');
    $('#h4-btn').click(() => {
      console.log('SPA+MPA混用架构');
    });
  },
};
export default list;
