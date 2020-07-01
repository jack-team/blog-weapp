export default (
  resolve: Function,
  reject:Function
) => (res: any) => {
  const {
    data = {}
  } = res || {};

  const {
    success,
    data:_data,
    error_msg
  } = data;

  if(success) {
    resolve( _data || data );
  }
  else {
    reject({
      message:error_msg
    })
  }
}
