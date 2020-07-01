export default (
  resolve: Function
) => (res: any) => {
  const {
    data = {}
  } = res || {};
  resolve(data.data||data);
}
