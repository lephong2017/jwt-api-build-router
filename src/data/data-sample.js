import React from 'react';
import { Tag,Divider } from 'antd';
export const data=[{
    name: 'Nguyen Van A',
    age: 26,
    friend: {
      name: 'Do Van C',
      age: 23,
    }
  }, {
    name: 'Dao Thi B',
    age: 22,
    friend: {
      name: 'Ngo Trung V',
      age: 24,
    }
  }, {
    name: 'Tran Duc C',
    age: 25,
    friend: {
      name: 'Ngo Thanh E',
      age: 25,
    }
  }, {
    name: 'Le Tien N',
    age: 27,
    friend: {
      name: 'Cao Cong G',
      age: 24,
    }
  }, {
    name: 'Pham Hoang M',
    age: 26,
    friend: {
      name: 'Lai Hai D',
      age: 25,
    }
  }, {
    name: 'Duong Van L',
    age: 23,
    friend: {
      name: 'Le Hoang M',
      age: 23,
    }
  }];
export const col =[
    {
        header: 'Name',
        accessor: 'name' // Cái này sẽ là đại diện cho giá trị của thuộc tính của phần tử ở cột này. Với thuộc tính đơn giản thì chỉ cần truyền vào key của đối tượng trong data.
      }, {
        header: 'Age',
        accessor: 'age',
        Cell: props => <span className='number'>{props.value}</span> // Tùy biến component Cell.
      }, {
        id: 'friendName', // Khi accessor không phải là 1 chuỗi thì phải cung cấp id để đại diện cho thuộc tính cột.
        header: 'Friend Name',
        accessor: d => d.friend.name // Tùy biến giá trị đại diện cho giá trị của thuộc tính của phần tử ở cột này.
      }, {
        header: props => <span>Friend Age</span>, // Tùy biến component Header
        accessor: 'friend.age' // Khi 1 thuộc tính của dữ liệu có kiểu là 1 đối tượng, chúng ta cũng có thể cung cấp đường dẫn đến thuộc tính cần lấy giá trị.
      }
  ];

export  const colAntd = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
      </span>
    ),
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Invite {record.name}</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    ),
  }];
  
export  const dataAntd = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  }];