import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import React, {useRef,useState} from 'react';

import {currentUser, deleteUser, searchUsers} from "@/services/ant-design-pro/api";
import {Image, message} from "antd";
import {history} from "@@/core/history";




export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

//  export const handleDelete =()=> {
//
//    alert()
//   try {
//
//     // 注册
//     const id =  deleteUser();
//
//
//
//     if (id) {
//       const defaultLoginSuccessMessage = '删除成功！';
//       message.success(defaultLoginSuccessMessage);
//
//
//       /** 此方法会跳转到 redirect 参数所在的位置 */
//       if (!history) return;
//       // const {query} = history.location;
//
//       // history.push({
//       //   pathname:,
//       //   query
//       // });
//       return;
//     }
//
//     // 如果失败去设置用户错误信息
//
//   } catch (error: any) {
//     const defaultLoginFailureMessage = '注册失败，请重试！';
//     message.error(defaultLoginFailureMessage);
//   }
// };




const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id ',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    copyable: true,

  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render:(_,record)=>(
      <div>
        <Image src={record.avatarUrl} width={100}/>
      </div>
    )


  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',  //用于声明这一列的类型
    valueEnum: {
      0: {
        text: '男',

      },
    },


  },
  {
    title: '电话',
    dataIndex: 'phone',


  },
  {
    title: '邮箱',
    dataIndex: 'email',


  },
  {
    title: '星球编号',
    dataIndex: 'planetCode',


  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    valueType: 'select',  //用于声明这一列的类型
    valueEnum: {
      0: {
        text: '正常',
        status: 'Default',
      },
      1: {
        text: '封号',
        status: 'Error',
        disabled: true,
      },
    },


  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'select',  //用于声明这一列的类型
      valueEnum: {
        0: {
          text: '普通用户',
          status: 'Default',
        },
        1: {
          text: '管理员',
          status: 'Success',
          disabled: true,
        },
      },


  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',


  },


  // {
  //   disable: true,
  //   title: '状态',
  //   dataIndex: 'state',
  //   filters: true,
  //   onFilter: true,
  //   ellipsis: true,
  //   valueType: 'select',
  //   valueEnum: {
  //     all: { text: '超长'.repeat(50) },
  //     open: {
  //       text: '未解决',
  //       status: 'Error',
  //     },
  //     closed: {
  //       text: '已解决',
  //       status: 'Success',
  //       disabled: true,
  //     },
  //     processing: {
  //       text: '解决中',
  //       status: 'Processing',
  //     },
  //   },
  // },
  // {
  //   disable: true,
  //   title: '标签',
  //   dataIndex: 'labels',
  //   search: false,
  //   renderFormItem: (_, { defaultRender }) => {
  //     return defaultRender(_);
  //   },
  //   render: (_, record) => (
  //     <Space>
  //       {record.labels.map(({ name, color }) => (
  //         <Tag color={color} key={name}>
  //           {name}
  //         </Tag>
  //       ))}
  //     </Space>
  //   ),
  // },
  // {
  //   title: '创建时间',
  //   key: 'showTime',
  //   dataIndex: 'created_at',
  //   valueType: 'date',
  //   sorter: true,
  //   hideInSearch: true,
  // },
  // {
  //   title: '创建时间',
  //   dataIndex: 'created_at',
  //   valueType: 'dateRange',
  //   hideInTable: true,
  //   search: {
  //     transform: (value) => {
  //       return {
  //         startTime: value[0],
  //         endTime: value[1],
  //       };
  //     },
  //   },
  // },

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          {key: 'copy', name: '复制'},
          {key: 'delete', name: '删除'},
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers();
        return {
          data: userList
        }


      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"

    />
  );
};
