import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import { message, Tabs} from 'antd';
import React, {useState} from 'react';
// @ts-ignore
import {history} from 'umi';
import styles from './index.less';
import {SYSTEM_LOGO} from "@/constant";




const Login: React.FC = () => {
  //注册类型
  const [type, setType] = useState<string>('account');
  const handleSubmit = async (values: API.RegisterParams) => {
    const {userPassWord,checkPassWord}=values;
    try {
      //校验
      if(userPassWord!==checkPassWord){
        message.error("两次密码输入不一致");
        return;
      }


      // 注册
      const id = await register(values);

      if (id){
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);


        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;

        history.push({
          pathname:'/user/login',
          query
        });
        return;
      }

      // 如果失败去设置用户错误信息

    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  // const {status, type: loginType} = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig:{
              submitText: '注册'

            }}}
          logo={<img alt="logo" src={SYSTEM_LOGO}/>}
          title="编程导航知识星球"
          subTitle={'专注编程，引领科技'}
          initialValues={{
            autoLogin: true,
          }}

          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号密码注册'}/>
            {/*<Tabs.TabPane key="mobile" tab={'手机号注册'} />*/}
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                  {
                    min: 4,
                    type: "string",
                    message: "账号不能小于4位",
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassWord"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: "密码不能小于8位",
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassWord"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: "确认密码不能小于8位",
                  },
                ]}
              />
              <ProFormText
                name="planetCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'请输入星球编号'}
                rules={[
                  {
                    required: true,
                    message: '星球编号是必填项！',
                  },
                  // {
                  //   max: 5,
                  //   type: "string",
                  //   message: "编号不能超过5位",
                  // },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Login;
