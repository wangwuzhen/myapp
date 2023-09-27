
import { PageHeaderWrapper } from '@ant-design/pro-components';

import React from 'react';


//children 为子页面  嵌套在父页面的任何位置
const Admin: React.FC = (props) => {
  const  {children}=props;
  return (
    <PageHeaderWrapper >
      {children}
    </PageHeaderWrapper>
  );
};
export default Admin;
