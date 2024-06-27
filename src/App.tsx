import { Image } from 'antd';
import * as X from 'react-router-dom';
import ReactShadow, { useShadowRoot } from 'react-shadow';
import { Table } from 'antd';
import styles from './App.module.css';
console.log(X);
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

function Home() {
  return (
    <div>
      <h2>Remote1 home page</h2>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

function Detail() {
  return (
    <>
      <h2>Remote1 detail page</h2>
      <Image width={200} src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' />
    </>
  );
}

const App = (info: any) => {
  // console.log('info', info);
  return 'adf';
  // <BrowserRouter basename='/'>
  // {
  /* <ul>
        <li>
          <Link to='/' className='self-remote1-home-link'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/detail' className='self-remote1-detail-link'>
            Detail
          </Link>
        </li>
      </ul>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/detail' Component={Detail} />
      </Routes> */
  // }
  // </BrowserRouter>
};

// function WrapApp(info: any) {
//   return (
//     // <ReactShadow.div>
//     <App />
//     // </ReactShadow.div>
//   );
// }

export default App;
