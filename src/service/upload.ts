import Taro from '@tarojs/taro';

const uploadUrl = `https://yutao2012.com/upload`;

const token = `CE3CA381E7675B4F61D6E316BA156131`;

const concat = (
  pre: Array<string>,
  next: Array<string>
) => pre.concat(next);

const taskFn = (url: string) => (
  Taro.uploadFile({
    name: `file`,
    filePath: url,
    url: uploadUrl,
    header: {Authorization: token}
  }).then((res) => {
    return JSON.parse(res.data);
  })
);

export default async (urls: Array<string>):Promise<string[]> => {
  const tasks = urls.map(taskFn);
  try {
    const res = await Promise.all(tasks) as Array<any>;
    return res.map(({data}: any) => data).reduce(concat);
  }
  catch (e) {
    return Promise.reject(e);
  }
}
